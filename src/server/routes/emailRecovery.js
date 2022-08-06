const express = require("express");
const Router = express.Router();
const { sendEmail } = require("../controllers/emailControler.js");



Router.post("/teacherPasswordRecovery", express.json(), async(req, res) => {

    res.send(await sendEmail(req.body));
});

module.exports = Router;