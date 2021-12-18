let names = ["Jesus", "Juan", "Pablo", "Mateo", "Lucas", "Marcos", "Pedro", "Andres", "Matias", "Esteban", "Santiago", "Daniel", "Gabriel", "Miguel", "Javier",
    "Maria", "Marta", "Veronica", "Milagros", "Ana", "Rosa", "Europa", "Rut", "Sofia", "Emilia", "Estrlina", "Carolina", "Gloria"
];
let lastNames = ["Rodriguez", "Hernandez", "Fernandez", "Gutierrez", "Ruiz", "Betancourt", "Bolivar", "Palacios", "Garcia", "Polachini", "Chiliverty", "Giron",
    "Martinez", "Bustamante", "Lopez", "Herrera", "Blanco", "Suarez"
];


export function getSudentList(seccion) {

    let name1, name2, lastname1, lastname2, nota1, nota2, nota3;
    let nameList = [];

    for (let i = 0; i < 30; i++) {
        name1 = names[Math.floor(Math.random() * names.length - 1)];
        name2 = names[Math.floor(Math.random() * names.length - 1)];
        lastname1 = lastNames[Math.floor(Math.random() * lastNames.length - 1)];
        lastname2 = lastNames[Math.floor(Math.random() * lastNames.length - 1)];
        nota1 = Math.floor(Math.random() * 20);
        nota2 = Math.floor(Math.random() * 20);
        nota3 = Math.floor(Math.random() * 20);
        let ci = Math.floor(Math.random() * (20000000 - 15000000));
        let Name = name1 + ' ' + name2;
        let lastName = lastname1 + ' ' + lastname2;
        let studen = {
            id: i + 1,
            name: Name,
            lastName: lastName,
            ci: ci,
            n1: nota1,
            n2: nota2,
            n3: nota3
        }
        nameList.push(studen);
    }

    return nameList;

}