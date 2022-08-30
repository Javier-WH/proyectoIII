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
const procedende = document.getElementById("procedence");
const procedenceName = document.getElementById("procedenceName");
const motherWork = document.getElementById("motherWork");
const motherWork2 = document.getElementById("motherWork2");
const fatherWork = document.getElementById("fatherWork");
const fatherWork2 = document.getElementById("fatherWork2");
const studentBirthDay = document.getElementById("studentBirthDay");
const loadingBar = document.getElementById("loadin-bar");
let bar = document.getElementById("progressBar");
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

procedende.addEventListener("change", e=>{
    if(e.target.value == 0){
        procedenceName.classList.remove("disabled");
        procedenceName.classList.remove("invisible");
   
    }else{
        procedenceName.classList.add("disabled");
        procedenceName.classList.add("invisible");
        procedenceName.value = "";
    }
})
///

motherWork.addEventListener("change", e=>{
    if(e.target.value == 0){
        motherWork2.classList.remove("disabled");
        motherWork2.classList.remove("invisible");
   
    }else{
        motherWork2.classList.add("disabled");
        motherWork2.classList.add("invisible");
        motherWork2.value = "";
    }
})
///
fatherWork.addEventListener("change", e=>{
    if(e.target.value == 0){
        fatherWork2.classList.remove("disabled");
        fatherWork2.classList.remove("invisible");
   
    }else{
        fatherWork2.classList.add("disabled");
        fatherWork2.classList.add("invisible");
        fatherWork2.value = "";
    }
})

//
age.addEventListener("keyup", e=>{

   
    let currentYear = new Date().getFullYear();   
    let currentAge = e.target.value;
    let bornYear = currentYear - currentAge;
    
    if(bornYear <= 0 || e.target.value > 120){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La edad suministrada es imposible',
        })
        e.target.value = "";
        setTimeout(() => {///esto corrige un bug
            studentBirthDay.value = "";
        }, 100);
    }
    
    studentBirthDay.value = `${bornYear}-01-01`;
})


//

tutorCI.addEventListener("keyup", ()=>{
    cleanAllData();
    displayTutorName();
    container.classList.add("disabled");
    container.classList.add("invisible");
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
    motherWork.selectedIndex = 0;
    motherWork2.classList.add("disabled");
    motherWork2.classList.add("invisible");
    motherWork2.value = "";
    fatherWork.selectedIndex = 0;
    fatherWork2.classList.add("disabled");
    fatherWork2.classList.add("invisible");
    fatherWork2.value = "";
    studentBirthDay.value = "";
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
    tutorName.innerText = name;
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

    if(tutorCI.value == ""){
        return;
    }
    loadingBar.classList.remove("invisible");
    bar.style.width = `100%`;
    let tutorData = await getTutor(tutorCI.value);
    bar.style.width = `0%`;
    if(tutorData.MESSAJE){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: tutorData.MESSAJE
        });
        displayTutorName();
        cleanAllData();
        container.classList.add("disabled");
        container.classList.add("invisible");
        loadingBar.classList.add("invisible");
        return;
    }
    loadingBar.classList.add("invisible");
    displayTutorName(`${tutorData.lastName} ${tutorData.names}`)
    container.classList.remove("disabled");
    container.classList.remove("invisible");
    tutorID = tutorData.id;
});

////


/*
    names: DataTypes.STRING,
    lastName: DataTypes.STRING,
    CI: DataTypes.INTEGER,
    motherName: DataTypes.STRING,
    motherCI: DataTypes.INTEGER,
    motherWork: DataTypes.STRING,
    fatherName: DataTypes.STRING,
    fatherCI: DataTypes.INTEGER,
    fatherWork: DataTypes.STRING,
    gender: DataTypes.CHAR,
    year: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    birthDay:DataTypes.STRING,
    address: DataTypes.STRING,
    tutorID: DataTypes.INTEGER,
    procedence: DataTypes.STRING,
    schoolYear: DataTypes.STRING

*/

document.getElementById("btn-accept").addEventListener("click", async e =>{
    e.preventDefault();

    let data = {
        names: name.value,
        lastName: lastName.value,
        ci: ci.value,
        motherName: motherName.value,
        motherCI: motherCI.value,
        motherWork: motherWork.value != 0 ? motherWork.value : motherWork2.value,
        fatherName: fatherName.value,
        fatherCI: fatherCI.value,
        fatherWork: fatherWork.value != 0 ? fatherWork.value : fatherWork2.value,
        gender: maleGender.checked ? "M" : "F",
        year: grade.value,
        age: age.value,
        birthDay: studentBirthDay.value,
        address: address.value,
        tutorID,
        procedence: procedende.value !=0 ? procedende.value : procedenceName.value
    }
    console.log(data);
  ///////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<----------------- falta registrar el pago
   /* let response = await preinscribeStudent(data);
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
    }*/
})
