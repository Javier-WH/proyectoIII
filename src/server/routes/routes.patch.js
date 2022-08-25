const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
const studentsController = require("../controllers/studentsController.js");
const controller = require("../controllers/controllers.js");
const tutorsControlers = require('../controllers/tutorsController.js');
const configController = require("../controllers/configControler.js");
const { setSubjects } = require("../controllers/subjectsController.js");




Router.patch("/Estudiante/registro", express.json(), async(req, res) => {
    res.send(await studentsController.updateGrades(req.body));
});
Router.patch("/Profesor/registro", express.json(), async(req, res) => {
    res.send(await controller.registerTeacher(req.body));
});
Router.patch("/Profesor/update", express.json(), async(req, res) => {
    res.send(await controller.updateTeacherData(req.body));
});
Router.patch("/Tutor/update", express.json(), async(req, res) => {
    res.send(await tutorsControlers.updateTutor(req.body));
});
Router.patch("/setConfig", express.json(), async(req, res) => {
    res.json(await configController.setConfig(req.body));
});

Router.patch("/setSubject", express.json(), async(req, res) => {
    res.send(await setSubjects(req.body));
})

Router.patch("/Profesor/updateSubjects", express.json(), async(req, res) => {
    if(req.session.adminID){
        res.send(await controller.updateTeacherSubject(req.body));
    }else{
        res.json({ERROR:"No tienes permisos de administrador"});
    }
});

module.exports = Router;