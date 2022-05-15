//Ruta: /api/coins
const { Router } = require('express');
const { getUserCoins, createUserCoin, updateUserCoin, deleteUserCoin, getTransactionsFromCoin } = require('../controllers/coins');
const {validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { getTopCoins, searchCoin, getCoinsPrices } = require('../controllers/coins');

const router = Router();
router.use(validateJWT);

//Todas tienen que pasar por la validación del JWT
router.get('/', getUserCoins)

router.post('/',
    [
        check('idCoingecko','Error. La moneda no está asociada a la API externa').not().isEmpty(),
        check('idPortfolio','Error. La moneda no está asociada a un portfolio').not().isEmpty(),
        validateFields
    ]
    , createUserCoin)

router.put('/:id', updateUserCoin)

router.delete('/:id', deleteUserCoin)

router.get('/top', getTopCoins)
router.get('/search', searchCoin)
router.get('/prices', getCoinsPrices)
router.get('/:id', getTransactionsFromCoin)
module.exports = router;