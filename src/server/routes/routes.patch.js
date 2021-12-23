const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
const studentsController = require("../controllers/studentsController.js");





Router.patch("/Estudiante/registro", express.json(), async(req, res) => {
    res.send(await studentsController.updateGrades(req.body))

});



module.exports = Router;