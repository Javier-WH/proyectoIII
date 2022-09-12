const path = require('path')
const express = require('express');
const Router = express.Router();
const { getAllBitacoraData } = require("../controllers/bitacoraController.js");
const { getPrices } = require("../controllers/pricesController.js")



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


Router.get("/teacherPerfil", async (req, res, next) => {
    if (req.session.teacherID) {
        next();
    } else {
        res.redirect("/");
    }
});

Router.get("/bitacora", async (req, res, next) => {
    if (req.session.adminID) {
        res.send(await getAllBitacoraData());
    } else {
        res.redirect("/");
    }
});

Router.get("/payment", async (req, res, next) => {
    if (req.session.adminID) {
        res.sendFile(path.join(__dirname, "../../client/html/payment.html"));
    } else {
        res.redirect("/");
    }
});


Router.get("/addPayment", async (req, res, next) => {
    if (req.session.adminID) {
        if(req.query.CI != undefined){
            req.session.studentCI = req.query.CI;
        }else{
            delete req.session.studentCI;
        }
        res.sendFile(path.join(__dirname, "../../client/html/registerPaytment.html"));
    } else {
        res.redirect("/");
    }
});


////

Router.get("/Estudiante/registro", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/PreInscriptionForm.html"));
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////

Router.get("/app", async (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/app.html"));
});
Router.get("/config", async (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/config.html"));
});

Router.get("/teacherPerfil", async (req, res) => {
    req.session.perfil = req.query.ci;
    res.sendFile(path.join(__dirname, "../../client/html/perfilTeacher.html"));
});
Router.get("/controlPannel", async (req, res) => {
    req.session.tutorCI = req.query.CI;
    req.session.tutorID = req.query.id;
    res.sendFile(path.join(__dirname, "../../client/html/tutorControlPannel.html"));
});

Router.get("/getPrices", async (req, res) => {
    res.json(await getPrices());
})

module.exports = Router;