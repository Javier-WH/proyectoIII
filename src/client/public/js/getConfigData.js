// "/getConfig"

export async function applyConfig() {
    let l1 = document.getElementById("enable-1l")
    let l2 = document.getElementById("enable-2l")
    let l3 = document.getElementById("enable-3l")
    let editGrade = document.getElementById("enable-edit-grade")
    let config = await getConfig();

    l1.checked = config.l1;
    l2.checked = config.l2;
    l3.checked = config.l3;
    editGrade.checked = config.edit;

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
        edit: document.getElementById("enable-edit-grade").checked
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