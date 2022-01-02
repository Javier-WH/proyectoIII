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

}



////////////////////////

export function fillTitleSeccion({ seccion, subject, year }) {
    subject = subject.charAt(0).toUpperCase() + subject.slice(1);
    document.getElementById("seccion-title").innerHTML = `${subject}  ${year}-${seccion}`
}