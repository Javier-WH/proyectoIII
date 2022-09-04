
let EDITABLE = false;
let CURRCI = "";
let CURRID = "";
let NEWPIC = false;

export async function enableStdMenuPerfil(studentID) {
    const menu = document.getElementById("std-menu-perfil");
    CURRID = studentID;
    blockInputs(true);

    menu.addEventListener("click", e => {
        fillperfilStudentData(studentID);
        document.getElementById("std-perfil-container").classList.remove("invisible");
        document.getElementById("std-perfil-overflow").scrollTo(1,1);
    })
    document.getElementById("std-perfil-close-x").addEventListener("click", () => {
        document.getElementById("std-perfil-container").classList.add("invisible");
    })
}

async function fillperfilStudentData(id) {
    const name = document.getElementById("std-pefil-name");
    const lastName = document.getElementById("std-pefil-lastName");
    const ci = document.getElementById("std-pefil-ci");
    const age = document.getElementById("std-pefil-age");
    const gender = document.getElementById("std-pefil-Gender");
    const motherName = document.getElementById("std-pefil-motherName");
    const motherCI = document.getElementById("std-pefil-motherCI");
    const motherWork = document.getElementById("std-pefil-motherWork");
    const fatherName = document.getElementById("std-pefil-fatherName");
    const fatherCI = document.getElementById("std-pefil-fatherCI");
    const fatherWork = document.getElementById("std-pefil-fatherWork");
    const procedence = document.getElementById("std-pefil-procedence");
    const schoolYear = document.getElementById("std-pefil-schoolYear");

    let studentData = await getStudentData(id);
    CURRCI = studentData.CI;
    name.value = studentData.names;
    lastName.value = studentData.lastName;
    ci.value = studentData.CI;
    gender.selectedIndex = studentData.gender == "M" ? 0 : 1;
    age.value = `${studentData.age} años`;
    motherName.value = studentData.motherName;
    motherCI.value = studentData.motherCI;
    motherWork.value = studentData.motherWork;
    fatherName.value = studentData.fatherName;
    fatherCI.value = studentData.fatherCI;
    fatherWork.value = studentData.fatherWork;
    procedence.value = studentData.procedence;
    schoolYear.value = `${studentData.schoolYear}-${Number.parseInt(studentData.schoolYear) + 1}`;

    fillTutorData(studentData.tutorID);
    fillStudentPhoto(id);
    fillAuxInfo(studentData.CI);
}

async function fillTutorData(tutorID) {

    let name = document.getElementById("std-pefil-tutorName");
    let ci = document.getElementById("std-pefil-tutorCi");
    let phone = document.getElementById("std-pefil-tutorPhone");
    let phone2 = document.getElementById("std-pefil-tutorPhone2");
    let address = document.getElementById("std-pefil-tutorAddress");

    let tutorData = await getTutorData(tutorID);


    if (tutorData.MESSAJE) {
        name.value = "Desconocido";
        ci.value = "Desconocido";
        phone.value = "Desconocido";
        phone2.value = "Desconocido";
        address.value = "Desconocido";
        return;
    }

    name.value = `${tutorData.names} ${tutorData.lastName}`;
    ci.value = tutorData.CI;
    address.value = tutorData.address;
    phone.value = tutorData.phone;
    phone2.value = tutorData.phone2;
}

async function fillStudentPhoto(id) {
    const studentIMG = document.getElementById("std-perfil-photo");
    let studentPhoto = await getStudenPhoto(id);

    if (studentPhoto.type == "text/html") {
        studentIMG.src = "svg/placeholder.svg";
    } else {
        studentIMG.src = URL.createObjectURL(studentPhoto);
    }
}


async function getStudenPhoto(id) {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        id
    });

    let response = await fetch("/downloadPhoto", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    let data = await response.blob();
    return data;

}

async function getTutorData(id) {

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        id
    });

    let response = await fetch("/tutor", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    let data = await response.json();
    return data;

}

async function getStudentData(id) {

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        id
    });

    let response = await fetch("/Estudiante", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });

    let data = await response.json();
    return data[0];
}

async function getAuxInfo(ci) {

    let ask = await fetch("/getAux", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify({ ci })
    });

    let response = await ask.json();
    return response;

}

async function fillAuxInfo(ci) {

    let allegies = document.getElementById("std-pefil-allergies");
    let bloodType = document.getElementById("std-pefil-bloodType");
    let problems = document.getElementById("std-pefil-medicalProblems");
    let observations = document.getElementById("std-pefil-observations");
    let talents = document.getElementById("std-pefil-talents");

    let auxInfo = await getAuxInfo(ci);

    if (auxInfo.Error) {
        allegies.value = "Desconocido";
        bloodType.value = "Desconocido";
        problems.value = "Desconocido";
        observations.value = "Desconocido";
        talents.value = "Desconocido";
        return;
    }



    allegies.value = auxInfo.allergies;
    bloodType.selectedIndex = getBloodType(auxInfo.bloodType);
    problems.value = auxInfo.medical_problems;
    observations.value = auxInfo.observatios;
    talents.value = auxInfo.talents;
}

function getBloodType(option) {
    switch (option) {
        case "A, RH-Positivo":
            return 0;
            break;
        case "B, RH-Positivo":
            return 1;
            break;
        case "AB, RH-Positivo":
            return 2;
            break;
        case "O, RH-Positivo":
            return 3;
            break;
        case "A, RH-Negativo":
            return 4;
            break;
        case "B, RH-Negativo":
            return 5;
            break;
        case "AB, RH-Negativo":
            return 6;
            break;
        case "O, RH-Negativo":
            return 7;
            break;
        default:
            return 0;
            break;
    }

}

document.getElementById("std-perfil-btnBlockEdit").addEventListener("click", () => {
    if (EDITABLE) {
        blockInputs(true);
      
    } else {
        blockInputs(false);
       

    }
});

function blockInputs(bool) {
    EDITABLE = !bool;

    EDITABLE ? document.getElementById("std-perfil-btnUpdateData").classList.remove("invisible") : document.getElementById("std-perfil-btnUpdateData").classList.add("invisible");

    document.getElementById("std-perfil-btnBlockEdit").innerText = EDITABLE ? "Bloquear edición" : "Habilitar edición";
    document.getElementById("std-pefil-name").disabled = bool;
    document.getElementById("std-pefil-lastName").disabled = bool;
    document.getElementById("std-pefil-ci").disabled = bool;
    document.getElementById("std-pefil-age").disabled = bool;
    document.getElementById("std-pefil-Gender").disabled = bool;
    document.getElementById("std-pefil-motherName").disabled = bool;
    document.getElementById("std-pefil-motherCI").disabled = bool;
    document.getElementById("std-pefil-motherWork").disabled = bool;
    document.getElementById("std-pefil-fatherName").disabled = bool;
    document.getElementById("std-pefil-fatherCI").disabled = bool;
    document.getElementById("std-pefil-fatherWork").disabled = bool;
    //document.getElementById("std-pefil-procedence").disabled = bool;
    //document.getElementById("std-pefil-schoolYear").disabled = bool;
    //document.getElementById("std-pefil-tutorName").disabled = bool;
    //document.getElementById("std-pefil-tutorCi").disabled = bool;
    //document.getElementById("std-pefil-tutorPhone").disabled = bool;
    //document.getElementById("std-pefil-tutorPhone2").disabled = bool;
    //document.getElementById("std-pefil-tutorAddress").disabled = bool;
    document.getElementById("std-pefil-allergies").disabled = bool;
    document.getElementById("std-pefil-bloodType").disabled = bool;
    document.getElementById("std-pefil-medicalProblems").disabled = bool;
    document.getElementById("std-pefil-observations").disabled = bool;
    document.getElementById("std-pefil-talents").disabled = bool;

    if(EDITABLE){
        document.getElementById("std-pefil-age").value = document.getElementById("std-pefil-age").value.replaceAll(" años", "");
        document.getElementById("std-pefil-age").type = "number";
        document.getElementById("std-perfil-photo-input").disabled = false;
    }else{
        document.getElementById("std-pefil-age").type = "text";
        document.getElementById("std-pefil-age").value = document.getElementById("std-pefil-age").value + " años";
        document.getElementById("std-perfil-photo-input").disabled = true;
    }
}

document.getElementById("std-perfil-btnUpdateData").addEventListener("click", () => {
    if (EDITABLE) {
        let names = document.getElementById("std-pefil-name").value;
        let lastName = document.getElementById("std-pefil-lastName").value;
        let CI = document.getElementById("std-pefil-ci").value;
        let age = document.getElementById("std-pefil-age").value;
        let gender = document.getElementById("std-pefil-Gender").value;
        let motherName = document.getElementById("std-pefil-motherName").value;
        let motherCI = document.getElementById("std-pefil-motherCI").value;
        let motherWork = document.getElementById("std-pefil-motherWork").value;
        let fatherName = document.getElementById("std-pefil-fatherName").value;
        let fatherCI = document.getElementById("std-pefil-fatherCI").value;
        let fatherWork = document.getElementById("std-pefil-fatherWork").value;

        let allergies = document.getElementById("std-pefil-allergies").value;
        let bloodType = document.getElementById("std-pefil-bloodType").value;
        let medical_problems = document.getElementById("std-pefil-medicalProblems").value;
        let observatios = document.getElementById("std-pefil-observations").value;
        let talents = document.getElementById("std-pefil-talents").value;

        let auxData = {
            allergies,
            bloodType,
            medical_problems,
            observatios,
            talents
        }

        let studentData = {
            names,
            lastName,
            CI,
            age: age.replaceAll(' años', ''),
            gender,
            motherName,
            motherCI,
            motherWork,
            fatherName,
            fatherCI,
            fatherWork,
            auxData: auxData,
            oldCI: CURRCI
        }

        sendStudentData(studentData);
        blockInputs(true);
        if(NEWPIC){
            uploadImage(CURRID);
        }   
    }
});


async function sendStudentData(data) {

    let send = await fetch("/updateStudentData", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify(data)
    })

    let response = await send.json();

    if (response.ERROR) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.ERROR
        });
        return;
    }

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "Los datos fueron actualizados",
        timer: 1500
    })
    CURRCI = document.getElementById("std-pefil-ci").value;
    document.getElementById("opt-student-list").click();
}



//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
/////eventos de la imagen del estudiante//////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

let fileSelect = document.getElementById('std-perfil-photo-input');

function ekUpload() {
    function Init() {
        fileSelect.addEventListener('change', fileSelectHandler, false);
    }


    function fileSelectHandler(e) {
        // Fetch FileList object
        let files = e.target.files || e.dataTransfer.files;

        // Process all File objects
        for (let i = 0, f; f = files[i]; i++) {
            parseFile(f);
        }
    }

    // Output
    function parseFile(file) {

        let imageName = file.name;

        let isGood = (/\.(?=jpg)/gi).test(imageName);
        if (isGood) { 
            NEWPIC = true;
            document.getElementById('std-perfil-photo').src = URL.createObjectURL(file);
        } else {
            NEWPIC = false;
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Solo se admiten imagenes .JPG'
            })
        }
    }

    if (window.File && window.FileList && window.FileReader) {
        Init();
    } else {
        document.getElementById('file-drag').style.display = 'none';
    }
}
ekUpload();

export async function uploadImage(id) {
    if (fileSelect.files.length > 0) {
        let data = new FormData();
        data.append("file", fileSelect.files[0]);
        data.append("name", fileSelect.files[0].name);
        data.append("id", id);
        data.append("ext", fileSelect.files[0].name.split('.').pop());

        let rs = await fetch("/uploadPhoto", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'multipart/form-data'
            },
        })

        let response = await rs.text();

        if (response == "OK") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'La foto ha sido actualizada',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
}
/////////////////////
/////////////////////
/////////////////////
/////////////////////