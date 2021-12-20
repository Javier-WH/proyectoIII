const { Students } = require("../database/models.js");


async function registerStudent({ names, lastName, ci, gender, seccion, year, age, parentID, subjects }) {
    let ask = await Students.create({
        names,
        lastName,
        CI: ci,
        gender,
        seccion,
        year,
        age,
        parentID,
        subjects
    });
    return new Promise((resolved, rejected) => {
        resolved(ask);
        rejected({ "Error": "Ha ocurrido un error al inscribir el estudiante" });
    })

}


////////////////////////////////////////////////////////
async function getStudents({ seccion, year }) {
    let ask = await Students.findAll({
        where: {
            seccion,
            year
        },
        order: [
            ["CI", "asc"]
        ]
    });
    return new Promise((resolved, rejected) => {
        resolved(ask);
        rejected({ "Error": "Ha ocurrido un error al consultar los estudiantes" });
    })
}

/////////////////////////

async function findStudent(filters) {

    let ask = await Students.findAll({
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

module.exports = { getStudents, registerStudent, findStudent }