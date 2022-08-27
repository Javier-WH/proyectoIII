const { User } = require("../database/models.js");

async function getAllSubjects(id = 0){
   
    let usersList = await User.findAll();
    let subjectList = [];
    let secctions = [];
    
    usersList.map(user=>{
     
            let key = Object.keys(user.subject);
            subjectList = subjectList.concat(key);
      
    });
    subjectList = [... new Set(subjectList)];
 
    for(user of usersList){
        if(user.id != id){
            for(subject of subjectList){
                if(user.subject[subject] != undefined){
                    for(sec of user.subject[subject]){
                        secctions.push(`${subject}${sec}`)
                    }
                }   
            }
        }
    }

    return secctions;
}

async function checkSubjects(subjects, id){

    subjects = plainUserSubjects(subjects);


    let unableSubjects = await getAllSubjects(id);

   for(unableSub of unableSubjects){

        if(subjects.includes(unableSub)){

            return {
                ERROR: "La materia ya esta asignada a otro profesor",
                subject: unableSub
                }
        }
   }

   return {
        Exito:"OK"
    }
}

function plainUserSubjects(subjects){

    let keys = Object.keys(subjects);

    let userSubjects = [];

    keys.map(key=>{
     
        for(section of subjects[key]){
            userSubjects.push(`${key}${section}`);
        }

    })

    return userSubjects;
}


module.exports = {checkSubjects}