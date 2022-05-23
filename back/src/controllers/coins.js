const { response } = require("express");
const jwt = require("jsonwebtoken");
const { ERROR_CODES } = require("../constants/error");
const axios = require("axios").default;
const Coin = require("../models/Coin");
const Portfolio = require("../models/Portfolio");
const ENTITY = ERROR_CODES.ENTITY.COIN;

const getUserCoins = async (req, res = response) => {
    const coins = await Coin.find({
        user: { _id: jwt.decode(req.header("JWT"))?.uid },
    }).populate("transactions");
    const coinsString = coins.map((coin) => coin.idApi).join(",");
    const { data: coinsPrices } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinsString}&vs_currencies=usd`
    );

    const parsedCoins = coins.map((coin) => {
        const coinPrice = coinsPrices[coin.idApi]?.usd;
        coin._doc.price = coinPrice;
        return coin;
    });

    return res.json({ ok: true, coins: parsedCoins });
};

const createUserCoin = async (req, res = response) => {
    const coin = new Coin(req.body);
    const portfolio = await Portfolio.findById(req.body.idPortfolio);
    if (!portfolio) {
        return res
            .status(400)
            .json({ ok: false, error: `${ERROR_CODES.ENTITY.PORTFOLIO}.${type}` });
    }
    console.log(portfolio);
    try {
        coin.user = req.uid;
        const { data } = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coin.idCoingecko}&vs_currencies=usd`
        );
        const savedCoin = await coin.save();
        portfolio.coins.push(savedCoin._id);
        await Portfolio.findByIdAndUpdate(portfolio.id, portfolio, { new: true });
        return res.json({
            ok: true,
            savedCoin: { ...savedCoin._doc, price: data[coin.idCoingecko].usd },
        });
    } catch (error) {
        let type = "creating";
        if (error.code === 11000) {
            type = "exists";
        }
        // console.log(error.code)
        return res.status(500).json({
            ok: false,
            error: `${ENTITY}.${type}`,
        });
    }
};

const updateUserCoin = async (req, res = response) => {
    const coinId = req.params.id;
    const uid = req.uid;
    let type = "updating"
    try {
        const coin = await Coin.findById(coinId);
        if (!coin) {
            type = "exists"
            return res.status(404).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }

        if (coin.user.toString() !== uid) {
            type = "privilege"
            return res.status(401).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }
        const newCoin = {
            ...req.body,
            user: uid,
        };
        const UpdatedCoin = await Coin.findByIdAndUpdate(coinId, newCoin);

        return res.json({
            ok: true,
            UpdatedCoin,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: `${ENTITY}.${type}` });
    }
};

const deleteUserCoin = async (req, res = response) => {
    const coinId = req.params.id;
    const uid = req.uid;
    let type = "deleting"
    try {
        const coin = await Coin.findById(coinId);
        if (!coin) {
            type = "exists"
            return res.status(404).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }

        if (coin.user.toString() !== uid) {
            type = "privilege"
            return res.status(401).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }

        await Coin.findByIdAndDelete(coinId);

        return res.json({
            ok: true,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ ok: false, error: `${ENTITY}.${type}` });
    }
};

const getTransactionsFromCoin = async (req, res = response) => {
    const coinId = req.params.id;
    
    try {
        const coin = await Coin.findById(coinId).populate("transactions");
        console.log(coin);
        if (!coin) {
            const type = "exists"
            return res.status(404).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        } else {
            return res.json({
                ok: true,
                transactions: coin,
            });
        }
    } catch (error) {
        const type = "unknown"
        console.log(error);
        return res.status(500).json({ ok: false, error: `${ENTITY}.${type}`, });
    }
};

const getTopCoins = async (req, res = response) => {
    try {
        const { data: topCoins } = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
        );
        const filteredData = topCoins.map(({ id, image }) => ({ id, image }));
        return res.json({ ok: true, topCoins: filteredData });
    } catch (err) {
        return res.status(400).json({ ok: false });
    }
};

const searchCoin = async (req, res = response) => {
    try {
        const searchResponse = await axios.get(
            `https://api.coingecko.com/api/v3/search?query=${req.query.coin}`
        );
        const foundCoins = searchResponse?.data?.coins;
        const filteredData = foundCoins.map(({ id, thumb }) => ({ id, image: thumb }));
        return res.json({ ok: true, coins: filteredData });
    } catch (err) {
        return res.status(400).json({ ok: false });
    }
};

const getCoinsPrices = async (req, res = response) => {
    try {
        const transactions = await Coin.find({
            user: { _id: jwt.decode(req.header("JWT"))?.uid },
        });
        const coins = transactions.map((transaction) => transaction.idCoin).join(",");
        const { data: coinsPrices } = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd`
        );
        const parsedTransactions = transactions.map((transaction, i) => {
            const coinPrice = coinsPrices[transaction.idCoin]?.usd;
            const parsedTransaction = JSON.parse(JSON.stringify(transaction));
            parsedTransaction.coinPrice = coinPrice;
            return parsedTransaction;
        });
        return res.json({ ok: true, transactions: parsedTransactions });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ ok: false });
    }
};
module.exports = {
    getTopCoins,
    searchCoin,
    getCoinsPrices,

    getTransactionsFromCoin,
    getUserCoins,
    createUserCoin,
    updateUserCoin,
    deleteUserCoin,
};
