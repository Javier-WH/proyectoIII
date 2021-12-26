const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
const studentsController = require("../controllers/studentsController.js");
const controller = require("../controllers/controllers.js")





Router.patch("/Estudiante/registro", express.json(), async(req, res) => {
    res.send(await studentsController.updateGrades(req.body))

});

Router.patch("/Profesor/registro", express.json(), async(req, res) => {
    res.send(await controller.registerTeacher(req.body))

});




module.exports = Router;