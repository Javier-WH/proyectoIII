const table = document.getElementById("student-table");
let StudentList = [];

export function getSudentList() {
    return StudentList;
}
export function setStudentList(list) {
    StudentList = list;
}
export function cleanInputs() {
    document.getElementById("filter-modal-ci").value = "";
    document.getElementById("filter-modal-name").value = "";
    document.getElementById("filter-modal-lastName").value = "";
    document.getElementById("filter-modal-seccion").value = "";
    document.getElementById("filter-modal-year").value = "";;
}
//llena el periodo escolar al iniciar la ventana
function fillSchollYear() {
    let schoolYearFilter = document.getElementById("filter-modal-schoolYear");
    let schoolYear = document.getElementById("btn-school-year");

    schoolYearFilter.value = schoolYear.value;

}

export async function findStudentList() {
    fillSchollYear();
    document.getElementById("studentList-modal-title").innerText = "Lista de Estudiantes Inscritos"
    document.getElementById("studentList-modal-title").classList.remove("pre");
    document.getElementById("studentList-modal-title").classList.remove("teach");
    cleanInputs();
    document.getElementById("filter-modal-seccion").disabled = false
    table.innerHTML = `<tr><td class="spinner-border text-secondary" role="status" colspan="5"><span class="visually-hidden">Loading...</span></td></tr>`
    document.getElementById("studenList-modal").classList.remove("invisible");
    let ask = await fetch("/Estudiante", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({})
    })
    let response = await ask.json();
    StudentList = response;
    fillTable(StudentList);
}

export function filterList() {
    filterStudentList();
}
//llena la tabla de estudiantes
export function fillTable(list, id = "std-") {

    let num = 1;
    let html = "";
    list.map(student => {

        html += `
            <tr id="${id}${student.id}">
                <th scope="row">${num++}</th>
                <td class="findStudentCI"><div>${student.CI}</div></td>
                <td>${student.lastName}</td>
                <td>${student.names}</td>
                <td class="year">${student.year}</td>
                <td class="seccion">${student.seccion? student.seccion : "N/A"}</td>
            </tr>
        `
    })
    table.innerHTML = html

    if (document.getElementById("studentList-modal-title").classList.contains("teach")) {
        hideSeccion(true);
        hideYear(true)
    } else if (document.getElementById("studentList-modal-title").classList.contains("pre")) {
        hideSeccion(true);
    } else {
        hideSeccion(false);
        hideYear(false)
    }




}
//establece los criterios de busqueda
function getFilterCriteria() {
    let criteria = ""
    if (document.getElementById("filter-modal-name").value.length > 0) {
        if (criteria.length > 0) {
            criteria += ` && student.names.toLowerCase().includes(name) `
        } else {
            criteria += `student.names.toLowerCase().includes(name)`
        }
    }
    if (document.getElementById("filter-modal-lastName").value.length > 0) {
        if (criteria.length > 0) {
            criteria += ` && student.lastName.toLowerCase().includes(lastName)`
        } else {
            criteria += `student.lastName.toLowerCase().includes(lastName)`
        }
    }
    if (document.getElementById("filter-modal-seccion").value.length > 0) {

        if (criteria.length > 0) {
            criteria += `&& student.seccion.toLowerCase() == seccion`

        } else {
            criteria += `student.seccion.toLowerCase() == seccion`

        }
    }
    if (document.getElementById("filter-modal-year").value.length > 0) {

        if (criteria.length > 0) {
            criteria += ` && student.year == year`

        } else {
            criteria += `student.year == year`

        }
    }
    if (document.getElementById("filter-modal-ci").value.length > 0) {
        if (criteria.length > 0) {
            criteria += ` && ("" + student.CI).includes(ci)`

        } else {
            criteria += `("" + student.CI).includes(ci)`
        }
    }
    //
    if (document.getElementById("filter-modal-schoolYear").value.length > 0) {
        if (criteria.length > 0) {
            criteria += ` && ("" + student.schoolYear).includes(schoolYear)`

        } else {
            criteria += `("" + student.schoolYear).includes(schoolYear)`
        }
    }

    return criteria
}
///////////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<add feature
//aplica los filtros
function filterStudentList() {
    let ci = document.getElementById("filter-modal-ci").value;
    let name = document.getElementById("filter-modal-name").value.toLowerCase();
    let lastName = document.getElementById("filter-modal-lastName").value.toLowerCase();
    let seccion = document.getElementById("filter-modal-seccion").value.toLowerCase();
    let year = document.getElementById("filter-modal-year").value;
    let schoolYear = document.getElementById("filter-modal-schoolYear").value;


    let filteredList = StudentList.filter(student => {
        if (eval(getFilterCriteria())) {
            return student;
        }
    });

    if (ci != "" || name != "" || lastName != "" || seccion != "" || year != "" || schoolYear != "") {
        if (filteredList.length > 0) {
            if (document.getElementById("studentList-modal-title").classList.contains("pre-")) {
                fillTable(filteredList, "pre-");
            } else if (document.getElementById("studentList-modal-title").classList.contains("teach-")) {
                fillTable(filteredList, "teach-");
            } else {
                fillTable(filteredList);
            }

        } else {
            table.innerHTML = `
            <tr>
                <th scope="row" colspan = "6">No se encuentran estudiantes que cumplan los criterios de busqueda seleccionados</th>
            </tr>
            `
        }

    } else {
        if (document.getElementById("studentList-modal-title").classList.contains("pre")) {
            fillTable(StudentList, "pre-");

        } else if (document.getElementById("studentList-modal-title").classList.contains("teach-")) {
            fillTable(StudentList, "teach-");
        } else {
            fillTable(StudentList);
        }
    }
}



export function hideSeccion(bool) {
    let seccion = document.getElementsByClassName("seccion");

    if (bool) {
        for (let sec of seccion) {
            sec.style.display = "none"
        }
    } else {
        for (let sec of seccion) {
            sec.style.display = "table-cell"
        }
    }

}

export function hideYear(bool) {
    let year = document.getElementsByClassName("year");

    if (bool) {
        for (let anno of year) {
            anno.style.display = "none"
        }
    } else {
        for (let anno of year) {
            anno.style.display = "table-cell"
        }
    }

}