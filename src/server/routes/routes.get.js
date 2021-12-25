const path = require('path')
const express = require('express');
const Router = express.Router();
const controller = require("../controllers/controllers.js")


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



Router.get("/app", async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/app.html"));
});
Router.get("/config", async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/config.html"));
});




module.exports = Router;