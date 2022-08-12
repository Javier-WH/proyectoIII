import { upload } from "./newScripts/uploadStudentPhoto.js";
import { getStudentPhoto } from "./newScripts/downloadStudentPhoto.js"

const tabs = document.getElementsByClassName("nav-link");


let tutorID = "";
let tutorCI = "";
renderSelectedTab();

// window.addEventListener("beforeunload", () => {
//     fetch("/logout")

// });
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


function cleanSelectedTabs() {
    for (let tab of tabs) {
        tab.classList.remove("active");
    }
}

document.getElementById("nav-tabs").addEventListener("click", e => {
    if (e.target.classList.contains("nav-link")) {
        cleanSelectedTabs();
        e.target.classList.add("active");
        renderSelectedTab();
    }

});

function renderSelectedTab() {

    document.getElementById("grades-pannel").classList.add("invisible");
    document.getElementById("inscription-pannel").classList.add("invisible");
    document.getElementById("option-pannel").classList.add("invisible");

    if (document.getElementById("tab-grades").classList.contains("active")) {

        document.getElementById("grades-pannel").classList.remove("invisible")

    } else if (document.getElementById("tab-inscription").classList.contains("active")) {

        document.getElementById("inscription-pannel").classList.remove("invisible");

    } else if (document.getElementById("tab-options").classList.contains("active")) {

        document.getElementById("option-pannel").classList.remove("invisible")

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Ha ocurrido un error inesperado",

        });
    }
}

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

function cleanStudentData() {
    document.getElementById("student-name").value = "";
    document.getElementById("student-lastName").value = "";
    document.getElementById("student-ci").value = "";
    document.getElementById("genderM").checked = true;
    document.getElementById("year").value = "";
    document.getElementById("student-age").value = "";
}
async function getSchoolYear() {
    let data = await fetch("/getConfig", {
        method: "POST"
    });
    let response = await data.json();

    return response[0].schoolYear;

}

document.getElementById("btn-preinscribir").addEventListener("click", async e => {
    e.preventDefault();
    let data = {
        names: document.getElementById("student-name").value,
        lastName: document.getElementById("student-lastName").value,
        ci: document.getElementById("student-ci").value,
        gender: document.getElementById("genderM").checked ? "M" : "F",
        year: document.getElementById("year").value,
        age: document.getElementById("student-age").value,
        parentID: tutorID,
        schoolYear: await getSchoolYear() ///////////////////////////////////////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<<
    }

    let ask = await fetch("/Estudiante/pre", {
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
            title: 'Denegado',
            text: response.ERROR
        })

    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La pre-inscripción se realizó con exito',
            showConfirmButton: false,
            timer: 1500
        })
    }

});


async function fillStudentDropBox() {
    let ask = await fetch("/Estudiante", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ parentID: tutorID })
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
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<CONTINUAR DESDE AQUI
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

        Swal.fire({
            title: "No se ha encontrado ningun estudiante inscrito en esta cuenta",
            text: "¿Desea pre-inscribir un estudiante",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("tab-inscription").click();
            }
        })
    }
};



fillTutorName();

document.getElementById("btn-upload-photo").addEventListener("click", () => {
    let id = document.getElementById("students-dropbox").value;
    upload(id);
})