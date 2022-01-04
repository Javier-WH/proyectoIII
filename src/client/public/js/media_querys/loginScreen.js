const btnSelectTeacher = document.getElementById("btn-select-teachers");
const btnSelectStudent = document.getElementById("btn-select-students");



btnSelectTeacher.addEventListener('click', () => {
    document.getElementById("logo").style.display = "none"
    document.getElementById("teacher-container").style.display = "flex"
});


btnSelectStudent.addEventListener('click', () => {
    document.getElementById("logo").style.display = "none"
    document.getElementById("student-container").style.display = "flex"
});