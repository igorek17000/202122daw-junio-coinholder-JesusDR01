//@ts-check
const { fillCoinsPricesFromCoins } = require("../helpers/fillCoinsPrices");
const { createCoins } = require("../helpers/genericCreateSpecialPortfolio");
const Coin = require("../models/Coin");
const Transaction = require("../models/Transaction");
const { getCoinsData } = require("./getCoinsData");
/**
 * @param {{ _doc: { coins: any[]; }; updateOne: (arg0: any) => any; }} portfolioFound
 * @param {any} portfolioFoundCoins
 * @param {{[key:String]:{amount: Number, address:String}}} balances
 * @param {String} userId
 */
async function getGenericUpdatedSpecialPortfolio(
    portfolioFound,
    portfolioFoundCoins,
    balances,
    userId,
    EXCHANGE_NAME
) {
    // console.log(balances, "balances");
    //1. match balances address with portfolioFoundCoins
    const balancesAddresses = Object.values(balances).map((coin) => coin.address);
    // console.log(balancesAddresses, "balancesAddresses");
    const existingCoins = getExistingCoins(balances, portfolioFoundCoins);
    console.log(existingCoins, "existingCoins");
    //2. Get existing coins prices
    const existingCoinsWithPrices = await fillCoinsPricesFromCoins(existingCoins);
    //3. Update existing coins transactions with prices and balances
    await updateTransactionsFromExistingCoins(existingCoinsWithPrices, balances);
    //4. Delete coins that are not in balances
    await Promise.all(
        portfolioFoundCoins.map(async (coin) => {
            if (!balancesAddresses.includes(coin.address)) {
                await Transaction.deleteMany({ idCoin: coin.id });
                await Coin.deleteOne({ _id: coin.id });
            }
        })
    );
    const savedCoins = await createNewCoinsFromBalances(
        existingCoins,
        balances,
        userId,
        portfolioFound,
        EXCHANGE_NAME
    );
    const newCoinsWithPrices = await fillCoinsPricesFromCoins(savedCoins);
    portfolioFound._doc.coins.push(...savedCoins);

    await portfolioFound.updateOne(portfolioFound._doc);
    const populated = await getPopulatedPortfolio(
        portfolioFound,
        existingCoinsWithPrices,
        newCoinsWithPrices
    );
    return populated;
}

function getExistingCoins(balances, portfolioFoundCoins) {
    const balancesAddresses = Object.values(balances).map((coin) => coin.address);
    const existingCoins = portfolioFoundCoins.filter((foundCoin) =>
        balancesAddresses.includes(foundCoin.address)
    );
    const existingCoinsWithoutAddress = portfolioFoundCoins.filter(
        (foundCoin) => !foundCoin.address && foundCoin.idCoingecko
    );
    existingCoins.push(...existingCoinsWithoutAddress);
    return existingCoins;
}

async function createNewCoinsFromBalances(
    existingCoins,
    balances,
    userId,
    portfolioFound,
    EXCHANGE_NAME
) {
    // console.log(existingCoins, "existingCoins");
    const existingAddresses = existingCoins.map((coin) => coin.address);
    // console.log("existingAddresses = ", existingAddresses);
    // console.log("balances = ", balances);
    const balancesWithoutExistingCoins = Object.fromEntries(
        Object.entries(balances).filter(
            ([symbol, { amount, address }]) => !existingAddresses.includes(address)
        )
    );
    // console.log(balancesWithoutExistingCoins, "balancesWithoutExistingCoins");
    const coinsData = await getCoinsData(balancesWithoutExistingCoins, EXCHANGE_NAME);
    const savedCoins = await createCoins(coinsData, portfolioFound, userId);
    return savedCoins;
}

async function getPopulatedPortfolio(portfolioFound, existingCoinsWithPrices, newCoinsWithPrices) {
    const populated = await portfolioFound.populate([
        {
            path: "coins",
            model: "Coin",
        },
        {
            path: "coins",
            populate: {
                path: "transactions",
                model: "Transaction",
            },
        },
    ]);
    populateWithPrices(populated, existingCoinsWithPrices, newCoinsWithPrices);
    return populated;
}

function populateWithPrices(populated, existingCoinsWithPrices, newCoinsWithPrices) {
    populated._doc.coins.forEach((coin) => {
        const coinWithPrice = existingCoinsWithPrices.find(
            (coinWithPrice) => coinWithPrice.idCoingecko === coin.idCoingecko
        );
        if (coinWithPrice) {
            coin._doc.price = coinWithPrice._doc.price;
        } else {
            const newCoinWithPrice = newCoinsWithPrices.find(
                (coinWithPrice) => coinWithPrice.address === coin.address
            );
            coin._doc.price = newCoinWithPrice?._doc?.price;
        }
    });
}

async function updateTransactionsFromExistingCoins(existingCoinsWithPrices, balances) {
    const parsedBalances = Object.fromEntries(
        Object.entries(balances).map(([symbol, { amount, address }]) => [
            address,
            { symbol, amount },
        ])
    );
    console.log(balances, "existingCoinBalances");
    await Promise.all(
        existingCoinsWithPrices.map(async (coin) => {
            // console.log(coin._doc.price, "price");
            const { amount: amountFromAdress } = parsedBalances[coin.address];
            const { amount: amountFromSymbol } = !coin.address && balances[coin.symbol];
            // console.log(amountFromSymbol, "amountFromSymbol");
            // console.log(amountFromAdress || amountFromSymbol, "amount", coin.symbol)
            // console.log(coin._doc.price, "price", coin.symbol);
            await Transaction.findByIdAndUpdate(coin.transactions[0], {
                investment:  amountFromSymbol || amountFromAdress ,
                entryPrice: coin._doc.price,
            });
        })
    );
}

module.exports = {
    getGenericUpdatedSpecialPortfolio,
};
