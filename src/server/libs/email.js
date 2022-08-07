const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "bataalladelavictoria@gmail.com",
        pass: "W8gLUFAt0qVNDKa2"
    },
})

async function SendEmail() {

    try {
        const info = await transporter.sendMail({
            from: 'bataalladelavictoria@gmail.com',
            to: "fj_rh@hotmail.com",
            subject: 'Some One needs to talk',
            text: "Esto es un prueba de email"
        })
        console.log('success', info);
    } catch (error) {
        console.log('there was an error', error);
    }

}



module.exports = { SendEmail };