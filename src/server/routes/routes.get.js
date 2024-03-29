const path = require('path')
const express = require('express');
const Router = express.Router();
const { getAllBitacoraData }  = require("../controllers/bitacoraController.js");




Router.get("/app", (req, res, next) => {

    if (req.session.teacherID) {
          next();
    } else {
        res.redirect("/");
    }
});

Router.get("/config", (req, res, next) => {
    if (req.session.teacherID && req.session.adminID && (req.session.teacherID == req.session.adminID)) {
        next();
    } else {
        res.redirect("/");
    }
});


Router.get("/teacherPerfil", async(req, res, next) => {
    if (req.session.teacherID) {
        next();
    } else {
        res.redirect("/");
    }
});

Router.get("/bitacora", async(req, res, next) => {
    if (req.session.adminID) {
        res.send(await getAllBitacoraData());
    } else {
        res.redirect("/");
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

Router.get("/app", async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/app.html"));
});
Router.get("/config", async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/config.html"));
});

Router.get("/teacherPerfil", async(req, res) => {
    req.session.perfil = req.query.ci;
    res.sendFile(path.join(__dirname, "../../client/html/perfilTeacher.html"));
});
Router.get("/controlPannel", async(req, res) => {
    req.session.tutorCI = req.query.CI;
    req.session.tutorID = req.query.id;
    res.sendFile(path.join(__dirname, "../../client/html/tutorControlPannel.html"));
});


module.exports = Router;