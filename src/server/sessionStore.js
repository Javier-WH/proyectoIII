const path = require('path');
const Session = require("express-session");
const mysqlSession = require("express-mysql-session");
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, ".env") });


const sessionStore = new mysqlSession({
    hots: process.env.DB_ADDRESS,
    port: process.env.BD_SESSION_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    //database: process.env.BD_SESSION
    database: process.env.DB_NAME
});

const session = Session({
    key: "user_cookie",
    secret: "Batalla",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    endConnectionOnClose: true
});

module.exports = session;