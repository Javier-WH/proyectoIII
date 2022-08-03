export async function getStudentPhoto(id) {
    let data = { id };
    let ask = await fetch("/downloadPhoto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: await JSON.stringify(data)
    })

    let foto = await ask.blob();

    return foto;

}