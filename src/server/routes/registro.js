const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
const studentsController = require("../controllers/studentsController.js");
const controller = require("../controllers/controllers.js")




Router.post("/Estudiante/registro", express.json(), async(req, res) => {
    res.json(await studentsController.registerStudent(req.body));
});

Router.post("/profesor/registro", express.json(), async(req, res) => {
    res.json(await controller.insertUser(req.body));
});

Router.post("/getTeacherByCI", express.json(), async(req, res) => {
    res.json(await controller.getUserByCI(req.body));
});


Router.post("/getTeacherInfo", express.json(), async(req, res) => {
    res.json(await controller.getTeacherInfo(req.body));
});

module.exports = Router;