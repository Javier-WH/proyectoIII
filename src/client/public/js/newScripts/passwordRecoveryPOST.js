const bntSend = document.getElementById("btn-send");
const ci = document.getElementById("txtCI");
const pass1 = document.getElementById("txtPass");
const pass2 = document.getElementById("txtPass2");

bntSend.addEventListener("click", async() => {
    if (pass1.value != pass2.value) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no son iguales',
        })
        return
    }

    if (ci.value == "" || pass1.value == "" || pass2.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe llenar todos los campos',
        })
        return
    }

    let data = { CI: ci.value, password: pass1.value };
    let ask = await fetch("/Recovery", {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
        body: await JSON.stringify(data)
    })
    let response = await ask.text();
    if (response == "El link ha vencido") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response,
        })
    } else {
        window.location.replace("/");
    }


})