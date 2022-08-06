const nodemailer = require('nodemailer');

//BatallaVictoria@outlook.com  || Batalla741 || batalladelavictoria@zohomail.com || zjhbTNaNRy1L

// let transporter = nodemailer.createTransport({
//     service: "Outlook365",
//     host: "smtp.office365.com",
//     port: "587",
//     tls: {
//         ciphers: "SSLv3",
//         rejectUnauthorized: false,
//     },
//     auth: {
//         user: "BatallaVictoria@outlook.com",
//         pass: "Batalla741",
//     },
// });

var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true, //ssl
    auth: {
        user: "batalladelavictoria@zohomail.com",
        pass: "zjhbTNaNRy1L"
    }
});



async function sendEmail(to) {
    try {
        let info = await transporter.sendMail({
            from: "batalladelavictoria@zohomail.com", // sender address
            to: to,
            subject: "prueba para email numero 2", // Subject line
            html: "esto es una prueba, para verificar el envío de email otra vez!!!!!!!!!!!!!", // html body
        });

    } catch (error) {
        console.log(error);
    }

}


module.exports = { sendEmail };