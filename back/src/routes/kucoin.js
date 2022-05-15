//Ruta: /api/portfolios
const { Router } = require("express");
const { createKucoinPortfolio, resyncPortfolio } = require("../controllers/kucoin");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { recaptchaIsSuccess } = require("../middlewares/recaptcha");
const recaptcha = require("../helpers/recaptcha");
const router = Router();
//Todas tienen que pasar por la validación del JWT
router.use(validateJWT);

router.post(
    "/",
    [
        check("apiKey", "Kucoin API key required").not().isEmpty(),
        check("apiSecret", "Kucopin API secret required").not().isEmpty(),
        check("passphrase", "passphrase required").not().isEmpty(),
        validateFields,
    ],
    createKucoinPortfolio
);

router.put(
    "/resync",
    recaptcha.middleware.verify,
    recaptchaIsSuccess,
    [check("id", "portfolio id required").not().isEmpty(), validateFields],
    resyncPortfolio
);

module.exports = router;
