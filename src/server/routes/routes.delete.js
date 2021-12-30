const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
// const studentsController = require("../controllers/studentsController.js");
const controller = require("../controllers/controllers.js")



Router.delete("/fireTecher", async(req, res, next) => {
    if (req.session.adminID) {
        next();
    } else {
        res.redirect("/logout");
    }
});



Router.delete("/fireTecher", async(req, res) => {
    res.json(await controller.fireTeacher(req.query))
});





module.exports = Router;