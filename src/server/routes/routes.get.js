const path = require('path')
const express = require('express');
const Router = express.Router();
const { addLog } = require("../controllers/vitacora.js")



Router.get("/app", (req, res, next) => {

    if (req.session.teacherID) {
        //vitacora
        let logData = { userID: req.session.teacherID, userType: "Profesor", action: "Ingreso a la App", userIP: req.ip, status: "Logrado" };
        addLog(logData);

        next();
    } else {
        res.redirect("/");
    }
});

Router.get("/config", (req, res, next) => {
    if (req.session.teacherID && req.session.adminID && (req.session.teacherID == req.session.adminID)) {
        //vitacora
        let logData = { userID: req.session.teacherID, userType: "Administrador", action: "Ingreso a al panel de administracióm", userIP: req.ip, status: "Logrado" };
        addLog(logData);

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