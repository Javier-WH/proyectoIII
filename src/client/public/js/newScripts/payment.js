
const tutorCI = document.getElementById("tutor-ci");
const btnSearch = document.getElementById("btn-search");
const tutorName = document.getElementById("tutor-name");
const tutorLastName = document.getElementById("tutor-lastName");
const phone1 = document.getElementById("tutor-phone1");
const phone2 = document.getElementById("tutor-phone2");
const tutorEmail = document.getElementById("tutor-email");
const tutorAge = document.getElementById("tutor-age");
const tutorGender = document.getElementById("tutor-gender");
const tutorInstructionLevel = document.getElementById("tutor-instructionLevel");
const tutorWork = document.getElementById("tutor-work");
const tutorAddress = document.getElementById("tutor-address");
const table = document.getElementById("table");

//evento boton regresar
document.getElementById("d-flex").addEventListener("click", e => { e.preventDefault(); location.href = "/config"; });
//evento de limpiar los datos si se modifica la cedula
tutorCI.addEventListener("keyup", e => { if (e.key != "Enter") cleanData(); })

function loadingBar(show) {
    let load = document.getElementById("load");
    let loadingBar = document.getElementById("loadingBar");
    load.style.width = "1%"
    if (!show) {
        loadingBar.classList.add("invisible");
    }
    else {
        loadingBar.classList.remove("invisible");
        load.style.width = "100%"
    }

}

async function getTutorData(ci) {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({ ci });

    let response = await fetch("/getTutorPaymentInfo", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    let data = await response.json();
    return data;
}


//evento del boton buscar
btnSearch.addEventListener("click", search);
tutorCI.addEventListener("keypress", e => {
    if (e.key == "Enter") {
        search();
    }
})

async function search() {
    loadingBar(true)

    if (tutorCI.value == "") {
        return;
    }
    let tutorData = await getTutorData(tutorCI.value);

    loadingBar(false);

    if (tutorData.error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: tutorData.error,
        })
        cleanData();
        return;
    }
    fillData(tutorData);
}

function hideData(flag) {
    if (flag) {
        document.getElementById("tutor-data-container").classList.add("invisible");
        document.getElementById("table-container").classList.add("invisible");
    } else {
        document.getElementById("tutor-data-container").classList.remove("invisible");
        document.getElementById("table-container").classList.remove("invisible");
    }
}

function cleanData() {
    tutorName.innerText = "";
    tutorLastName.innerText = "";
    phone1.innerText = "";
    phone2.innerText = "";
    tutorEmail.innerText = "";
    tutorAge.innerText = "";
    tutorGender.innerText = "";
    tutorInstructionLevel.innerText = "";
    tutorWork.innerText = "";
    tutorAddress.innerText = "";
    table.innerHTML = "";
    hideData(true);
}


function fillData({ tutor, payments }) {
    tutorName.innerText = tutor.names;
    tutorLastName.innerText = tutor.lastName;
    phone1.innerText = tutor.phone;
    phone2.innerText = tutor.phone2;
    tutorEmail.innerText = tutor.email;
    tutorAge.innerText = tutor.age;
    tutorGender.innerText = tutor.gender;
    tutorInstructionLevel.innerText = tutor.instruction;
    tutorWork.innerText = tutor.work;
    tutorAddress.innerText = tutor.address;

    fillTable(payments);
    hideData(false);
}

/////
function checkUpDatePayment(payments) {
    let response = {
        isUpdate: false,
        month:{
            September: false,
            Octuber: false,
            November: false,
            December: false,
            January: false,
            February: false,
            March: false,
            April: false,
            May: false,
            June: false,
            July: false,
            August: false
        }
    }

    if (!Array.isArray(payments)) {
        return response;
    }



    let currentMont = new Date().getMonth() + 1;
    let currentYear = new Date().getUTCFullYear();
    
  
    payments.map(payment => {
        let paymentMonth = payment.month;
        let paymentYear = new Date(payment.createdAt).getUTCFullYear();
        
        if(paymentMonth == 9 && currentYear == paymentYear ){
            response.month.September = true;
            if(paymentMonth == currentMont){
                response.isUpdate = true;
            }

        }
        if(paymentMonth == 10 && currentYear == paymentYear ){
            response.month.Octuber = true;
            if(paymentMonth == currentMont){
                response.isUpdate = true;
            }
        }
        if(paymentMonth == 11 && currentYear == paymentYear ){
            response.month.November = true;
            if(paymentMonth == currentMont){
                response.isUpdate = true;
            }
        }
        if(paymentMonth == 12 && currentYear == paymentYear ){
            response.month.December = true;
            if(paymentMonth == currentMont){
                response.isUpdate = true;
            }
        }
        if(paymentMonth == 1 && currentYear == paymentYear ){
            response.month.January = true;
            if(paymentMonth == currentMont){
                response.isUpdate = true;
            }
        }
        if(paymentMonth == 2 && currentYear == paymentYear ){
            response.month.February = true;
            if(paymentMonth == currentMont){
                response.isUpdate = true;
            }
        }
        if(paymentMonth == 3 && currentYear == paymentYear ){
            response.month.March = true;
        }
        if(paymentMonth == 4 && currentYear == paymentYear ){
            response.month.April = true;
            if(paymentMonth == currentMont){
                response.isUpdate = true;
            }
        }
        if(paymentMonth == 5 && currentYear == paymentYear ){
            response.month.May = true;
            if(paymentMonth == currentMont){
                response.isUpdate = true;
            }
        }
        if(paymentMonth == 6 && currentYear == paymentYear ){
            response.month.June = true;
            if(paymentMonth == currentMont){
                response.isUpdate = true;
            }
        }
        if(paymentMonth == 7 && currentYear == paymentYear ){
            response.month.July = true;
            if(paymentMonth == currentMont){
                response.isUpdate = true;
            }
        }
        if(paymentMonth == 8 && currentYear == paymentYear ){
            response.month.August = true;
            if(paymentMonth == currentMont){
                response.isUpdate = true;
            }
        }
        
    })
    return response;
}


function fillTable(registers) {
    let html = "";
    registers.map(register => {
        let student = register.student;
        let ci = student.CI;
        let name = student.names;
        let lastName = student.lastName;
        let grade = student.year;
        let seccion = student.seccion;

        let payment = register.payment;
        let isUpDate = checkUpDatePayment(payment);
        let htmlclass = "deb";
        let message = "pago pendiente";

        if (isUpDate.isUpdate) {
            htmlclass = "update";
            message = "al dia";
        }

        html += `
        <tr id="student${student.id}" class="student ${htmlclass}">
            <td>${ci}</td>
            <td>${name}</td>
            <td>${lastName}</td>
            <td>${grade}</td>
            <td>${seccion}</td>
            <td>${message}</td>
        </tr>`
    })

    table.innerHTML = html;
}


