const { AuxiliarInfo } = require("../database/models.js");

async function insertAuxInfo({ allergies, bloodType, medical_problems, observatios, talents}, ci){

    let insert = await AuxiliarInfo.create({
        studentCI: ci,
        allergies, 
        bloodType, 
        medical_problems, 
        observatios, 
        talents});
    
        return insert;

};

module.exports = {insertAuxInfo};