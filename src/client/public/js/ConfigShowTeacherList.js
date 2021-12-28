async function getTeacherList() {
    let ask = await fetch("/teahcerList");
    let response = await ask.text();

    return new Promise((res, rej) => {
        res(response);
        rej({ "ERROR": "Ocurrió un error al intentar obtener la lista de los profesores" })
    })
}

export async function showTeaacherList() {
    let list = await getTeacherList();
    let teacherListWindow = window.open("window-child.html", "Ratting", "width=900,height=900,left=150,top=200,toolbar=0,status=0,");
    teacherListWindow.document.write(list);
    window.addEventListener("unload", () => {
        teacherListWindow.close();
    })

}