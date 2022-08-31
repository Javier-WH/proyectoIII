const { PreIscription } = require("../database/models.js");
const studentsController = require("../controllers/studentsController.js");
const { getConfig } = require("./configControler.js");
const { registerPayment } = require("./paymentController.js");



async function registerStudent({ names, lastName, ci, motherName, motherCI, motherWork, fatherName, fatherCI, fatherWork, gender, year, age, birthDay, address, tutorID, procedence, paymentData, auxiliarData }) {
    let data = ""
    let checkExist = await findStudent({ CI: ci });
    let isIncripted = await studentsController.findStudent({ CI: ci });
    let configData = await getConfig();
    let schoolYear = configData[0].schoolYear;
    
    if (checkExist.length > 0 || isIncripted.length > 0) {
        data = { "ERROR": "La cédula suministrada ya esta inscrita en el sistema" }
    } else {
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
        data = ask
    }
//////
    let payment = await registerPayment(paymentData);
    console.log(payment);

////
    return new Promise((resolved, rejected) => {
        resolved(data);
        rejected({ "Error": "Ha ocurrido un error al inscribir el estudiante" });
    })

}


////////////////////////////////////////////////////////


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