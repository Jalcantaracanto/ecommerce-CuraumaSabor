const Producto = require('../models/producto.model')

module.exports.crearProducto = (req, res) => {
    Producto.create(req.body)
        .then((newProducto) => res.json({ producto: newProducto }))
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: err })
        })
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
    Producto.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
        .then((ActualizarProducto) => res.json({ producto: ActualizarProducto }))
        .catch((err) => res.status(500).json({ message: 'Error al actualizar producto', error: err }))
}

module.exports.eliminarProducto = (req, res) => {
    Producto.deleteOne({ _id: req.params.id })
        .then((eliminarProducto) => res.json({ producto: eliminarProducto }))
        .catch((err) => res.status(500).json({ message: 'Error al eliminar producto', error: err }))
}
