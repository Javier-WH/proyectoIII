const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
const studentsController = require("../controllers/studentsController.js");
const controller = require("../controllers/controllers.js");
const tutorsControlers = require('../controllers/tutorsController.js');
const preinscription = require('../controllers/preIscriptionController.js');

Router.post("/getTeacherInfo", express.json(), async(req, res, next) => {
    if (req.session.perfil) {
        next();
    } else {
        res.redirect("/");
    }
});

//////////////////////////////////////////////////////////////////////////////////
Router.post("/Estudiante/registro", express.json(), async(req, res) => {
    res.json(await studentsController.registerStudent(req.body));
});
Router.post("/Estudiante/pre", express.json(), async(req, res) => {
    res.json(await preinscription.registerStudent(req.body));
});

Router.post("/profesor/registro", express.json(), async(req, res) => {
    res.json(await controller.insertUser(req.body));
});
Router.post("/tutor/registro", express.json(), async(req, res) => {
    res.json(await tutorsControlers.registerTutor(req.body))
});

Router.post("/getTeacherByCI", express.json(), async(req, res) => {
    res.json(await controller.getUserByCI(req.body));
});

Router.post("/getTeacherInfo", express.json(), async(req, res) => {
    res.json(await controller.getTeacherInfo({ ci: req.session.perfil }));
});


module.exports = Router;