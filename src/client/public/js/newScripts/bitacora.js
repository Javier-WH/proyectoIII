

export async function startBitacora() {

    document.getElementById("show-bitacora-close-x").addEventListener("click", () => { document.getElementById("show-bitacora-modal").classList.toggle("invisible") });

    document.getElementById("opt-bitacora").addEventListener("click", async e => {
        e.preventDefault();
        document.getElementById("show-bitacora-modal").classList.toggle("invisible");

        let html = "";
        let num = 1;
        let bitacoraData = await getBitacoraData();

        bitacoraData.map(data => {
            let changes = checkChanges(data);
            let date = translateDate(data.createdAt)
            html += `
            <tr id="bitacora-${data.id}">
                <th scope="row">${num++}</th>
                <td>${data.description}</td>
                <td>${changes}</td>
                <td class ="div-date-container">${date}</td>
            </tr>
        `
        });

        document.getElementById("bitacora-table").innerHTML = html;

    });
}

function translateDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let month = date.getMonth() + 1;
    let dayOfMonth = date.getUTCDate();
    let year = date.getFullYear();
    let dayOfWeek = traslateDayOfWeek(date.getDay());
    let fullHour = `${hours}-${minutes}-${seconds}`;

    return `<div class ="div-date">${dayOfWeek} - ${dayOfMonth}/${month}/${year}</div> <div class ="div-date"> hora: ${fullHour} </div>`
}

function traslateDayOfWeek(num) {

    switch (num) {
        case 0:
            return "Domingo";
            break;
        case 1:
            return "Lunes";
            break;
        case 2:
            return "Martes";
            break;
        case 3:
            return "Miercoles";
            break;
        case 4:
            return "Jueves";
            break;
        case 5:
            return "Viernes";
            break;          
        case 6:
            return "Sabado";
            break;
        default:
            return "Dia desconocido";
            break;
    }
}

function checkChanges({ newData, oldData }) {

    let html = "";

    if (oldData.message == "No hay datos") { //ingreso nuevo dato

        let keys = Object.keys(newData);

        for (let i = 0; i < keys.length - 1; i++) {
            if (keys[i] != "materias") {
                html += `<div class = "change-bitacora"> <div>${keys[i]}</div><div>-></div><div> ${newData[keys[i]]}</div></div>`
            }
        }
    } else if (newData.message == "No hay datos") {//eliminacion de datos
        let keys = Object.keys(oldData);

        for (let i = 0; i < keys.length - 1; i++) {
            if (keys[i] != "materias") {
                html += `<div class = "change-bitacora"> <div>${keys[i]}</div><div>-></div><div> ${oldData[keys[i]]}</div></div>`
            }

        }
    } else { //actualizacion de datos

        let keysNew = Object.keys(newData);


        // revisar si cambió un dato

        keysNew.map(key => {
            let grado = newData.grado;
            if (newData[key] != oldData[key] && key != "materias") {
                if (key != "pensum") {
                    html += `<div class = "change-bitacora"> <div>${key}</div><div></div><div> ${oldData[key]} -> ${newData[key]}</div></div>`
                } else {
                    let newSubjextsList = newData[key];
                    let oldSubjextsList = oldData[key];

                    newSubjextsList.map(e => {
                        if (!oldSubjextsList.includes(e)) {
                            html += `<div class = "change-bitacora">
                                        <div>
                                            Agregada a ${grado} año
                                        </div>
                                        <div>
                                            ->
                                        </div>
                                        <div> 
                                            ${e}
                                        </div>
                                    </div>`
                        }
                    });

                    oldSubjextsList.map(e => {
                        if (!newSubjextsList.includes(e)) {
                            html += `<div class = "change-bitacora">
                                        <div>
                                            Eliminada de ${grado} año
                                        </div>
                                        <div>
                                            ->
                                        </div>
                                        <div> 
                                            ${e}
                                        </div>
                                    </div>`
                        }
                    });
                }
            }
            if (key == "materias") {
                let subjectsKey = Object.keys(newData.materias)

                subjectsKey.map(skey => {
                    if (newData.materias[skey].l1 != oldData.materias[skey].l1) {
                        html += `<div class = "change-bitacora"> <div>${skey}</div><div> 1er </div><div>${oldData.materias[skey].l1} -> ${newData.materias[skey].l1}</div></div>`
                    }
                    if (newData.materias[skey].l2 != oldData.materias[skey].l2) {
                        html += `<div class = "change-bitacora"> <div>${skey}</div><div> 2do </div><div>${oldData.materias[skey].l2} -> ${newData.materias[skey].l2}</div></div>`
                    }
                    if (newData.materias[skey].l3 != oldData.materias[skey].l3) {
                        html += `<div class = "change-bitacora"> <div>${skey}</div><div> 3er </div><div>${oldData.materias[skey].l3} -> ${newData.materias[skey].l3}</div></div>`
                    }
                })
            }
        })

    }


    return html;
}


async function getBitacoraData() {
    let ask = await fetch("/bitacora");
    let response = await ask.json();
    return response;
}