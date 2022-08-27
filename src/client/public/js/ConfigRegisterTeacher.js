import { getSubjects } from "./newScripts/fillSubjects.js";
export async function registerTeacher() {
    let teacherName = document.getElementById("teacher-names").value;
    let teacherLastName = document.getElementById("teacher-LastNames").value;
    let teacherCI = document.getElementById("teacher-ci").value;
    let isAdmin = document.getElementById("isAdmin");
    let seccionList = document.getElementsByClassName("list-subject");
;
    let dbSubjects = await getSubjects();


    if (teacherName.length > 0 && teacherLastName.length > 0 && teacherCI.length > 0 && seccionList.length > 0) {

        
        let dbSubjectsList = dbSubjects.map(sub => sub.subjectsList).flat(1);
       
        let teacherSubjects = {};
        let subjects = [];

        for (let session of seccionList) {
            let dataSession = session.innerText;
     
            //let subject = dataSession.split(" ")[0];
            let subject ='';
            dbSubjectsList.map(e =>{
                if(dataSession.includes(e)){
                    subject = e
                }
            })
            //

            if (!subjects.includes(subject)) {
                subjects.push(subject)
            }
        }

        for (let subject of subjects) {
            teacherSubjects[subject] = [];
        }

///////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<bug here
        for (let session of seccionList) {
            let dataSession = session.innerText;
            //let array = dataSession.split(" ");
            let subject1 = "";
            let year = "";
            let seccion = "";

            dbSubjectsList.map(e =>{
                if(dataSession.includes(e)){
                    subject1 = e
                    year = dataSession.replace(e, "").substring(1, 2);
                    seccion = dataSession.replace(e, "").substring(3);
                }
                 
            })
      
                   
            for (let subject of subjects) {
                if (subject1 == subject) {
                    teacherSubjects[subject].push(year + seccion);
                    
                }
            }
        }

               

        let data = {
            "userName": teacherName,
            "userLastName": teacherLastName,
            "nickName": "n" + getRandomArbitrary(123, 5000),
            "password": "",
            "ci": teacherCI,
            "gender": "",
            "subject": teacherSubjects,
            "admin": isAdmin.checked,
            "phone": "",
            "email": ""
        }

        let ask = await fetch("/profesor/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(data)
        });

        let response = await ask.json();

        if (response.ERROR) {
            let message = response.ERROR;
            if(response.ERROR.subject){
                message = `${response.ERROR.ERROR}, ${response.ERROR.subject}`
            }
            Swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error',
                text: message,
            });
        } else {
            cleanTeacherData();
            teacherSubjects = {};
            subjects.length = 0;

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha inscrito correctamente al profesor',
                showConfirmButton: false,
                timer: 1500
            });

        }
    } else {
        let error = seccionList.length > 0 ? "Debe llenar todos los campos" : "No ha asignado ninguna materia al profesor";
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: error,
        });

    }


}

function cleanTeacherData() {
    document.getElementById("teacher-names").value = "";
    document.getElementById("teacher-LastNames").value = "";
    document.getElementById("teacher-ci").value = "";
    document.getElementById("isAdmin").checked = false;
    document.getElementById("list-group").innerHTML = "";

}

export function fillSubjectList() {
    let year = document.getElementById("year").value;
    let seccion = document.getElementById("seccion").value;
    let subject = document.getElementById("grade").value;
    let object = document.getElementById(subject + year + seccion);

    if (!object) {
        let html = `
        <li class="list-group-item list-subject" id = "${subject + year + seccion}">${subject} ${year}-${seccion}</li>
        `
        document.getElementById("list-group").innerHTML += html;
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}