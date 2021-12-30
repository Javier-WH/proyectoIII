const teacherUser = document.getElementById("teacher-user");
const teacherPassword = document.getElementById("teacher-password");
const studentUser = document.getElementById("student-user");
const studentPassword = document.getElementById("student-password");
//////////////


window.addEventListener("load", () => {
    fetch("logout");
});

document.getElementById("svg-logo").addEventListener("dblclick", () => {
    window.location.replace("/Administracion");
});


window.addEventListener("keyup", () => {
    if (teacherUser.value != "" || teacherPassword.value != "") {
        document.getElementById("teacher-container").classList.add("teacherBorder")
        document.getElementById("student-container").classList.add("inactive")
    } else {
        document.getElementById("teacher-container").classList.remove("teacherBorder")
        document.getElementById("student-container").classList.remove("inactive")
    }
});

window.addEventListener("keyup", () => {
    if (studentUser.value != "" || studentPassword.value != "") {
        document.getElementById("student-container").classList.add("studentBorder")
        document.getElementById("teacher-container").classList.add("inactive")
    } else {
        document.getElementById("student-container").classList.remove("studentBorder")
        document.getElementById("teacher-container").classList.remove("inactive")
    }
});


document.getElementById("btn-teacher").addEventListener("click", async(e) => {

    let nickName = teacherUser.value;
    let password = teacherPassword.value;

    if (nickName == "" || password == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe llenar todos los campos',
        })
    } else {
        document.getElementById("loading-bar").classList.remove("invisible")
        let data = {
            nickName,
            password
        };

        let ask = await fetch("/autenticateTeacher", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(data)
        });

        let response = await ask.text();


        if (response > 0) {
            window.location.replace("/app");
        } else {
            let error = "";

            if (response == -2) {
                error = "La contraseña es incorrecta";
            } else if (response == -1) {
                error = "El usuario no está registrado";
            } else {
                error = "Ha ocurrido un error";
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            })

        }
        document.getElementById("loading-bar").classList.add("invisible")
    }



});




document.getElementById("btn-student").addEventListener("click", async() => {
    let nickName = studentUser.value;
    let password = studentPassword.value;

    if (nickName == "" || password == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe llenar todos los campos',
        })
    } else {
        document.getElementById("loading-bar").classList.remove("invisible")
        let data = {
            nickName,
            password
        };

        let ask = await fetch("/tutor/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(data)
        });

        let response = await ask.json();

        if (response.ERROR) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.ERROR,

            })
        } else {

            window.location.replace(`/controlPannel?id=${response.id}&CI=${response.CI}`);
        }
    }
    document.getElementById("loading-bar").classList.add("invisible")
})