const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
const studentsController = require("../controllers/studentsController.js");
const controller = require("../controllers/controllers.js")



Router.post("/getSeccionList", express.json(), async(req, res) => {
    // console.log(req.body);
    res.json(await studentsController.getStudents(req.body));
});

Router.post("/Estudiante", express.json(), async(req, res) => {
    res.json(await studentsController.findStudent(req.body));
});
Router.post("/Estudiante/registro", express.json(), async(req, res) => {
    res.json(await studentsController.registerStudent(req.body));
});
Router.post("/profesor", express.json(), async(req, res) => {
    res.json(await controller.getUser(1));
});

Router.post("/profesor/registro", express.json(), async(req, res) => {
    res.json(await controller.insertUser(req.body));
});


module.exports = Router;