const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {dbConnection} = require('../database/config');

class Server{

    constructor (){
        this.app = express();
        this.port = process.env.PORT;

        //Paths
        this.buscarPath  =   '/api/buscar';
        this.generosPath =   '/api/generos';
        this.moviesPath  =   '/api/movies';  
        this.uploadPath  =   '/api/upload';

        //Conexión a DB
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Llamada a las Rutas de la aplicacion
        this.routes();
    }

    //Funcion para la conexión a la base de datos
    async conectarDB (){
        await dbConnection();
    }

    middlewares() {
        
        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico para servir el contenido (Vistas)
        this.app.use(express.static('public'));

        //TODO Middlewares DE  FILEUPLOAD PARA CARATULAS
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes(){
        this.app.use(this.buscarPath, require('../routes/busqueda.route'));
        this.app.use(this.generosPath, require('../routes/generos.route'));
        this.app.use(this.moviesPath, require('../routes/movies.route'));
        this.app.use(this.uploadPath, require('../routes/upload.route'))

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo el puerto', this.port)
        })

    }


}


module.exports = Server;