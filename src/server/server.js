const path = require('path');
const session = require(path.join(__dirname, "sessionStore.js"));
const { insertAdmin } = require("./database/createAdmin.js");
const { createSubjects } = require("./database/CreateSubjects.js")
const { createConfig } = require("./database/createConfig.js");
const { getIp } = require(path.join(__dirname, "networkInterfaces.js"));
const { cleanAllEmailTokens } = require("./controllers/emailControler.js");
const {initTrigers} = require("./database/triggers.js");
///
const {chkTeachersPensum} = require("./controllers/subjectsController.js")




const express = require('express');
const { checkPrices } = require('./libs/checkPrices.js');
const app = express();

//settings
const serverIp = getIp();

//session MYSQL
app.use(session);

//routes
app.use(require("./routes/login.js"));
app.use(require("./routes/registro.js"));
app.use(require("./routes/routes.get.js"));
app.use(require("./routes/routes.post.js"));
app.use(require("./routes/routes.patch.js"));
app.use(require("./routes/routes.delete.js"));
app.use(require("./routes/uploadFile.js"));
app.use(require("./routes/downloadFile.js"));
app.use(require("./routes/emailRecovery.js"));
app.use(require("./routes/test.js")); ////////////////////////////////////////////////Estas son rutas de pruebas, deben eliminarse en la version final

app.use(express.static(path.join(__dirname, "../client/public")));

app.listen(process.env.PORT, serverIp,  err => {
    console.clear();

    if (err) {
        console.log(`Ha ocurrido un error al iniciar el servidor -> ${err.code}`.red);
    } else {
        console.log(`El servidor se ha iniciado correctamente en la direccion -> ${serverIp}:${process.env.PORT}`.green);
       
        insertAdmin();
        createSubjects();
        createConfig();
        cleanAllEmailTokens();
        initTrigers();
        checkPrices();
        //
        chkTeachersPensum();
    }
})