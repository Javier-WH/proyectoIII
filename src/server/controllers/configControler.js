const { Config } = require("../database/models.js");

async function getConfig() {
    let config = Config.findAll();
    return new Promise((resolved, rejected) => {
        resolved(config);
        rejected({ ERROR: "Ha ocurrido un error al intentar obtener el archivo de configuración" })
    })
};

async function setConfig(data) {

    let isConfig = await getConfig();
    let config;

    if (isConfig.length > 0) {
        config = await Config.update(data, {
            where: {
                id: 1
            }
        });
    } else {
        config = await Config.create(data);
    }
    return new Promise((resolved, rejected) => {
        resolved(config);
        rejected({ ERROR: "Ha ocurrido un error al intentar actualizar el archivo de configuración" })
    })
}




module.exports = { getConfig, setConfig }