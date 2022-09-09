const { Payments } = require("../database/models.js");
const { getTutorByCI } = require("./tutorsController.js");
const { findStudent } = require("./studentsController.js");

async function registerPayment({mount, description, cash, bankDepositNumber, banckName, fullpaid, emblem, uniform}, ci){

    let response = await Payments.create({
        studentCI : ci,
        mount,
        description,
        cash,
        bankDepositNumber,
        banckName,
        fullpaid,
        emblem,
        uniform
    });

    return response;
}
//

async function getAllStudentPayment(ci){
    let response = await Payments.findAll({where:{  studentCI : ci }});
    if(response.length <= 0){
        return {error:"no hay pagos relacionados con esa cedula", code: -1};
    }
    return response;
}   
//

async function getTutorPaymentData (tutorCI){
    if(tutorCI == ""){
        return {error:"La cedula está vacia", code: -1}
    }

    //revisa si el tutor existe
    let tutor = await getTutorByCI({CI:tutorCI});
    if(tutor.MESSAJE){
        return {error:tutor.MESSAJE};
    }
    //revisa cuantos alumnos tiene el tutor
    let students = await findStudent({tutorID: tutor.id})
    if(students.length <= 0){
        return {error:"el tutor no tiene alumnos viculados", code:-2};
    }
    //revisa el pago de cada uno de esos alumnos
    let payments = [];
   
    for(student of students){
        let payment = await getAllStudentPayment(student.CI);
        payments.push({student, payment});
    }
    let data = {
        tutor,
        payments
    }
    return data;
}
module.exports = { registerPayment, getAllStudentPayment, getTutorPaymentData };