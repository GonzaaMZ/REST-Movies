const {Router} = require('express');
const { crearGenero, obtenerGeneros, obtenerGeneroById, actualizarGenero, borrarGenero} = require('../controllers/genero.controller');


const router = Router();

/*
Ruta:
url/api/generos

*/

//Obtener todas las generos listadas
router.get('/', obtenerGeneros)

//Obtener generos por ID
router.get('/:id', obtenerGeneroById)

//Crear generos
router.post('/', crearGenero)


//Actualizar generos
router.put('/:id', actualizarGenero )

//Borrar generos
router.delete('/:id', borrarGenero )


module.exports = router;