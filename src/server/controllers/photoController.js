const fs = require('fs');
const path = require('path');
const { updatePhoto } = require("../controllers/studentsController.js")

function renameFile({ name, id, ext }) {
    // let imgName = id + "." + ext;
    let imgName = id + ".jpg";
    let oldPath = path.join(__dirname, "../utility/files/") + name;
    let newPath = path.join(__dirname, "../utility/files/") + imgName;
    fs.rename(oldPath, newPath, () => {
        updatePhoto(id, imgName);
    });
}

///////////////////////////////////

function getFile({ id }) {
    //console.log(id)
    //return "301.jpg";

    let imgPath = path.join(__dirname, "../utility/files/")
    try {
        if (fs.existsSync(`${imgPath}${id}.jpg`)) {
            return `${id}.jpg`;
        } else if (fs.existsSync(`${imgPath}${id}.jpeg`)) {
            return `${id}.jpeg`;
        } else if (fs.existsSync(`${imgPath}${id}.png`)) {
            return `${id}.png`;
        } else if (fs.existsSync(`${imgPath}${id}.gif`)) {
            return `${id}.gif`;
        } else {
            return "default";
        }
    } catch (err) {
        return "default";
    }

}




module.exports = { renameFile, getFile }