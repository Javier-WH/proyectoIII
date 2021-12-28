const table = document.getElementById("studentList");
export function fillSeccionList({ subject }, seccionList) {

    let numero = 1;
    let html = "";


    seccionList.map(student => {
        let lapso1 = "";
        let lapso2 = "";
        let lapso3 = "";
        let def = "";

        try {
            lapso1 = student.subjects[subject]["l1"];
        } catch (error) {
            lapso1 = "0";
        }
        try {
            lapso2 = student.subjects[subject]["l2"];
        } catch (error) {
            lapso2 = "0";
        }
        try {
            lapso3 = student.subjects[subject]["l3"];
        } catch (error) {
            lapso3 = "0";
        }
        try {
            def = student.subjects[subject]["def"];
        } catch (error) {
            def = "0";
        }

        html += `
            <tr id = "std-${student.id}">
                <th scope="row">${numero++}</th>
                <td>${student.CI}</td>
                <td>${student.names}</td>
                <td>${student.lastName}</td>
                <td id="lapso1-${student.id}">${lapso1}</td>
                <td id="lapso2-${student.id}">${lapso2}</td>
                <td id="lapso3-${student.id}">${lapso3}</td> 
                <td id="def-${student.id}">${def}</td>
                
            </tr>
        `

    });
    table.innerHTML = html;
};