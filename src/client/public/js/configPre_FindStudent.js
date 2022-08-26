import { getPerfilTeacher } from './setPerfilTeacher.js'
const table = document.getElementById("student-table");
import { getSudentList, setStudentList, fillTable, cleanInputs } from "./configFindStudent.js";
import { enableStdMenuPerfil } from "./newScripts/stdMenuPerfil.js";
setStudentList([]);



export async function findStudentList_pre() {
    document.getElementById("studentList-modal-title").innerText = "Lista de Estudiantes Pre-inscritos"
    document.getElementById("studentList-modal-title").classList.add("pre");
    document.getElementById("studentList-modal-title").classList.remove("teach");
    cleanInputs();
    document.getElementById("filter-modal-seccion").disabled = true
    table.innerHTML = `<tr><td class="spinner-border text-secondary" role="status" colspan="5"><span class="visually-hidden">Loading...</span></td></tr>`
    document.getElementById("studenList-modal").classList.remove("invisible");

    let ask = await fetch("/pre", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({})
    })
    let response = await ask.json();
    setStudentList(response)
    fillTable(getSudentList(), "pre-");
}


export function loadStudentListEvents() {

    document.getElementById("student-table").addEventListener("click", e => {
        if (e.target.parentElement.id.includes("pre-")) {
            let id = e.target.parentElement.id.replace("pre-", "");
            let student = getSudentList().filter(std => std.id == id)[0];

            swal.fire({
                title: `${student.lastName} ${student.names} - C.I:${student.CI}`,
                text: "Seleccione la seccion donde desea inscribir al alumno",
                input: 'select',
                inputOptions: {
                    'a': 'Sección A',
                    'b': 'Sección B',
                    'c': 'Sección C',
                    'd': 'Sección D',
                    'e': 'Sección E',
                },
                inputPlaceholder: 'Seleccione una sección',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: "Inscribir",
                cancelButtonText: "Cancelar",
                inputValidator: async function(seccion) {

                    student.seccion = seccion;
                    student.ci = student.CI

                    let ask = await fetch("/Estudiante/registro", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "*/*"
                        },
                        body: JSON.stringify(student)
                    });
                    let response = await ask.json();

                    if (response.ERROR) {
                        Swal.fire({
                            icon: 'error',
                            title: 'ERROR',
                            text: response.ERROR,
                        })
                    } else {


                        let deletePre = await fetch("/delete/pre", {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "*/*"
                            },
                            body: JSON.stringify({ id: student.id })
                        });

                        let isdel = await deletePre.json();

                        if (isdel == 1) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: "Se ha inscrito al estudiante",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            findStudentList_pre();

                        }


                    }

                }
            })

        }
        ///////////////////////////




        if (e.target.parentElement.id.includes("teach-")) {
            let id = e.target.parentElement.id.replace("teach-", "");
            let teacher = getSudentList().filter(std => std.id == id)[0];

            getPerfilTeacher(teacher.CI)
        }



        /////////////////////////////////






    });

    document.getElementById("student-table").addEventListener("contextmenu", e => {
        e.preventDefault();
        let id = e.target.parentElement.id.replace("std-", "");

        if (e.target.parentElement.id.includes("std-")) {

            let menu = document.getElementById("std-menu");

            menu.style.left = e.clientX + "px";
            menu.style.top = e.clientY + "px";
            menu.classList.remove("invisible");


            let studentID = e.target.parentElement.id.replace("std-", "");


            document.getElementById("std-menu-delete").addEventListener("click", async() => {

                Swal.fire({
                    title: '¿Desea expulsar a este estudiante?',
                    text: "ESTO NO SE PUEDE REVERTIR",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#b90606',
                    cancelButtonColor: '#9b9292',
                    confirmButtonText: 'SI, expulsa al estudiante',
                    cancelButtonText: 'NO expulses al estudiante'
                }).then(async(result) => {
                    if (result.isConfirmed) {
                        let deleteSTD = await fetch("/delete/student", {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "*/*"
                            },
                            body: JSON.stringify({ id: studentID })
                        });
                        document.getElementById("opt-student-list").click();
                        Swal.fire(
                            'Expulsado',
                            'El estudiante se ha eliminado del sistema',
                            'success'
                        )

                    }
                })

            });


            //

            document.getElementById("std-menu-grades").addEventListener("click", async e => {
                document.getElementById("grades-modal").classList.remove("invisible");
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
                        let mensage = "Esperando Notas";
                        for (let i = 0; i < keys.length; i++) {
                            html += `<tr>`;
                            html += `<th scope="row">${keys[i]}</th>`;
                            if (subjects[keys[i]].l1) {
                                html += `<td>${subjects[keys[i]].l1}</td>`;
                            } else {
                                html += `<td>${mensage}</td>`;
                            }
                            if (subjects[keys[i]].l2) {
                                html += `<td>${subjects[keys[i]].l2}</td>`;
                            } else {
                                html += `<td>${mensage}</td>`;
                            }
                            if (subjects[keys[i]].l3) {
                                html += `<td>${subjects[keys[i]].l3}</td>`;
                            } else {
                                html += `<td>${mensage}</td>`;
                            }
                            if (subjects[keys[i]].def) {
                                html += `<td>${subjects[keys[i]].def}</td>`;
                            } else {
                                html += `<td>${mensage}</td>`;
                            }
                            html += `</tr>`;
                        }
                    }
                    document.getElementById("grades-modal-table").innerHTML = html;
                    document.getElementById("grades-modal-name").innerHTML = `
                                <span>Nombre: ${ask.lastName} ${ask.names}</span>
                                <span>C.I.: ${ask.CI}</span>
                                <span>Seccion: ${ask.year}${ask.seccion}</span>`;

                } else {
                    document.getElementById("grades-modal-name").innerHTML = `
                                <span>No se ha encontrado ningun estudiante inscrito en esta cuenta</span>
                                <span></span>
                                <span></span>`;


                }



            });
            //
            enableStdMenuPerfil(id);
        }

    });



    window.addEventListener("click", e => {
        try {
            if (!e.target.parentElement.id.includes("std-")) {
                document.getElementById("std-menu").classList.add("invisible")
            }
            if (!e.target.parentElement.classList.contains("opt-std-menu")) {
                document.getElementById("std-menu").classList.add("invisible");
            }

        } catch (error) {

        }

    })

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




}