const SearchBox = document.getElementById("search-Box");
const inputName = document.getElementById("input-nombre");

export function fixSeachBoxLocation() {

    let inputLocation = {
        x: inputName.offsetLeft,
        y: inputName.offsetTop + 190
    }
    SearchBox.style.left = inputLocation.x + "px";
    SearchBox.style.top = inputLocation.y + "px";

}