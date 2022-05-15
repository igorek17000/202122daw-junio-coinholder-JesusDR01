//Ruta: /api/portfolios
const { Router } = require('express');
const { getPortfolios, createPortfolio,  updatePortfolio, deletePortfolio, getCoinsFromPortfolio, getGlobalPortfolio } = require('../controllers/portfolios');
const {validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();
//Todas tienen que pasar por la validación del JWT
router.use(validateJWT);

router.get('/all', getGlobalPortfolio);

router.get('/', getPortfolios)

router.post('/',
    [
        check('title','Error. Título requerido').not().isEmpty(),
        check('type','Error. Tipo de portfolio no establecido manualmente').isEmpty(),
        check('editable','Error. Editable establecido manualmente').isEmpty(),
        validateFields
    ]
    , createPortfolio)

router.put('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);
router.get('/:id', getCoinsFromPortfolio);



module.exports = router;