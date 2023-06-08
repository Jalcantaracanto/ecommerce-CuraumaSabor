const { crearProducto, listarProductos, listarProducto, actualizarProducto, eliminarProducto } = require('../controllers/producto.controllers')

module.exports = (app) => {
    app.post('/api/producto', crearProducto)
    app.get('/api/productos', listarProductos)
    app.get('/api/producto/:id', listarProducto)
    app.put('/api/producto/:id', actualizarProducto)
    app.delete('/api/producto/:id', eliminarProducto)
}