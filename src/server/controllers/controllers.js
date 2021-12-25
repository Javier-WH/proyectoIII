const bcryptjs = require('bcryptjs')
const { User } = require("../database/models.js");


// ingresa un usuaio a la tabla users
async function insertUser({ userName, userLastName, nickName, password, ci, gender, subject, admin }) {
    let error = {};
    let exist = await userExist(ci);
    let nickNameExist = await nickExist(nickName);

    if (!exist && !nickNameExist) {
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
        if (exist) {
            error = {
                "ERROR": "El Usuario ya está inscrito"
            }
        } else {
            error = {
                "ERROR": "El nick ya está en uso"
            }
        }
        return error;
    }
}

//revisa si el usuario ya esta inscrito usando el numero de cedula
async function userExist(ci) {
    let ask = await User.findAll({
        where: {
            ci
        }
    });
    return new Promise((resolved, rejected) => {
        resolved(ask.length > 0);
        rejected({ "Error": "Ha ocurrido un error al consultar" });
    })
}
//revisa si el usuario ya esta inscrito usando el nickname
async function nickExist(nickName) {
    let ask = await User.findAll({
        where: {
            nickName
        }
    });
    return new Promise((resolved, rejected) => {
        resolved(ask.length > 0);
        rejected({ "Error": "Ha ocurrido un error al consultar" });
    })
}

///regresa un usuario
async function getUser(id) {
    let ask = await User.findAll({
        where: {
            id: id
        }
    });
    return new Promise((resolved, rejected) => {
        resolved(ask);
        rejected({ "Error": "Ha ocurrido un error al connsultar el login" });
    })
}

//autentifica el login de un profesor
async function checklogin({ nickName, password }) {

    let ask = await User.findAll({
        where: {
            nickName
        }
    });

    let id = -1;

    if (ask.length > 0) {
        id = -2;
        if (bcryptjs.compareSync(password, ask[0].password)) {
            id = ask[0].id;
        }
    }
    return new Promise((resolved, rejected) => {
        resolved(id);
        rejected({ "ERROR": "ocurrio un error en el login" });
    })
};


//autentifica el login de un administrador
async function checkAdmin({ nickName, password }) {

    let ask = await User.findAll({
        where: {
            nickName
        }
    });

    let id = -1;

    if (ask.length > 0) {
        id = -2;
        if (bcryptjs.compareSync(password, ask[0].password)) {
            id = ask[0].id;
            if (ask[0].admin == false) {
                id = -3;
            }
        }
    }
    return new Promise((resolved, rejected) => {
        resolved(id);
        rejected({ "ERROR": "ocurrio un error en el login" });
    })
};





module.exports = { insertUser, getUser, checklogin, checkAdmin }