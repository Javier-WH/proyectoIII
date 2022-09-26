import { upload } from "./newScripts/uploadStudentPhoto.js";
import { getStudentPhoto } from "./newScripts/downloadStudentPhoto.js"

const tabs = document.getElementsByClassName("nav-link");


let tutorID = "";
let tutorCI = "";



document.getElementById("year").addEventListener("change", e => {
    let label = document.getElementById("lbl-year");
    let value = e.target.value;
    let year = "";
    switch (value) {
        case "1":
            year = "Primer año";
            break;
        case "2":
            year = "Segundo año";
            break;
        case "3":
            year = "Tercer año";
            break;
        case "4":
            year = "Cuarto año";
            break;
        case "5":
            year = "Quinto año";
            break;
        default:
            break;
    }
    label.innerText = year;

})



async function fillTutorName() {

    let ask = await fetch("/tutor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        }
    });
    let response = await ask.json();

    tutorID = response.id;
    tutorCI = response.CI;

    document.getElementById('user-name').innerHTML = `
                    <li class="nav-item dropdown" id="">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown-teacherName" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ${response.lastName} ${response.names}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown" id="seccion-box-teacherName">
                            
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <a class="dropdown-item" href="/logout" id = "logout">Logout</a>
                            </li>
                        </ul>
                    </li>

    `;

    fillStudentDropBox();
}






async function fillStudentDropBox() {
    let ask = await fetch("/Estudiante", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ tutorID })
    });

    let response = await ask.json();

    if (response.length > 0) {
        let html = "";

        for (let student of response) {

            html += `
                 <option value="${student.id}" >${student.lastName} ${student.names}</option>
            `
        }
        document.getElementById("students-dropbox").innerHTML = html;
    } else {
        document.getElementById("students-dropbox").innerHTML = "No existen estudiantes inscritos en esta cuenta"
    }
    fillStudentGrades(document.getElementById("students-dropbox").value);
    loadPhoto();
};


document.getElementById("students-dropbox").addEventListener("change", async e => {
    await fillStudentGrades(e.target.value)
    loadPhoto();
});

async function loadPhoto() {

    let photo = document.getElementById("file-image");
    let id = document.getElementById("students-dropbox").value
    let blobData = await getStudentPhoto(id);

    if (blobData.type == "text/html") {
        photo.classList.add("hidden");
        document.getElementById('start').classList.remove("hidden");
        photo.src = "";
    } else {
        let imgData = URL.createObjectURL(blobData);
        photo.classList.remove("hidden");
        document.getElementById('start').classList.add("hidden");
        photo.src = imgData;
    }
}

async function getStudentData(id) {

    let ask = await fetch("/Estudiante", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ id })
    });

    let response = await ask.json();

    return new Promise((res, rej) => {
        res(response[0]);
        rej({ ERROR: "Ha ocurrido un error al intentar acceder al estudiante" })
    })
};

async function fillStudentGrades(id) {
    let ask = await getStudentData(id);
    if (ask) {
    
        let subjects = ask.subjects;
        let html = "";
        if (subjects == null) {
            html += `<tr>`;
            html += `<th scope="row" colspan="5">Aún no se han subido notas para este estudiante</th>`;
            html += `</tr>`;

        } else {

            let keys = Object.keys(subjects)

            for (let i = 0; i < keys.length; i++) {
                html += `<tr>`;
                html += `<th scope="row">${keys[i]}</th>`;
                if (subjects[keys[i]].l1) {
                    html += `<td>${subjects[keys[i]].l1}</td>`;
                } else {
                    html += `<td>n/a</td>`;
                }
                if (subjects[keys[i]].l2) {
                    html += `<td>${subjects[keys[i]].l2}</td>`;
                } else {
                    html += `<td>n/a</td>`;
                }
                if (subjects[keys[i]].l3) {
                    html += `<td>${subjects[keys[i]].l3}</td>`;
                } else {
                    html += `<td>n/a</td>`;
                }
                if (subjects[keys[i]].def) {
                    html += `<td>${subjects[keys[i]].def}</td>`;
                } else {
                    html += `<td>n/a</td>`;
                }
                html += `</tr>`;
            }
        }
        document.getElementById("table").innerHTML = html;
        document.getElementById("title-student-name").innerHTML = `
                                <span>Nombre: ${ask.lastName} ${ask.names}</span>
                                <span>C.I.: ${ask.CI}</span>
                                <span>Seccion: ${ask.year}${ask.seccion}</span>`;

    } else {
        document.getElementById("title-student-name").innerHTML = `
                                <span>No se ha encontrado ningun estudiante inscrito en esta cuenta</span>
                                <span></span>
                                <span></span>`;
        document.getElementById("photo-container").hidden = "true"
    }
};



fillTutorName();

document.getElementById("btn-upload-photo").addEventListener("click", () => {
    let id = document.getElementById("students-dropbox").value;
    upload(id);
})