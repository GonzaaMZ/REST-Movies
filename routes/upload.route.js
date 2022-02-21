const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campo');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');

const { cargarArchivo, actualizarArchivo, actualizarImagenCloud, mostrarImagen } = require('../controllers/upload.controller');



const router = Router();

//Cargar Imagen - caratula
router.post('/', validarArchivoSubir, cargarArchivo);


//Actualizar Imagen - caratula
router.put('/:id', [
    validarArchivoSubir,
    check('id', 'No es un id de Mongo').isMongoId(),
    validarCampos
] , actualizarArchivo);
//actualizarImagenCloud);

//Mostrar Imagen - caratula
router.get('/:id', [
    check('id', 'ID no válido').isMongoId(),
    validarCampos
], mostrarImagen);


module.exports = router;