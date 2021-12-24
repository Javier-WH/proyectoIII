const path = require('path')
const express = require('express');
const Router = express.Router();
const controller = require("../controllers/controllers.js")


Router.get("/", async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/loginScreen.html"));
});


Router.post("/autenticateTeacher", express.json(), async(req, res) => {

    let response = await controller.checklogin(req.body);
    if (response > 0) {
        req.session.teacherID = response;
    }
    res.send("" + response);
});


Router.get("/logout", express.json(), async(req, res) => {
    req.session.destroy();
    req.session = null;
    res.redirect("/");
});



module.exports = Router;