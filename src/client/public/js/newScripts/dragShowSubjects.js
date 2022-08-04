const subjectModal = document.getElementById("show-subjects-modal");

var mousePosition;
var offset = [0, 0];
var isDown = false;
export function dragSubjectModal() {

    subjectModal.addEventListener('mousedown', function(e) {

        isDown = true;
        offset = [
            subjectModal.offsetLeft - e.clientX,
            subjectModal.offsetTop - e.clientY
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
            subjectModal.style.left = (mousePosition.x + offset[0]) + 'px';
            subjectModal.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);
}