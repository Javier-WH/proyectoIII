const { setSubjects, getSubjects } = require("../controllers/subjectsController.js");

function createSubjects() {

    let checkSubjects = setInterval(async() => {

        try {
            let subject = await getSubjects();

            if (subject.length > 0) {
                clearInterval(checkSubjects);
                return;
            } else {
                console.log("No se ha encontrado el pensum de materias".red);

                let subj = {
                    "1": ["Castellano", "Inglés y otras lenguas extranjeras", "Matemáticas", "Educación Física", "Arte y Patrimonío", "Ciencias Naturales", "Geografía, Historia y Ciudadanía", "Orientación y Convivencia", "Participación en Grupos de Creación, Recreación y Producción"],
                    "2": ["Castellano", "Inglés y otras lenguas extranjeras", "Matemáticas", "Educación Física", "Arte y Patrimonío", "Ciencias Naturales", "Geografía, Historia y Ciudadanía", "Orientación y Convivencia", "Participación en Grupos de Creación, Recreación y Producción"],
                    "3": ["Castellano", "Inglés y otras lenguas extranjeras", "Matemáticas", "Educación Física", "Física", "Química", "Biología", "Geografía, Historia y Ciudadanía", "Orientación y Convivencia", "Participación en Grupos de Creación, Recreación y Producción"],
                    "4": ["Castellano", "Inglés y otras lenguas extranjeras", "Matemáticas", "Educación Física", "Física", "Química", "Biología", "Geografía, Historia y Ciudadanía", "Formación para la Soberanía Nacional", "Orientación y Convivencia", "Participación en Grupos de Creación, Recreación y Producción"],
                    "5": ["Castellano", "Inglés y otras lenguas extranjeras", "Matemáticas", "Educación Física", "Física", "Química", "Biología", "Geografía, Historia y Ciudadanía", "Formación para la Soberanía Nacional", "Orientación y Convivencia", "Participación en Grupos de Creación, Recreación y Producción"]
                }

                let ask = await setSubjects(subj);

                console.log("Se ha creado el pensum de materias".yellow);

                if (ask == "OK") {
                    clearInterval(checkSubjects);
                    return;
                }

            }
        } catch (error) {

        }



    }, 1000);


}

module.exports = { createSubjects };