const { default: axios } = require("axios");

module.exports.fillCoinsPrices = async function fillCoinsPrices(portfolio) {
    try {
        const coinsString = portfolio._doc.coins.map((coin) => coin.idCoingecko).join(",");
        const { data: coinsPrices } = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coinsString}&vs_currencies=usd`
        );

        const parsedCoins = portfolio._doc.coins.map((coin) => {
            const coinPrice = coinsPrices[coin.idCoingecko]?.usd;
            coin._doc.price = coinPrice;
            return coin;
        });
        portfolio._doc.coins = parsedCoins;
    } catch (err) {
        throw err;
    }
};

module.exports.fillCoinsPricesFromCoins = async function fillCoinsPrices(coins) {
    try {
        const coinsString = coins.map((coin) => coin.idCoingecko).join(",");
        const { data: coinsPrices } = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coinsString}&vs_currencies=usd`
        );

        const parsedCoins = coins.map((coin) => {
            const coinPrice = coinsPrices[coin.idCoingecko]?.usd;
            coin._doc.price = coinPrice;
            // console.log(coin, "coin");
            return coin;
        });
        return parsedCoins
    } catch (err) {
        throw err;
    }
};
