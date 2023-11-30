const mongoose = require("mongoose");

const libroSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: false
    },
    editorial: {
        type: String,
        required: false
    },
    fechpubl: {
        type: String,
        required: false
    },
    gen: {
        type: String,
        required: false
    },
    sinop: {
        type: String,
        required: false
    },
    numpag: {
        type: String,
        required: false
    },
    foto: {
        data: Buffer,
        contentType: String
    },
    estatus: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Libro', libroSchema);