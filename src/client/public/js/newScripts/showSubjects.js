//const optSubjects = document.getElementById("opt-subjects-list");
const modal = document.getElementById("show-subjects-modal");
const pensumBox = document.getElementById("show-subjects-pensum");
const year = document.getElementById("show-subjects-year");
const btnAdd = document.getElementById("show-subject-addSubjectButton");
const input = document.getElementById("show-subjects-addSubjectInput");

export async function showSubjectsList() {
    modal.classList.remove("invisible");

    document.getElementById("show-subjects-close-x").addEventListener("click", () => { modal.classList.add("invisible") });
    year.addEventListener("change", async() => { fillPensum(await getSubjects()) });
    btnAdd.addEventListener("click", btnADD);

    fillPensum(await getSubjects());
    removeSubject();
    minAprovalEvents();
}
//////

document.getElementById("show-subjects-setMinAproval").addEventListener("change", e=>{
    if(e.target.value > 20 || e.target.value < 1){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La nota ingresada no puede ser menor a 1 ni mayor a 20',
          })
          e.target.value = 10;
    }
})


async function minAprovalEvents(){
    let minAproval = document.getElementById("show-subjects-setMinAproval");
    document.getElementById("show-subject-btnChangeMinAproval").addEventListener("click", async ()=>{
        if(minAproval.value == "" || minAproval == 0){
            return;
        }
        
        let data = {
            minAproval: minAproval.value
        }
     
        let ask = await fetch("/setConfig",{
            method: "PATCH",
            headers:{
                "Content-Type":"application/json",
                "Accpet":"*/*"
            },
            body: JSON.stringify(data)
        });
        let response = await ask.json();

        if(response[0]==1){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "La nota minima aprobatoria se ha cambiado correctamente",
                showConfirmButton: false,
                timer: 1500
              })
        }
    })
}


////

async function getSubjects() {
    let grade = year.value;

    let ask = await fetch("/getSubjects", {
        method: "POST"
    });
    let subjectsList = await ask.json();

    return subjectsList.filter(e => e.grade == grade).map(e => e.subjectsList)[0];

}
///////////
function fillPensum(subjects) {

    pensumBox.innerHTML = "";
    let html = "";

    subjects.map(subject => {

        html += `<label class ="lbl-pensum-subject">${subject}</label>`;

    });
    pensumBox.innerHTML = html;

}
///////////////
async function updateSubjects() {
    let grade = year.value;
    let subjectsElements = document.getElementsByClassName("lbl-pensum-subject");
    let subjectsList = [];

    for (let i = 0; i < subjectsElements.length; i++) {
        subjectsList.push(subjectsElements[i].innerText);
    }

    let ask = await fetch("/getSubjects", {
        method: "POST"
    });
    let currentSubjects = await ask.json();

    let newSubjects = {}

    currentSubjects.map(e => {
        if (e.grade == grade) {
            e.subjectsList = subjectsList;
            newSubjects[e.grade] = e.subjectsList;
        }

    })

    

    let sendSubjects = await fetch("/setSubject", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: await JSON.stringify(newSubjects)
    })

    let response = await sendSubjects.text();

    if (response == "OK") {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Las materias han sido actualizadas',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

//////////
async function btnADD() {
    if (input.value.length > 0) {

        Swal.fire({
            title: `¿Deseas Agregar la materia ${input.value} del Pensum de ${year.options[year.selectedIndex].text}`,
            showDenyButton: true,
            confirmButtonText: 'Agregar',
            denyButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                let newSubject = input.value;
                pensumBox.innerHTML += `<label class ="lbl-pensum-subject">${newSubject}</label>`; //
                updateSubjects();
                input.value = "";
            }
        });
    }
}
////////

function removeSubject() {
    pensumBox.addEventListener("click", e => {
        Swal.fire({
            title: `¿Deseas eliminar la materia ${e.target.innerText} del Pensum de ${year.options[year.selectedIndex].text}`,
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Conservar`
        }).then((result) => {
            if (result.isConfirmed) {
                e.target.remove();
                updateSubjects();
            }
        });
    });
}