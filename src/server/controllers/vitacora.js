const { Vitacora } = require("../database/models.js");

async function addLog(data) {
    await Vitacora.create(data);
}

module.exports = { addLog }