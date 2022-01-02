export async function registerStudent() {
    Swal.fire({
        title: 'Escribe la cedula del tutor del estudiante que desea inscribir',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Inscribir',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async(ci) => {
            let ask = await fetch("/tutor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify({ CI: ci })
            });
            let response = await ask.json();

            if (response.MESSAJE) {
                window.location.replace("/preinscripcionForm");
            } else {
                window.location.replace(`/controlPannel?id=${response.id}&CI=${response.CI}`)
            }

        }
    }).then((result) => {})
}