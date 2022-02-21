const path = require('path');
const { response } = require('express');
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const {subirArchivo} = require('../helpers/subir-archivo');
const Pelicula = require('../models/pelicula');


const cargarArchivo = async (req, res = response) => {

    try {
        //Envio los datos hacia la funcion para procesar el archivo
        const nombre = await subirArchivo(req.files, undefined, 'peliculas');
        res.json({nombre});

    } catch (msg) {
        res.status(400).json({msg});
    }
}


const actualizarArchivo = async (req, res = response) => {
    
    const {id} = req.params;

    //Preparo el modelo pelicula para guardar imagen
    const modelo = await Pelicula.findById(id);
    if (!modelo) {
        return res.status(400).json({msg: `No existe una pelicula con el ID ${id}`})
    }

    //Limpiar imagenes repetidas 
    if(modelo.caratula){
        //Tomo la ruta de la imagen
        const pathImage = path.join(__dirname, '../uploads', 'peliculas', modelo.caratula);
        //Compruebo si existe la imagen
        if(fs.existsSync(pathImage)){
            fs.unlinkSync(pathImage);//La elimino
        }
    }

    //Enviando los datos hacia subirArchivo
    const nombre = await subirArchivo(req.files, undefined, 'peliculas');

    //Asigno el archivo al modelo
    modelo.caratula = nombre;

    //Guardo en DB
    await modelo.save();

    //Respuesta
    res.json(modelo);

}

const actualizarImagenCloud = async (req, res = response) => {

    const {id} = req.params;

    const modelo = await Pelicula.findById(id);
    if (!modelo) {
        return res.status(400).json({msg: `No existe una pelicula con el ID ${id}`})
    }

    //Limpiar imgs repetidas
    if(modelo.caratula){
        const nombreArr = modelo.caratula.split('/');
        const nombre = nombreArr[nombreArr.length -1];
        const [cloudinary_id] = nombre.split('.');
        cloudinary.uploader.destroy(cloudinary_id);
    }

    //Cargar imagen en cloud
    const {tempFilePath} = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    modelo.caratula = secure_url;

    //Guardo de DB
    await modelo.save();

    res.json(modelo);

}

const mostrarImagen = async (req, res = response) => {
    
    const {id} = req.params;
    
    const modelo = await Pelicula.findById(id);

    //Compruebo si existe pelicula con ese id
    if (!modelo) {
        return res.status(400).json({msg: `No existe pelicula con id ${id}`})
    }

    //Compruebo si la pelicula tiene caratula
    if(modelo.caratula){
        const pathImage = path.join(__dirname, '../uploads', 'peliculas', modelo.caratula);

        if(fs.existsSync(pathImage)){
            return res.sendFile(pathImage)
        }
    }

    const pathNoImage = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathNoImage);


}


module.exports = {
    cargarArchivo,
    actualizarArchivo,
    actualizarImagenCloud,
    mostrarImagen
}