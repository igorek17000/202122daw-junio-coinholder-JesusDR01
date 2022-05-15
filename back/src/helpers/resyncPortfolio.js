const { genericExchangePortfolio } = require("./genericExchangePortfolio");

module.exports.getSyncedPortfolio = async (balances, exchangeName, portfolioFound, req, res) => {
    const newPortfolio = await genericExchangePortfolio(balances, exchangeName, req, res);
    delete newPortfolio._doc._id;
    await portfolioFound.updateOne(newPortfolio);
    // const populated = await newPortfolio.populate([
    //     {
    //         path: "coins",
    //         model: "Coin",
    //     },
    //     {
    //         path: "coins",
    //         populate: {
    //             path: "transactions",
    //             model: "Transaction",
    //         },
    //     },
    // ]);
    return newPortfolio;
};
