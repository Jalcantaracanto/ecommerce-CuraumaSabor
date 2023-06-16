const { Schema, model } = require('mongoose')

const ProductoSchema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, 'Nombre de producto es requerido'],
        },
        precio: {
            type: String,
            required: [true, 'Precio de producto es requerido'],
            validate: {
                validator: (val) => /^(\d+|\d+\.\d+)$/.test(val),
                message: 'Por favor ingrese un precio valido',
            },
            default: 0,
        },
        descripcion: {
            type: String,
            required: [true, 'Descripcion de producto es requerido'],
        },
        // categoria: {
        //     type: String,
        //     required: [true, 'Categoria de producto es requerido'],
        //     enum: ["Pisco", "Comida", "Pack"],
        //     default: "Pisco",
        // },
        imagen: {
            type: {},
            // required: [true, 'Imagen de producto es requerido'],
        },
    },
    { timestamps: true }
)

// ProductoSchema.methods.setImgUrl = function setImgUrl(filename) {
//     this.imagen = `http://localhost:8080/public/${filename}`
// }


module.exports = model('Producto', ProductoSchema)