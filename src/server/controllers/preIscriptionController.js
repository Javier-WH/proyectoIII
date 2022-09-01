const { PreIscription } = require("../database/models.js");
const studentsController = require("../controllers/studentsController.js");
const { getConfig } = require("./configControler.js");
const { registerPayment } = require("./paymentController.js");
const { insertAuxInfo } = require("./auxiliarInformationController.js");
const { createToken } = require("./emailControler.js");


async function registerStudent({ names, lastName, ci, motherName, motherCI, motherWork, fatherName, fatherCI, fatherWork, gender, year, age, birthDay, address, tutorID, procedence, paymentData, auxiliarData }) {
    if(ci == tutorID){
        ci = `${tutorID}-${createToken(100)}`;
    }
    let data = ""
    let checkExist = await findStudent({ CI: ci });
    let isIncripted = await studentsController.findStudent({ CI: ci });
    let configData = await getConfig();
    let schoolYear = configData[0].schoolYear;
    if (checkExist.length > 0 || isIncripted.length > 0) {
        data = { "Error": "La cédula suministrada ya esta inscrita en el sistema" }
    } else {
        try {
            let ask = await PreIscription.create({
                names,
                lastName,
                CI: ci,
                motherName,
                motherCI,
                motherWork,
                fatherName,
                fatherCI,
                fatherWork,
                gender,
                year,
                age,
                birthDay,
                address,
                tutorID,
                procedence,
                schoolYear
            });
            data = ask;
            let payment = await registerPayment(paymentData , ci);
            let auxInfo = await insertAuxInfo(auxiliarData , ci); 
        } catch (error) {
            data = {Error: "Los datos suministrados no son correctos"};
        }

    }
    return new Promise((resolved, rejected) => {
        resolved(data);
        rejected({ "Error": "Ha ocurrido un error al inscribir el estudiante" });
    })

}


/////////////////////////

async function findStudent(filters) {

    let ask = await PreIscription.findAll({
        where: filters,

        order: [
            ["CI", "asc"]
        ]
    });
    return new Promise((resolved, rejected) => {
        resolved(ask);
        rejected({ "Error": "Ha ocurrido un erroral intentar buscar al estudiante" });
    })
}

/////////////////////////////

async function deleteStudent({ id }) {
    let ask = await PreIscription.destroy({
        where: {
            id
        }
    });
    return new Promise((resolved, rejected) => {
        resolved(ask);
        rejected({ "Error": "Ha ocurrido un erroral intentar borrar al estudiante" });
    })
}


module.exports = { registerStudent, findStudent, deleteStudent }