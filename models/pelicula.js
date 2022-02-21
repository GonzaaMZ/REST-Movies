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
        type: String
    },
    caratula: {
        type: String
    }

})

PeliculaSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
}


module.exports = model('Pelicula', PeliculaSchema);