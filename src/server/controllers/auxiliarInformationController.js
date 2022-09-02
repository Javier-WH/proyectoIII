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

/////////////////

async function getAuxInfo(ci){

    try {
        let ask = await AuxiliarInfo.findAll({where:{studentCI:ci}});
    
        if(ask.length > 0){
            return ask[0];
        }
        return {Error:"El estudiante no existe"}
    } catch (error) {
        console.log(error);
    }
}

module.exports = {insertAuxInfo, getAuxInfo};