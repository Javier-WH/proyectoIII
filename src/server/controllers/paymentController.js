const { Payments } = require("../database/models.js");


async function registerPayment({studentCI, mount, description, currency, cash, bankDepositNumber, banckName}){

    let response = await Payments.create({
        studentCI,
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