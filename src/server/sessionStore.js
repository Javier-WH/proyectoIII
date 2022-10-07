var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, ".env") });

var options = {
	host: process.env.DB_ADDRESS,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
};

var sessionStore = new MySQLStore(options);

const Session = session({
    key: "user_cookie",
    secret: "Batalla",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    endConnectionOnClose: true
});

module.exports = Session;


/*
const path = require('path');
const Session = require("express-session");
const mysqlSession = require("express-mysql-session");
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, ".env") });
var mysql2 = require('mysql2/promise');



let session = (Session({
    secret: 'Batalla',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))*/



/*
const sessionStore = new mysqlSession({
    hots: process.env.DB_ADDRESS,
    port: process.env.BD_SESSION_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    //database: process.env.BD_SESSION
    database: process.env.DB_NAME
});
*/

