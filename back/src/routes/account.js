/*
    Rutas de la cuenta /account
    host + api/account
*/
const {modifyBinanceApi, modifyKucoinApi, existingPortfolios, profile} = require("../controllers/user");
const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require("express-validator");
const router = Router();
router.use(validateJWT);

router.put(
    "/modifyBinanceApi",
    [
        //Middlewares
        check("apiKey", "Api key es obligatoria"),
        check("apiSecret", "Api secret obligatoria"),
        validateFields,
    ],
    modifyBinanceApi
);

router.put(
    "/modifyKucoinApi",
    [
        //Middlewares
        check("apiKey", "Api key es obligatoria"),
        check("apiSecret", "Api secret obligatoria"),
        check("passphrase", "contraseña obligatoria"),
        validateFields,
    ],
    modifyKucoinApi
);

router.get("/existingPortfolios", existingPortfolios);

router.get("/", profile);

module.exports = router;