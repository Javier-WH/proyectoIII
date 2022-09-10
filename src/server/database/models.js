const { Model, DataTypes, Sequelize } = require('sequelize');
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
    CI: DataTypes.STRING,
    motherName: DataTypes.STRING,
    motherCI: DataTypes.INTEGER,
    motherWork: DataTypes.STRING,
    fatherName: DataTypes.STRING,
    fatherCI: DataTypes.INTEGER,
    fatherWork: DataTypes.STRING,
    gender: DataTypes.CHAR,
    year: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    birthDay:DataTypes.STRING,
    address: DataTypes.STRING,
    tutorID: DataTypes.INTEGER,
    procedence: DataTypes.STRING,
    schoolYear: DataTypes.STRING,
    seccion: DataTypes.CHAR,
    subjects: DataTypes.JSON,
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
    CI: DataTypes.STRING,
    motherName: DataTypes.STRING,
    motherCI: DataTypes.INTEGER,
    motherWork: DataTypes.STRING,
    fatherName: DataTypes.STRING,
    fatherCI: DataTypes.INTEGER,
    fatherWork: DataTypes.STRING,
    gender: DataTypes.CHAR,
    year: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    birthDay:DataTypes.STRING,
    address: DataTypes.STRING,
    tutorID: DataTypes.INTEGER,
    procedence: DataTypes.STRING,
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
    phone: DataTypes.STRING,
    phone2:{
        type: Sequelize.STRING,
        defaultValue:"No suministrado"
    },
    whatsapp: DataTypes.JSON,
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
    studentCI: DataTypes.STRING,
    allergies: {
        type: Sequelize.STRING,
        defaultValue: "No Suministrado"
    },
    bloodType: {
        type: Sequelize.STRING,
        defaultValue: "No Suministrado"
    },
    medical_problems: {
        type: Sequelize.TEXT,
        defaultValue: "No Suministrado"
    },
    observatios:  {
        type: Sequelize.TEXT,
        defaultValue: "No Suministrado"
    },
    talents:  {
        type: Sequelize.TEXT,
        defaultValue: "No Suministrado"
    }
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

/////

class emailTokens extends Model {};
emailTokens.init({
    idUser: DataTypes.INTEGER,
    token: DataTypes.STRING,
    ci: DataTypes.STRING
}, {
    sequelize,
    modelName: "emailTokens"
});
/////////////////

class Bitacora extends Model {};
Bitacora.init({
    description: DataTypes.STRING,
    newData: DataTypes.JSON,
    oldData: DataTypes.JSON,
}, {
    sequelize,
    modelName: "Bitacora"
});

/////////////////

class Payments extends Model {};
Payments.init({
    studentCI: DataTypes.STRING,
    mount: DataTypes.DOUBLE,
    description: DataTypes.STRING,
    cash: DataTypes.BOOLEAN,
    bankDepositNumber:{
        type: Sequelize.STRING,
        defaultValue: "No suministrado"
    },
    banckName:{
        type: Sequelize.STRING,
        defaultValue:"No suministrado"
    },
    fullpaid: DataTypes.BOOLEAN,
    emblem: DataTypes.BOOLEAN,
    uniform: DataTypes.BOOLEAN,
    month: DataTypes.INTEGER
},{
    sequelize,
    motherName: "Payments"
})

class Prices extends Model{};
Prices.init({
    month : DataTypes.DOUBLE,
    base: DataTypes.DOUBLE,
    uniform: DataTypes.DOUBLE,
    emblem: DataTypes.DOUBLE,
    administratives_costs: DataTypes.DOUBLE
},{
    sequelize,
    modelName: "Prices"
})
module.exports = { User, Students, Tutors, PreIscription, AuxiliarInfo, Config, Subjects, emailTokens, Bitacora, Payments, Prices};