const bcryptjs = require('bcryptjs')
const { User } = require("../database/models.js");


// ingresa un usuaio a la tabla users
async function insertUser(userName, userLastName, nickName, password, ci, gender, subject, admin) {
    let exist = await userExist(ci);
    if (!exist) {
        password = await bcryptjs.hash(password, 8);
        let ask = await User.create({
            name: userName,
            lastName: userLastName,
            nickName: nickName,
            password: password,
            CI: ci,
            gender: gender,
            subject: subject,
            admin: admin
        });

        return new Promise((resolved, rejected) => {
            resolved(ask);
            rejected({ "Error": "Ha ocurrido un error al ingresar el usuario" });
        })
    } else {
        return { "ERROR": "El Usuario ya está inscrito" };
    }
}

//revisa si el usuario ya esta inscrito usando el numero de cedula
async function userExist(ci) {
    let ask = await User.findAll({
        where: {
            ci: ci
        }
    });
    return new Promise((resolved, rejected) => {
        resolved(ask.length > 0);
        rejected({ "Error": "Ha ocurrido un error al consultar" });
    })
}

//loggin
async function login(nickName, password) {
    let ask = await User.findAll({
        where: {
            nickName: nickName,
            password: password
        }
    });
    return new Promise((resolved, rejected) => {
        resolved(ask.length > 0);
        rejected({ "Error": "Ha ocurrido un error al connsultar el login" });
    })
}



module.exports = { insertUser, login }