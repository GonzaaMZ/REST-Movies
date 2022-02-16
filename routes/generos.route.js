const {Router} = require('express');
const {check} = require('express-validator');

const { crearGenero, obtenerGeneros, obtenerGeneroById, actualizarGenero, borrarGenero} = require('../controllers/genero.controller');
const { existeGenero } = require('../helpers/validaciones-db');
const { validarCampos } = require('../middlewares/validar-campo');



const router = Router();

/*
Ruta:
url/api/generos

*/

//Obtener todas las generos listadas
router.get('/', obtenerGeneros)

//Obtener genero por ID
router.get('/:id', [
    check('id', 'ID no válido').isMongoId(),
    check('id').custom( existeGenero ),
    validarCampos
], obtenerGeneroById)

//Crear generos
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,crearGenero)


//Actualizar generos
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'ID no válido').isMongoId(),
    check('id').custom( existeGenero ),
    validarCampos
], actualizarGenero )

//Borrar generos
router.delete('/:id',[
    check('id', 'ID de mongo no válido').isMongoId(),
    check('id').custom( existeGenero ),
    validarCampos
] ,borrarGenero )


module.exports = router;