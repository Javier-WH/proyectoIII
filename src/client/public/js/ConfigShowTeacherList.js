const table = document.getElementById("student-table");
import { getSudentList, setStudentList, fillTable, cleanInputs } from "./configFindStudent.js"
setStudentList([]);






export async function showTeaacherList() {
    document.getElementById("studentList-modal-title").innerText = "Lista de Profesores"
    document.getElementById("studentList-modal-title").classList.remove("pre");
    document.getElementById("studentList-modal-title").classList.add("teach");
    cleanInputs();
    document.getElementById("filter-modal-seccion").disabled = true
    table.innerHTML = `<tr><td class="spinner-border text-secondary" role="status" colspan="5"><span class="visually-hidden">Loading...</span></td></tr>`
    document.getElementById("studenList-modal").classList.remove("invisible");
    let ask = await fetch("/profesor/all", {
        method: "POST"
    });
    let response = await ask.json();
    let data = [];
    response.map(teacher => {
        data.push({
            names: teacher.name,
            lastName: teacher.lastName,
            CI: teacher.CI,
            id: teacher.id,
            seccion: "n/a",
            year: "n/a"
        })
    });

    setStudentList(data)
    fillTable(getSudentList(), "teach-");





}