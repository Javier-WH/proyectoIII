const path = require('path');
const colors = require('colors');
const express = require('express');
const Router = express.Router();
const { registerPayment } = require("../controllers/paymentController");
const { insertAuxInfo } = require("../controllers/auxiliarInformationController.js");
const studentsController = require("../controllers/studentsController.js");


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
        let tutorID = getRandomInt(0, (cant / 4));
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

        
        return {
            names: name,
            lastName: lastName,
            ci: CI,
            motherName: "nombre de prueba",
            motherCI : "5555",
            motherWork : "trabajo de prueba",
            fatherName : "nombre de prueba",
            fatherCI : "5555",
            fatherWork : "trbajo de prueba",
            gender: gender,
            year: year,
            age: age,
            birthDay: "cumpleaños de prueba",
            address : "dirección de prueba",
            tutorID: tutorID,
            procedence: "escuela de prueba",
            schoolYear: schoolYear,
            seccion: seccion
        }
    }

    
//{ names, lastName, ci, motherName, motherCI, motherWork, fatherName, fatherCI, fatherWork, gender, seccion, year, age, birthDay, address, tutorID, procedence, schoolYear} datos
//{ mount, description, cash, bankDepositNumber, banckName, fullpaid, emblem, uniform, month, schoolYear }, ci pago
//({ allergies, bloodType, medical_problems, observatios, talents }, ci auxiliar

    function registerStudenList(cant, schoolYear) {
        let paydment = {
            mount: 100,
            description: "Pago Preinscripcion",
            cash: true,
            bankDepositNumber: "No suministrado",
            banckName: "No suministrado",
            fullpaid: true,
            emblem: true,
            uniform: true,
            month: 0,
            schoolYear
        }
        let aux = {
            allergies: "A los pelos de gato",
            bloodType: "AB RH-positivo",
            medical_problems: "Ninguno",
            observatios: "Ninguna",
            talents: "Ninguno"
        }

        for (let i = 0; i < cant; i++) {
            let student = getStuden(cant, schoolYear)
            studentsController.registerStudent( student);
            registerPayment(paydment, student.ci);
            insertAuxInfo(aux, student.ci)
        }
    }


    registerStudenList(req.body.cant, req.body.schoolYear);

    res.send("OK")

})



module.exports = Router;