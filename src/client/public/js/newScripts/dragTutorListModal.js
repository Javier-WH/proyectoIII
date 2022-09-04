const tutorListModal = document.getElementById("tutorList-modal");

var mousePosition;
var offset = [0, 0];
var isDown = false;
export function dragTutorListModal() {

    tutorListModal.addEventListener('mousedown', function(e) {

        isDown = true;
        offset = [
            tutorListModal.offsetLeft - e.clientX,
            tutorListModal.offsetTop - e.clientY
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
            tutorListModal.style.left = (mousePosition.x + offset[0]) + 'px';
            tutorListModal.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);
}