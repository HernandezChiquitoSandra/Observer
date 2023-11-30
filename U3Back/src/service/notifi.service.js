const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'phpmailertest633@gmail.com',
        pass: 'difr gafm uwik vlle'
    }
});

// Función que envía el correo
exports.notificarFav = (nombre, correo, libroTitl) => {
    const mailOptions = {
        from: 'phpmailertest633@gmail.com',
        to: correo,
        subject: `Hola ${nombre}!`,
        text: `Te informamos que has agregado el libro "${libroTitl}" a tus favoritos. ¡Gracias por utilizar nuestro servicio!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};
