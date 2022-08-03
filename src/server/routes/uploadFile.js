const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();

const { renameFile } = require("../controllers/photoController.js")


const storage = multer.diskStorage({
    destination: path.join(__dirname, "../utility/files"),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


router.post("/uploadPhoto", multer({ storage, dest: "fileContainer" }).single("file"), (req, res) => {
    renameFile(req.body);
    res.send("OK");
})

module.exports = router;