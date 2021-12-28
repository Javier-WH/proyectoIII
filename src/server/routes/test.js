const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
const studentsController = require("../controllers/studentsController.js")


//////////////////////////faker////////////////

///////////////////////////////////////////////
Router.get("/teacherPerfil", express.json(), async(req, res) => {
    res.sendFile(path.join(__dirname, "../../client/html/perfilTeacher.html"));
});
Router.post("/getFake", express.json(), async(req, res) => {

    const maleNames = ["Mateo", "Marcos", "Lucas", "Juan", "Pedro", "Santiago", "Matias", "Pablo", "Esteban", "Jesus", "Javier", "Daniel", "Julio", "Joel", "Moises", "Miguel", "Gabriel",
        "Rodolfo", "Antonio", "Alejandro", "Simon", "Francisco", "Vicente", "Leonardo", "Rafael", "David", "Salomon", "Martin"
    ];

    const femaleNames = ["Maria", "Milagros", "Coromoto", "Lucia", "Marta", "Dominga", "Julia", "Gabriela", "Jessica", "Jenifer", "Lola", "Diana", "Rosa", "Luz", "America", "Europa", "Francia",
        "Victoria", "Patricia", "Veronica", "Sofia", "Vanessa", "Lissette", "Adriana", "Rut", "Hada"
    ];

    const lastNames = ["Rodriguez", "Hernandez", "Fernandez", "Gutierres", "Garcia", "Blanco", "Ruiz", "Betancourt", "Espinoza", "Polachini", "Chiliverty", "Lopez", "Martinez", "Paez", "Bolivar",
        "Sucre", "Sanchez", "Ochoa", "Ascanio", "Ytriago"
    ];

    const seccions = ["a", "b", "c"];

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }



    function getStuden() {

        let genderRand = getRandomInt(0, 1);
        let gender = genderRand == 1 ? "M" : "F";
        let CI = getRandomInt(15000000, 30000000);
        let seccion = seccions[getRandomInt(0, 2)];
        let year = getRandomInt(1, 5);
        let age = getRandomInt(11, 16);
        let parentID = getRandomInt(0, 500);
        let name;

        if (gender == "M") {
            name = maleNames[getRandomInt(0, maleNames.length - 1)];
            name += " " + maleNames[getRandomInt(0, maleNames.length - 1)];
        } else {
            name = femaleNames[getRandomInt(0, femaleNames.length - 1)];
            name += " " + femaleNames[getRandomInt(0, femaleNames.length - 1)];
        }
        let lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
        lastName += " " + lastNames[getRandomInt(0, lastNames.length - 1)];

        let subjectList = [{
                "ingles": {
                    "l1": "15",
                    "l2": "16",
                    "l3": "15",
                    "def": "14.5"
                },
                "matematica": {
                    "l1": "10",
                    "l2": "12",
                    "l3": "12",
                    "def": "11"
                },
                "Quimica": {
                    "l1": "10",
                    "l2": "14",
                    "l3": "18",
                    "def": "14"
                }
            },
            {
                "informatica": {
                    "l1": "15",
                    "l2": "16",
                    "l3": "15",
                    "def": "14.5"
                },
                "fisica": {
                    "l1": "10",
                    "l2": "12",
                    "l3": "12",
                    "def": "11"
                },
                "biologia": {
                    "l1": "10",
                    "l2": "14",
                    "l3": "18",
                    "def": "14"
                }
            }
        ]

        let subjects = subjectList[getRandomInt(0, 1)];

        return {
            "names": name,
            "lastName": lastName,
            "ci": CI,
            "gender": gender,
            "seccion": seccion,
            "year": year,
            "age": age,
            "parentID": parentID,
            // "subjects": subjects
        }
    }

    function registerStudenList(cant) {

        for (let i = 0; i < cant; i++) {
            studentsController.registerStudent(getStuden());
        }
    }


    registerStudenList(req.body.cant);

    res.send("OK")

})



module.exports = Router;