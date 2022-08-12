const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
})

async function SendEmail(destiny, text) {

    try {
        const info = await transporter.sendMail({
            from: 'bataalladelavictoria@gmail.com',
            to: destiny,
            subject: 'Recuperar contraseña Batalla de la Victoria',
            text
        })
    } catch (error) {
        console.log('ha ocurrido un error al enviar el email -> ', error.error);
    }

}



module.exports = { SendEmail };