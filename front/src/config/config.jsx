export const cfg = {
  env: process.env.NODE_ENV || 'development',
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/',
  coingeckoAPI: process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3/',
  captcha:{
    site: process.env.RECAPTCHA_SITE_KEY || '6LdwS-EfAAAAADO2PW7BONXKd9x_c0LbQ-fOmytG'
  }
};