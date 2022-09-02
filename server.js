require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

//Routes
app.use('/user', require('./routes/userRoutes'))
app.use('/api', require('./routes/upload'))

//Conexión a MongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log("Conectado a MongoDB")
})

/*
app.use('/', (req, res, next) => {
    res.json({ msg: "En línea!" })
})
*/

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('El servidor se está ejecutando correctamente en el puerto', PORT)
})