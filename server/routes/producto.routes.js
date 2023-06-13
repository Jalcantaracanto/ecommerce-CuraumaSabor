const { crearProducto, listarProductos, listarProducto, actualizarProducto, eliminarProducto } = require('../controllers/producto.controllers')
const { authenticate } = require('../config/jwt.config')

module.exports = (app) => {
    app.post('/api/producto', authenticate, crearProducto)
    app.get('/api/productos', authenticate, listarProductos)
    app.get('/api/producto/:id', authenticate, listarProducto)
    app.put('/api/producto/:id', authenticate, actualizarProducto)
    app.delete('/api/producto/:id', authenticate, eliminarProducto)
}