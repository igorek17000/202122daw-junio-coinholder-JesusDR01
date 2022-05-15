//Ruta: /api/portfolios
const { Router } = require("express");
const { createBinancePortfolio, resyncPortfolio } = require("../controllers/binance");
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
        //     check('apiKey','Binance API key required').not().isEmpty(),
        //     check('apiSecret','Binance API secret required').not().isEmpty(),
        // validateFields
    ],
    createBinancePortfolio
);

router.put(
    "/resync",
    [
        recaptcha.middleware.verify,
        recaptchaIsSuccess,
        check("id", "portfolio id required").not().isEmpty(),
        validateFields,
    ],
    resyncPortfolio
);

// router.put('/:id', updatePortfolio)
// router.delete('/:id', deletePortfolio)
// router.get('/:id', getCoinsFromPortfolio)
module.exports = router;
