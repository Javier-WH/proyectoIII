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
    subjects: DataTypes.JSON,
    schoolYear: DataTypes.STRING,
    photo: DataTypes.STRING
}, {
    sequelize,
    modelName: "Students"
});
///modelo de preinscripcion
class PreIscription extends Model {}
PreIscription.init({
    names: DataTypes.STRING,
    lastName: DataTypes.STRING,
    CI: DataTypes.INTEGER,
    gender: DataTypes.CHAR,
    year: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    parentID: DataTypes.INTEGER,
    schoolYear: DataTypes.STRING
}, {
    sequelize,
    modelName: "PreIscription"
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
    email: DataTypes.STRING,
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

//config

class Config extends Model {};
Config.init({
    l1: DataTypes.BOOLEAN,
    l2: DataTypes.BOOLEAN,
    l3: DataTypes.BOOLEAN,
    edit: DataTypes.BOOLEAN,
    schoolYear: DataTypes.STRING
}, {
    sequelize,
    modelName: "Config"
});

////////////////////
//Subjects list

class Subjects extends Model {};
Subjects.init({
    grade: DataTypes.INTEGER,
    subjectsList: DataTypes.JSON
}, {
    sequelize,
    modelName: "Subjects"
});

module.exports = { User, Students, Tutors, PreIscription, AuxiliarInfo, Config, Subjects };