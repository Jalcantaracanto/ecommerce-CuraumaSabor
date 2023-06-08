const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('./server/config/mongoose.config')
require('dotenv').config()

// console.log(process.env.SECRET_KEY)

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./server/routes/user.routes')(app)
require('./server/routes/producto.routes')(app)

app.listen(port, () => console.log(`Listening on port ${port}`))
