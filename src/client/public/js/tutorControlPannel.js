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
}

function cleanStudentData() {
    document.getElementById("student-name").value = "";
    document.getElementById("student-lastName").value = "";
    document.getElementById("student-ci").value = "";
    document.getElementById("genderM").checked = true;
    document.getElementById("year").value = "";
    document.getElementById("student-age").value = "";
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
        parentID: tutorID
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


})


fillTutorName();