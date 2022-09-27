const colors = require('colors')
const { Op } = require("sequelize");
const { Students } = require("../database/models.js");
const configController = require("../controllers/configControler.js");
const { getSubjects } = require("../controllers/subjectsController.js");
const { updateAuxInfo } =require("./auxiliarInformationController.js")

async function registerStudent({ names, lastName, ci, motherName, motherCI, motherWork, fatherName, fatherCI, fatherWork, gender, seccion, year, age, birthDay, address, tutorID, procedence, schoolYear}) {
    let message = ""
    let checkCI = await findStudent({ CI: ci })

    if (checkCI.length > 0) {
        message = { ERROR: "El estudiante ya está inscrito" };
    } else {

        let askSubj = await getSubjects();
        let filteredSubject = askSubj.filter(subj => subj.grade == year)[0].subjectsList;


        let subjects = {}

        filteredSubject.map(e => {
            subjects[e] = { "l1": 0, "l2": 0, "l3": 0, "def": 0 }
        })

        let ask = await Students.create({
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
            seccion,
            year,
            age,
            birthDay,
            address,
            tutorID,
            procedence,
            subjects,
            schoolYear,
            photo: "default"
        });
    
        message = ask;
    }
    return new Promise((resolved, rejected) => {
        resolved(message);
        rejected({ "ERROR": "Ha ocurrido un error al inscribir el estudiante" });
    })

}
////////////////////////////////////////////
async function updateStudentPensum(id, subjects){
    let ask = await Students.update({subjects}, {where:{id}});

}


///

async function updateStudent({ names, lastName, CI, age, gender, motherName, motherCI, motherWork, fatherName, fatherCI, fatherWork, oldCI, auxData }) {

    try {
        let ask = await Students.update({
            names,
            lastName,
            CI,
            age,
            gender,
            motherName,
            motherCI,
            motherWork,
            fatherName,
            fatherCI,
            fatherWork
        },{
            where:{CI:oldCI}
        });
        
       updateAuxInfo(auxData, CI, oldCI);

        return new Promise((resolved, rejected) => {
            resolved(ask);
            rejected({ "ERROR": "Ha ocurrido un error al inscribir el estudiante" });
        })
    } catch (error) {
        console.log(error)
    }

}


////////////////////////////////////////////////////////
async function getStudents({ seccion, year, schoolYear }) {
    let ask = await Students.findAll({
        where: {
            seccion,
            year,
            schoolYear
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


//////////////////////////////////////

async function updateGrades(list) {

    let student = await findStudent({ id: list[0].id })
    let config = await configController.getConfig();


    if (!config[0].l1 && list[0].subjects[Object.keys(list[0].subjects)[0]].l1) { //primer lapso
        if (student[0].subjects[Object.keys(list[0].subjects)[0]].l1 != list[0].subjects[Object.keys(list[0].subjects)[0]].l1) {
            return "No está habilitado el ingreso de notas del primer lapso";
        }
    }

    if (!config[0].l2 && list[0].subjects[Object.keys(list[0].subjects)[0]].l2) { //segundo lapso
        if (student[0].subjects[Object.keys(list[0].subjects)[0]].l2 != list[0].subjects[Object.keys(list[0].subjects)[0]].l2) {
            return "No está habilitado el ingreso de notas del segundo lapso";
        }
    }
    if (!config[0].l3 && list[0].subjects[Object.keys(list[0].subjects)[0]].l3) { //tercer lapso

        if (student[0].subjects[Object.keys(list[0].subjects)[0]].l3 != list[0].subjects[Object.keys(list[0].subjects)[0]].l3) {
            return "No está habilitado el ingreso de notas del tercer lapso";
        }
    }

    /////////////////////////////////////////////////////////
    for (let i = 0; i < list.length; i++) {
        let id = list[i].id
        let student = await Students.findAll({
            where: {
                id
            }
        });


        let oldSubjects = student[0].subjects;



        if (oldSubjects == null) {
            oldSubjects = list[i].subjects;

        } else {

            let keys = Object.keys(list[i].subjects);

            if (!config[0].edit) {
                let message = "La edición de notas no está permitida en este momento";
                for (let j = 0; j < keys.length; j++) {
                   
                    if (oldSubjects[keys[j]].l1 != list[i].subjects[keys[j]].l1 && oldSubjects[keys[j]].l1 != 0) {

                        return message;

                    }
                    if ((oldSubjects[keys[j]].l2 != list[i].subjects[keys[j]].l2) && oldSubjects[keys[j]].l2 != 0) {

                        return message;

                    }
                    if (oldSubjects[keys[j]].l3 != list[i].subjects[keys[j]].l3 && oldSubjects[keys[j]].l3 != 0) {
                        return message;

                    }

                }

            }
            for (let j = 0; j < keys.length; j++) {
                oldSubjects[keys[j]] = list[i].subjects[keys[j]];
            }


        }

        let update = await Students.update({ subjects: oldSubjects }, {
            where: {
                id
            }
        });
    }
    return new Promise((resolved, rejected) => {
        resolved("OK");
        rejected({ "Error": "Ha ocurrido un error al intentar actualizar las notas" });
    })
}
//////////////

async function updatePhoto(id, photo) {
    await Students.update({ photo }, {
        where: {
            id
        }
    });

}

//////////////////////////////////////

async function deleteStudent({ id }) {

    let ask = await Students.destroy({
        where: {
            id
        }
    });

    return new Promise((resolved, rejected) => {
        resolved(ask);
        rejected({ ERRPR: "Ha ocurrido un error al intentar expulsar al estudiante" })
    })

}

///////


async function getDeferredStudents ({schoolYear}){
    
    let config = await configController.getConfig();
    let minAproval = config[0].minAproval; //minimo aprovatorio


    let studentsList = await findStudent({schoolYear});

    let deferredStudents ={};

    studentsList.map(studen=>{
        let studentSubjects = studen.subjects;
        let subjectsNames = Object.keys(studentSubjects);
   
        
        let data = {};
        for(subjec of subjectsNames){
            let def = studentSubjects[subjec].def;
            if(def < minAproval){
                data = {
                    deferredSubjects:{
                        ...data.deferredSubjects,
                        [subjec]:def
                    }
                }
                deferredStudents[studen.id] ={
                    deferredSubjects: data.deferredSubjects,
                    studenData: studen
                };
            }
        }
    });

   
    return deferredStudents;


   

}

module.exports = {
    getStudents,
    registerStudent,
    findStudent,
    updateGrades,
    deleteStudent,
    updatePhoto,
    updateStudent,
    getDeferredStudents,
    updateStudentPensum
}