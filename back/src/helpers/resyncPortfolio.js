const { fillCoinsPrices } = require("./fillCoinsPrices");
const { genericCreateSpecialPortfolio } = require("./genericCreateSpecialPortfolio");
const { getCoinsData } = require("./getCoinsData");

module.exports.getSyncedPortfolio = async (balances, exchangeName, req, res) => {
    const coinsData = await getCoinsData(balances, exchangeName);
    const newPortfolio = await genericCreateSpecialPortfolio(exchangeName, coinsData, req, res);

    const populated = await newPortfolio.populate([
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
    try {
        await fillCoinsPrices(populated);
    } catch (err) {
        throw err;
    }
    // console.log(id);
    return populated;
};
