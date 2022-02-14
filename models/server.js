const express = require('express');
const cors = require('cors');

const {dbConnection} = require('../database/config');

class Server{

    constructor (){
        this.app = express();
        this.port = process.env.PORT;

        //Paths
        this.moviesPath = '/api/movies';    
        //TODO Conexión a DB
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Llamada a las Rutas de la aplicacion
        this.routes();
    }

    //TODO Funcion para la conexión a la base de datos
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

    }

    routes(){
        this.app.use(this.moviesPath, require('../routes/movies.route'));


    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo el puerto', this.port)
        })

    }


}


module.exports = Server;