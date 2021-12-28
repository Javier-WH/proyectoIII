function getTeacherPage(ci) {
    const TEACHER_PAGE = `
        <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Perfil</title>

        <link rel="shortcut icon" href="SVG/icon.svg" type="image/x-icon">


        <!-- materialize -->
        <link rel="stylesheet" href="CSS/materialize.css">
        <script src="JS/materialize.js" defer></script>
        <link rel="stylesheet" href="CSS/root.css">

        <!-- CSS -->
        <link rel="stylesheet" href="CSS/perfilTeacher.css">

    </head>

    <body>

        <style>
            #data-container{
                pointer-events: none;
            }
            label {
                margin-top: -20px;
            }
        </style>



        <nav>
            <div class="nav-wrapper" id="nav-bar">
                <img src="SVG/icon.svg" alt="" id="logo">
                <a href="" class="brand-logo">Perfil del Profesor</a>
            </div>
        </nav>

        <br>
        <br>
        <div id="main-container">
            <div id="data-container">
                <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <label for="input-names">Nombres</label>
                    <input id="input-names" type="text" class="validate">
                </div>
                <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="input-lastNames" type="text" class="validate">
                    <label for="input-lastNames">Apellidos</label>
                </div>

                <div class="input-field col s6">
                    <i class="material-icons prefix">portrait</i>
                    <input id="input-id" type="number" class="validate">
                    <label for="input-id">Cedula</label>
                </div>

                <div class="input-field col s6">
                    <i class="material-icons prefix">face</i>
                    <input id="input-nickName" type="text" class="validate">
                    <label for="input-nickName">Nombre de Usuario</label>
                </div>

                <div id="gender-div">
                    <span id="gendertag">
                    Genero:
                </span>
                    <label>
                    <input type="radio" name="gender" id="genderM" checked/>
                    <span>Masculino</span>
                </label>
                    <label>
                    <input type="radio" name="gender" id="genderF"/>
                    <span>Femenino</span>
                </label>
                </div>

                <div class="input-field col s6">
                    <i class="material-icons prefix">phone</i>
                    <input id="telephone" type="tel" class="validate">
                    <label for="telephone">Teléfono</label>
                </div>

                <div class="input-field col s6">
                    <i class="material-icons prefix">email</i>
                    <input id="email" type="email" class="validate">
                    <label for="email">E-mail</label>
                </div>
            </button>

            </div>

        </div>

        <div id="subjects-container">
            <h5 id="subjectlist-title">Matrias Asignadas</h5>
            <table>
                <thead>
                    <tr>
                        <th>Materia</th>
                        <th>Sección</th>
                        <th>Año</th>
                    </tr>
                </thead>

                <tbody id="subjectList">

                </tbody>
            </table>

        </div>



        <script>
            async function fillInputs(ci) {
                let ask = await fetch("/getTeacherInfo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*"
                    },
                    body: JSON.stringify({
                        ci
                    })
                });

                let response = await ask.json();
                let teacher = response[0];

                document.getElementById("input-names").value = teacher.name;
                document.getElementById("input-lastNames").value = teacher.lastName;
                document.getElementById("input-id").value = teacher.CI;
                document.getElementById("input-nickName").value = teacher.nickName
                document.getElementById("telephone").value = teacher.phone;
                document.getElementById("email").value = teacher.email;


                if (teacher.gender == "M") {
                    document.getElementById("genderM").checked = true;
                    document.getElementById("genderF").checked = false;
                } else {
                    document.getElementById("genderF").checked = true;
                    document.getElementById("genderM").checked = false;
                }


                let keys = Object.keys(teacher.subject)


                let html = ""

                for (let key of keys) {

                    for (seccion of teacher.subject[key]) {
                        html += "<tr><td>" + key + "</td><td>" + seccion[1] + "</td><td>" + seccion[0] + "</td></tr>"
                    }
                }

                document.getElementById("subjectList").innerHTML = html;

            }

            fillInputs("${ci}");
        </script>

    </body>

    </html>
    `

    return TEACHER_PAGE;
}


export function getPerfilTeacher(ci) {
    let teacherPerfilPage = window.open("window-child.html", "Ratting", "width=900,height=900,left=150,top=200,toolbar=0,status=0,");
    teacherPerfilPage.document.write(getTeacherPage(ci));
    window.addEventListener("unload", () => {
        teacherPerfilPage.close();
    })


}