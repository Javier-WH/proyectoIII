const { Subjects } = require("../database/models.js");


///inserta o actualiza las materias
async function setSubjects(subjects) {

    let years = Object.keys(subjects);

    years.map(async year => {

        let foundYear = await Subjects.findOne({ where: { "grade": year } });
        if (foundYear) {

            await Subjects.update({
                subjectsList: subjects[year]
            }, {
                where: {
                    "grade": year
                }
            })


        } else {
            await Subjects.create({
                grade: year,
                subjectsList: subjects[year]
            });

        }
    });

    return "OK";
}
/////

async function getGradesList() {

    let list = await Subjects.findAll();
    let grades = [];
    list.map(L => {
        grades.push(L.grade);
    })
    return grades;
}

///////////////////

async function destroyGrade({ grade }) {

    await Subjects.destroy({
        where: {
            grade
        }
    })
    return "OK";
}

///////////////////

async function getSubjects() {

    let subjects = await Subjects.findAll();
    return subjects;

}

module.exports = { setSubjects, getGradesList, destroyGrade, getSubjects };