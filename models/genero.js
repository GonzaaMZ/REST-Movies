const {Schema, model} = require('mongoose');

const GeneroSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    pelicula: {
        type: Schema.Types.ObjectId,
        ref: 'Pelicula'
    }
})

GeneroSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
}

module.exports = model('Genero', GeneroSchema)