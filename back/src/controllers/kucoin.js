//@ts-check
const API = require("kucoin-node-sdk");
const { ERROR_CODES } = require("../constants/error");
const { PORTFOLIO_TYPES } = require("../constants/portfolio");
const {  genericCreateSpecialPortfolio } = require("../helpers/genericCreateSpecialPortfolio");
const { getGenericUpdatedSpecialPortfolio } = require("../helpers/genericUpdateSpecialPortfolio");
const { getCoinsData, getMoralisTokensData } = require("../helpers/getCoinsData");
const Coin = require("../models/Coin");
const Portfolio = require("../models/Portfolio");
const User = require("../models/User");

const ENTITY = ERROR_CODES.EXTRAS.KUCOIN;

const createKucoinPortfolio = async (req, res) => {
    let type = "creating";
    try {
        const user = await User.findById(req.uid);
        if (user.kucoinPassphrase || user.kucoinApiKey || user.kucoinApiSecret) {
            type = "exists";
            return res.status(400).json({
                ok: false,
                error: `${ERROR_CODES.ENTITY.PORTFOLIO}.${type}`,
            });
        }
        const apiKey = req?.body?.apiKey;
        const apiSecret = req?.body?.apiSecret; 
        const passphrase = req?.body?.passphrase;

        if (!apiKey || !apiSecret || !passphrase) {
            type = "noCredentials";
            return res.status(400).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }

        user.kucoinPassphrase = passphrase;
        user.kucoinApiKey = apiKey;
        user.kucoinApiSecret = apiSecret;

        try {
            const balances = await getBalances(apiKey, apiSecret, passphrase);
            const EXCHANGE_NAME = PORTFOLIO_TYPES.KUCOIN;
            const coinsData = await getCoinsData(balances);
            const portfolio = await genericCreateSpecialPortfolio(EXCHANGE_NAME, coinsData, req, res);
            try {
                await portfolio.save({
                    new: true,
                });
                await user.save();
                return res.json({
                    ok: true,
                    portfolio,
                });
            } catch (err) {
                type = "saving"
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    error: `${ENTITY}.${type}`,
                });
            }
        } catch (err) {
            type = "badCredentials";
            console.log(err);
            return res.status(500).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }
    } catch (err) {
        type = "unknown"
        console.log(err);
        return res.status(500).json({
            ok: false,
            error: `${ENTITY}.${type}`,
        });
    }
};

const resyncPortfolio = async (req, res) => {
    let type = "resyncing";
    try {
        
        const updatedPortfolioId = req.body.id;
        const portfolioFound = await Portfolio.findById(updatedPortfolioId);
        const portfolioFoundCoins = await Coin.find({
            idPortfolio: updatedPortfolioId,
        });
        const userId = req.uid;

        
        // console.log(portfolioFound);
        const user = await User.findById(req.uid);

        if (!user.kucoinPassphrase || !user.kucoinApiKey || !user.kucoinApiSecret) {
            type = "noCredentials";
            return res.status(400).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }

        if (portfolioFound.type !== PORTFOLIO_TYPES.KUCOIN) {
            return res.status(400).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }

        const apiKey = user.kucoinApiKey;
        const apiSecret = user.kucoinApiSecret;
        const passphrase = user.kucoinPassphrase;

        try {
            const EXCHANGE_NAME = PORTFOLIO_TYPES.KUCOIN;
            // const balances = await getBalances(apiKey, apiSecret, passphrase);
            const balances = await getBalances(apiKey, apiSecret, passphrase);
            console.log(balances, "balancesWAddresses");
            const populated = await getGenericUpdatedSpecialPortfolio(
                portfolioFound,
                portfolioFoundCoins,
                balances,
                userId,
                EXCHANGE_NAME
            );

            return res.json({
                ok: true,
                portfolio: populated,
            });
        } catch (err) {
            type = "badCredentials";
            console.log(err);
            return res.status(500).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }
    } catch (err) {
        type = "unknown"
        console.log(err);
        return res.status(500).json({
            ok: false,
            error: `${ENTITY}.${type}`
        });
    }
};

module.exports = {
    createKucoinPortfolio,
    resyncPortfolio,
};

const getBalances = async (apiKey, apiSecret, passphrase) => {
    console.log(apiKey, apiSecret, passphrase);
    try {
        API.init({
            baseUrl: "https://api.kucoin.com",
            apiAuth: {
                key: apiKey,
                secret: apiSecret,
                passphrase,
            },
            authVersion: 2,
        });

        const { data: balances } = await API.rest.User.Account.getAccountsList();

        const parsedBalances = Object.fromEntries(
            balances
                .filter(({ balance }) => Number(balance) > 0)
                .map(({ currency, balance }) => [currency, { amount: Number(balance) }])
        );
        await getMoralisTokensData(parsedBalances);
        return parsedBalances;
    } catch (error) {
        throw error;
    }
};
