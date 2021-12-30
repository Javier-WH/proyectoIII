const tabs = document.getElementsByClassName("nav-link");
renderSelectedTab();

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