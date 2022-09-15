const { Payments } = require("../database/models.js");
const { getTutorByCI } = require("./tutorsController.js");
const { findStudent } = require("./studentsController.js");

async function registerPayment({mount, description, cash, bankDepositNumber, banckName, fullpaid, emblem, uniform, month, schoolYear}, ci){

    let checkPaimen = await checkIsPaidmentExist({month, schoolYear},ci);
    if(checkPaimen.error){
        return checkPaimen.error;
    }

    let response = await Payments.create({
        studentCI : ci,
        mount,
        description,
        cash,
        bankDepositNumber,
        banckName,
        fullpaid,
        emblem,
        uniform,
        month, 
        schoolYear
    });

    return response;
}
//

async function checkIsPaidmentExist({month, schoolYear}, ci){
    
    let ask = await Payments.findAll({where:{studentCI:ci}});

    for(register of ask){
        if(register.month != 0 && register.month == month && register.schoolYear == schoolYear){
            return {error: `Ya existe un pago para el mes ${register.month} del año ${register.schoolYear}`}
        }
    }

    return {message: "OK"}

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
module.exports = { registerPayment, getAllStudentPayment, getTutorPaymentData, checkIsPaidmentExist };