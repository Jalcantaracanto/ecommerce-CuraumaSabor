const { crearProducto, listarProductos, listarProducto, actualizarProducto, eliminarProducto } = require('../controllers/producto.controllers')
const { authenticate } = require('../config/jwt.config')
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
    destination: '../uploads/',
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname)
        const nombreArchivo = `${uuidv4()}${extension}`
        cb(null, nombreArchivo)
    },
})

const upload = multer({ storage })

module.exports = (app) => {
    app.post('/api/producto', authenticate, upload.single('imagen'), crearProducto)
    app.get('/api/productos', listarProductos)
    app.get('/api/producto/:id', authenticate, listarProducto)
    app.put('/api/producto/:id', authenticate, actualizarProducto)
    app.delete('/api/producto/:id', authenticate, eliminarProducto)
}
