const { setConfig, getConfig } = require("../controllers/configControler.js");

function createConfig() {

    let checkConfig = setInterval(async() => {

        try {
            let config = await getConfig();
            let year = new Date().getFullYear();


            if (config.length > 0) {
                clearInterval(checkConfig);
                return;
            } else {
                console.log("No se ha establecido una configuración".red);

                let conf = {
                    l1: false,
                    l2: false,
                    l3: false,
                    edit: false,
                    schoolYear: year
                }

                let ask = await setConfig(conf);

                console.log("Se ha establecido una configuracion por defecto".yellow);

                clearInterval(checkConfig);


            }
        } catch (error) {

        }



    }, 1000);


}
module.exports = { createConfig };