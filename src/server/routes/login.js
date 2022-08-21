const path = require('path')
const express = require('express');
const Router = express.Router();
const controller = require("../controllers/controllers.js");
const { setLog, setLogCloseSession } = require("../controllers/bitacoraController.js");

Router.get("/", async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/loginScreen.html"));
});

Router.get("/Administracion", async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/admin.html"));
});

Router.get("/registro", async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/registerTeacher.html"));
});


Router.get("/preinscripcionForm", async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/preInsciptionForm.html"));
});


Router.post("/autenticateTeacher", express.json(), async(req, res) => {

    let response = await controller.checklogin(req.body);
    if (response > 0) {
        req.session.teacherID = response;
        req.session.ip = req.ip;
        setLog(req, "Inicio session de profesor");
    }
    res.send("" + response);
});

Router.post("/autenticateAdmin", express.json(), async(req, res) => {
    let response = await controller.checkAdmin(req.body);
    if (response > 0) {
        req.session.adminID = response;
        req.session.teacherID = response;
        req.session.ip = req.ip;
        setLog(req, "Ingreso al panel de administración");
    }
    res.send("" + response);
});


Router.get("/logout", express.json(), async(req, res) => {
    if(req.session.teacherID != undefined){
        setLogCloseSession(req.session.teacherID, "Seccion cerrada")
    }
    req.session.destroy();
    req.session = null;
    res.redirect("/");
});



module.exports = Router;