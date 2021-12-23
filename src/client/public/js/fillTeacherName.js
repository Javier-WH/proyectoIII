export function fillTeacherName(teacher) {
    document.getElementById('user-name').innerText = `${teacher.lastName} ${teacher.name}`;
}