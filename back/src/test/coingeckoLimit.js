const axios = require('axios');

(async() =>{
    const res = await Promise.all(Array.from({length: 20}, (k,v) => axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin')))
    console.log(res.map(({data}) => data))

})();