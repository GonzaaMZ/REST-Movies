const Genero = require('../models/genero');
const Pelicula = require('../models/pelicula');



//Verifico si el genero existe utilizando su id de mongo
const existeGenero = async (id) => {
    const existeGenero = await Genero.findById(id);
    if(!existeGenero){
        throw new Error(`El genero con id ${id} no existe`)
    }
}


const existePelicula = async (id) => {
    const existePelicula = await Pelicula.findById(id);
    if (!existePelicula) {
        throw new Error(`La pelicula con ID ${id} no existe`)
    }
}


module.exports = {
    existeGenero,
    existePelicula

}



