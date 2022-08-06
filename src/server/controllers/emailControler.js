const { User } = require("../database/models.js");

async function emailExist(email) {
    let ask = await User.findAll({
        where: {
            email
        }
    });
    return new Promise((resolved, rejected) => {
        resolved(ask.length > 0);
        rejected({ "Error": "Ha ocurrido un error al consultar" });
    })
}

async function sendEmail({ email }) {

    let exist = await emailExist(email);

    if (exist.Error) {
        console.log(exist.Error);
        return exist.Error;
    }
    if (exist) {
        return "OK";
    }
}


module.exports = { sendEmail }