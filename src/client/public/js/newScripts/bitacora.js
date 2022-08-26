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
        let today = new Date();
        let dayOfWeek = traslateDayOfWeek(today.getDay());
        let date = `${today.getUTCDate()}/${today.getMonth()}/${today.getFullYear()}`;
        let time = `${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;

        document.getElementById("bitacora-table").innerHTML = html;
        document.getElementById("show-bitacora-registerCount").innerText = `${num - 1} Registros para el ${dayOfWeek} ${date}, hora: ${time}`;
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
            if (newData[key] != oldData[key] && key != "materias" && key != "materias-secciones") {
                if (key != "pensum") {
                    html += `<div class = "change-bitacora"> <div>${key}</div><div></div><div> ${oldData[key]} -> ${newData[key]}</div></div>`
                    
                } else {
                    let newSubjextsList = newData[key];
                    let oldSubjextsList = oldData[key];

                    newSubjextsList.map(e => {
                        if (!oldSubjextsList.includes(e)) {
                            html += `<div class = "change-bitacora added">
                                        <div>
                                            Agregada a ${grado} año
                                        </div>
                                        <div>
                                            ->>
                                        </div>
                                        <div> 
                                            ${e}
                                        </div>
                                    </div>`
                        }
                    });

                    oldSubjextsList.map(e => {
                        if (!newSubjextsList.includes(e)) {
                            html += `<div class = "change-bitacora deleted">
                                        <div>
                                            Eliminada de ${grado} año
                                        </div>
                                        <div>
                                            <<-
                                        </div>
                                        <div> 
                                            ${e}
                                        </div>
                                    </div>`
                        }
                    });
                }
            } else if (key == "materias") {
                let subjectsKey = Object.keys(newData.materias)
            
                subjectsKey.map(skey => {
                    if (newData.materias[skey].l1 != oldData.materias[skey].l1) {
                        html += `<div class = "change-bitacora"> <div>${skey}</div><div> 1er </div><div> (${oldData.materias[skey].l1} -> ${newData.materias[skey].l1}) C.I. ${newData.ci} </div></div>`
                    }
                    if (newData.materias[skey].l2 != oldData.materias[skey].l2) {
                        html += `<div class = "change-bitacora"> <div>${skey}</div><div> 2do </div><div> (${oldData.materias[skey].l2} -> ${newData.materias[skey].l2}) C.I. ${newData.ci}</div></div>`
                    }
                    if (newData.materias[skey].l3 != oldData.materias[skey].l3) {
                        html += `<div class = "change-bitacora"> <div>${skey}</div><div> 3er </div><div> (${oldData.materias[skey].l3} -> ${newData.materias[skey].l3}) C.I. ${newData.ci}</div></div>`
                    }
                })
            } else if (key == "materias-secciones") {

                try {/// esto es para saltar los errores cuando llegan datos vacios
                    let oldSubjects = oldData["materias-secciones"];
                    let newSubjects = newData["materias-secciones"];
                    let ns_keys = Object.keys(newSubjects);
                    let os_keys = Object.keys(oldSubjects);
                  


                    ns_keys.map(k => {
                        if (oldSubjects[k] == undefined) {
                            html += `<div class = "change-bitacora added"> <div> C.i.${newData.ci}</div><div>->></div><div>${k} (${newSubjects[k]})</div></div>`
                        } else {
                            newSubjects[k].map((s, i) => {
                                if (oldSubjects[k][i] == undefined) {
                                    html += `<div class = "change-bitacora added"> <div> C.i.${newData.ci}</div><div>->></div><div>${k} (${newSubjects[k][i]})</div></div>`
                                }

                            });
                        }
                    });

                    os_keys.map(k => {
                        if (newSubjects[k] == undefined) {
                            html += `<div class = "change-bitacora deleted"> <div> C.i.${oldData.ci}</div><div><<-</div><div>${k} (${oldSubjects[k]})</div></div>`
                        } else {
                            oldSubjects[k].map((s, i) => {
                                if (newSubjects[k][i] == undefined) {
                                    html += `<div class = "change-bitacora deleted"> <div> C.i.${oldData.ci}</div><div><<-</div><div>${k} (${oldSubjects[k][i]})</div></div>`
                                }

                            });
                        }
                    });


                } catch (error) {
                    
                }
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