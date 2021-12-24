const path = require('path')
const express = require('express');
const Router = express.Router();
const controller = require("../controllers/controllers.js")


Router.get("/", async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/loginScreen.html"));
});
Router.get("/app", async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/app.html"));
});




module.exports = Router;