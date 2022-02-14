const { response } = require("express");
const Pelicula = require("../models/pelicula");

//Obtener todas las peliculas
const obtenerPeliculas = (req, res = response) => {


}


//Obtener pelicula por ID
const obtenerPeliculabyID = (req, res) => {


}

//Crear peliculas

const crearPelicula = async (req, res = response) => {
    
    //Recibo los datos mediante parametros
    const body = req.body;

    //Busco el nombre en la base de datos
    const peliculaDB = await Pelicula.findOne({nombre: body.nombre});

    //Verifico si ya existe
    if (peliculaDB) {
        return res.status(400).json({
            msg: `La pelicula ${peliculaDB.nombre} ya existe`
        });
    }

    //Creo la data para guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase()
        
    }

    //Creo el objeto Pelicula con la data que recibi
    const pelicula = new Pelicula(data);

    //Guardo el objeto en la DB
    await pelicula.save();

    return res.status(200).json(pelicula);



}

//Actualizar peliculas

//Borrar peliculas


module.exports = {
    crearPelicula,
}