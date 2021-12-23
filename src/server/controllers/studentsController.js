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




async function updateGrades(list) {

    // console.log(list[0].subjects)

    for (let i = 0; i < list.length; i++) {
        let id = list[i].id
        let student = await Students.findAll({
            where: {
                id
            }
        });
        let oldSubjects = student[0].subjects;
        let keys = Object.keys(list[i].subjects);

        for (let j = 0; j < keys.length; j++) {

            oldSubjects[keys[j]] = list[i].subjects[keys[j]];
        }

        let update = await Students.update({ subjects: oldSubjects }, {
            where: {
                id
            }
        });

        return new Promise((resolved, rejected) => {
            resolved("OK");
            rejected({ "Error": "Ha ocurrido un error al intentar actualizar las notas" });
        })


    }
}





module.exports = { getStudents, registerStudent, findStudent, updateGrades }