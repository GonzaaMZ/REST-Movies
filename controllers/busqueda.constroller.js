const { response } = require('express');
const {ObjectId} = require('mongoose').Types;

const Pelicula = require('../models/pelicula');
const Genero = require('../models/genero');




const coleccionesPermitidas = [
    'peliculas',
    'generos'
]


const buscar = (req, res = response) => {

    const {coleccion, termino} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch(coleccion){
        case 'peliculas':
            buscarPelicula(termino, res);
        break;

        case 'generos':
            buscarGenero(termino, res);
        break;

        default:
            res.status(500).json({
                msg: 'Busqueda no registrada'
            })
        break;
    }
}


//Peliculas
const buscarPelicula = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const pelicula = await Pelicula.findById(termino).populate('genero', 'nombre');
        return res.json({
            results: (pelicula) ? [pelicula] : []
        })
    }

    const regex = new RegExp (termino, 'i',); //Expresión regular para flexibilizar la busqueda
    const peliculas = await Pelicula.find({nombre: regex}).populate('genero', 'nombre');
    
    res.json({
    results: peliculas
    })
    





}

//Generos

const buscarGenero = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const genero = await Genero.findById(termino);
        return res.json({
            results: (genero) ? [genero] : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const generos = await Genero.find({nombre: regex});

    res.json({
        results: generos
    })

}




module.exports = {
    buscar,
    buscarPelicula,
    buscarGenero
}