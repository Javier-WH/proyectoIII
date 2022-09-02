const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
const studentsController = require("../controllers/studentsController.js");
const preIscriptionController = require("../controllers/preIscriptionController.js");
const controller = require("../controllers/controllers.js");
const tutorController = require("../controllers/tutorsController.js");
const configController = require("../controllers/configControler.js");
const { getGradesList, getSubjects } = require("../controllers/subjectsController.js")
const { getAuxInfo } = require("../controllers/auxiliarInformationController.js")


Router.post("/getSeccionList", express.json(), async(req, res) => {
    res.json(await studentsController.getStudents(req.body));
});

Router.post("/Estudiante", express.json(), async(req, res) => {
    res.json(await studentsController.findStudent(req.body));
});
Router.post("/pre", express.json(), async(req, res) => {
    res.json(await preIscriptionController.findStudent(req.body));
});

Router.post("/profesor", express.json(), async(req, res) => {
    res.json(await controller.getUser(req.session.teacherID));
});

Router.post("/profesor/all", express.json(), async(req, res) => {
    res.json(await controller.getAllUsers());
});

Router.post("/tutor", express.json(), async(req, res) => {
    if(req.body.id){
        res.json(await tutorController.getTutorById(req.body));
    }else if (req.body.CI) {
        res.json(await tutorController.getTutorByCI(req.body));
    } else {
        res.json(await tutorController.getTutorByCI({ CI: req.session.tutorCI }));
    }
});

Router.post("/tutor/validate", express.json(), async(req, res) => {
    req.session.destroy();
    req.session = null;
    res.json(await tutorController.validateTutor(req.body));
});

Router.post("/getConfig", express.json(), async(req, res) => {
    if (req.session.teacherID) { ///corige el bug que crashea el server cuando no hay session iniciada
        res.json(await configController.getConfig());
    } else {
        res.redirect("/");
    }
})

Router.post("/getGradesList", express.json(), async(req, res) => {
    res.json(await getGradesList());
});

Router.post("/getSubjects", express.json(), async(req, res) => {
    res.json(await getSubjects());
})

Router.post("/getAux", express.json(), async(req, res)=>{
    res.json(await getAuxInfo(req.body.ci));
})
module.exports = Router;