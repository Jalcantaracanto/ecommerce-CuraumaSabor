const { crearProducto, listarProductos, listarProducto, actualizarProducto, eliminarProducto } = require('../controllers/producto.controllers')
const { authenticate } = require('../config/jwt.config')
const multer = require('multer')
const path = require('path')
// const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/'), // Ruta absoluta al directorio "uploads"
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname)
        const nombreArchivo = `${getNextImageNumber()}${extension}`
        cb(null, nombreArchivo)
    },
})

let imageNumber = 0

function getNextImageNumber() {
    imageNumber++
    return imageNumber.toString().padStart(4, '0') // Agrega ceros a la izquierda para tener siempre 4 dígitos
}

const upload = multer({ storage })

module.exports = (app) => {
    app.post('/api/producto', authenticate, upload.single('imagen'), crearProducto)
    app.get('/api/productos', listarProductos)
    app.get('/api/producto/:id', authenticate, listarProducto)
    app.put('/api/producto/:id',  actualizarProducto)
    app.delete('/api/producto/:id', authenticate, eliminarProducto)
}