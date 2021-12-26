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
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
}, {
    sequelize,
    modelName: "user"
});

////////////////modelo de los estudiantes

class Students extends Model {}
Students.init({
    names: DataTypes.STRING,
    lastName: DataTypes.STRING,
    CI: DataTypes.INTEGER,
    gender: DataTypes.CHAR,
    seccion: DataTypes.CHAR,
    year: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    parentID: DataTypes.INTEGER,
    subjects: DataTypes.JSON
}, {
    sequelize,
    modelName: "Students"
});

////////////modelo de los tutores

class Tutors extends Model {}
Tutors.init({
    names: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nickName: DataTypes.STRING,
    password: DataTypes.STRING,
    CI: DataTypes.INTEGER,
    gender: DataTypes.CHAR,
    age: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    work: DataTypes.STRING,
    instruction: DataTypes.STRING
}, {
    sequelize,
    modelName: "Tutors"
});

//////auxiliar Information

class AuxiliarInfo extends Model {}
AuxiliarInfo.init({
    studentID: DataTypes.INTEGER,
    allergies: DataTypes.TEXT,
    bloodType: DataTypes.STRING,
    medical_problems: DataTypes.TEXT,
    observatios: DataTypes.TEXT,
    talents: DataTypes.TEXT
}, {
    sequelize,
    modelName: "Auxiliar_Information"
});

/////////////////


module.exports = { User, Students, Tutors, AuxiliarInfo };