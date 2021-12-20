const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, ".env") });
///////////////////////////////////////////////////////////////////
const colors = require('colors');
const os = require('os');

const express = require('express');
const app = express();


//settings
const serverIp = os.networkInterfaces().Ethernet[1].address;

//routes
app.use(require("./routes/routes.get.js"));
app.use(require("./routes/routes.post.js"));
app.use(require("./routes/test.js")); ////////////////////////////////////////////////Estas son rutas de pruebas, deben eliminarse en la version final

app.use(express.static(path.join(__dirname, "../client/public")));

app.listen(process.env.PORT, serverIp, err => {
    console.clear();

    if (err) {
        console.log(`Ha ocurrido un error al iniciar el servidor -> ${err.code}`.red);
    } else {
        console.log(`El servidor se ha iniciado correctamente en la direccion -> ${serverIp}:${process.env.PORT}`.green);
    }
})