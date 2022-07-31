import { getTeacher, fetchStudentList } from './fetch.js';
import { makeSeccions, fillSeccionBox, getSeccion } from './setSeccions.js';
import { fillSeccionList } from './setStudentsList.js';
import { fillStudentData, fillTitleSeccion } from './fillStudenData.js';
import { fillTeacherName } from './fillTeacherName.js';
import { loadEvents } from './events.js';
import { getConfig } from "./getConfigData.js";



async function main() {
    let config = await getConfig();
    let teacher = await getTeacher(); //obtiene los datos del profesor del procesor
    fillTeacherName(teacher[0]);
    let seccions = makeSeccions(teacher[0]); // obtiene las materias del profesor
    fillSeccionBox(seccions); //llena el dropbox de las materias
    let studentList = await fetchStudentList(getSeccion(seccions, 0, config)); //obtiene la lista de estudiantes
    fillSeccionList({ subject: seccions[0].split(" ")[0] }, studentList); //llena la lista de los estudiantes                           
    fillTitleSeccion(getSeccion(seccions, 0), studentList); //llena el titulo
    fillStudentData(studentList[0], getSeccion(seccions, 0)); //llena los datos el alumno
    /////////////////////////////////////

    loadEvents(studentList, teacher[0], config);


}


main();