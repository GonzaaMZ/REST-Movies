const {Router} = require('express');
const { crearPelicula } = require('../controllers/movies.controller');



const router = Router();

/*
Ruta:
url/api/movies

*/

//Obtener todas las peliculas listadas

router.get('/', (req, res) => {
    res.json({
        msg: 'GET'
    })
})

//Obtener peliculas por ID


//Crear peliculas

router.post('/', crearPelicula)


//Actualizar peliculas


//Borrar peliculas

module.exports = router;