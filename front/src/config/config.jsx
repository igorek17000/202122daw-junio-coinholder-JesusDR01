export const cfg = {
  env: process.env.NODE_ENV || 'development',
  apiUrl: process.env.REACT_APP_API_URL || 'https://www.coinholder.tech/',
  coingeckoAPI: process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3/',
  captcha:{
    site: process.env.RECAPTCHA_SITE_KEY || '6LdwS-EfAAAAADO2PW7BONXKd9x_c0LbQ-fOmytG'
  },
  defaultDevValues:{
    login:{
      email: process.env.REACT_APP_LOGIN_EMAIL || '',
      password: process.env.REACT_APP_LOGIN_PASSWORD || '',
    },
    forgot:{
      forgotMail: process.env.REACT_APP_FORGOT_MAIL || ''
    },
    credentials:{
      binanceKey: process.env.REACT_APP_BINANCE_KEY || '',
      binanceSecret: process.env.REACT_APP_BINANCE_SECRET || '',
      kucoinKey: process.env.REACT_APP_KUCOIN_KEY || '',
      kucoinSecret: process.env.REACT_APP_KUCOIN_SECRET || '',
      kucoinPassphrase: process.env.REACT_APP_KUCOIN_PASSPHRASE || '',
    },
    register:{
      name: process.env.REACT_APP_REGISTER_NAME || '',
      email: process.env.REACT_APP_REGISTER_EMAIL || '',
      password: process.env.REACT_APP_REGISTER_PASSWORD || '',
      passwordConfirm: process.env.REACT_APP_REGISTER_PASSWORD || '',
    },
    transaction:{
      investment: process.env.REACT_APP_TRANSACTION_INVESTMENT || '',
      entryPrice: process.env.REACT_APP_TRANSACTION_ENTRY_PRICE || '',
    }
  }
};