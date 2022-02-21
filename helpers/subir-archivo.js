const path = require('path');
const {v4: uuidv4} = require('uuid');

const subirArchivo = (files, extensionPermitida = [ 'png', 'jpg', 'jpeg'], carpeta = '') => {
    return new Promise((resolve, reject) => {

        //Recibo el archivo
        const {archivo} = files;

        //Extraigo la extension del archivo 
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //Valido la extensión
        if (!extensionPermitida.includes(extension)) {
            return reject(`La extensión ${extension} no es válida - Extensiones permitidas: ${extensionPermitida}`)
        }

        //Renombro el archivo con uuid
        const nombreUnico = uuidv4() + "." + extension;

        //Declaro la ruta donde se guardara el archivo
        const uploadPath = path.join(__dirname, '../uploads', carpeta, nombreUnico);

        //Muevo el archivo hacia la ruta declarada
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            //Resolve y respuesta
            resolve(nombreUnico)
        });
    })
}

module.exports = {
    subirArchivo
}