export function fireTeacher() {
    Swal.fire({
        title: 'Submit your Github username',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Despedir',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async(ci) => {
            let ask = await fetch(`http://192.168.1.103:3000/fireTecher?ci=${ci}`, {
                method: "DELETE",
                headers: {
                    "Accept": "*/*"
                }
            });
            let response = await ask.text();

            if (response == 1) {
                Swal.fire(
                    'Se ha eliminado al profesor del registro con exito',
                    'success'
                )
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: "La cedula suministrada no se encuentra registrada en el sistema",
                })
            }

        }
    }).then((result) => {})
}