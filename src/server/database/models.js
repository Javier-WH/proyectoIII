const { Model, DataTypes } = require('sequelize');
const sequelize = require('./connection.js');


class User extends Model {}
User.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nickName: DataTypes.STRING,
    password: DataTypes.STRING,
    CI: DataTypes.INTEGER,
    gender: DataTypes.CHAR,
    subject: DataTypes.JSON,
    admin: DataTypes.BOOLEAN
}, {
    sequelize,
    modelName: "user"
});


module.exports = { User };