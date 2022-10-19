const mongoose = require('mongoose')

const preguntaSchema = new mongoose.Schema({
    id:{
        type: Int32Array,
    },
    rcorrecta: {
        type: String,
    },

    reincorrecta: {
        type: Array,
    },
    premisa:{
        type: String
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Preguntas', preguntaSchema)