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
const deposito = document.getElementById("checkNumber");
const bank =  document.getElementById("bank");
const bloodType = document.getElementById("bloodType");
const rh = document.getElementById("rh");
const allergies = document.getElementById("allergies");
const medicalProblems = document.getElementById("medicalProblems");
const observations = document.getElementById("observations");
const talents = document.getElementById("talents");

//boton regresar
document.getElementById("user-container").addEventListener("click", e=>{
    e.preventDefault();
    location.href = "/config";
});

////

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

document.getElementById("btn-ci-next").addEventListener("click", e=>{
    e.preventDefault()

    //// continuar desde aqui.


})