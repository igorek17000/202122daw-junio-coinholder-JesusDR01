const { response } = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios").default;
const Portfolio = require("../models/Portfolio");
const { groupBy } = require("lodash");
const { ERROR_CODES } = require("../constants/error");
const { fillCoinsPrices } = require("../helpers/fillCoinsPrices");
const { PORTFOLIO_TYPES } = require("../constants/portfolio");

const ENTITY = ERROR_CODES.ENTITY.PORTFOLIO;
const getPortfolios = async (req, res = response) => {
    const portfolios = await Portfolio.find({
        user: { _id: jwt.decode(req.header("JWT"))?.uid },
    });
    const titles = portfolios.map(({ title, id, type }) => ({ title, id, type }));
    return res.json({ ok: true, portfolios: titles });
};

const createPortfolio = async (req, res = response) => {
    const portfolio = new Portfolio(req.body);
    try {
        portfolio.user = req.uid;
        const savedPortfolio = await portfolio.save();
        return res.json({
            ok: true,
            savedPortfolio: savedPortfolio,
        });
    } catch (error) {
        let type = "creating";
        if (error.code === 11000) {
            type = "exists";
        }
        return res.status(500).json({
            ok: false,
            error: `${ENTITY}.${type}`,
        });
    }
};
const updatePortfolio = async (req, res = response) => {
    const portfolioId = req.params.id;
    const uid = req.uid;
    try {
        const portfolio = await Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({
                ok: false,
                msg: "El portfolio no existe por ese id",
            });
        }

        if (portfolio.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio de editar este portfolio",
            });
        }
        const newPortfolio = {
            ...req.body,
            user: uid,
        };
        const UpdatedPortfolio = await Portfolio.findByIdAndUpdate(portfolioId, newPortfolio, {
            new: true,
        });

        return res.json({
            ok: true,
            UpdatedPortfolio,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: "Hable con el admin" });
    }
};

const deletePortfolio = async (req, res = response) => {
    const portfolioId = req.params.id;
    const uid = req.uid;
    let type = "deleting";
    try {
        const portfolio = await Portfolio.findById(portfolioId);
        if (!portfolio) {
            type = "notExists";
            return res.status(404).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }

        if (portfolio.user.toString() !== uid) {
            type = "privilege";
            return res.status(401).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }

        if (portfolio.editable === false && portfolio.type !== PORTFOLIO_TYPES.WALLET) {
            type = "thirdParty";
            return res.status(401).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }

        await Portfolio.findByIdAndDelete(portfolioId);

        return res.json({
            ok: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: `${ENTITY}.${type}` });
    }
};

const getCoinsFromPortfolio = async (req, res = response) => {
    const portfolioId = req.params.id;
    let type = "unknown";
    try {
        const portfolio = await Portfolio.findById(portfolioId).populate([
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

        // console.log(portfolio);
        if (!portfolio) {
            return res.status(404).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        } else {
            await fillCoinsPrices(portfolio);

            return res.json({
                ok: true,
                portfolio,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: `${ENTITY}.${type}` });
    }
};

const getGlobalPortfolio = async (req, res = response) => {
    const portfolios = await Portfolio.find({
        user: { _id: jwt.decode(req.header("JWT"))?.uid },
    }).populate([
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
    const groupedCoins = groupBy(
        portfolios.flatMap((portfolio) => portfolio.coins.filter((coin) => !coin._doc.invisible ).map(coin => coin._doc)),
        "idCoingecko"
    );

    const coinsString = Object.keys(groupedCoins).join(",");
    const { data: coinsPrices } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinsString}&vs_currencies=usd`
    );

    for (key in groupedCoins) {
        groupedCoins[key].price = coinsPrices[key].usd;
    }

    const parsedCoins = Object.entries(groupedCoins)
        .map(([key, value]) => value)
        .map((coinPack) => ({
            ...coinPack[0],
            transactions: coinPack
                .flatMap((coin) => coin.transactions)
                .map((transaction) => transaction._doc),
            price: coinPack.price,
        }));
    return res.json({
        ok: true,
        portfolio: {
            coins: parsedCoins,
            editable: false,
            title: PORTFOLIO_TYPES.GLOBAL,
            type: PORTFOLIO_TYPES.GLOBAL,
        },
    });
};

module.exports = {
    getPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getCoinsFromPortfolio,
    getGlobalPortfolio,
};
