const { User } = require("../database/models.js");
const { getTutorByEmail } = require("./tutorsController.js");
const { emailTokens } = require("../database/models.js");
const { SendEmail } = require("../libs/email.js");
const { getIp } = require("../networkInterfaces.js");
const tokenLifeTime = 600000;

async function emailExist(email) {
    let response;
    let ask = await User.findAll({
        where: {
            email
        }
    });

    if (ask.length > 0) {
        response = { susses: ask.length > 0, id: ask[0].id, ci: ask[0].CI, email: ask[0].email };
    } else {
        response = { susses: ask.length > 0 };
    }

    return new Promise((resolved, rejected) => {
        resolved(response);
        rejected({ "Error": "Ha ocurrido un error al consultar" });
    })
}
/////////////////
function createToken(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

////////////

async function insertToken(id, token, ci) {

    let idExist = await emailTokens.findAll({ where: { idUser: id } });

    if (idExist.length > 0) {
        await emailTokens.update({
            token
        }, {
            where: {
                idUser: id
            }
        })
    } else {
        await emailTokens.create({
            idUser: id,
            token,
            ci
        });
    }
}
////

function cleanToken(token) {
    setTimeout(async() => {
        await emailTokens.destroy({ where: { token } });
    }, tokenLifeTime);
}

/////////


async function cleanTokenByCI(ci) {

    await emailTokens.destroy({ where: { ci } });

}

//////////////////////

async function tokenExist(token) {
    let ask = await emailTokens.findAll({ where: { token } });
    if (ask.length > 0) {
        return { status: "existe", token: ask[0].token, id: ask[0].idUser };
    }
    return { status: "no existe" };
}
/////
async function ciExist(ci) {
    let ask = await emailTokens.findAll({ where: { ci } });
    return ask.length > 0;
}

//////////////

async function sendEmail({ email }) {
    let exist = await emailExist(email);
    if (exist.Error) {
        console.log(exist.Error);
        return exist.Error;
    }
    if (exist.susses) {

        let port = process.env.PORT
        let serverIp = getIp();
        let id = exist.id;
        let email = exist.email;
        let ci = exist.ci;
        let token = createToken(200);
        insertToken(id, token, ci);
        cleanToken(token);
        //comentado para evitar enviar correos
        //SendEmail(email, `<h3>Haga click en el siguiente enlace para reestablecer su contraseña</h3> \n\n  <a href="${serverIp}:${port}/teacherPasswordRecovery/${token}"> Click Aquí</a>`);

        return "OK";
    }
}
//////

async function sendEmailTutor({ email }) {
    let exist = await getTutorByEmail({email});
        if (exist.ERROR) {
        console.log(exist.ERROR);
        return exist.ERROR;
    }
    if (exist.susses) {

        let port = process.env.PORT
        let serverIp = getIp();
        let id = exist.id;
        let email = exist.email;
        let ci = exist.ci;
        let token = createToken(50);
        insertToken(id, token, ci);
        cleanToken(token);
        //comentado para evitar enviar correos
        //SendEmail(email, `<h3>Haga click en el siguiente enlace para reestablecer su contraseña</h3> \n\n  <a href="${serverIp}:${port}/tutorPasswordRecovery/${token}"> Click Aquí</a>`);

        return "OK";
    }
}

/////////////////////

async function cleanAllEmailTokens() {
    try {
        await emailTokens.destroy({
            where: {},
            truncate: true
        })
        console.log("La lista de tokens activos se ha vaciado".blue);
    } catch (error) {

    }
}

///

async function isTokenListEmpty() {
    let ask = await emailTokens.findAll({});
    return ask.length == 0;

}

///



module.exports = { sendEmail, tokenExist, cleanAllEmailTokens, ciExist, cleanTokenByCI, isTokenListEmpty, sendEmailTutor }