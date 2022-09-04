const menuOPT = document.getElementById("opt-register-tutor-list");
const modal = document.getElementById("tutorList-modal");
const table = document.getElementById("tutorList-modal-table");
const spiner = document.getElementById("tutorList-modal-table");
const closeBTN = document.getElementById("tutorList-modal-close-x");
let input = document.getElementById("tutorList-modal-inputCI")

export function startTutorListModal() {
    closeBTN.addEventListener("click", () => { modal.classList.add("invisible") })


    menuOPT.addEventListener("click", async e => {
        e.preventDefault();
        modal.classList.remove("invisible");
        spiner.classList.remove("invisible");
        let tutorList = await getTutorList();
     

        if(tutorList.length <= 0){
            table.innerHTML = "No se han encontrado representantes ni tutores inscritos en el sistema";
            return
        }
        
        fillTable(tutorList);
        
        input.addEventListener("keyup", ()=>{
            fillTable(filterTutor(tutorList));
        })
    })

}


function filterTutor(tutorList){
    let inputFilter = document.getElementById("tutorList-modal-inputCI").value;
    let filteredList = tutorList.filter(tutor => `${tutor.CI}`.includes(inputFilter));
    return filteredList;
}

function fillTable(tutorList){
    let html = "";
    let num = 1
        tutorList.map(tutor=>{
            html += 
            `<tr id="tutor-${tutor.id}">
                <td>
                    ${num++}
                </td>
                <td>
                    ${tutor.names}
                </td>
                <td>
                    ${tutor.lastName}
                </td>
                <td>
                    ${tutor.CI}
                </td>
            </tr>`
        })
        table.innerHTML = html;
}


async function getTutorList() {

    let headersList = {
        "Accept": "*/*"
    }

    let response = await fetch("/getTeacherList", {
        method: "POST",
        headers: headersList
    });

    let data = await response.json();

    return data;
}