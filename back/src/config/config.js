const { resolve } = require("path");
// eslint-disable-next-line no-unused-vars
require("dotenv").config({ path: resolve(__dirname, "../../.env") });

module.exports = {
    baseUrl: process.env.BASE_URL,
    mongoDbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.SECRET_JWT_SEED,
    siteContact: process.env.SITE_CONTACT,
    clientUrl: process.env.CLIENT_URL,
    moralisServerUrl: process.env.MORALIS_SERVER_URL,
    moralisClientId: process.env.MORALIS_CLIENT_ID,
    
    recaptchaSite: process.env.RECAPTCHA_SITE_KEY,
    recaptchaSecret: process.env.RECAPTCHA_SECRET_KEY,
    mailgunUser: process.env.MAILGUN_USER,
    mailgunPassowrd: process.env.MAILGUN_PASSWORD,
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    facebookId: process.env.FACEBOOK_ID,
    facebookSecret: process.env.FACEBOOK_SECRET,
    githubId: process.env.GITHUB_ID,
    githubSecret: process.env.GITHUB_SECRET,
    twitterKey: process.env.TWITTER_KEY,
    twitterSecret: process.env.TWITTER_SECRET,
    googleId: process.env.GOOGLE_ID,
    googleSecret: process.env.GOOGLE_SECRET,
    port: process.env.PORT || 8080,
    sendGridKey: process.env.SENDGRID_API_KEY,
    sessionKey: process.env.SESSION_SECRET
};
