import { fetchStudentList } from './fetch.js';
import { fillSeccionList } from './setStudentsList.js';
import { fillStudentData, fillTitleSeccion } from './fillStudenData.js';
import { getPerfilTeacher } from './setPerfilTeacher.js'



let SELECTED = ''
let changedList = [];


export function loadEvents(StudentList, teacher) {
    //cambia la sección cuando se selecciona una nueva en el dropbox
    document.getElementById("seccion-box").addEventListener("click", async e => {
        document.getElementById("search-Box").innerHTML = "";
        if (e.target.classList.contains("dropdown-item") && e.target.id != "logout") {

            if (changedList.length > 0) {
                Swal.fire({
                    title: '¿Desea guardar los cambios',
                    text: "Tiene cambios en las notas que no han sido guardados",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Guardar Notas',
                    denyButtonText: `Descartar Cambios`,
                    cancelButtonText: 'Cancelar'
                }).then((result) => {

                    if (result.isConfirmed) {
                        saveData();
                        Swal.fire('Saved!', '', 'success');
                        changeSeccion();
                    } else if (result.isDenied) {
                        changedList.length = 0;
                        Swal.fire('Las notas NO se guardaron', '', 'info');
                        changeSeccion();

                    }
                })
            } else {

                changeSeccion();

            }

            async function changeSeccion() {
                let data = e.target.innerText.split(" ");
                let subject = data[0];
                let year = data[1][0];
                let seccion = data[1][1];
                loadingData(); //animacion de relleno antes de cargar los datos
                let studentList = await fetchStudentList({ seccion, year }); //obtiene la lista de estudiantes
                if (studentList.length > 0) {
                    fillSeccionList({ subject }, studentList); //llena la lista de los estudiantes
                    fillTitleSeccion({ seccion, subject, year }); //llena el titulo
                    fillStudentData(studentList[0], { subject }); //llena los datos el alumno
                    setSelected(`std-${studentList[0].id}`);
                    StudentList = studentList;
                } else {
                    document.getElementById("studentList").innerHTML = "";
                    document.getElementById("seccion-title").innerHTML = "La sección no tiene alumnos inscritos";
                }
            }

        }
    });

    ////esta funcion guarda los datos
    async function saveData() {

        if (changedList.length > 0) {
            let data = await JSON.stringify(changedList);
            let ask = await fetch("/Estudiante/registro", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: data
            })
            let response = await ask.text();

            if (response == "OK") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Las notas se han guardado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                changedList.length = 0;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'DENEGADO',
                    text: response
                });
            }

        }

    }
    if (StudentList.length > 0) {
        setSelected(`std-${StudentList[0].id}`);

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
        document.getElementById("lapso1").addEventListener("change", makeDataToSave);

        document.getElementById("lapso2").addEventListener("change", makeDataToSave);

        document.getElementById("lapso3").addEventListener("change", makeDataToSave);

        //enventos botones
        //evento click boton guardar
        document.getElementById("btn-save").addEventListener("click", saveData)

        //click en boton imprimir

        document.getElementById("btn-print").addEventListener("click", print)

        //logout



        //esta funcion imprime la lista de los estudiantes
        async function print() {
            let printTable = document.getElementById("printList-table");
            let table = document.getElementById("studentList");
            let elementToPrint = document.getElementById("printList");
            let array = document.getElementById('seccion-title').innerText.split(" ")
            let teacher = document.getElementById("navbarDropdown-teacherName").innerText;
            let subject = array[0];
            let seccion = array[1];

            document.getElementById("print-subjet-title").innerText = `Asignatura: ${subject}`;
            document.getElementById("print-seccion-title").innerText = `Sección: ${seccion}`
            document.getElementById("print-teacher-title").innerText = `Profesor: ${teacher}`;


            printTable.innerHTML = table.innerHTML;
            let ventimp = window.open(' ', 'popimpr');
            ventimp.document.write(`<link rel="stylesheet" href="CSS/bootstrap.css"><script src="JS/bootstrap.js" defer></script>`)
            ventimp.document.write(elementToPrint.innerHTML);
            ventimp.document.close();
            setTimeout(() => {
                ventimp.print();
                ventimp.close();
            }, 100);

        }






        ////////////////////////////////////////////////////
        //genera el objeto con la lista de las notas que deben actualizarce
        function makeDataToSave() {
            let id = SELECTED.replace("std-", "");
            let error = ""
            let max = 20;
            let min = 0;
            if (document.getElementById("lapso1").value > max || document.getElementById("lapso1").value < min) {

                error = `La nota introducida en el primer lapso está fuera de los margenes permitidos (${min}-${max})`
                document.getElementById("lapso1").value = document.getElementById("lapso1-" + id).innerText

            } else if (document.getElementById("lapso2").value > max || document.getElementById("lapso2").value < min) {

                error = `La nota introducida en el segundo lapso está fuera de los margenes permitidos (${min}-${max})`
                document.getElementById("lapso2").value = document.getElementById("lapso2-" + id).innerText

            } else if (document.getElementById("lapso3").value > max || document.getElementById("lapso3").value < min) {

                error = `La nota introducida en el tercer lapso está fuera de los margenes permitidos (${min}-${max})`
                document.getElementById("lapso3").value = document.getElementById("lapso3-" + id).innerText

            } else {

                let subject = document.getElementById('seccion-title').innerText.toLowerCase().split(" ")[0];

                let index = changedList.findIndex(x => x.id == id)
                let def = ((Number.parseFloat(document.getElementById("lapso1").value) + Number.parseFloat(document.getElementById("lapso2").value) + Number.parseFloat(document.getElementById("lapso3").value)) / 3);

                if (Number.isInteger(def)) {
                    def = def.toFixed(0)
                } else {
                    def = def.toFixed(1)
                }

                if (isNaN(def)) {
                    def = "N/A";
                }

                if (index < 0) {
                    changedList.push({
                        id: id,
                        subjects: {
                            [subject]: {
                                l1: document.getElementById("lapso1").value,
                                l2: document.getElementById("lapso2").value,
                                l3: document.getElementById("lapso3").value,
                                def
                            },
                        }
                    });
                } else {
                    changedList[index].subjects[subject].l1 = document.getElementById("lapso1").value;
                    changedList[index].subjects[subject].l2 = document.getElementById("lapso2").value;
                    changedList[index].subjects[subject].l3 = document.getElementById("lapso3").value;
                    changedList[index].subjects[subject].def = def;
                }


                document.getElementById("nota-acomulada").innerText = def
                document.getElementById("lapso1-" + id).innerText = document.getElementById("lapso1").value;
                document.getElementById("lapso2-" + id).innerText = document.getElementById("lapso2").value;
                document.getElementById("lapso3-" + id).innerText = document.getElementById("lapso3").value;
                document.getElementById("def-" + id).innerText = def;
            }

            if (error.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            }

        }



        //////////////proximo estudiante

        function nextStudent() {
            if (!checkIsSearching()) {
                blurGrade();
                document.getElementById("search-Box").innerHTML = "";
                let row = document.getElementById(SELECTED);
                let nextRow;

                try {
                    nextRow = row.nextElementSibling.id;
                } catch (error) {
                    nextRow = "std-" + StudentList[0].id;
                }


                if (nextRow) {
                    setSelected(nextRow);
                    if (window.outerWidth < 1380) {
                        document.getElementById(nextRow).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                    }

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

        }

        //////////////estudiante anterior

        function previusStudent() {
            if (!checkIsSearching()) {
                blurGrade();
                document.getElementById("search-Box").innerHTML = "";
                let row = document.getElementById(SELECTED);
                let previusRow;
                try {
                    previusRow = row.previousElementSibling.id;
                } catch (error) {
                    previusRow = "std-" + StudentList[StudentList.length - 1].id;
                }

                if (previusRow) {
                    setSelected(previusRow);
                    if (window.outerWidth < 1380) {
                        document.getElementById(previusRow).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                    }

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
        /// este evita que la nota en ingresada se borre cuando se cambia de estudiante antes de dar enter o perder el focus
        function blurGrade() {
            document.getElementById("lapso1").blur();
            document.getElementById("lapso2").blur();
            document.getElementById("lapso3").blur();
        }


        ///evento para buscar estudiante

        document.getElementById("input-nombre").addEventListener("keyup", e => {
            let searchBox = document.getElementById("search-Box");
            let askData = e.target.value;
            let html = ""
            if (askData.length > 0) {
                for (let student of StudentList) {
                    let name = `${student.CI} ${student.names} ${student.lastName}`;
                    if (name.toLowerCase().includes(askData.toLowerCase())) {
                        html += `<li class="list-group-item" id = "li-${student.id}">${name}</li>`
                    }
                }

                searchBox.innerHTML = html;


            } else {
                searchBox.innerHTML = "";
            }
            document.getElementById("input-ci").value = "";
            document.getElementById("lapso1").value = "";
            document.getElementById("lapso2").value = "";
            document.getElementById("lapso3").value = "";
            document.getElementById("nota-acomulada").innerText = "";
            cleanSelection();
        });

        //al hacer click en un elemento del cuadro de busqueda

        document.getElementById("search-Box").addEventListener("click", e => {
            if (e.target.classList.contains("list-group-item")) {
                setSelected(e.target.id.replace("li", "std"))
                document.getElementById(e.target.id.replace("li", "std")).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                let rowID = e.target.id.replace("li-", "");
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
                document.getElementById("search-Box").innerHTML = "";

            }
        });




    } else {
        document.getElementById("studentList").innerHTML = "";
        document.getElementById("seccion-title").innerHTML = "La sección no tiene alumnos inscritos";
    }

    document.getElementById("logout").addEventListener("click", () => {
        window.location.replace("/logout")
    });
    document.getElementById("li-perfil").addEventListener("click", () => {

        getPerfilTeacher(teacher.CI);

    })
}


//esta funcion solo reyena los inputs con un placeholder a la espera de cargar los datos
function loadingData() {
    document.getElementById("seccion-title").innerHTML = `<div class="spinner-border text-secondary" role="status"></div>`;
    document.getElementById("studentList").innerHTML = `<div class="spinner-border text-secondary" role="status"></div>`

    document.getElementById("input-nombre").value = "";
    document.getElementById("input-ci").value = "";
    document.getElementById("lapso1").value = "";
    document.getElementById("lapso2").value = "";
    document.getElementById("lapso3").value = "";
    document.getElementById("nota-acomulada").innerText = "";
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

function checkIsSearching() {
    let input = document.getElementById("input-nombre");
    return document.activeElement == input;
}