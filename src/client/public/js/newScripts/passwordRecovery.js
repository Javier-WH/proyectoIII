const linkTeacher = document.getElementById("pw-teacher");
const linkStudent = document.getElementById("pw-Student");



linkTeacher.addEventListener("click", e => {
    e.preventDefault();

    Swal.fire({
        title: 'Escriba la dirección de correo electrónico asociado a su cuenta',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
            id: "SA-pass"
        },
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        backdrop: true,
        preConfirm: (email) => {
            if (email == "") {
                return "vacio";
            }
            return fetch("/teacherPasswordRecovery", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*"
                    },
                    body: JSON.stringify({ email })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.text();
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Ocurrió un error: ${error}`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            let message = "La dirección de correo electronico no esta registrada";
            if (result.value == "OK") {
                message = "Se ha enviado un correo con un link para que cambie su contraseña"
            } else if (result.value == "vacio") {
                message = "No ha ingresado ninguna dirección de correo"
            }
            Swal.fire(message);
        }
    })



})