
const { response } = require("express");
const Genero = require('../models/genero');

//Obtener generos

const obtenerGeneros = async (req, res = resolve) => {

    const {limite = 5, desde = 0} = req.query;
    
    const [total, generos] = await Promise.all([
        Genero.countDocuments(),
        Genero.find()
        .skip(desde)
        .limit(limite)
        .populate('pelicula', 'nombre')      
    ]);

    res.json({
        total, 
        generos
    })


}



//Obtener genero por id

const obtenerGeneroById = async (req, res = response) => {
    
    const {id} = req.params;

    const genero = await Genero.findById(id)
    .populate('pelicula', 'nombre');

    res.json({
        genero
    });

}

//Crear genero 

const crearGenero = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const generoDB = await Genero.findOne( {nombre} );

    if (generoDB){
        return res.status(400).json({
            msg: `El genero ${generoDB} ya existe`
        });
    }

    const data = {
        nombre
    }

    const genero = new Genero(data);

    await genero.save();

    return res.status(200).json({genero});


}


//Actualizar genero

const actualizarGenero = async (req, res = response) => {

    const {id} = req.params;
    
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre
    }
    

    const genero = await Genero.findByIdAndUpdate(id, data, {new: true});

    res.json(genero);

}


//Borrar genero

const borrarGenero = async (req, res = response) => {

    const {id} = req.params;

    const genero = await Genero.findByIdAndDelete(id);

    res.json(genero);
}


module.exports = {
    crearGenero,
    obtenerGeneros,
    obtenerGeneroById,
    actualizarGenero,
    borrarGenero
}