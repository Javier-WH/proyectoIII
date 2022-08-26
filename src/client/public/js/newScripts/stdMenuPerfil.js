export async function enableStdMenuPerfil(studentID) {
    const menu = document.getElementById("std-menu-perfil");
    
  

    menu.addEventListener("click", e => {
        fillperfilStudentData(studentID);
        document.getElementById("std-perfil-container").classList.remove("invisible");
    })
    document.getElementById("std-perfil-close-x").addEventListener("click",()=>{
        document.getElementById("std-perfil-container").classList.add("invisible");
    })
}

async function fillperfilStudentData(id){
    const name = document.getElementById("std-pefil-name");
    const lastName = document.getElementById("std-pefil-lastName");
    const ci = document.getElementById("std-pefil-ci");
    const age = document.getElementById("std-pefil-age");
    const gender = document.getElementById("std-pefil-Gender");

    let studentData = await getStudentData(id);

    name.value = studentData.names;
    lastName.value = studentData.lastName;
    ci.value = studentData.CI;
    gender.value = studentData.gender == "M" ? "Masculino" : "Femenino";
    age.value = `${studentData.age} años`;
    
    fillTutorData(studentData.parentID);
    fillStudentPhoto(id);
}

async function fillTutorData(tutorID){

    let name = document.getElementById("std-pefil-tutorName");
    let ci = document.getElementById("std-pefil-tutorCi");
    let phone = document.getElementById("std-pefil-tutorPhone");
    let address =  document.getElementById("std-pefil-tutorAddress");

    let tutorData = await getTutorData(tutorID);
    if(tutorData.MESSAJE){
        name.value = "Desconocido";
        ci.value = "Desconocido";
        phone.value = "Desconocido";
        address.value = "Desconocido";
        blockTutorData(true);
        return;
    }
    blockTutorData(false);
    name.value = `${tutorData.names} ${tutorData.lastName}`;
    ci.value = tutorData.CI;
    address.value = tutorData.address;
    phone.value = "pendiente";
}

async function fillStudentPhoto(id){
    const studentIMG = document.getElementById("std-perfil-photo");
    let studentPhoto =  await getStudenPhoto(id);

    if(studentPhoto.type == "text/html"){
        studentIMG.src = "svg/placeholder.svg";
    }else{
        studentIMG.src = URL.createObjectURL(studentPhoto);
    }


}

function blockTutorData(opt){
    document.getElementById("std-pefil-tutorName").disabled = opt;
    document.getElementById("std-pefil-tutorCi").disabled = opt;
    document.getElementById("std-pefil-tutorPhone").disabled = opt;
    document.getElementById("std-pefil-tutorAddress").disabled = opt;
}

async function getStudenPhoto(id){
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         id
       });
       
       let response = await fetch("/downloadPhoto", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.blob();
       return data;

}

async function getTutorData(id){

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         id
       });
       
       let response = await fetch("/tutor", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.json();
       return data;

}

async function getStudentData(id) {

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        id
    });

    let response = await fetch("/Estudiante", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    let data = await response.json();
    return data[0];
}