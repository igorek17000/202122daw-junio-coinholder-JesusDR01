//Ruta: /api/transactions
const { Router } = require("express");
const {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} = require("../controllers/transactions");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { isPositive } = require("../helpers/isPositive");
const { getTopCoins, searchCoin, getCoinsPrices } = require("../controllers/coins");

const router = Router();
router.use(validateJWT);

router.get("/", getTransactions);

router.post(
    "/",
    [
        check("idCoin", "Error. La transacción no asociada a ninguna moneda").not().isEmpty(),
        check("investment", "El dinero invertido es obligatorio").isNumeric().custom(isPositive),
        check("entryPrice", "El precio al que estaba la moneda cuando entraste es obligatorio")
            .isNumeric()
            .custom(isPositive),
        validateFields,
    ],
    createTransaction
);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

router.get("/coins/top", getTopCoins);
router.get("/coins/search", searchCoin);
router.get("/coins/prices", getCoinsPrices);

module.exports = router;
