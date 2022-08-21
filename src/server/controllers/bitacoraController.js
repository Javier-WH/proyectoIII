const { Bitacora, User } = require("../database/models.js");


async function setLog(req, mensaje){
    let nickName = req.body.nickName;
    let ip = req.ip;
   
    let ask = await User.findAll({
        where: {
            nickName
        }
    });

    let name = ask[0].name;
    let lastName = ask[0].lastName;
    let ci = ask[0].CI;
    let administrador = ask[0].admin; 

    let data ={
        usuario: nickName,
        ip,
        nombre: name,
        apellido: lastName,
        ci,
        administrador
    }

    await Bitacora.create({
        description: mensaje,
        newData: data,
        oldData: {message:"No hay datos"} 
    });
}

module.exports = {setLog}