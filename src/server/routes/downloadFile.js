const path = require('path');
const express = require('express');
const router = express.Router();

const { getFile } = require("../controllers/photoController.js")


router.post("/downloadPhoto", express.json(), (req, res) => {
    let address = path.join(__dirname, "../utility/files/");
    let fileName = getFile(req.body);
    if (fileName != "default") {
        res.sendFile(address + fileName);
    } else {
        res.send("default");
    }
})

module.exports = router;