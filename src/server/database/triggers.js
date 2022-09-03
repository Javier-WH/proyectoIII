const sequelize = require('./connection.js');



async function trigerInsertUser() {
    let triggerName = "intertUserTrigger";
    let description = "Inscripcion de profesor"
    await sequelize.query(`DROP TRIGGER IF EXISTS ${triggerName}`);
    await sequelize.query(`CREATE TRIGGER ${triggerName} AFTER INSERT ON users FOR EACH ROW BEGIN INSERT INTO bitacoras(description, newData, oldData, createdAt, updatedAt) ` +
        `VALUES('${description}',CONCAT('{"nombre":"',NEW.name,
                            '","apellido":"',NEW.lastName,
                            '","apodo":"',NEW.nickName,
                            '","password":"',NEW.password,
                            '","ci":"',NEW.CI,
                            '","genero":"',NEW.gender,
                            '","materias-secciones":',NEW.subject,
                            ',"telefono":"',NEW.phone,
                            '","email":"',NEW.email,
                            '","administrador":"',NEW.admin,'"}'                           
                            ),'{"message":"No hay datos"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); END`)
}

async function trigerUpdateUser() {
    let triggerName = "updateUserTrigger";
    let description = "Actualización de datos del profesor"
    await sequelize.query(`DROP TRIGGER IF EXISTS ${triggerName}`);
    await sequelize.query(`CREATE TRIGGER ${triggerName} AFTER UPDATE ON users FOR EACH ROW BEGIN INSERT INTO bitacoras(description, newData, oldData, createdAt, updatedAt) ` +
        `VALUES('${description}',CONCAT('{"nombre":"',NEW.name,
                            '","apellido":"',NEW.lastName,
                            '","apodo":"',NEW.nickName,
                            '","password":"',NEW.password,
                            '","ci":"',NEW.CI,
                            '","genero":"',NEW.gender,
                            '","materias-secciones":',NEW.subject,
                            ',"telefono":"',NEW.phone,
                            '","email":"',NEW.email,
                            '","administrador":"',NEW.admin,'"}'                           
                            ),CONCAT('{"nombre":"',OLD.name,
                            '","apellido":"',OLD.lastName,
                            '","apodo":"',OLD.nickName,
                            '","password":"',OLD.password,
                            '","ci":"',OLD.CI,
                            '","genero":"',OLD.gender,
                            '","materias-secciones":',OLD.subject,
                            ',"telefono":"',OLD.phone,
                            '","email":"',OLD.email,
                            '","administrador":"',OLD.admin, '"}'                            
                            ), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); END`)
}

async function trigerDeleteUser() {
    let triggerName = "deleteUserTrigger";
    let description = "Eliminación de profesor"
    await sequelize.query(`DROP TRIGGER IF EXISTS ${triggerName}`);
    await sequelize.query(`CREATE TRIGGER ${triggerName} AFTER DELETE ON users FOR EACH ROW BEGIN INSERT INTO bitacoras(description, newData, oldData, createdAt, updatedAt) ` +
        `VALUES('${description}','{"message":"No hay datos"}' ,CONCAT('{"nombre":"',OLD.name,
                            '","apellido":"',OLD.lastName,
                            '","apodo":"',OLD.nickName,
                            '","password":"',OLD.password,
                            '","ci":"',OLD.CI,
                            '","genero":"',OLD.gender,
                            '","materias":',OLD.subject,
                            ',"telefono":"',OLD.phone,
                            '","email":"',OLD.email,
                            '","administrador":"',OLD.admin,'"}'                           
                            ), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); END`)
}


async function trigerUpdateStudent() {
    let triggerName = "updateStudentTrigger";
    let description = "Actualización de notas o datos del estudiante"
    await sequelize.query(`DROP TRIGGER IF EXISTS ${triggerName}`);
    await sequelize.query(`CREATE TRIGGER ${triggerName} AFTER UPDATE ON students FOR EACH ROW BEGIN INSERT INTO bitacoras(description, newData, oldData, createdAt, updatedAt) ` +
        `VALUES('${description}',CONCAT('{"nombre":"',NEW.names,
                            '","apellido":"',NEW.lastName,
                            '","ci":"',NEW.CI,
                            '","genero":"',NEW.gender,
                            '","seccion":"',NEW.seccion,
                            '","year":"',NEW.year,
                            '","edad":"',NEW.age,
                            '","representantes":"',NEW.tutorID,
                            '","materias":',NEW.subjects,
                            ',"periodo":"',NEW.schoolYear,
                            '","foto":"',NEW.photo,'"}'
                            ), CONCAT('{"nombre":"',OLD.names,
                            '","apellido":"',OLD.lastName,
                            '","ci":"',OLD.CI,
                            '","genero":"',OLD.gender,
                            '","seccion":"',OLD.seccion,
                            '","year":"',OLD.year,
                            '","edad":"',OLD.age,
                            '","representantes":"',OLD.tutorID,
                            '","materias":',OLD.subjects,
                            ',"periodo":"',OLD.schoolYear,
                            '","foto":"',OLD.photo, '"}'
                            ), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); END`)
}

async function trigerInsertStudent() {
    let triggerName = "insertStudentTrigger";
    let description = "Inscripción de estudiante";
    await sequelize.query(`DROP TRIGGER IF EXISTS ${triggerName}`);
    await sequelize.query(`CREATE TRIGGER ${triggerName} AFTER INSERT ON students FOR EACH ROW BEGIN INSERT INTO bitacoras(description, newData, oldData, createdAt, updatedAt) ` +
        `VALUES('${description}',CONCAT('{"nombre":"',NEW.names,
                            '","apellido":"',NEW.lastName,
                            '","ci":"',NEW.CI,
                            '","genero":"',NEW.gender,
                            '","seccion":"',NEW.seccion,
                            '","year":"',NEW.year,
                            '","edad":"',NEW.age,
                            '","representantes":"',NEW.tutorID,
                            '","materias":',NEW.subjects,
                            ',"periodo":"',NEW.schoolYear,
                            '","foto":"',NEW.photo,'"}'
                            ),'{"message":"No hay datos"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); END`)
}

async function trigerDeleteStudent() {
    let triggerName = "deleteStudentTrigger";
    let description = "Eliminación de Estudiante";
    await sequelize.query(`DROP TRIGGER IF EXISTS ${triggerName}`);
    await sequelize.query(`CREATE TRIGGER ${triggerName} AFTER DELETE ON students FOR EACH ROW BEGIN INSERT INTO bitacoras(description, newData, oldData, createdAt, updatedAt) ` +
        `VALUES('${description}','{"message":"No hay datos"}', CONCAT('{"nombre":"',OLD.names,
                            '","apellido":"',OLD.lastName,
                            '","ci":"',OLD.CI,
                            '","genero":"',OLD.gender,
                            '","seccion":"',OLD.seccion,
                            '","year":"',OLD.year,
                            '","edad":"',OLD.age,
                            '","representantes":"',OLD.tutorID,
                            '","materias":',OLD.subjects,
                            ',"periodo":"',OLD.schoolYear,
                            '","foto":"',OLD.photo,'"}'
                            ), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); END`)
}




async function trigerChangeConfig() {
    let triggerName = "changeConfigTrigger";
    let description = "Cambio en la configuración"
    await sequelize.query(`DROP TRIGGER IF EXISTS ${triggerName}`);
    await sequelize.query(`CREATE TRIGGER ${triggerName} AFTER UPDATE ON configs FOR EACH ROW BEGIN INSERT INTO bitacoras(description, newData, oldData, createdAt, updatedAt) ` +
        `VALUES('${description}',CONCAT('{"lapso1":"',NEW.l1,
                            '","lapso2":"',NEW.l2,
                            '","lapso3":"',NEW.l3,
                            '","editar":"',NEW.edit,
                            '","periodo":"',NEW.schoolYear, '"}'
                            ), CONCAT('{"lapso1":"',OLD.l1,
                            '","lapso2":"',OLD.l2,
                            '","lapso3":"',OLD.l3,
                            '","editar":"',OLD.edit,
                            '","periodo":"',OLD.schoolYear, '"}'
                            ), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); END`)
}

async function trigerInsertTutor() {
    let triggerName = "intertTutorTrigger";
    let description = "Inscripcion de nuevo tutor"
    await sequelize.query(`DROP TRIGGER IF EXISTS ${triggerName}`);
    await sequelize.query(`CREATE TRIGGER ${triggerName} AFTER INSERT ON tutors FOR EACH ROW BEGIN INSERT INTO bitacoras(description, newData, oldData, createdAt, updatedAt) ` +
        `VALUES('${description}',CONCAT('{"nombre":"',NEW.names,
                            '","apellido":"',NEW.lastName,
                            '","apodo":"',NEW.nickName,
                            '","password":"',NEW.password,
                            '","ci":"',NEW.CI,
                            '","genero":"',NEW.gender,
                            '","edad":"',NEW.age,
                            '","dirección":"',NEW.address,
                            '","trabajo":"',NEW.work,
                            '","teléfono":"',NEW.phone,
                            '","teléfono2":"',NEW.phone2,
                            '","whatsapp":',NEW.whatsapp,
                            ',"email":"',NEW.email,
                            '","instrucción":"',NEW.instruction, '"}'                            
                            ), '{"message":"No hay datos"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); END`)
}


async function trigerUpdateSubjects() {
    let triggerName = "updateSubjectsTrigger";
    let description = "Cambio en el pensum"
    await sequelize.query(`DROP TRIGGER IF EXISTS ${triggerName}`);
    await sequelize.query(`CREATE TRIGGER ${triggerName} AFTER UPDATE ON subjects FOR EACH ROW BEGIN INSERT INTO bitacoras(description, newData, oldData, createdAt, updatedAt) ` +
        `VALUES('${description}',CONCAT('{"grado":"',NEW.grade,
                            '","pensum":',NEW.subjectsList,'}'
                            ), CONCAT('{"grado":"',OLD.grade,
                            '","pensum":',OLD.subjectsList,'}'
                            ), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); END`)
}



async function initTrigers() {
    try {

        //triggers de usuario
        await trigerInsertUser();
        await trigerUpdateUser();
        await trigerDeleteUser();

        //triggers de alumnos
        await trigerInsertStudent();
        await trigerUpdateStudent();
        await trigerDeleteStudent();

        //trigger de la configuración
        await trigerChangeConfig();

        //triggers de tutor
        await trigerInsertTutor();

        //trigger pensum escolar

        await trigerUpdateSubjects();


        console.log("Se han iniciado correctamente los triggers".blue)
    } catch (error) {
        console.log(`Ocurrió un error al iniciar los triggers -> ${error}`.red)
    }
}

module.exports = { initTrigers }