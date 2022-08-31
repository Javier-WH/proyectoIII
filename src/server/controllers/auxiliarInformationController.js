const { AuxiliarInfo } = require("../database/models.js");

async function insertAuxInfo({studentCI, studentID, allergies, bloodType, medical_problems, observatios, talents}){

    let insert = await AuxiliarInfo.create({
        studentCI,
        studentID, 
        allergies, 
        bloodType, 
        medical_problems, 
        observatios, 
        talents});
    
        return insert;

};

module.exports = {insertAuxInfo};