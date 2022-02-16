const {Router} = require('express');
const { crearPelicula, obtenerPeliculas, obtenerPeliculabyID,actualizarPelicula, borrarPelicula } = require('../controllers/movies.controller');



const router = Router();

/*
Ruta:
url/api/movies

*/

//Obtener todas las peliculas listadas
router.get('/', obtenerPeliculas)

//Obtener peliculas por ID
router.get('/:id', obtenerPeliculabyID)

//Crear peliculas
router.post('/', crearPelicula)

//Actualizar peliculas
router.put('/:id', actualizarPelicula)

//Borrar peliculas
router.delete('/:id', borrarPelicula);

module.exports = router;