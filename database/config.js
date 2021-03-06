const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Conexion Exitosa')

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');        
    }


}

module.exports = {
    dbConnection
}