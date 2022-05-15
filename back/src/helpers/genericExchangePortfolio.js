//@ts-check
const { default: axios } = require("axios");
const Portfolio = require("../models/Portfolio");
const Coin = require("../models/Coin");
const Transaction = require("../models/Transaction");
const Moralis = require("moralis/node");

module.exports.genericExchangePortfolio = async (balances, exchangeName, req, res) => {
    console.log(balances);
    console.log(exchangeName);
    try {
        const coinsData = await getCoinsData(balances);
        try {
            const savedPortfolio = await createPortfolio(req, exchangeName);
            try {
                const savedCoins = await createCoins(coinsData, savedPortfolio, req.uid);
                const portfolio = await fillPortfolio(savedPortfolio, savedCoins);
                return portfolio;
            } catch (error) {
                console.log(error);
                return res.status(400).json({
                    message: "Error creating coins",
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: "Error getting coins prices",
        });
    }
};

async function fillPortfolio(savedPortfolio, savedCoins) {
    savedPortfolio.coins.push(...savedCoins.map(({ id }) => id));
    const finalPortfolio = savedPortfolio;
    return finalPortfolio;
}

async function createCoins(coinsData, savedPortfolio, userId) {
    const newCoins = coinsData.map((coin) => {
        console.log(coin);
        const newCoin = new Coin({
            idCoingecko: coin.idCoingecko,
            idPortfolio: savedPortfolio._id,
            image: coin.image,
            name: coin.name,
            symbol: coin.symbol,
        });
        newCoin.user = userId;
        return newCoin;
    });

    for (let i = 0; i < newCoins.length; i++) {
        const transaction = new Transaction({
            idCoin: newCoins[i].id,
            investment: coinsData[i].amount,
            entryPrice: coinsData[i].price,
            notes: "",
            type: "buy",
        });
        transaction.user = userId;
        const savedTransaction = await transaction.save();
        newCoins[i].transactions.push(savedTransaction.id);
    }
    const savedCoins = await Promise.all(newCoins.map((newCoin) => newCoin.save()));
    return savedCoins;
}

async function createPortfolio(req, exchangeName) {
    const ENTITY_KEY_DUPLICATED = 11000;
    try {
        const portfolio = new Portfolio({
            title: exchangeName,
            editable: false,
            type: exchangeName
        });
        portfolio.user = req.uid;
        return portfolio;
    } catch (error) {
        if (error.code === ENTITY_KEY_DUPLICATED) {
            console.log(error);
            throw new Error("Portfolio already exists");
        } else {
            console.log(error);
            throw new Error("Something went wrong");
        }
    }
}

async function getCoinsData(balances) {
    try {
        await getMoralisTokensData(balances);
        await getCoingeckoImages(balances);
        await getCoingeckoIds(balances);
        await getNotFoundIds(balances);
        const parsedCoins = await getCoinsPrices(balances);
        return parsedCoins;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getCoinsPrices(balances) {
    const foundCoins = Object.entries(balances)
        .map(([key, value]) => ({ symbol: key, ...value }))
        .filter((coin) => coin.image !== undefined);

    const { data: allPrices } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${foundCoins
            .map(({ idCoingecko }) => idCoingecko)
            .join(",")}&vs_currencies=usd`
    );
    const parsedCoins = foundCoins
        .map((coin) => ({
            ...coin,
            price: allPrices[coin.idCoingecko].usd,
        }))
        .filter(({ price }) => price !== undefined);
    return parsedCoins;
}

async function getNotFoundIds(balances) {
    await Promise.all(
        Object.entries(balances)
            // @ts-ignore
            .filter(([key, value]) => Boolean(value.idCoingecko) === false)
            .map(([key]) => axios.get(`https://api.coingecko.com/api/v3/search?query=${key}`))
    ).then((responses) => {
        responses
            .map((res) => res.data.coins)
            .forEach((coingeckoTokens) => {
                const parsedCoingeckoTokens = Object.fromEntries(
                    coingeckoTokens.map(({ symbol, name, id }) => [symbol, { id }])
                );
                for (const key in balances) {
                    balances[key].idCoingecko =
                        parsedCoingeckoTokens[key]?.id ?? balances[key].idCoingecko;
                }
            });
    });
}

async function getCoingeckoIds(balances) {
    const { data: allCoins } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/list?include_platform=true`
    );

    const addressList = Object.fromEntries(
        allCoins.flatMap(({ platforms, id }) =>
            Array.from(new Set(Object.values(platforms))).map((address) => [address, id])
        )
    );
    for (const key in balances) {
        balances[key].idCoingecko = addressList[balances[key].address] ?? balances[key].idCoingecko;
    }
}

async function getCoingeckoImages(balances) {
    await Promise.all(
        Object.entries(balances)
            .filter(([, value]) => Boolean(value.image) === false)
            .map(([key]) => {
                return axios.get(`https://api.coingecko.com/api/v3/search?query=${key}`);
            })
    ).then((responses) => {
        responses
            .map((res) => res.data.coins)
            .forEach((coingeckoTokens) => {
                const parsedCoingeckoTokens = Object.fromEntries(
                    coingeckoTokens.map(({ symbol, name, large, id }) => [
                        symbol,
                        { image: large, name, id },
                    ])
                );
                for (const key in balances) {
                    balances[key].image = parsedCoingeckoTokens[key]?.image ?? balances[key].image;
                    balances[key].name = parsedCoingeckoTokens[key]?.name ?? balances[key].name;
                    balances[key].idCoingecko =
                        parsedCoingeckoTokens[key]?.id ?? balances[key].idCoingecko;
                }
            });
    });
}

async function getMoralisTokensData(parsedBalances) {
    // @ts-ignore
    await Moralis.start({
        serverUrl: "https://ujwefa7ess9v.usemoralis.com:2053/server",
        appId: "ZUjmeuPwhXiuLkjkyqi0vpt2P7fwWcUZPb1RvhAD",
    });
    await Promise.all([
        // @ts-ignore
        Moralis.Plugins.oneInch.getSupportedTokens({ chain: "bsc" }),
        // @ts-ignore
        Moralis.Plugins.oneInch.getSupportedTokens({ chain: "eth" }),
        // @ts-ignore
        Moralis.Plugins.oneInch.getSupportedTokens({ chain: "polygon" }),
    ]).then((allChains) =>
        allChains.forEach(({ tokens }) => {
            const parsedTokens = Object.fromEntries(
                Object.values(tokens).map((token) => [
                    token.symbol,
                    { image: token.logoURI, name: token.name, address: token.address },
                ])
            );
            for (const key in parsedBalances) {
                parsedBalances[key].image = parsedTokens[key]?.image ?? parsedBalances[key].image;
                parsedBalances[key].name = parsedTokens[key]?.name ?? parsedBalances[key].name;
                parsedBalances[key].address =
                    parsedTokens[key]?.address ?? parsedBalances[key].address;
            }
        })
    );
}
