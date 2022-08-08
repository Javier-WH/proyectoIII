const { User } = require("../database/models.js");
const { emailTokens } = require("../database/models.js");
const { SendEmail } = require("../libs/email.js");
const tokenLifeTime = 1200000;

async function emailExist(email) {
    let response;
    let ask = await User.findAll({
        where: {
            email
        }
    });

    if (ask.length > 0) {
        response = { susses: ask.length > 0, id: ask[0].id, ci: ask[0].CI };
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

        let id = exist.id;
        let email = exist.email;
        let ci = exist.ci;
        let token = createToken(40);

        insertToken(id, token, ci);
        cleanToken(token);
        //comentado para evitar enviar correos
        //SendEmail(email, `Haga click en el siguiente enlace para reestablecer su contraseña \n\n  <a href="192.168.1.106:3000/teacherPasswordRecovery/${token}"> Click Aquí</a>`);

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


module.exports = { sendEmail, tokenExist, cleanAllEmailTokens, ciExist }