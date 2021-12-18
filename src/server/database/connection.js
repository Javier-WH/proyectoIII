const colors = require('colors');
const { Sequelize } = require('sequelize');


console.log();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_ADDRESS,
    dialect: 'mysql'
});


async function getConnection() {
    try {
        await sequelize.sync({ force: false });
        console.log('La conexión a la base de datos ha sido existosa'.green);
    } catch (error) {
        console.error(`Ha ocurrido un error al conectarse con la base de datos: ${error.code}`.red);
    }
}

getConnection();

module.exports = sequelize;