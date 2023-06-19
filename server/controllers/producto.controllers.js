const Producto = require('../models/producto.model')

// module.exports.crearProducto = (req, res) => {
//     Producto.create(req.body)
//         .then((newProducto) => res.json({ producto: newProducto }))
//         .catch((err) => {
//             console.log(err)
//             res.status(500).json({ error: err })
//         })
// }

module.exports.crearProducto = async (req, res) => {
    try {
        const { nombre, precio, descripcion } = req.body

        console.log(req.body)

        const nuevoProducto = new Producto({
            nombre,
            precio,
            descripcion,
            imagen: req.file,
        })

        await nuevoProducto.save()

        res.json({ producto: nuevoProducto })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
}

module.exports.listarProductos = (req, res) => {
    Producto.find({})
        .then((productos) => res.json({ productos: productos }))
        .catch((err) => res.status(500).json({ message: 'Error al listar productos', error: err }))
}

module.exports.listarProducto = (req, res) => {
    Producto.findOne({ _id: req.params.id })
        .then((producto) => res.json({ producto: producto }))
        .catch((err) => res.status(500).json({ message: 'Error al listar producto', error: err }))
}

module.exports.actualizarProducto = (req, res) => {
    const { precio, descripcion } = req.body // Extraemos solo las propiedades necesarias

    Producto.findOneAndUpdate({ _id: req.params.id }, { precio, descripcion }, { new: true })
        .then((actualizarProducto) => res.json({ producto: actualizarProducto }))
        .catch((err) => res.status(500).json({ message: 'Error al actualizar producto', error: err }))
}

module.exports.eliminarProducto = (req, res) => {
    Producto.deleteOne({ _id: req.params.id })
        .then((eliminarProducto) => res.json({ producto: eliminarProducto }))
        .catch((err) => res.status(500).json({ message: 'Error al eliminar producto', error: err }))
}
