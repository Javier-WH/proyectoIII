export async function getTeacher() {
    let ask = await fetch("/profesor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        }
    });
    let response = await ask.json();
    return new Promise((res, rej) => {
        res(response);
        rej({ ERROR: "Ha ocurrido un error al intentar obtener los datos del profesor" });
    })
};


export async function fetchStudentList(seccion) {
    let ask = await fetch("/getSeccionList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify(seccion)
    });
    let response = await ask.json();
    return new Promise((res, rej) => {
        res(response);
        rej({ ERROR: "Ha ocurrido un error al intentar obtener la lista de los estudiantes" });
    })

}