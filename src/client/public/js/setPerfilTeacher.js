export async function getPerfilTeacher(ci) {
    let teacherPerfilPage = window.open("window-child.html", "Ratting", "width=900,height=900,left=150,top=200,toolbar=0,status=0,");
    teacherPerfilPage.location.replace(`/teacherPerfil?ci=${ci}`)
    window.addEventListener("unload", () => {
        teacherPerfilPage.close();
    })
}