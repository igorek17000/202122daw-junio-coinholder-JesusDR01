//@ts-check
const { default: axios } = require("axios");
const Moralis = require("moralis/node");
const config = require("../config/config");
const { PORTFOLIO_TYPES } = require("../constants/portfolio");

async function getCoinsData(balances, EXCHANGE_NAME) {
    // console.log(balances);
    try {
        //Get coins addresses from Moralis based on symbol
        // console.log(balances, "balances1");
        if (EXCHANGE_NAME !== PORTFOLIO_TYPES.WALLET) await getMoralisTokensData(balances);
        // console.log(balances, "balances2");
        //Get coingecko id's using coins addresses
        await getCoingeckoIds(balances);
        //Get coingecko id's using /search?query={symbol} (A lot of requests)
        if (EXCHANGE_NAME !== PORTFOLIO_TYPES.WALLET) await getNotFoundIds(balances);
        // console.log(balances, "balances3");
        //Get coingecko data using coingeckoId (img, name...)
        const parsedCoins = await getCoingeckoData(balances, EXCHANGE_NAME);
        return parsedCoins;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getMoralisTokensData(balances) {
    // @ts-ignore
    await Moralis.start({
        serverUrl: config.moralisServerUrl,
        appId: config.moralisClientId,
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
            for (const key in balances) {
                balances[key].image = parsedTokens[key]?.image ?? balances[key].image;
                balances[key].name = parsedTokens[key]?.name ?? balances[key].name;
                balances[key].address = parsedTokens[key]?.address ?? balances[key].address;
            }
        })
    );
}

const getCoingeckoIds = async function getCoingeckoIds(balances) {
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
};

const getNotFoundIds = async function getNotFoundIds(balances) {
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
};

async function getCoingeckoData(balances, EXCHANGE_NAME) {
    try {
        const {
            data: { coins },
        } = await axios.get("https://api.coingecko.com/api/v3/search");

        for (const balance in balances) {
            const coinData = coins.find(({ id }) => balances[balance].idCoingecko === id);
            if (coinData) {
                const { id: idCoingecko, large: image, symbol, name } = coinData;
                Object.assign(balances[balance], { idCoingecko, image, symbol, name });
            }
        }
        const parsedCoins = Object.entries(balances)
            .map(([key, value]) => ({ symbol: key, ...value }))
            .filter((coin) => coin.image !== undefined);

        return parsedCoins;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getCoinsData,
    getMoralisTokensData
};
