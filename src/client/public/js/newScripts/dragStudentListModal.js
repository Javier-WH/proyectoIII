const studentsModal = document.getElementById("studenList-modal");

var mousePosition;
var offset = [0, 0];
var isDown = false;
export function dragStudentsModal() {

    studentsModal.addEventListener('mousedown', function(e) {
        console.log(studentsModal.style.marginLeft)
        isDown = true;
        offset = [
            studentsModal.offsetLeft - e.clientX - 100,
            studentsModal.offsetTop - e.clientY - 150
        ];
    }, true);

    document.addEventListener('mouseup', function() {
        isDown = false;
    }, true);

    document.addEventListener('mousemove', function(event) {
        event.preventDefault();
        if (isDown) {
            mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            studentsModal.style.left = (mousePosition.x + offset[0]) + 'px';
            studentsModal.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);



}