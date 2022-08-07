const { User } = require("../database/models.js");
const { emailTokens } = require("../database/models.js");

const tokenLifeTime = 30000;

async function emailExist(email) {
    let ask = await User.findAll({
        where: {
            email
        }
    });

    return new Promise((resolved, rejected) => {
        resolved({ susses: ask.length > 0, id: ask[0].id });
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

async function insertToken(id, token) {

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
            token
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

async function sendEmail({ email }) {
    let exist = await emailExist(email);

    if (exist.Error) {
        console.log(exist.Error);
        return exist.Error;
    }
    if (exist.susses) {
        let id = exist.id;
        let token = createToken(40);
        insertToken(id, token);
        cleanToken(token);

        return "OK";
    }
}


module.exports = { sendEmail }