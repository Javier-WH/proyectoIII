const colors = require('colors')
const controller = require("../controllers/controllers.js");

function insertAdmin() {

    let checkConection = setInterval(async() => {
        try {

            let isAdmin = false;
            let users = await controller.getAllUsers();

            if (users.length > 0) {

                for (let user of users) {
                    if (user.admin == true) {
                        isAdmin = true;
                        break;
                    }
                }
            }

            if (!isAdmin) {
                console.log("No se ha encontrado un administrador".red)
                await controller.insertUser({
                    userName: "Administrador General",
                    userLastName: "",
                    nickName: "admin",
                    password: "123456",
                    ci: "000000000",
                    gender: "",
                    subject: "",
                    admin: "true",
                    phone: "",
                    email: ""
                });
                console.log("Se ha creado un administrador ->  nickName: admin , password: 123456".yellow)
            } else {

            }

            clearInterval(checkConection);
        } catch (error) {

            console.log("test")
        }

    }, 1000);

}

module.exports = { insertAdmin }