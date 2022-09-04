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
let hadCI = document.getElementById("hadCI");
let tutorID = "";

window.scrollTo(1,1);
//boton regresar
document.getElementById("d-flex").addEventListener("click", e=>{
    e.preventDefault();
    location.href = "/config";
});

////
hadCI.addEventListener("change", e=>{
    if(e.target.checked){
        ci.value = "";
        ci.classList.add("disabled");
    }else{
        ci.classList.remove("disabled");
    }
})

/////
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
        deposito.value = "";
        bank.selectedIndex = 0;
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
    hadCI.checked = false;
}

/////



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
    let tutorName = document.getElementById("tutorNamex");

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

function checkData(){
    let data = {
        missing: false,
        missingData:"Ninguno"
    }
    if(name.value == ""){
        data.missing = true;
        data.missingData = "el nombre del alumno";
        return data;
    }
    if(lastName.value == ""){
        data.missing = true;
        data.missingData = "el apellido del alumno";
        return data;
    }
    if(!hadCI.checked && ci.value == ""){
        data.missing = true;
        data.missingData = "la cédula del alumno";
        return data;
    }
    if(motherName.value == ""){
        data.missing = true;
        data.missingData = "el nombre de la madre";
        return data;
    }
    if(motherCI.value == ""){
        data.missing = true;
        data.missingData = "la cédula de la madre";
        return data;
    }
    if(motherWork.selectedIndex == 0 || (motherWork.value == 0 && motherWork2.value == "")){
        data.missing = true;
        data.missingData = "la ocupación de la madre";
        return data;
    }
    if(fatherName.value == ""){
        data.missing = true;
        data.missingData = "el nombre de el padre";
        return data;
    }
    if(fatherCI.value == ""){
        data.missing = true;
        data.missingData = "la cédula de el padre";
        return data;
    }

    if(fatherWork.selectedIndex == 0 || (fatherWork.value == 0 && fatherWork2.value == "") ){
        data.missing = true;
        data.missingData = "la ocupación de el padre";
        return data;
    }
    if(age.value == ""){
        data.missing = true;
        data.missingData = "la edad del alumno";
        return data;
    }
    if(address.value == ""){
        data.missing = true;
        data.missingData = "una dirección";
        return data;
    }
    if(grade.selectedIndex == 0){
        data.missing = true;
        data.missingData = "un grado escolar para el alumno";
        return data;
    }
    if(procedende.selectedIndex == 0 || (procedende.value == 0 && procedenceName.value =="")){
        data.missing = true;
        data.missingData = "una institución anterior";
        return data;
    }
    if(mount.value == ""){
        data.missing = true;
        data.missingData = "un pago";
        return data;
    }
    if(rdbDeposito.checked && deposito.value == 0){
        data.missing = true;
        data.missingData = "un numero de deposito bancario";
        return data;
    }
    if(rdbDeposito.checked &&  bank.selectedIndex == 0){
        data.missing = true;
        data.missingData = "un banco valido";
        return data;
    }
    return data;
}

////
document.getElementById("btn-accept").addEventListener("click", async e =>{
    e.preventDefault();

    let studentData = checkData();
    if(studentData.missing){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `No ha suministrado ${studentData.missingData}`
        });
        return;
    }
    let paymentData ={
        studentCI: ci.value,
        mount: mount.value,
        description: "Pago preinscripción",
        currency: rdbBs.checked ? "BS" : "USD",
        cash: rdbEfectivo.checked ? true : false,
        bankDepositNumber: rdbEfectivo.checked ? "No suministrado" : deposito.value,
        banckName:  rdbEfectivo.checked ? "No suministrado" : bank.value
    }

    let auxiliarData ={
        studentCI: ci.value == "" ? "No suministrado" : ci.value,
        allergies: allergies.value == "" ? "No suministrado" : allergies.value,
        bloodType: bloodType.selectedIndex == 0 ? "No suministrado" : (`${bloodType.value}, ${rh.checked ? "RH-Posirivo" : "RH-negativo"}`),
        medical_problems: medicalProblems.value == "" ? "No suministrado" : medicalProblems.value,
        observatios: observations.value == "" ? "No suministrado" : observations.value,
        talents: talents.value == "" ? "No suministrado" : talents.value
    }


    let data = {
        names: name.value,
        lastName: lastName.value,
        ci: hadCI.checked ? tutorID : ci.value,
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
        procedence: procedende.value !=0 ? procedende.value : procedenceName.value,
        paymentData,
        auxiliarData
    }

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
        container.classList.add("invisible");
        tutorCI.value = "";
        window.scrollTo(1,1);
    }
})
