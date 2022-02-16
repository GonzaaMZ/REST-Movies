const {Router} = require('express');
const {check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campo');

const { crearPelicula, obtenerPeliculas, obtenerPeliculabyID,actualizarPelicula, borrarPelicula } = require('../controllers/movies.controller');
const { existePelicula, existeGenero } = require('../helpers/validaciones-db');




const router = Router();

/*
Ruta:
url/api/movies

*/

//Obtener todas las peliculas listadas
router.get('/', obtenerPeliculas)

//Obtener peliculas por ID
router.get('/:id' ,[
    check('id', 'ID mongo no válido').isMongoId(),
    check('id').custom( existePelicula ),
    validarCampos
], obtenerPeliculabyID)

//Crear peliculas
router.post('/' ,[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('genero', 'Tiene que ser un genero con id válido').isMongoId(),
    check('genero').custom(existeGenero),
    validarCampos
], crearPelicula)

//Actualizar peliculas
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'ID no válido').isMongoId(),
    check('id').custom( existePelicula ),
    validarCampos
], actualizarPelicula)

//Borrar peliculas
router.delete('/:id',[
    check('id', 'ID de mongo no válido').isMongoId(),
    check('id').custom( existePelicula ),
    validarCampos
], borrarPelicula);

module.exports = router;