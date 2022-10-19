const mongoose = require('mongoose')

const ModuleSchema = new mongoose.Schema({
    id:{
        type: Int32Array,
    },
    Titulo: {
        type: String,
    },
    Texto: {
        type: Array,
    },
    Disponible:{
        type: Boolean
    },
    Completado:{
        type: Boolean
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Modulos', ModuleSchema)

