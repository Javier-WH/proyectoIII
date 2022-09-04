const bcryptjs = require('bcryptjs')
const { Tutors } = require("../database/models.js");

///esta funcion inscribe a un tutor
async function registerTutor({ names, lastName, nickName, password, CI, gender, age, address, work, instruction, studentsID, email,  whatsapp, phone, phone2 }) {
    let checkNick = await Tutors.findAll({
        where: {
            nickName
        }
    });
    ////// solo deja repetir el nick si esta en blanco, de lo contrario si el nick esta lleno no se puede repetir
    let isAlowed = true;
    if (checkNick.length > 0) {
        if (checkNick[0].nickName.length > 0) {
            isAlowed = false;
        }
    }

    let Message = {}
    if (!isAlowed) {
        Message = { ERROR: "El nombre de usuario ya está registrado" };
    } else {
        password = await bcryptjs.hash(password, 8);
        let ask = await Tutors.create({
            names,
            lastName,
            nickName,
            password,
            CI,
            gender,
            age,
            address,
            work,
            instruction,
            studentsID,
            email,
            whatsapp,
            phone,
            phone2
        });
        Message = ask;
    };

    return new Promise((resolved, rejected) => {
        resolved(Message);
        rejected({ ERROR: "Ha ocurrido un error al intentar inscribir al tutor" })
    });
}

//esta funcion actualiza los datos de un tutor
async function updateTutor({ data, id }) {
    let isAlowed = true;
    let Message = { ERROR: "El nickName ya esta siendo usado" };

    if (data.nickName) {
        let checkNick = await Tutors.findAll({
            where: {
                nickName: data.nickName
            }
        });

        if (checkNick.length > 0) {
            if (checkNick[0].nickName.length > 0 && checkNick[0].id != id) {
                isAlowed = false;
            }
        }
    }

    if (data.password) {
        data.password = await bcryptjs.hash(data.password, 8);
    }

    if (isAlowed) {
        let update = await Tutors.update(data, {
            where: {
                id
            }
        });

        if (update.length > 0) {
            if (update[0] == 0) {
                Message = { "ERROR": "El usuario no existe" }
            } else {
                Message = { "SUCCESS": "Se ha actualizado la información con exito" }
            }
        } else {
            Message = { "ERROR": "Ha ocurrido un error al intentar actualizar la informacion" }
        }
    }

    return new Promise((resolved, rejected) => {
        resolved(Message);
        rejected({ ERROR: "Ha ocurrido un error al intentar actualizar al tutor" })
    });
}

async function getTutorByCI({ CI }) {

    let data = ""

    let ask = await Tutors.findAll({
        where: {
            CI
        }
    });
    if (ask.length > 0) {

        data = ask[0];

    } else {
        data = { "MESSAJE": "El tutor no está registrado" }
    }

    return new Promise((resolved, rejected) => {
        resolved(data);
        rejected({ "ERROR": "Ha ocurrido un error al intentar obtener el tutor de la base de datos" })
    })
}
/////////////////
async function getTutorById({ id }) {

    let data = ""

    let ask = await Tutors.findAll({
        where: {
            id
        }
    });
    if (ask.length > 0) {

        data = ask[0];

    } else {
        data = { "MESSAJE": "El tutor no existe" }
    }

    return new Promise((resolved, rejected) => {
        resolved(data);
        rejected({ "ERROR": "Ha ocurrido un error al intentar obtener el tutor de la base de datos" })
    })
}

//////////
async function getTutorList() {
    let ask = await Tutors.findAll();
    return ask;
}


/////////////////

async function validateTutor({ nickName, password }) {
    let data = { "ERROR": "El usuario no está registrado" }

    let ask = await Tutors.findAll({
        where: {
            nickName
        }
    });

    if (ask.length > 0) {
        let checkPass = await bcryptjs.compare(password, ask[0].password)
        if (!checkPass) {
            data = { "ERROR": "La contraseña suministrada es incorrecta" }
        } else {
            data = ask[0];
        }
    };

    return new Promise((resolved, rejected) => {
        resolved(data);
        rejected({ "ERROR": "Ha ocurrido un error al intentar verificar la identidad del tutor" })
    });
}
/////


async function getTutorByEmail({ email }) {

    let data = ""

    let ask = await Tutors.findAll({
        where: {
            email
        }
    });
    if (ask.length > 0) {

        data = {susses: ask.length > 0, id: ask[0].id, ci: ask[0].CI, email: ask[0].email }

    } else {
        data = { "ERROR": "El tutor no existe" }
    }

    return new Promise((resolved, rejected) => {
        resolved(data);
        rejected({ "ERROR": "Ha ocurrido un error al intentar obtener el tutor de la base de datos" })
    })
}

////////////////////////


async function changeTutorPassword({CI, password}){
   password =  await bcryptjs.hash(password, 8);
    try {
        await Tutors.update({password},{where:{ci:CI}});
        return "OK";
    } catch (error) {
        console.log(error)
        return "ERROR"
    }
}



module.exports = {
    registerTutor,
    updateTutor,
    getTutorByCI,
    validateTutor,
    getTutorByEmail,
    changeTutorPassword,
    getTutorById,
    getTutorList
}