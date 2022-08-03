const gradesModal = document.getElementById("grades-modal");

var mousePosition;
var offset = [0, 0];
var isDown = false;
export function dragGradesModal() {

    gradesModal.addEventListener('mousedown', function(e) {

        isDown = true;
        offset = [
            gradesModal.offsetLeft - e.clientX,
            gradesModal.offsetTop - e.clientY
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
            gradesModal.style.left = (mousePosition.x + offset[0]) + 'px';
            gradesModal.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);
}