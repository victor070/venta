const { Router } = require('express');
const router = Router();

//controlador 
const { getClientes } = require('../controllers/clientes.controller')

router.route('/')
    .get(getClientes)
    //.post(postUsuarios);

/* router.route('/:id')
    .get(getUsuariosById)
    .put(putUsuariosById);
 */

module.exports = router;