const mongoose = require("mongoose");

const autorSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    biografia: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Autor', autorSchema);