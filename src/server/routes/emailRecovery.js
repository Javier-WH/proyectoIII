const path = require("path");
const express = require("express");
const Router = express.Router();
const { sendEmail, tokenExist, isTokenListEmpty, ciExist } = require("../controllers/emailControler.js");
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

Router.get("/Recovery", async(req, res) => {
    if (await isTokenListEmpty()) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "../../client/html/passwordRecovery.html"));
    }
});

///Existe un bug, si un usuario llega hasta aqui, puede cambiar la contraseña de cualquiera si introduce la cedula de otro usuario que tambien solicitase el cambio de password, hay que validar que la cedula y el token concuerden
Router.post("/Recovery", express.json(), async(req, res) => {
    res.send(await changeTeacherPassword(req.body))
})

module.exports = Router;