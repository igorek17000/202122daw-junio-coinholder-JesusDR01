//@ts-check
const { Spot } = require("@binance/connector");
const { ERROR_CODES } = require("../constants/error");
const { genericExchangePortfolio } = require("../helpers/genericExchangePortfolio");
const { getSyncedPortfolio } = require("../helpers/resyncPortfolio");
const Portfolio = require("../models/Portfolio");
const User = require("../models/User");
const ENTITY = ERROR_CODES.EXTRAS.BINANCE;

const createBinancePortfolio = async (req, res) => {
    const user = await User.findById(req.uid);
    let type = "creating";
    if (user.binanceApiKey || user.binanceApiSecret) {
        type = "exists";
        return res.status(400).json({
            ok: false,
            error: `${ERROR_CODES.ENTITY.PORTFOLIO}.${type}`,
        });
    }
    const apiKey = req?.body?.apiKey;
    const apiSecret = req?.body?.apiSecret;

    user.binanceApiKey = apiKey;
    user.binanceApiSecret = apiSecret;

    if (!apiKey || !apiSecret) {
        type = "noCredentials";
        return res.status(400).json({
            ok: false,
            error: `${ENTITY}.${type}`,
        });
    }

    try {
        const balances = await getBalances(apiKey, apiSecret);
        const EXCHANGE_NAME = "binance";
        const portfolio = await genericExchangePortfolio(balances, EXCHANGE_NAME, req, res);
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
            console.log(err);
            type = "saving";
            return res.status(500).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }
    } catch (err) {
        console.log(err);
        type = "badCredentials";
        return res.status(500).json({
            ok: false,
            error: `${ENTITY}.${type}`,
        });
    }
};

const resyncPortfolio = async (req, res) => {
    //We won't check if the portfolio is from binance or Kucoin, although some programmer could transform a normal portfolio into a binance/kucoin one. We don't care.

    let type = "resyncing";
    try {
        const updatedPortfolioId = req.body.id;
        const portfolioFound = await Portfolio.findById(updatedPortfolioId);
        console.log(portfolioFound);
        const user = await User.findById(req.uid);

        if (!user.binanceApiKey || !user.binanceApiSecret) {
            type = "badCredentials";
            return res.status(400).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }
        const apiKey = user.binanceApiKey;
        const apiSecret = user.binanceApiSecret;

        try {
            const EXCHANGE_NAME = "binance";
            const balances = await getBalances(apiKey, apiSecret);

            const syncedPortfolio = await getSyncedPortfolio(
                balances,
                EXCHANGE_NAME,
                portfolioFound,
                req,
                res
            );
            return res.json({
                ok: true,
                portfolio: syncedPortfolio,
            });
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }
    } catch (err) {
        console.log(err);
        type = "nonExist"
        return res.status(500).json({
            ok: false,
            error: `${ERROR_CODES.ENTITY.PORTFOLIO}.${type}`,
        });
    }
};

module.exports = {
    createBinancePortfolio,
    resyncPortfolio,
};

const getBalances = async (apiKey, apiSecret) => {
    try {
        const client = new Spot(apiKey, apiSecret);
        const parsedBalances = Object.fromEntries(
            // @ts-ignore
            (await client.coinInfo()).data
                .map((coin) => {
                    const amount = Number(coin.free) + Number(coin.locked) + Number(coin.freeze);
                    if (amount > 0)
                        return {
                            symbol: coin.coin,
                            name: coin.name,
                            amount,
                        };
                })
                .filter(Boolean)
                .map((coin) => [coin.symbol, { name: coin.name, amount: coin.amount }])
        );
        return parsedBalances;
    } catch (error) {
        throw error;
    }
};
