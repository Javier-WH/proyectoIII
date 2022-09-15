document.getElementById("d-flex").addEventListener("click", e => { e.preventDefault(); location.href = "/config"; });
import { getStudentPhoto } from "./downloadStudentPhoto.js";
let studentCIinput = document.getElementById("student-ci");
let studentName = document.getElementById("student-name");
let studentLastName = document.getElementById("student-lastName");
let studentGender = document.getElementById("student-gender");
let studentSecction = document.getElementById("student-secction");
let studentGrade = document.getElementById("student-grade");
let auxContainer = document.getElementById("aux-container");
let btnSearch = document.getElementById("btn-next");
let prices = {};


init();
async function init() {
    fillStudentData(0);
    prices = await getPrices();
    setPrices(prices);
    checkBoxWatcher(prices);
    setSchoolYear();
}

async function setSchoolYear() {
    let ask = await fetch("/getConfig", { method: "POST" });
    let response = await ask.json();
    document.getElementById("school-year").value = response[0].schoolYear;
}

btnSearch.addEventListener("click", () => {
    window.location.replace(`/addPayment?CI=${studentCIinput.value}`);
})

async function getStudent(ci) {
    let ask = await fetch("/Estudiante", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ CI: ci })
    })
    let response = await ask.json();
    if (response.length > 0) {
        return response[0];
    }
    return { error: "La cedula no está registrada en el sistema" }
}

function showData(flag) {

    if (flag) {
        auxContainer.classList.remove("invisible");
    } else {
        auxContainer.classList.add("invisible");
        cleanData();
    }

}

studentCIinput.addEventListener("keyup", () => {
    showData(false);
})

function cleanData() {
    studentName.innerText = "";
    studentLastName.innerText = "";
    studentGender.innerText = "";
    studentSecction.innerText = "";
    studentGrade.innerText = "";
}

async function fillStudentData(ci) {
    let studentData = await getStudent(ci);
    if (studentData.error) {
        cleanData();
        showData(false);
        return
    }

    showData(true);
    let imgData = URL.createObjectURL(await (getStudentPhoto(studentData.id)));
    document.getElementById("student-photo").src = imgData;
    studentCIinput.value = studentData.CI;
    studentName.innerText = studentData.names;
    studentLastName.innerText = studentData.lastName;
    studentGender.innerText = studentData.gender == "M" ? "Masculino" : "Femenino";
    studentSecction.innerText = `Sección - ${studentData.seccion.toUpperCase()}`;
    studentGrade.innerText = `${studentData.year}° Grado`;

    document.getElementById("chk-month").click();
}
////

async function getPrices() {
    let headersList = {
        "Accept": "*/*"
    }

    let response = await fetch("/getPrices", {
        method: "GET",
        headers: headersList
    });

    let data = await response.json();
    return data;
}

function setPrices(prices) {
    document.getElementById("month-price").innerText = `${prices.month}$ x`;
    document.getElementById("emblem-price").innerText = `${prices.emblem}$ x`;
    document.getElementById("uniform-price").innerText = `${prices.uniform}$ x`;
}


function checkBoxWatcher(prices) {
    let containerMonth = document.getElementById("month-price-container");
    let containerEmblem = document.getElementById("emblem-price-container");
    let containerUniform = document.getElementById("uniform-price-container");


    let chkMonth = document.getElementById("chk-month");
    let chkEmblem = document.getElementById("chk-emblem");
    let chkUniform = document.getElementById("chk-uniform");
    let chkOther = document.getElementById("chk-other");

    let monthCant = document.getElementById("month-cant");
    let emblemCant = document.getElementById("emblem-cant");
    let uniformCant = document.getElementById("uniform-cant");

    let montToPaid = document.getElementById("mont-to-paid");


    chkMonth.addEventListener("change", e => {
        if (e.target.checked) {
            containerMonth.classList.remove("invisible");
            montToPaid.classList.remove("invisible");
            monthCant.value = 1;
            setTotal(prices);

        } else {
            monthCant.value = 1;
            containerMonth.classList.add("invisible");
            montToPaid.classList.add("invisible");
            setTotal(prices);
        }
    })

    chkEmblem.addEventListener("change", e => {
        if (e.target.checked) {
            containerEmblem.classList.remove("invisible");
            emblemCant.value = 1;
            setTotal(prices);
        } else {
            emblemCant.value = 1;
            containerEmblem.classList.add("invisible");
            setTotal(prices);
        }
    })
    chkUniform.addEventListener("change", e => {
        if (e.target.checked) {
            containerUniform.classList.remove("invisible");
            uniformCant.value = 1;
            setTotal(prices);
        } else {
            uniformCant.value = 1;
            containerUniform.classList.add("invisible");
            setTotal(prices);
        }
    })

    chkOther.addEventListener("change", e => {
        if (e.target.checked) {

            chkMonth.checked = false;
            chkUniform.checked = false;
            chkEmblem.checked = false;
            containerUniform.classList.add("invisible");
            containerEmblem.classList.add("invisible");
            containerMonth.classList.add("invisible");
            montToPaid.classList.add("invisible");
            chkMonth.disabled = true;
            chkUniform.disabled = true;
            chkEmblem.disabled = true;



            setTotal(prices);
        } else {
            chkMonth.disabled = false;
            chkUniform.disabled = false;
            chkEmblem.disabled = false;
            chkMonth.click();
            setTotal(prices);
        }
    })

    monthCant.addEventListener("change", () => {
        setTotal(prices);
    })

    emblemCant.addEventListener("change", () => {
        setTotal(prices);
    })
    uniformCant.addEventListener("change", () => {
        setTotal(prices);
    })
    monthCant.addEventListener("keyup", () => {
        setTotal(prices);
    })

    emblemCant.addEventListener("keyup", () => {
        setTotal(prices);
    })
    uniformCant.addEventListener("keyup", () => {
        setTotal(prices);
    })

}


function setTotal(prices) {

    let total = 0;
    let chkMonth = document.getElementById("chk-month");
    let chkEmblem = document.getElementById("chk-emblem");
    let chkUniform = document.getElementById("chk-uniform");
    let chkOther = document.getElementById("chk-other");

    let monthCant = document.getElementById("month-cant");
    let emblemCant = document.getElementById("emblem-cant");
    let uniformCant = document.getElementById("uniform-cant");

    let totalimp = document.getElementById("total");


    if (chkMonth.checked) {
        total += Number.parseFloat(prices.month) * monthCant.value;
    }

    if (chkEmblem.checked) {
        total += Number.parseFloat(prices.emblem) * emblemCant.value;
    }

    if (chkUniform.checked) {
        total += Number.parseFloat(prices.uniform) * uniformCant.value;
    }
    if (chkOther.checked) {
        totalimp.disabled = false;
    } else {
        totalimp.disabled = true;
    }


    totalimp.value = `${total}`;
    setDescription();
}

document.getElementById("month").addEventListener("change", setDescription)

function traslateMonth(number) {
    switch (number) {
        case 1:
            return "Enero";
        case 2:
            return "Febrero";
        case 3:
            return "Marzo";
        case 4:
            return "Abril";
        case 5:
            return "Mayo";
        case 6:
            return "Junio";
        case 7:
            return "Julio";
        case 8:
            return "Agosto";
        case 9:
            return "Septiembre";
        case 10:
            return "Octubre";
        case 11:
            return "Noviembre";
        case 12:
            return "Diciembre";
        default:
            return "Desconocido";
    }
}

function setDescription() {
    let month = document.getElementById("month");
    let chkMonth = document.getElementById("chk-month");
    let chkEmblem = document.getElementById("chk-emblem");
    let chkUniform = document.getElementById("chk-uniform");
    let monthCant = document.getElementById("month-cant");
    let emblemCant = document.getElementById("emblem-cant");
    let uniformCant = document.getElementById("uniform-cant");
    let Description = document.getElementById("Description");
    let chkOther = document.getElementById("chk-other");
    let text = "";

    if (chkMonth.checked) {
        text = `Pago mensualidad(x${monthCant.value})`;
        let m = Number.parseFloat(month.value);
        text += "(";
        for (let i = 1; i <= monthCant.value; i++) {
            text += traslateMonth(m);
            m = Number.parseInt(m) + 1;
            if (i < monthCant.value) {
                text += ", ";
            }
        }
        text += ")";
    }
    if (chkEmblem.checked) {
        if (text != "") {
            text += " + ";
        }
        text += `Pago distintivo(x${emblemCant.value})`
    }

    if (chkUniform.checked) {
        if (text != "") {
            text += " + ";
        }
        text += `Pago uniforme(x${uniformCant.value})`
    }
    if (chkOther.checked) {
        text = ""
        Description.disabled = false;
    } else {

        Description.disabled = true;
    }
    Description.value = text;
}

document.getElementById("chk-cash").addEventListener("change", e => {
    if (e.target.checked) {
        document.getElementById("back-container").classList.add("invisible");
        document.getElementById("deposit-container").classList.add("invisible");
    } else {
        document.getElementById("back-container").classList.remove("invisible");
        document.getElementById("deposit-container").classList.remove("invisible");
    }
})



document.getElementById("btn-register-payment").addEventListener("click", async () => {
    let total = document.getElementById("total");
    let description = document.getElementById("Description");
    let cash = document.getElementById("chk-cash");
    let ci = document.getElementById("student-ci");
    let chkMonth = document.getElementById("chk-month");
    let chkEmblem = document.getElementById("chk-emblem");
    let chkUniform = document.getElementById("chk-uniform");
    let month = document.getElementById("month");
    let monthCant = document.getElementById("month-cant");
    let schoolYear = document.getElementById("school-year");

    let bank = document.getElementById("bank");
    let depositNumber = document.getElementById("depositNumber");
    if (total.value == "" || description.value == "" || monthCant.value < 1 || monthCant.value == "") {
        return;
    }
    let monthControl = Number.parseInt(month.value);
    let schoolYearControl = Number.parseInt(schoolYear.value);
    for (let i = 1; i <= monthCant.value; i++) {
        let paymentData = {
            payment: {
                mount: total.value,
                description: description.value,
                cash: cash.checked,
                bankDepositNumber: cash.checked ? "No suministrado" : depositNumber.value,
                banckName: cash.checked ? "No suministrado" : bank.value,
                fullpaid: true,
                emblem: chkEmblem.checked,
                uniform: chkUniform.checked,
                month: chkMonth.checked ? monthControl : 0,
                schoolYear: schoolYearControl
            },
            ci: ci.value
        }

        let paidmenExist = await checkIsPaidmentExist(paymentData);
        if (paidmenExist.error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: paidmenExist.error,
            })
            return;
        }
        let response = await registerPaiment(paymentData);
        if (response.error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.error,
            })
            return;
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Pago registrado con exito',
                showConfirmButton: false,
                timer: 1500
            })
        }
        monthControl++;
        if (monthControl > 12) {
            monthControl = 1;
            schoolYearControl++;
        }
    }
});

async function registerPaiment(paymentData) {

    let response = await fetch("/registerPayment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify(paymentData)
    });
    let data = await response.json();
    return data;
}
async function checkIsPaidmentExist(paymentData) {

    let response = await fetch("/checkIsPaidmentExist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify(paymentData)
    });
    let data = await response.json();
    return data;
}