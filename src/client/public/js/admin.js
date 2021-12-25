Swal.fire({
    title: 'ADVERTENCIA',
    text: "Esta zona es solo para administradores",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si soy administrador',
    cancelButtonText: 'No soy administrador'
}).then((result) => {
    if (result.isConfirmed) {

    } else {
        window.location.replace("/");
    }
})


document.getElementById("btn-login").addEventListener("click", async() => {

    let nickName = document.getElementById("nick-name").value;
    let password = document.getElementById("password").value;

    if (nickName == "" || password == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe llenar todos los campos',
        });
    } else {

        let data = {
            nickName,
            password,
        }

        let ask = await fetch("/autenticateAdmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(data)
        });

        let response = await ask.text();

        let error = 0;

        if (response > 0) {

            window.location.replace("/config");

        } else {
            if (response == -1) {
                error = "El usuario no existe";
            } else if (response == -2) {
                error = "La contraseña es incorrecta";
            } else if (response == -3) {
                error = "El usuario tiene permisos de administrador";
            } else {
                error = "ha ocurrido un error desconocido";
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            })
        }


    }



});