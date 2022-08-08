const path = require("path");
const express = require("express");
const Router = express.Router();
const { sendEmail, tokenExist } = require("../controllers/emailControler.js");
const { changeTeacherPassword } = require("../controllers/controllers.js");



Router.post("/teacherPasswordRecovery", express.json(), async(req, res) => {
    res.send(await sendEmail(req.body));
});

Router.get("/teacherPasswordRecovery/:token", async(req, res, next) => {
    if ((await tokenExist(req.params.token)).status == "existe") {
        res.redirect("/Recovery");
    } else {
        res.redirect("/");
    }
});

Router.get("/Recovery", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/passwordRecovery.html"));
});

Router.post("/Recovery", express.json(), async(req, res) => {
    res.send(await changeTeacherPassword(req.body))
})

module.exports = Router;