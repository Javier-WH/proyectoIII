import { getTeacher } from './fetch.js';
import { fillTeacherName } from './fillTeacherName.js';
import { fillSubjectList, registerTeacher } from './ConfigRegisterTeacher.js'



async function main() {
    let teacher = await getTeacher();
    fillTeacherName(teacher[0]);







    document.getElementById("btn-add-grade").addEventListener("click", fillSubjectList);

    document.getElementById("list-group").addEventListener("click", e => {
        if (e.target.classList.contains("list-subject")) {
            e.target.remove();
        }
    })

    document.getElementById("logout").addEventListener("click", () => {
        window.location.replace("/logout")
    });

    document.getElementById("btn-register-teacher").addEventListener("click", registerTeacher);


}

main();