let IS_TUTOR = false;
let TUTOR_CI = "";
let TUTOR_ID = "";

async function getTutorData(CI) {
    let ask = await fetch("/tutor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ CI })
    });
    let response = await ask.json();

    return new Promise((res, rej) => {
        res(response);
    })

}

function disableInputs(valor) {
    document.getElementById("data-container").disabled = valor;
}

async function fillTutorData(ci) {
    loading(true)
    let data = await getTutorData(ci);
    TUTOR_CI = ci;
    if (data.MESSAJE == 'El tutor no existe') {
        IS_TUTOR = false;
        document.getElementById("data-container").classList.remove("disabled");
        disableInputs(false);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "La cedúla suministrada ya esta registrada",
        })
    }
    loading(false)
}

function cleanAllData() {
    IS_TUTOR = false;
    document.getElementById("data-container").classList.add("disabled");
    document.getElementById("tutorName").value = "";
    document.getElementById("tutorLastName").value = "";
    document.getElementById("tutorNickName").value = "";
    document.getElementById("rdb-masculino").checked = true;
    document.getElementById("tutor-age").value = ""
    document.getElementById("address").value = "";
    document.getElementById("work").value = "";
    document.getElementById("education-level").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputPassword").value = "";
    document.getElementById("inputPassword2").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("phone2").value = "";
    document.getElementById("whatsapp1").checked = true;
    document.getElementById("whatsapp2").checked = false;
}


document.getElementById("cedula").addEventListener("keydown", cleanAllData);
document.getElementById("cedula").addEventListener("change", cleanAllData);

document.getElementById("btn-ci-next").addEventListener("click", e => {
    e.preventDefault();
    if (document.getElementById("cedula").value.length > 0) {
        fillTutorData(document.getElementById("cedula").value)
    }

});

function loading(valor) {
    let bar = document.getElementById("loadin-bar");
    if (valor) {
        bar.classList.remove("invisible")
    } else {
        bar.classList.add("invisible")
    }
}


document.getElementById("btn-next").addEventListener("click", async e => {
    e.preventDefault();
    let error = ""

    if (document.getElementById("inputPassword").value != document.getElementById("inputPassword2").value) {
        error = "Las contraseñas son diferentes"
    } else {
        if (!IS_TUTOR) {
            whatsapp = {};
            if(document.getElementById("whatsapp1").checked){
                whatsapp.phone1 = true;
            }else{
                whatsapp.phone1 = false;
            }
            if(document.getElementById("whatsapp2").checked){
                whatsapp.phone2 = true;
            }else{
                whatsapp.phone2 = false;
            }

            let data = {
                names: document.getElementById("tutorName").value,
                lastName: document.getElementById("tutorLastName").value,
                nickName: document.getElementById("tutorNickName").value,
                password: document.getElementById("inputPassword").value,
                CI: document.getElementById("cedula").value,
                gender: document.getElementById("rdb-masculino").checked == true ? "M" : "F",
                age: document.getElementById("tutor-age").value,
                address: document.getElementById("address").value,
                work: document.getElementById("work").value,
                email: document.getElementById("inputEmail").value,
                instruction: document.getElementById("education-level").value,
                phone: document.getElementById("phone").value,
                phone2: document.getElementById("phone2").value,
                whatsapp
            }

            let ask = await fetch("/tutor/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(data)
            });
            let response = await ask.json();

            if (response.ERROR) {
                error = response.ERROR;
            } else {
                TUTOR_ID = response.id;
            }
        }
    }

    if (error.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
        })
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha inscito el representante',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
              window.history.back();
          }, 1500);
    }


});

document.getElementById("d-flex").addEventListener("click", e => {
    e.preventDefault()
    window.history.back();
})