const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
const studentsController = require("../controllers/studentsController.js");
const controller = require("../controllers/controllers.js")



Router.post("/getSeccionList", express.json(), async(req, res) => {
    res.json(await studentsController.getStudents(req.body));
});

Router.post("/Estudiante", express.json(), async(req, res) => {
    res.json(await studentsController.findStudent(req.body));
});

Router.post("/profesor", express.json(), async(req, res) => {
    res.json(await controller.getUser(req.session.teacherID));
});

Router.post("/profesor/all", express.json(), async(req, res) => {
    res.json(await controller.getAllUsers());
});


module.exports = Router;