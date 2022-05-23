//@ts-check
const Moralis = require("moralis/node");
const config = require("../config/config");
const { ERROR_CODES } = require("../constants/error");
const { PORTFOLIO_TYPES } = require("../constants/portfolio");
const { genericCreateSpecialPortfolio } = require("../helpers/genericCreateSpecialPortfolio");
const { getGenericUpdatedSpecialPortfolio } = require("../helpers/genericUpdateSpecialPortfolio");
const { getCoinsData } = require("../helpers/getCoinsData");
const Coin = require("../models/Coin");
const Portfolio = require("../models/Portfolio");
const User = require("../models/User");
const ENTITY = ERROR_CODES.EXTRAS.ADDRESS;

(async () =>
    await Moralis.start({
        serverUrl: config.moralisServerUrl,
        appId: config.moralisClientId,
    }))();

const createWalletPortfolio = async (req, res) => {
    let type = "creating";
    try {
        const user = await User.findById(req.uid);
        const address = req.body.address;
        const parsedBalances = await getBalances(address);

        const EXCHANGE_NAME = PORTFOLIO_TYPES.WALLET;
        const coinsData = await getCoinsData(parsedBalances, EXCHANGE_NAME);
        const portfolio = await genericCreateSpecialPortfolio(EXCHANGE_NAME, coinsData, req, res);
        portfolio._doc.title = `${PORTFOLIO_TYPES.WALLET} ${req.body.title || ""}`;
        portfolio._doc.address = req.body.address;
        try {
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
                    error: `${ERROR_CODES.ENTITY.PORTFOLIO}.${type}`,
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
    } catch (err) {
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
        try {
            const userId = req.uid;
            const balances = await getBalances(portfolioFound.address);
            const EXCHANGE_NAME = PORTFOLIO_TYPES.WALLET;
            const populated = await getGenericUpdatedSpecialPortfolio(
                portfolioFound,
                portfolioFoundCoins,
                balances,
                userId,
                EXCHANGE_NAME
            );

            if (portfolioFound.type !== PORTFOLIO_TYPES.WALLET) {
                return res.status(400).json({
                    ok: false,
                    error: `${ENTITY}.${type}`,
                });
            }
            try {
                return res.json({
                    ok: true,
                    portfolio: populated,
                });
            } catch (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    error: `${ENTITY}.${type}`,
                });
            }
        } catch (err) {
            type = "unknown";
            console.log(err);
            return res.status(500).json({
                ok: false,
                error: `${ENTITY}.${type}`,
            });
        }
    } catch (err) {
        console.log(err);
        type = "nonExist";
        return res.status(500).json({
            ok: false,
            error: `${ERROR_CODES.ENTITY.PORTFOLIO}.${type}`,
        });
    }
};

module.exports = {
    createWalletPortfolio,
    resyncPortfolio,
};

async function getBalances(address) {
    const balances = (
        await Promise.all(
            ["bsc", "eth", "polygon"].map((chain) =>
                Moralis.Web3API.account.getTokenBalances({
                    address,
                    chain,
                })
            )
        )
    ).flat();

    const nativeBalances = (
        await Promise.all(
            ["bsc", "polygon", "eth"].map((chain) =>
                Moralis.Web3API.account.getNativeBalance({
                    address,
                    chain,
                })
            )
        )
    ).flat();
    balances.push(
        ...[
            { idCoingecko: "binancecoin", name: "BNB", symbol: "BNB", token_address: "BNB" },
            {
                idCoingecko: "matic-network",
                name: "Polygon",
                symbol: "MATIC",
                token_address: "0x0000000000000000000000000000000000001010",
            },
        ].map((coin, i) => ({
            token_address: coin.token_address,
            idCoingecko: coin.idCoingecko,
            name: coin.name,
            symbol: coin.symbol,
            logo: null,
            thumbnail: null,
            decimals: 18,
            balance: nativeBalances[i].balance,
        }))
    );
    const [, , ethBalance] = nativeBalances;
        console.log(balances,"balances");
        console.log(nativeBalances, "nativeBalances");
    const weth = balances.find(
        ({ token_address }) => token_address === "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
    );
    if (weth){
        weth.balance = Number(weth.balance) + Number(ethBalance.balance) + "";
    }
    const parsedBalances = Object.fromEntries(
        balances
            .filter(({ balance }) => Number(balance) > 0)
            .map(({ symbol, balance, token_address, decimals }) => [
                symbol,
                {
                    amount: parseFloat(Moralis?.Units?.FromWei(balance, decimals)),
                    address: token_address,
                },
            ])
    );
    // console.log(parsedBalances, "parsedBalances");
    return parsedBalances;
}
