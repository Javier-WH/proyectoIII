const table = document.getElementById("student-table");
import { getSudentList, setStudentList, fillTable, cleanInputs } from "./configFindStudent.js"
setStudentList([]);



export async function findStudentList_pre() {
    document.getElementById("studentList-modal-title").innerText = "Lista de Estudiantes Pre-inscritos"
    document.getElementById("studentList-modal-title").classList.add("pre");
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
    })

}