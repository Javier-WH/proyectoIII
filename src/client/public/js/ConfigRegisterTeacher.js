export async function registerTeacher() {
    let teacherName = document.getElementById("teacher-names").value;
    let teacherLastName = document.getElementById("teacher-LastNames").value;
    let teacherCI = document.getElementById("teacher-ci").value;
    let isAdmin = document.getElementById("isAdmin");
    let teacherSubjects = {};

    let seccionList = document.getElementsByClassName("list-subject");
    let subjects = [];

    for (let session of seccionList) {
        let dataSession = session.innerText;
        let subject = dataSession.split(" ")[0];
        if (!subjects.includes(subject)) {
            subjects.push(subject)
        }
    }

    for (let subject of subjects) {
        teacherSubjects[subject] = [];
    }


    for (let session of seccionList) {
        let dataSession = session.innerText;
        let array = dataSession.split(" ");
        let subject1 = array[0];
        let year = array[1][0];
        let seccion = array[1][2];

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
        Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: response.ERROR,
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