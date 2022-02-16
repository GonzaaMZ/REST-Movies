const { response } = require("express");
const Pelicula = require("../models/pelicula");

//Obtener todas las peliculas
const obtenerPeliculas = async (req, res = response) => {
    const {limite = 5, desde = 0} = req.query;

    const [total, peliculas] = await Promise.all([
        Pelicula.countDocuments(),
        Pelicula.find()
        .skip(desde)
        .limit(limite)
        .populate('genero', 'nombre')
    ]) 

    res.json({
        total,
        peliculas
    })

}


//Obtener pelicula por ID
const obtenerPeliculabyID = async (req, res = response) => {

    const {id} = req.params;

    const pelicula = await Pelicula.findById(id)
                                .populate('genero', 'nombre');
    
    res.json({
        pelicula
    })



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
const actualizarPelicula = async (req, res = response) => {
    
    const {id} = req.params;

    const data = req.body;

    data.nombre = data.nombre.toUpperCase();

    const pelicula = await Pelicula.findByIdAndUpdate(id, data, {new: true});

    res.json(pelicula);

} 


//Borrar peliculas

const borrarPelicula = async (req, res = response) => {
    
    const {id} = req.params;

    const pelicula = await Pelicula.findByIdAndDelete(id);
    
    res.json(pelicula);
}


module.exports = {
    crearPelicula,
    obtenerPeliculas,
    obtenerPeliculabyID,
    actualizarPelicula,
    borrarPelicula
}