const fs = require('fs');
const path = require('path');
const { updatePhoto } = require("../controllers/studentsController.js")

function renameFile({ name, id, ext }) {
    let imgName = id + "." + ext;
    let oldPath = path.join(__dirname, "../utility/files/") + name;
    let newPath = path.join(__dirname, "../utility/files/") + imgName;
    fs.rename(oldPath, newPath, () => {
        updatePhoto(id, imgName);
        console.log(id)
    });
}

///////////////////////////////////

function getFile({ id }) {
    //console.log(id)
    return "301.jpeg";

}


module.exports = { renameFile, getFile }