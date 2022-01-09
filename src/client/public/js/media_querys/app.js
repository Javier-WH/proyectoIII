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


// document.getElementById("lapso1").addEventListener("focus", e => {
//     if (window.outerWidth < 1380) {
//         document.getElementById("seccion-title").classList.add("invisible")
//         document.getElementById("lapso1").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
//         document.getElementById("grade-container").classList.add("keyboard");
//     }
// })

// document.getElementById("lapso2").addEventListener("focus", e => {
//     if (window.outerWidth < 1000) {
//         document.getElementById("seccion-title").classList.add("invisible")
//         document.getElementById("lapso2").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
//         document.getElementById("grade-container").classList.add("keyboard");
//     }
// })
// document.getElementById("lapso3").addEventListener("focus", e => {
//     if (window.outerWidth < 1000) {
//         document.getElementById("seccion-title").classList.add("invisible")
//         document.getElementById("lapso3").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
//         document.getElementById("grade-container").classList.add("keyboard");
//     }
// })

// document.getElementById("lapso1").addEventListener("blur", e => {
//     if (window.outerWidth < 1000) {
//         document.getElementById("seccion-title").classList.remove("invisible")
//         document.getElementById("grade-container").classList.remove("keyboard");
//     }
// })
// document.getElementById("lapso2").addEventListener("blur", e => {
//     if (window.outerWidth < 1000) {
//         document.getElementById("seccion-title").classList.remove("invisible")
//         document.getElementById("grade-container").classList.remove("keyboard");
//     }
// })
// document.getElementById("lapso3").addEventListener("blur", e => {
//     if (window.outerWidth < 1000) {
//         document.getElementById("seccion-title").classList.remove("invisible")
//         document.getElementById("grade-container").classList.remove("keyboard");
//     }
// })