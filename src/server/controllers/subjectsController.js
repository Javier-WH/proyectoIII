const { Subjects } = require("../database/models.js");
const {getConfig} = require("./configControler.js");
const {findStudent, updateStudentPensum} = require("./studentsController.js");

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
        await chkStudensPensum();
    });


    return "OK";
}
/////
async function chkTeachersPensum(){
    console.log("hola")
 

}


///

async function chkStudensPensum(){
    let config = await getConfig();
    let schoolYear = config[0].schoolYear;
    let studentList = await findStudent();

    let currentPesum = await getSubjects();
    
    currentPesum.map(data=>{
        let pensumGrade = data.grade;
        let pensumList = data.subjectsList;
      
        studentList.map(student=>{
           if(pensumGrade === student.year && schoolYear === student.schoolYear){
                let studentSubjects = student.subjects;
                pensumList.map(subject=>{
                    if(!(subject in studentSubjects)){ //agrega la materia
                        let newValue = { l1: 0, l2: 0, l3: 0, def: 0 }
                        studentSubjects[subject] = newValue;
                        updateStudentPensum(student.id, studentSubjects);
                    }
                })

                let studentSubjectsList = Object.keys(studentSubjects);
                if(studentSubjectsList.length != pensumList.length){//elimina la materia
                    studentSubjectsList.map(studentSubject =>{
                        if(!pensumList.includes(studentSubject)){
                            delete studentSubjects[studentSubject];
                            updateStudentPensum(student.id, studentSubjects);
                        }
                    })
                }
           }
        })
    });



}



////

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

module.exports = { setSubjects, getGradesList, destroyGrade, getSubjects, chkStudensPensum, chkTeachersPensum };