const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
const studentsController = require("../controllers/studentsController.js")


//////////////////////////faker////////////////

///////////////////////////////////////////////

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

    const seccions = ["a", "b"];

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }



    function getStuden(cant, schoolYear) {

        let genderRand = getRandomInt(0, 1);
        let gender = genderRand == 1 ? "M" : "F";
        let CI = getRandomInt(15000000, 30000000);
        let seccion = seccions[getRandomInt(0, 1)];
        let year = getRandomInt(1, 5);
        let age = getRandomInt(11, 16);
        let parentID = getRandomInt(0, (cant / 4));
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

        let subjectListA = {
            "ingles": {
                "l1": getRandomInt(0, 20),
                "l2": getRandomInt(0, 20),
                "l3": getRandomInt(0, 20),
                "def": "0"
            },
            "matematica": {
                "l1": getRandomInt(0, 20),
                "l2": getRandomInt(0, 20),
                "l3": getRandomInt(0, 20),
                "def": "0"
            },
            "historia": {
                "l1": getRandomInt(0, 20),
                "l2": getRandomInt(0, 20),
                "l3": getRandomInt(0, 20),
                "def": "0"
            },
            "deporte": {
                "l1": getRandomInt(0, 20),
                "l2": getRandomInt(0, 20),
                "l3": getRandomInt(0, 20),
                "def": "0"
            },
            "geogrfia": {
                "l1": getRandomInt(0, 20),
                "l2": getRandomInt(0, 20),
                "l3": getRandomInt(0, 20),
                "def": "0"
            }
        };

        let subjectListB = {
            "informatica": {
                "l1": getRandomInt(0, 20),
                "l2": getRandomInt(0, 20),
                "l3": getRandomInt(0, 20),
                "def": "0"
            },
            "fisica": {
                "l1": getRandomInt(0, 20),
                "l2": getRandomInt(0, 20),
                "l3": getRandomInt(0, 20),
                "def": "0"
            },
            "biologia": {
                "l1": getRandomInt(0, 20),
                "l2": getRandomInt(0, 20),
                "l3": getRandomInt(0, 20),
                "def": "0"
            },
            "historia": {
                "l1": getRandomInt(0, 20),
                "l2": getRandomInt(0, 20),
                "l3": getRandomInt(0, 20),
                "def": "0"
            },
            "deporte": {
                "l1": getRandomInt(0, 20),
                "l2": getRandomInt(0, 20),
                "l3": getRandomInt(0, 20),
                "def": "0"
            },
            "geogrfia": {
                "l1": getRandomInt(0, 20),
                "l2": getRandomInt(0, 20),
                "l3": getRandomInt(0, 20),
                "def": "0"
            }

        }


        let subjects = seccion == "a" ? subjectListA : subjectListB;


        return {
            "names": name,
            "lastName": lastName,
            "ci": CI,
            "gender": gender,
            "seccion": seccion,
            "year": year,
            "age": age,
            "parentID": parentID,
            "subjects": subjects,
            "schoolYear": schoolYear
        }
    }

    function registerStudenList(cant, schoolYear) {

        for (let i = 0; i < cant; i++) {
            studentsController.registerStudent(getStuden(cant, schoolYear));
        }
    }


    registerStudenList(req.body.cant, req.body.schoolYear);

    res.send("OK")

})



module.exports = Router;