import { getTeacher } from './fetch.js';
import { fillTeacherName } from './fillTeacherName.js';
import { fillSubjectList, registerTeacher } from './ConfigRegisterTeacher.js'
import { fireTeacher } from './ConfigFireTeacher.js'
import { showTeaacherList } from './ConfigShowTeacherList.js'
import { getPerfilTeacher } from './setPerfilTeacher.js'
import { findStudentList, filterList } from './configFindStudent.js'
import { findStudentList_pre, loadStudentListEvents } from "./configPre_FindStudent.js";
import { registerStudent } from "./configRegisterStudent.js";
import { applyConfig } from "./getConfigData.js";
import { fillSubjects } from "./newScripts/fillSubjects.js";
import { dragStudentsModal } from "./newScripts/dragStudentListModal.js";






async function main() {

    applyConfig();

    let teacher = await getTeacher();
    fillTeacherName(teacher[0]);



    document.getElementById("li-perfil").addEventListener("click", () => {

        getPerfilTeacher(teacher[0].CI);

    })


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

    document.getElementById("opt-fireTeacher").addEventListener("click", fireTeacher);

    document.getElementById("opt-show-teacher-list").addEventListener("click", showTeaacherList);

    document.getElementById("opt-student-list").addEventListener("click", findStudentList);

    document.getElementById("opt-preinscription-list").addEventListener("click", findStudentList_pre)

    //////////////////////////////modal student list

    document.getElementById("btn-close-modal").addEventListener("click", () => {
        document.getElementById("studenList-modal").classList.add("invisible");
    });
    document.getElementById("grades-modal-Xbutton").addEventListener("click", () => {
        document.getElementById("grades-modal").classList.add("invisible");
    })

    //////////////
    document.getElementById("filter-modal-name").addEventListener("keyup", filterList);
    document.getElementById("filter-modal-ci").addEventListener("keyup", filterList);
    document.getElementById("filter-modal-lastName").addEventListener("keyup", filterList);
    document.getElementById("filter-modal-name").addEventListener("keyup", filterList);
    document.getElementById("filter-modal-seccion").addEventListener("keyup", filterList);
    document.getElementById("filter-modal-year").addEventListener("keyup", filterList);
    document.getElementById("filter-modal-schoolYear").addEventListener("keyup", filterList);

    document.getElementById("opt-register-student").addEventListener("click", registerStudent);
    loadStudentListEvents();

    fillSubjects();
    dragStudentsModal();
}

main();