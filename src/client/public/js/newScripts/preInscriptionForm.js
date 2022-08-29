const tutorCI = document.getElementById("tutorCI");
const name = document.getElementById("studentName");
const lastName = document.getElementById("studentLastName");
const ci = document.getElementById("studentCI");
const motherName = document.getElementById("studentMotherName");
const motherCI = document.getElementById("motherCI");  
const fatherName = document.getElementById("studentFatherName");
const fatherCI = document.getElementById("fatherCI");  
const maleGender = document.getElementById("rdb-masculino");
const age = document.getElementById("age");
const address = document.getElementById("address");
const grade = document.getElementById("grade");
const mount = document.getElementById("mount");
const rdbBs = document.getElementById("rdb-bs");
const rdbDeposito = document.getElementById("rdb-deposito");
const rdbEfectivo = document.getElementById("rdb-efectivo");
const deposito = document.getElementById("checkNumber");
const bank =  document.getElementById("bank");
const bloodType = document.getElementById("bloodType");
const rh = document.getElementById("rh");
const allergies = document.getElementById("allergies");
const medicalProblems = document.getElementById("medicalProblems");
const observations = document.getElementById("observations");
const talents = document.getElementById("talents");
const container = document.getElementById("data-container");
let tutorID = "";

//boton regresar
document.getElementById("user-container").addEventListener("click", e=>{
    e.preventDefault();
    location.href = "/config";
});

////
rdbDeposito.addEventListener("change", ()=>{
    if(rdbDeposito.checked){
        deposito.classList.remove("disabled");
        bank.classList.remove("disabled");
    }
})

rdbEfectivo.addEventListener("change", ()=>{
    if(rdbEfectivo.checked){
        deposito.classList.add("disabled");
        bank.classList.add("disabled");
    }
})
//

tutorCI.addEventListener("keyup", ()=>{
    displayTutorName();
    container.classList.add("disabled");
})

//
function cleanAllData(){
    name.value = "";
    lastName.value = "";
    ci.value = "";
    motherName.value = "";
    motherCI.value = "";
    fatherName.value = "";
    fatherCI.value = "";
    maleGender.checked = true;
    age.value = "";
    address.value = "";
    grade.selectedIndex = 0;
    mount.value = "";
    rdbBs.checked = true;
    rdbDeposito.checked = true;
    deposito.value="";
    bank.selectedIndex = 0;
    bloodType.selectedIndex = 0;
    rh.checked = true;
    allergies.value = "";
    medicalProblems.value = "";
    observations.value = "";
    talents.value = "";
}

///
async function getTutor(CI){
    
    let ask = await fetch("/tutor", {
        method: "POST",
        headers:{
            "Content-type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({CI})
    })

    return await ask.json();
}

///
function displayTutorName(name = ""){
    let nameContainer = document.getElementById("tutorName-container");
    let tutorName = document.getElementById("tutorName");

    if(name == ""){
        nameContainer.classList.add("invisible");
        tutorName.value = "";
        return;
    }

    nameContainer.classList.remove("invisible");
    tutorName.value = name;
}

//

async function preinscribeStudent(data){

    let ask = await fetch("/Estudiante/pre", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"*/*"
        },
        body: JSON.stringify(data)
    });

    return await ask.json();
}

////

document.getElementById("btn-ci-next").addEventListener("click", async e=>{
    e.preventDefault();
    let tutorData = await getTutor(tutorCI.value);
    if(tutorData.MESSAJE){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: tutorData.MESSAJE
        });
        displayTutorName();
        cleanAllData();
        container.classList.add("disabled");
        return;
    }
    displayTutorName(`${tutorData.lastName} ${tutorData.names}`)
    container.classList.remove("disabled");
    tutorID = tutorData.id;
});

////


document.getElementById("btn-accept").addEventListener("click", async e =>{
    e.preventDefault();

    let data = {
        names: name.value,
        lastName: lastName.value,
        ci: ci.value,
        motherName: motherName.value,
        motherCI: motherCI.value,
        fatherName: fatherName.value,
        fatherCI: fatherCI.value,
        gender: maleGender.checked ? "M" : "F",
        year: grade.value,
        age: age.value,
        address: address.value,
        tutorID
    }
  ///////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<----------------- falta registrar el pago
    let response = await preinscribeStudent(data);
    if(response.Error){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.Error
        });

    }else{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La preinscripción se ha realizado con exito',
            timer: 1500
          })
        displayTutorName();
        cleanAllData();
        container.classList.add("disabled");
    }
})