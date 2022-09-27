import {printInscriptionRecipe} from "../configPre_FindStudent.js"


export function initPreisciptionRecipe(){
    document.getElementById("opt-printInscriptionRecipe").addEventListener("click", async () => {
        let student = await getStudent();
        if(student.length > 0){
            printInscriptionRecipe(student[0]);
        }  
    })
}

async function getStudent(){
    let CI = "";
    const { value: ci } = await Swal.fire({
        input: 'text',
        inputLabel: 'Boletín de inscripciuón',
        inputPlaceholder: 'Introduce la cédula del estudiante',
        showCancelButton: true,
        cancelButtonText : "Calcelar",
        confirmButtonText: "Imprimir"
      })
      
      if (ci) {
        CI = ci;
        let ask = await fetch("/Estudiante", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({CI})
        })
        let student = await ask.json()
        return student;
      }else{
        return [];
      }


}