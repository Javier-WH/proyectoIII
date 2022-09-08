const { Prices } = require("../database/models.js");

async function getPrices(){
    let prices = await Prices.findAll();
    if(prices.length > 0){
        return prices[0];
    }
    return {error: -1, message: "No se encontró una lista de precios"}
}

async function setPrices({ month, base, uniform, emblem, administratives_costs }){
    let errorMessage =  {error: -2, message:"Ocurrió un error cuando se intentó actualizar la lista de precios"}
    
    try {
        
        let checkPrices = await getPrices();

        if(checkPrices.error == -1){

            let insertPrices = await Prices.create({
                month,
                base,
                uniform,
                emblem,
                administratives_costs
            });

            if(insertPrices.id == 1){
                return {message: "OK"}
            }
            return errorMessage;

        }else{
            let updatePrices = await Prices.update({
                month,
                base,
                uniform,
                emblem,
                administratives_costs
            },{
                where:{
                    id:1
                }
            })

            if(updatePrices.length > 0){
                return {message: "OK"}
            }
            return errorMessage;
        }  
    } catch (error) {
        console.log(error);
        return errorMessage;
    }
}

module.exports = {
    getPrices,
    setPrices
}