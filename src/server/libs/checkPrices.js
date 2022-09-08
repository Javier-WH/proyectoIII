const Prices = require("../controllers/pricesController.js");


async function checkPrices() {
    try {
        let prices = await Prices.getPrices();
        if (prices.error) {
            let prc = {
                month: 25,
                base: 50,
                uniform: 20,
                emblem: 15,
                administratives_costs: 15
            }
    
            Prices.setPrices(prc);
    
            console.log("Se ha creado una lista de precios estandar, debe actualizar los precios manualmente".yellow)
        }else{
            console.log("Lista de precios encontrada".blue);
        }
        
    } catch (error) {
        checkPrices();
    }

}

module.exports = {checkPrices};