const {Schema, model} = require('mongoose');

const PeliculaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    año: {
        type: Number
    },
    caratula: {
        type: String
    }

})


module.exports = model('Pelicula', PeliculaSchema);