const { Router } = require('express');
const router = Router();

//controlador 
const { getProductos } = require('../controllers/productos.controller')

router.route('/')
    .get(getProductos)
    //.post(postUsuarios);

/* router.route('/:id')
    .get(getUsuariosById)
    .put(putUsuariosById);
 */

module.exports = router;