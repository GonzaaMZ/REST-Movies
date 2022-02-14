const {Schema, model} = require('mongoose');

const GeneroSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = model('Genero', GeneroSchema)