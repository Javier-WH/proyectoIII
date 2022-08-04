const optSubjects = document.getElementById("opt-subjects-list");
const modal = document.getElementById("show-subjects-modal");
const pensumBox = document.getElementById("show-subjects-pensum");
const year = document.getElementById("show-subjects-year");

export async function showSubjectsList() {
    modal.classList.remove("invisible");

    document.getElementById("show-subjects-close-x").addEventListener("click", () => { modal.classList.add("invisible") });

    year.addEventListener("change", async() => { fillPensum(await getSubjects()) });

    fillPensum(await getSubjects());
}
//////

async function getSubjects() {
    let grade = year.value;

    let ask = await fetch("/getSubjects", {
        method: "POST"
    });
    let subjectsList = await ask.json();

    return subjectsList.filter(e => e.grade == grade).map(e => e.subjectsList)[0];

}

function fillPensum(subjects) {
    pensumBox.innerHTML = "";
    let html = "";

    subjects.map(subject => {

        html += `<label class ="lbl-pensum-subject">${subject}</label>`;

    });
    pensumBox.innerHTML = html;

}