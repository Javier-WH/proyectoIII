const stdPerfilModal = document.getElementById("std-perfil-container");

var mousePosition;
var offset = [0, 0];
var isDown = false;
export function dragStdPerfilModal() {

    stdPerfilModal.addEventListener('mousedown', function(e) {

        isDown = true;
        offset = [
            stdPerfilModal.offsetLeft - e.clientX,
            stdPerfilModal.offsetTop - e.clientY
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
            stdPerfilModal.style.left = (mousePosition.x + offset[0]) + 'px';
            stdPerfilModal.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);
}