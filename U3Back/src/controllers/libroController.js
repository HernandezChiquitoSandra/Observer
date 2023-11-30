const Libro = require("../models/libro.js");
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

exports.guardarLibro = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se proporcionaron los archivos');
        }

        const { titulo, editorial, fechpubl, gen, sinop, numpag, estatus } = req.body;

        const foto = req.files['foto'][0];

        const libro = new Libro({
            titulo,
            editorial,
            fechpubl,
            gen,
            sinop,
            numpag,
            foto: {
                data: foto.buffer,
                contentType: foto.mimetype
            },
            estatus
        });

        await libro.save();

        res.send(libro);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.obtenerLibros = async (req, res) => {
    try {
        const libro = await Libro.find();
        const libroConBase64 = libro.map(libro => {
            const fotoBase64 = libro.foto.data.toString('base64');
            return {
                ...libro.toObject(),
                foto: fotoBase64,
            };
        });
        res.json(libroConBase64);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};


