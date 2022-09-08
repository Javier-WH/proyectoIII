//prices-modal

const priceModal = document.getElementById("prices-modal");

var mousePosition;
var offset = [0, 0];
var isDown = false;
export function dragPricesModal() {

    priceModal.addEventListener('mousedown', function(e) {

        isDown = true;
        offset = [
            priceModal.offsetLeft - e.clientX,
            priceModal.offsetTop - e.clientY
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
            priceModal.style.left = (mousePosition.x + offset[0]) + 'px';
            priceModal.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);
}