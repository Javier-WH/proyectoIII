const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
const studentsController = require("../controllers/studentsController.js");
const controller = require("../controllers/controllers.js");
const preIscriptionController = require("../controllers/preIscriptionController.js");
const { destroyGrade } = require("../controllers/subjectsController.js")



Router.delete("/fireTecher", async(req, res, next) => {
    if (req.session.adminID) {
        next();
    } else {
        res.redirect("/logout");
    }
});



Router.delete("/fireTecher", async(req, res) => {

    res.json(await controller.fireTeacher(req.query));
});

Router.delete("/delete/pre", express.json(), async(req, res) => {
    res.json(await preIscriptionController.deleteStudent(req.body));
});

Router.delete("/delete/student", express.json(), async(req, res) => {
    res.json(await studentsController.deleteStudent(req.body));
})

Router.delete("/deleteGrade", express.json(), async(req, res) => {
    res.json(await destroyGrade(req.body));
})


module.exports = Router;