// "/getConfig"

export async function applyConfig() {
    try {


        let l1 = document.getElementById("enable-1l");
        let l2 = document.getElementById("enable-2l");
        let l3 = document.getElementById("enable-3l");
        let editGrade = document.getElementById("enable-edit-grade");
        let minAproval = document.getElementById("show-subjects-setMinAproval");

        let btnSchoolarYear = document.getElementById("btn-school-year");

        let config = await getConfig();

        l1.checked = config.l1;
        l2.checked = config.l2;
        l3.checked = config.l3;
        editGrade.checked = config.edit;
        btnSchoolarYear.value = `${config.schoolYear}`;
        minAproval.value = config.minAproval;
        btnSchoolarYearFucntions(config.schoolYear);
    } catch (error) {
        alert(error.ERROR);
    }
    gradeTabEvents();
};

export async function getConfig() {
    let data = await fetch("/getConfig", {
        method: "POST"
    });
    let response = await data.json();

    return new Promise((res, rej) => {
        res(response[0]);
        rej({ ERROR: "ocurrió un error inesperado al intentar obtener los datos de configuracion" })
    })
}

function buildConfigData() {
    return {
        l1: document.getElementById("enable-1l").checked,
        l2: document.getElementById("enable-2l").checked,
        l3: document.getElementById("enable-3l").checked,
        edit: document.getElementById("enable-edit-grade").checked,
        schoolYear: document.getElementById("btn-school-year").value.substring(0, 4)
    }
}

async function sendConfig() {
    let ask = await fetch("/setConfig", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify(buildConfigData())
    });

}

function gradeTabEvents() {
    document.getElementById("enable-1l").addEventListener("click", sendConfig);
    document.getElementById("enable-2l").addEventListener("click", sendConfig);
    document.getElementById("enable-3l").addEventListener("click", sendConfig);
    document.getElementById("enable-edit-grade").addEventListener("click", sendConfig);
}




function btnSchoolarYearFucntions(currentYear) {
    const btnSchoolarYear = document.getElementById("btn-school-year");

    btnSchoolarYear.addEventListener("change", e => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Esta apunto de cambiar el periodo escolar',
            text: "¿Está Seguro que desea cambiar el periodo escolar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, cambiar de periodo',
            cancelButtonText: 'No, calcelar esta operación',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                sendConfig();
                swalWithBootstrapButtons.fire(
                    'Hecho!',
                    'El periodo escolar se ha modificado.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {

                btnSchoolarYear.value = currentYear;
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'No se han realizado cambios',
                    'error'
                )
            }
        })
    })

}