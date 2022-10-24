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

app.use('/user', require('./routes/userRoutes'))
app.use('/api', require('./routes/upload'))
app.use('/module', require('./routes/moduleRoutes'))
app.use('/question', require('./routes/questionRoutes'))

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log("Conectado a MongoDB")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('El servidor se está ejecutando correctamente en el puerto', PORT)
})