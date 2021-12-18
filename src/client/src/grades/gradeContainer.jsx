import React,{Component} from "react";
import StudenName from "./studentName/studentName.jsx";
import Title from "./title/title.jsx";
import Grades from "./grade/grade.jsx";
import SaveButton from "./saveButton/saveButton.jsx";
import './gradeContainer.css';

class GradeContainer extends Component{
    render(){
        return <div id="grade-container">
            <Title/>
            <StudenName/>
            <SaveButton/>
            <Grades/>
        </div>
    }
}

export default GradeContainer;
