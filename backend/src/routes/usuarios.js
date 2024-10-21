const { Router } = require('express');
const router = Router();

//controlador 
const { getUsuarios, postUsuarios, getUsuariosById, putUsuariosById } = require('../controllers/usuarios.controller')

router.route('/')
    .get(getUsuarios)
    .post(postUsuarios);

router.route('/:id')
    .get(getUsuariosById)
    .put(putUsuariosById);


module.exports = router;