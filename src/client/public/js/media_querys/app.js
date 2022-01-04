const table = document.getElementById("table-container");
const boton = document.getElementById("showList");

boton.addEventListener("click", () => {
    if (table.style.marginLeft == "0px") {
        boton.innerText = "Mostrar Lista";
        table.style.marginLeft = "-99vw";
    } else {
        boton.innerText = "Ocultar Lista";
        table.style.marginLeft = "0px";
    }
})

document.getElementById("studentList").addEventListener("click", e => {
    if (window.outerWidth < 1380) {
        boton.innerText = "Mostrar Lista";
        table.style.marginLeft = "-99vw";
    }
});