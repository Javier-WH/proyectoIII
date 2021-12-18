import React,{Component} from "react";
import StudenName from "./studentName/studentName.jsx";
import Grades from "./grade/grade.jsx";
import './gradeContainer.css';

class GradeContainer extends Component{
    render(){
        return <div id="grade-container">
            <StudenName/>
            <Grades/>
        </div>
    }
}

export default GradeContainer;
