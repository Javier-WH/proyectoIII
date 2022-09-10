
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
tutorCI.addEventListener("keyup", e=>{ if(e.key != "Enter")cleanData();})

function loadingBar(show){
    let load =   document.getElementById("load");
    let loadingBar = document.getElementById("loadingBar");
    load.style.width = "1%"
    if(!show){
        loadingBar.classList.add("invisible");
    }
    else{
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
tutorCI.addEventListener("keypress", e=>{
    if(e.key == "Enter"){
        search();
    }
})

async function search(){
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

function hideData(flag){
    if(flag){
        document.getElementById("tutor-data-container").classList.add("invisible");
        document.getElementById("table-container").classList.add("invisible");
    }else{
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
function checkUpDatePayment(payments){
    if(!Array.isArray(payments)){
        return false;
    }
    let response = false;
    let currentMont = new Date().getMonth() + 1;

    payments.map(payment=>{
       let monthPaidment = payment.month;
       let creatredAt = payment.createdAt;

       if(monthPaidment != undefined && monthPaidment == true){
            let month = new Date(creatredAt).getMonth() + 1;
            if(month == currentMont){
                response =  true;
            }
       }
    })

    return response;
}


function fillTable(registers){
    let html ="";
    registers.map(register=>{
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
        if(isUpDate){
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


