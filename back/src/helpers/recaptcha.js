const Recaptcha = require("express-recaptcha").RecaptchaV3;
const { recaptchaSite, recaptchaSecret } = require("../config/config");

const recaptcha = new Recaptcha(recaptchaSite, recaptchaSecret);
module.exports = recaptcha;
