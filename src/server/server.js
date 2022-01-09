const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, ".env") });
const session = require("express-session");
///////////////////////////////////////////////////////////////////
const { insertAdmin } = require("./database/createAdmin.js");

const colors = require('colors');
const os = require('os');

const express = require('express');
const app = express();


//settings
const serverIp = os.networkInterfaces().Ethernet[1].address;


//session MYSQL
const mysqlSession = require("express-mysql-session");
const optSession = {
    hots: process.env.DB_ADDRESS,
    port: process.env.BD_SESSION_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.BD_SESSION
}
const sessionStore = new mysqlSession(optSession);
app.use(session({
    key: "user_cookie",
    secret: "Batalla",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    endConnectionOnClose: true
}))



//routes
app.use(require("./routes/login.js"));
app.use(require("./routes/registro.js"));
app.use(require("./routes/routes.get.js"));
app.use(require("./routes/routes.post.js"));
app.use(require("./routes/routes.patch.js"))
app.use(require("./routes/routes.delete.js"))
app.use(require("./routes/test.js")); ////////////////////////////////////////////////Estas son rutas de pruebas, deben eliminarse en la version final

app.use(express.static(path.join(__dirname, "../client/public")));

app.listen(process.env.PORT, serverIp, err => {
    console.clear();

    if (err) {
        console.log(`Ha ocurrido un error al iniciar el servidor -> ${err.code}`.red);
    } else {
        console.log(`El servidor se ha iniciado correctamente en la direccion -> ${serverIp}:${process.env.PORT}`.green);
    }
    insertAdmin();

});