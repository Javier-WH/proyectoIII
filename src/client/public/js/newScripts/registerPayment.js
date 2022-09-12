document.getElementById("d-flex").addEventListener("click", e => { e.preventDefault(); location.href = "/config"; });
import {getStudentPhoto} from "./downloadStudentPhoto.js";
let studentCIinput = document.getElementById("student-ci");
let studentName = document.getElementById("student-name");
let studentLastName = document.getElementById("student-lastName");
let studentGender = document.getElementById ("student-gender");
let studentSecction = document.getElementById("student-secction");
let studentGrade = document.getElementById("student-grade");
let auxContainer = document.getElementById("aux-container");

fillStudentData(0);

async function getStudent(ci){
    let ask = await fetch("/Estudiante", {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({CI:ci})
    })
    let response = await ask.json();
    if(response.length > 0){
        return response[0];
    }
    return {error: "La cedula no está registrada en el sistema"}
}

function showData(flag){

    if(flag){
        auxContainer.classList.remove("invisible");
    }else{
        auxContainer.classList.add("invisible");
        cleanData();
    }

}

studentCIinput.addEventListener("keyup", ()=>{
    showData(false);
})

function cleanData(){
    studentName.innerText = "";
    studentLastName.innerText ="";
    studentGender.innerText = "";
    studentSecction.innerText ="";
    studentGrade.innerText = "";
}

async function fillStudentData(ci){
    let studentData = await getStudent(ci);
    if(studentData.error){
        showData(false);
        return
    }
    showData(true);
    let imgData = URL.createObjectURL( await(getStudentPhoto(studentData.id)));
    document.getElementById("student-photo").src = imgData;
    studentCIinput.value = studentData.CI;
    studentName.innerText = studentData.names;
    studentLastName.innerText = studentData.lastName;
    studentGender.innerText = studentData.gender == "M" ? "Masculino" : "Femenino";
    studentSecction.innerText = `Sección - ${studentData.seccion.toUpperCase()}`;
    studentGrade.innerText = `${studentData.year}° Grado`;
}
