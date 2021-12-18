import React,{Component} from "react";
import './grade.css'


class Grades extends Component{

    //clean selected color of all grades
    static unselectALL(){
        let grades = document.getElementsByClassName("inputGrade");
        for(let grade of grades){
            grade.classList.remove("gradeSelected")
            document.getElementById("lbl" + grade.id).style.color = "grey";
        }
    }
    //set selected color of a grade
    setSelected(e){
        Grades.unselectALL();
        e.target.classList.add("gradeSelected")
        document.getElementById("lbl"+e.target.id).style.color = "var(--mainColor)";
    }


    render(){
        return <div id="grades">
            <div className="grade-container">
            <label htmlFor="grade1" className="lblGrade" id="lblgrade1"> Primer Lapso</label>
            <input type="number" id="grade1" className="inputGrade" onClick={this.setSelected}/>
            </div>

            <div className="grade-container">
            <label htmlFor="grade2" className="lblGrade"  id="lblgrade2"> Segundo Lapso</label>
            <input type="number" id="grade2" className="inputGrade" onClick={this.setSelected}/>
            </div>

            <div className="grade-container">
            <label htmlFor="grade3" className="lblGrade"  id="lblgrade3"> Tercer Lapso</label>
            <input type="number" id="grade3" className="inputGrade" onClick={this.setSelected}/>
            </div>

        </div>
    }
}




export default Grades;