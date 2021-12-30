const bcryptjs = require('bcryptjs')
const { User } = require("../database/models.js");


// ingresa un usuaio a la tabla users
async function insertUser({ userName, userLastName, nickName, password, ci, gender, subject, admin, phone, email }) {
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
            admin: admin,
            phone: phone,
            email: email
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


//regresa un usuario usando la cedula
async function getUserByCI({ ci }) {
    if (ci != "") {
        let ask = await User.findAll({
            where: {
                ci
            }
        });

        let data = { "Error": "La cedula no está registrada en el sistema" };

        if (ask.length > 0) {
            if (!bcryptjs.compareSync("", ask[0].password)) {
                data = { "Error": "El profesor ya está inscrito" };
            } else {
                data = {
                    "id": ask[0].id,
                    "name": ask[0].name,
                    "lastName": ask[0].lastName,
                    "CI": ask[0].CI,
                    "gender": ask[0].gender,
                    "subject": ask[0].subject
                }
            }
        }

        return new Promise((resolved, rejected) => {
            resolved(data);
            rejected({ "Error": "Ha ocurrido un error al consultar" });
        });


    } else {
        return { "Error": "La cedula está vacia" };
    }
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


////////////////Registra un profesor
async function registerTeacher({ name, lastName, nickName, password, CI, gender, phone, email }) {
    password = await bcryptjs.hash(password, 8);
    let update = await User.update({ name, lastName, nickName, password, CI, gender, phone, email }, {
        where: {
            CI
        }
    });

    return new Promise((resolved, rejected) => {
        resolved(update);
        rejected({ "ERROR": "ocurrio un error al actualizar los datos del profesor" });
    })



}

///////////////////elimina un registro de la tabla

async function fireTeacher({ ci }) {

    let ask = await User.destroy({
        where: {
            CI: ci
        }
    });

    return new Promise((resolved, rejected) => {
        resolved(ask);
        rejected({ "ERROR": "ocurrio un error al eliminar el registro" });
    })


}
////// regresa la lista de todos los usuarios

async function getAllUsers() {
    let ask = await User.findAll();

    return new Promise((resolved, rejected) => {
        resolved(ask);
        rejected({ "Error": "Ha ocurrido un error al intentar obtener la lista de los usuarios" });
    })
}

/////////////////

async function getTeacherInfo({ ci }) {
    if (ci != "") {
        let ask = await User.findAll({
            where: {
                ci
            }
        });

        let data = ask.length > 0 ? ask : { "Error": "La cedula no está registrada en el sistema" };


        return new Promise((resolved, rejected) => {
            resolved(data);
            rejected({ "Error": "Ha ocurrido un error al consultar" });
        });


    } else {
        return { "Error": "La cedula está vacia" };
    }
}

////////////////////////////
//actualiza los datos del profesor

async function updateTeacherData({ data, id }) {
    let update = await User.update(data, {
        where: {
            id
        }
    });

    return new Promise((resolved, rejected) => {
        resolved(update);
        rejected({ "ERROR": "ocurrio un error al actualizar los datos del profesor" });
    })



}

module.exports = {
    insertUser,
    getUser,
    checklogin,
    checkAdmin,
    getUserByCI,
    registerTeacher,
    fireTeacher,
    getAllUsers,
    getTeacherInfo,
    updateTeacherData
}