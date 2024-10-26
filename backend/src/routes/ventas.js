const { Router } = require('express');
const router = Router();

//controlador 
const { getVentas, postVentas } = require('../controllers/ventas.controller')

router.route('/')
    .get(getVentas)
    .post(postVentas);

/* router.route('/:id')
    .get(getUsuariosById)
    .put(putUsuariosById);
 */

module.exports = router;