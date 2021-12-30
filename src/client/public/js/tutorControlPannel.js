const tabs = document.getElementsByClassName("nav-link");
renderSelectedTab();

document.getElementById("year").addEventListener("change", e => {
    let label = document.getElementById("lbl-year");
    let value = e.target.value;
    let year = "";
    switch (value) {
        case "1":
            year = "Primer año";
            break;
        case "2":
            year = "Segundo año";
            break;
        case "3":
            year = "Tercer año";
            break;
        case "4":
            year = "Cuarto año";
            break;
        case "5":
            year = "Quinto año";
            break;
        default:
            break;
    }
    label.innerText = year;

})


function cleanSelectedTabs() {
    for (let tab of tabs) {
        tab.classList.remove("active");
    }
}

document.getElementById("nav-tabs").addEventListener("click", e => {
    if (e.target.classList.contains("nav-link")) {
        cleanSelectedTabs();
        e.target.classList.add("active");
        renderSelectedTab();
    }

});

function renderSelectedTab() {

    document.getElementById("grades-pannel").classList.add("invisible");
    document.getElementById("inscription-pannel").classList.add("invisible");
    document.getElementById("option-pannel").classList.add("invisible");

    if (document.getElementById("tab-grades").classList.contains("active")) {

        document.getElementById("grades-pannel").classList.remove("invisible")

    } else if (document.getElementById("tab-inscription").classList.contains("active")) {

        document.getElementById("inscription-pannel").classList.remove("invisible");

    } else if (document.getElementById("tab-options").classList.contains("active")) {

        document.getElementById("option-pannel").classList.remove("invisible")

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Ha ocurrido un error inesperado",

        });
    }
}