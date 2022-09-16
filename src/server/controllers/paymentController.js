const { Payments } = require("../database/models.js");
const { getTutorByCI } = require("./tutorsController.js");
const { findStudent } = require("./studentsController.js");

async function registerPayment({ mount, description, cash, bankDepositNumber, banckName, fullpaid, emblem, uniform, month, schoolYear }, ci) {

    let checkPaimen = await checkIsPaidmentExist({ month, schoolYear }, ci);
    if (checkPaimen.error) {
        return checkPaimen.error;
    }

    let response = await Payments.create({
        studentCI: ci,
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
function traslateMonth(number) {
    switch (number) {
        case 1:
            return "Enero";
        case 2:
            return "Febrero";
        case 3:
            return "Marzo";
        case 4:
            return "Abril";
        case 5:
            return "Mayo";
        case 6:
            return "Junio";
        case 7:
            return "Julio";
        case 8:
            return "Agosto";
        case 9:
            return "Septiembre";
        case 10:
            return "Octubre";
        case 11:
            return "Noviembre";
        case 12:
            return "Diciembre";
        default:
            return "Desconocido";
    }
}

async function checkIsPaidmentExist({ month, schoolYear }, ci) {

    let ask = await Payments.findAll({ where: { studentCI: ci } });

    for (register of ask) {
        if (register.month == 0) {
            continue;
        }
        if(register.month == month && register.schoolYear == schoolYear ){
            return { error: `Ya existe un pago para ${traslateMonth(register.month)} del año ${register.schoolYear}` }
        }     
    }

    let alowed = isPaymentAlowed(ask, month, schoolYear);
    if(alowed.error){
        return alowed;
    }

    return { message: "OK" }

}

//

function isPaymentAlowed(paymentList, month, schoolYear) {
    if(month == 0){
        return {message:"OK"};
    }
    let registeredMonths = paymentList.map(register => { 
        if(register.schoolYear == schoolYear){
            return register.month;
        }
    });
    if(registeredMonths.length > 0){

        let lastMont = registeredMonths.reduce( (p, v)=>( p > v ? p : v ));
                
        if( (month - lastMont) != 1){
            return {error:`No puede pagar ${traslateMonth(month)} si primero no ha pagado ${traslateMonth(month - 1)}, el ultimo mes pagado fue ${traslateMonth(lastMont)}`};
        }
    }
    return {message:"OK"};

}

async function getAllStudentPayment(ci) {
    let response = await Payments.findAll({ where: { studentCI: ci } });
    if (response.length <= 0) {
        return { error: "no hay pagos relacionados con esa cedula", code: -1 };
    }
    return response;
}
//

async function getTutorPaymentData(tutorCI) {
    if (tutorCI == "") {
        return { error: "La cedula está vacia", code: -1 }
    }

    //revisa si el tutor existe
    let tutor = await getTutorByCI({ CI: tutorCI });
    if (tutor.MESSAJE) {
        return { error: tutor.MESSAJE };
    }
    //revisa cuantos alumnos tiene el tutor
    let students = await findStudent({ tutorID: tutor.id })
    if (students.length <= 0) {
        return { error: "el tutor no tiene alumnos viculados", code: -2 };
    }
    //revisa el pago de cada uno de esos alumnos
    let payments = [];

    for (student of students) {
        let payment = await getAllStudentPayment(student.CI);
        payments.push({ student, payment });
    }
    let data = {
        tutor,
        payments
    }
    return data;
}
module.exports = { registerPayment, getAllStudentPayment, getTutorPaymentData, checkIsPaidmentExist };