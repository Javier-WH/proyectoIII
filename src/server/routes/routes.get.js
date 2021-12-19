const path = require('path')
const express = require('express');
const Router = express.Router();
const controller = require("../controllers/controllers.js")


// Router.get("/", async(req, res) => {

//     let materias = {
//         A1: ["matematica", "ingles"],
//         B3: ["informatica", "ingles"]
//     }

//     materias = JSON.stringify(materias);
//     let response = await controller.insertUser("Francisco Javier", "Rodriguez Hernandez", "Xavier", "123", "16193765", "M", materias, true);
//     res.json(response);
// });

Router.get("/", async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});




module.exports = Router;