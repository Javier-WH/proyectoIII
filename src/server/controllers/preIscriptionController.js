const { PreIscription } = require("../database/models.js");
const studentsController = require("../controllers/studentsController.js");


async function registerStudent({ names, lastName, ci, gender, year, age, parentID, schoolYear }) {
    let data = ""
    let checkExist = await findStudent({ CI: ci });
    let isIncripted = await studentsController.findStudent({ CI: ci });

    if (checkExist.length > 0 || isIncripted.length > 0) {
        data = { "ERROR": "La cédula suministrada ya esta inscrita en el sistema" }
    } else {
        let ask = await PreIscription.create({
            names,
            lastName,
            CI: ci,
            gender,
            year,
            age,
            parentID,
            schoolYear
        });
        data = ask
    }

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