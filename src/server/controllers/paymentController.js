const { Payments } = require("../database/models.js");


async function registerPayment({mount, description, currency, cash, bankDepositNumber, banckName}, ci){

    let response = await Payments.create({
        studentCI : ci,
        mount,
        description,
        currency,
        cash,
        bankDepositNumber,
        banckName
    });

    return response;
}

module.exports = { registerPayment};