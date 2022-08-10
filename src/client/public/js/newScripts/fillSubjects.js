const yearBox = document.getElementById("year");
const gradeBox = document.getElementById("grade");

export async function fillSubjects() {

    fillYearBox();
    fillGradesList();
    fillGradesListEvent();

}
///////////
export async function getSubjects() {
    let ask = await fetch("/getSubjects", {
        method: "POST"
    });
    let subjects = await ask.json();

    return subjects;
}
//////////////
async function fillYearBox() {
    yearBox.innerHTML = "";
    let data = await getSubjects();
    let yearList = [];
    data.map(e => {
        yearList.push(e.grade);
    });

    yearList.map(year => {
        yearBox.innerHTML += `<option value="${year}">${translateYear(year)}</option>`;
    })
}

///////////////////

function translateYear(year) {
    let response;
    switch (year) {
        case 1:
            response = "Primer Año";
            break;
        case 2:
            response = "Segundo Año";
            break;
        case 3:
            response = "Tercer Año";
            break;
        case 4:
            response = "Cuarto Año";
            break;
        case 5:
            response = "Quinto Año";
            break;
        case 6:
            response = "Sexto Año";
            break;
        case 7:
            response = "Septimo Año";
            break;
        case 8:
            response = "Octavo Año";
            break;
        case 9:
            response = "Noveno Año";
            break;
        case 10:
            response = "Decimo Año";
            break;

        default:
            response = "Año Desconocido";
            break;
    }

    return response;
}

async function getGrades(year) {

    let data = await getSubjects();

    let filteredData = data.filter(e => e.grade == year);

    return filteredData;

}

function fillGradesListEvent() {

    yearBox.addEventListener("change", async e => {
        gradeBox.innerHTML = "";

        let data = await getGrades(yearBox.value);
        let subjects = data[0].subjectsList

        subjects.map(subject => {
            gradeBox.innerHTML += ` <option value="${subject}">${subject}</option>`;
        })

    })

}

async function fillGradesList() {


    gradeBox.innerHTML = "";

    let data = await getGrades(1);

    let subjects = await data[0].subjectsList;

    subjects.map(subject => {
        gradeBox.innerHTML += ` <option value="${subject}">${subject}</option>`;
    })



}