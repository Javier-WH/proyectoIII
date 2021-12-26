async function main() {

    document.getElementById("btn-siguiente").addEventListener("click", async() => {
        let cedula = document.getElementById("input-id").value;
        if (cedula.length > 0) {
            let ask = await fetch("/getTeacherByCI", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify({ "ci": cedula })
            });
            let response = await ask.json();

            if (response.Error) {
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: response.Error,
                });
                cleanData();
                document.getElementById("data-container").classList.add("disable");
            } else {

                fillRegisterTeacherData(response);
                document.getElementById("data-container").classList.remove("disable");
            }
        }
    });


}

document.getElementById("input-id").addEventListener("keydown", () => {
    cleanData();
    document.getElementById("data-container").classList.add("disable");
})


function fillRegisterTeacherData(data) {

    document.getElementById("input-names").value = data.name;
    document.getElementById("input-names").focus();
    document.getElementById("input-lastNames").value = data.lastName;
    document.getElementById("input-lastNames").focus();
    document.getElementById("input-lastNames").blur();

    if (data.gender == "M") {
        document.getElementById("genderM").checked = true;
        document.getElementById("genderF").checked = false;
    } else {
        document.getElementById("genderF").checked = true;
        document.getElementById("genderM").checked = false;
    }


    let keys = Object.keys(data.subject)


    let html = ""

    for (let key of keys) {

        for (seccion of data.subject[key]) {

            html += `
                  <tr>
                    <td>${key}</td>
                    <td>${seccion[1]}</td>
                    <td>${seccion[0]}</td>
                </tr>
            
            `
        }
    }

    document.getElementById("subjectList").innerHTML = html;
}



document.getElementById("btn-send").addEventListener("click", async() => {
    let data = {
        "name": document.getElementById("input-names").value,
        "lastName": document.getElementById("input-lastNames").value,
        "nickName": document.getElementById("input-nickName").value,
        "password": document.getElementById("input-password").value,
        "CI": document.getElementById("input-id").value,
        "gender": document.getElementById("genderM").checked ? "M" : "F",
        "phone": document.getElementById("telephone").value,
        "email": document.getElementById("email").value
    }

    let ask = await fetch("/Profesor/registro", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify(data)
    });

    let response = await ask.json();
    if (response[0] == 1) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El profesor se ha registrado correctamente',
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
            window.location.replace("/");
        }, 1500);
    }
})





function cleanData() {
    document.getElementById("input-names").value = "";
    document.getElementById("input-lastNames").value = "";
    document.getElementById("input-nickName").value = "";
    document.getElementById("input-password").value = "";
    document.getElementById("telephone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subjectList").innerHTML = "";
}

main();