import { getConfig } from "./getConfigData.js"

export function fillStudentData(student, { subject }) {
    if (!student) {
        return;
    }

    let name = student.names;
    let lastName = student.lastName;
    let ci = student.CI;
    let lapso1, lapso2, lapso3;
    try {
        lapso1 = student.subjects[subject]["l1"];
    } catch (err) {
        lapso1 = 0;
    }
    try {
        lapso2 = student.subjects[subject]["l2"];
    } catch (err) {
        lapso2 = 0;
    }
    try {
        lapso3 = student.subjects[subject]["l3"];
    } catch (err) {
        lapso3 = 0;
    }

    document.getElementById("input-nombre").value = `${name} ${lastName}`;
    document.getElementById("input-ci").value = ci;
    document.getElementById("lapso1").value = lapso1;
    document.getElementById("lapso2").value = lapso2;
    document.getElementById("lapso3").value = lapso3;


    let acumulado = ((parseFloat(lapso1) + parseFloat(lapso2) + parseFloat(lapso3)) / 3);

    if (isNaN(acumulado)) {
        document.getElementById("nota-acomulada").innerHTML = "N/A";
    } else if (Number.isInteger(acumulado)) {
        document.getElementById("nota-acomulada").innerHTML = acumulado.toFixed(0);
    } else {
        document.getElementById("nota-acomulada").innerHTML = acumulado.toFixed(1);
    }

    checkPermision();
}

async function checkPermision() {
    let config = await getConfig()
    document.getElementById("lapso1").disabled = !config.l1;
    document.getElementById("lapso2").disabled = !config.l2;
    document.getElementById("lapso3").disabled = !config.l3;
}

////////////////////////

export async function fillTitleSeccion({ seccion, subject, year }, studentList) {
    ////obtiene el año desde la configuracion
    let config = await getConfig();
    /////////////////
    let title = document.getElementById("seccion-title");
    subject = subject.charAt(0).toUpperCase() + subject.slice(1);
    title.innerHTML = `<div> ${subject}  ${year}-${seccion} </div>`;
    title.innerHTML += `<div class = "periodoText">Periodo escolar ${config.schoolYear} - ${Number.parseInt(config.schoolYear) + 1} </div>`


    if (studentList.length <= 0) {
        title.innerHTML = `La sección no tiene alumnos inscritos`;
    }

}