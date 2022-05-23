//@ts-check

const Portfolio = require("../models/Portfolio");
const Coin = require("../models/Coin");
const Transaction = require("../models/Transaction");

const genericCreateSpecialPortfolio = async (exchangeName, coinsData, req, res) => {
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
};

async function fillPortfolio(savedPortfolio, savedCoins) {
    savedPortfolio.coins.push(...savedCoins.map(({ id }) => id));
    const finalPortfolio = savedPortfolio;
    return finalPortfolio;
}

async function createCoins(coinsData, savedPortfolio, userId) {
    // console.log(coinsData,"coinsData");
    const newCoins = coinsData.map((coin) => {
        const newCoin = new Coin({
            idCoingecko: coin.idCoingecko,
            idPortfolio: savedPortfolio._id,
            image: coin.image,
            name: coin.name,
            symbol: coin.symbol,
            address: coin.address,
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
            type: exchangeName,
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

module.exports = {
    genericCreateSpecialPortfolio,
    createCoins,
    fillPortfolio
};
