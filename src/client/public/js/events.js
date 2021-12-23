import { fetchStudentList } from './fetch.js';
import { makeSeccions, fillSeccionBox, getSeccion } from './setSeccions.js';
import { fillSeccionList } from './setStudentsList.js';
import { fillStudentData, fillTitleSeccion } from './fillStudenData.js';


let SELECTED = ''
let changedList = [];


export function loadEvents(StudentList) {
    setSelected(`std-${StudentList[0].id}`);

    //cambia la sección cuando se selecciona una nueva en el dropbox
    document.getElementById("seccion-box").addEventListener("click", async e => {
        if (e.target.classList.contains("dropdown-item")) {

            // if (changedList.length > 0) {
            //     alert("No ha guardado los cambios")
            // }


            let data = e.target.innerText.split(" ");
            let subject = data[0];
            let year = data[1][0];
            let seccion = data[1][1];

            let studentList = await fetchStudentList({ seccion, year }); //obtiene la lista de estudiantes
            fillSeccionList({ subject }, studentList); //llena la lista de los estudiantes
            fillTitleSeccion({ seccion, subject, year }); //llena el titulo
            fillStudentData(studentList[0], { subject }); //llena los datos el alumno
            setSelected(`std-${studentList[0].id}`);
            StudentList = studentList;
        }
    });

    //evento al hacer click en un estudiante de la lista

    document.getElementById("studentList").addEventListener("click", e => {
        let rowID = e.target.parentElement.id;
        setSelected(rowID)
        rowID = rowID.replace("std-", "");
        let studentRow = StudentList.filter(data => data.id == rowID);
        let subject = document.getElementById('seccion-title').innerText.toLowerCase().split(" ")[0];


        let studenData = {
            names: studentRow[0].names,
            lastName: studentRow[0].lastName,
            CI: studentRow[0].CI,
            subjects: {
                [subject]: {
                    "l1": document.getElementById("lapso1-" + rowID).innerText,
                    "l2": document.getElementById("lapso2-" + rowID).innerText,
                    "l3": document.getElementById("lapso3-" + rowID).innerText
                }
            }
        };

        fillStudentData(studenData, { subject });
    });


    ///eventos de navegacion por la lista de estudiantes
    document.getElementById("arrowForward").addEventListener("click", nextStudent);

    document.getElementById("arrowBack").addEventListener("click", previusStudent);

    window.addEventListener("keydown", e => {
            if (e.key == "ArrowUp") {
                e.preventDefault();
                previusStudent();
            }
            if (e.key == "ArrowDown") {
                e.preventDefault();

                nextStudent();
            }
        })
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////eventos que crean una lista con los cambios a las notas
    document.getElementById("lapso1").addEventListener("change", () => {
        let subject = document.getElementById('seccion-title').innerText.toLowerCase().split(" ")[0];
        let id = SELECTED.replace("std-", "");
        let index = changedList.findIndex(x => x.id == id)

        if (index < 0) {
            changedList.push({
                id: id,
                subjects: {
                    [subject]: {
                        l1: document.getElementById("lapso1").value
                    },
                }
            });
        } else {
            changedList[index].subjects[subject].l1 = document.getElementById("lapso1").value;
        }
        document.getElementById("lapso1-" + id).innerText = document.getElementById("lapso1").value

    });

    document.getElementById("lapso2").addEventListener("change", () => {
        let subject = document.getElementById('seccion-title').innerText.toLowerCase().split(" ")[0];
        let id = SELECTED.replace("std-", "");
        let index = changedList.findIndex(x => x.id == id)

        if (index < 0) {
            changedList.push({
                id: id,
                subjects: {
                    [subject]: {
                        l2: document.getElementById("lapso2").value
                    },
                }
            });
        } else {
            changedList[index].subjects[subject].l2 = document.getElementById("lapso2").value;
        }
        document.getElementById("lapso2-" + id).innerText = document.getElementById("lapso2").value
    });

    document.getElementById("lapso3").addEventListener("change", () => {
        let subject = document.getElementById('seccion-title').innerText.toLowerCase().split(" ")[0];
        let id = SELECTED.replace("std-", "");
        let index = changedList.findIndex(x => x.id == id)

        if (index < 0) {
            changedList.push({
                id: id,
                subjects: {
                    [subject]: {
                        l3: document.getElementById("lapso3").value
                    },
                }
            });
        } else {
            changedList[index].subjects[subject].l3 = document.getElementById("lapso3").value;
        }
        document.getElementById("lapso3-" + id).innerText = document.getElementById("lapso3").value
    });


    document.getElementById("btn-save").addEventListener("click", () => {

        console.log(changedList)
    })





























    //////////////proximo estudiante

    function nextStudent() {
        let row = document.getElementById(SELECTED);
        let nextRow;

        try {
            nextRow = row.nextElementSibling.id;
        } catch (error) {
            nextRow = "std-" + StudentList[0].id;
        }


        if (nextRow) {
            setSelected(nextRow);

            nextRow = nextRow.replace("std-", "");
            let studentRow = StudentList.filter(data => data.id == nextRow);
            let subject = document.getElementById('seccion-title').innerText.toLowerCase().split(" ")[0];


            let studenData = {
                names: studentRow[0].names,
                lastName: studentRow[0].lastName,
                CI: studentRow[0].CI,
                subjects: {
                    [subject]: {
                        "l1": document.getElementById("lapso1-" + nextRow).innerText,
                        "l2": document.getElementById("lapso2-" + nextRow).innerText,
                        "l3": document.getElementById("lapso3-" + nextRow).innerText
                    }
                }
            };

            fillStudentData(studenData, { subject });
        }
    }

    //////////////estudiante anterior

    function previusStudent() {
        let row = document.getElementById(SELECTED);
        let previusRow;
        try {
            previusRow = row.previousElementSibling.id;
        } catch (error) {
            previusRow = "std-" + StudentList[StudentList.length - 1].id;
        }

        if (previusRow) {
            setSelected(previusRow);

            previusRow = previusRow.replace("std-", "");
            let studentRow = StudentList.filter(data => data.id == previusRow);
            let subject = document.getElementById('seccion-title').innerText.toLowerCase().split(" ")[0];


            let studenData = {
                names: studentRow[0].names,
                lastName: studentRow[0].lastName,
                CI: studentRow[0].CI,
                subjects: {
                    [subject]: {
                        "l1": document.getElementById("lapso1-" + previusRow).innerText,
                        "l2": document.getElementById("lapso2-" + previusRow).innerText,
                        "l3": document.getElementById("lapso3-" + previusRow).innerText
                    }
                }
            };

            fillStudentData(studenData, { subject });
        }

    }






}

function setSelected(id) {
    cleanSelection();
    document.getElementById(id).classList.add("selected")
    SELECTED = id;
}

function cleanSelection() {
    SELECTED = '';
    let rows = document.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("selected");
    }
};