const teacherUser = document.getElementById("teacher-user");
const teacherPassword = document.getElementById("teacher-password");
const studentUser = document.getElementById("student-user");
const studentPassword = document.getElementById("student-password");
//////////////




window.addEventListener("keyup", () => {
    if (teacherUser.value != "" || teacherPassword.value != "") {
        document.getElementById("teacher-container").classList.add("teacherBorder")
        document.getElementById("student-container").classList.add("inactive")
    } else {
        document.getElementById("teacher-container").classList.remove("teacherBorder")
        document.getElementById("student-container").classList.remove("inactive")
    }
});

window.addEventListener("keyup", () => {
    if (studentUser.value != "" || studentPassword.value != "") {
        document.getElementById("student-container").classList.add("studentBorder")
        document.getElementById("teacher-container").classList.add("inactive")
    } else {
        document.getElementById("student-container").classList.remove("studentBorder")
        document.getElementById("teacher-container").classList.remove("inactive")
    }
});


document.getElementById("btn-teacher").addEventListener("click", async() => {




});