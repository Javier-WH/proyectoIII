export function makeSeccions({ subject }) {
    let subjectList = Object.keys(subject);
    let Subjects = [];

    for (let i = 0; i < subjectList.length; i++) {
        for (let j = 0; j < subject[subjectList[i]].length; j++) {
            Subjects.push(`${subjectList[i]} ${subject[subjectList[i]][j]}`);
        }
    }
    return Subjects;
}

export function fillSeccionBox(seccionList) {
    let html = ""

    seccionList.map(seccion => {

        html += `<li ><a class="dropdown-item" href="#">${seccion}</a></li>`
    });

    // html += `
    //         <li>
    //             <hr class="dropdown-divider">
    //         </li>
    //         <li>
    //             <a class="dropdown-item" href="#" id = "logout">Logout</a>
    //         </li>`
    document.getElementById("seccion-box").innerHTML = html;
}

export function getSeccion(seccionList, index, config) {
    let array = seccionList[index].split(" ");
    let subject = array[0];
    let year = array[1][0];
    let seccion = array[1][1];
    let schoolYear = 0;
    if (typeof config != "undefined") {
        schoolYear = config.schoolYear;
    }

    return {
        subject,
        year,
        seccion,
        schoolYear
    }

}