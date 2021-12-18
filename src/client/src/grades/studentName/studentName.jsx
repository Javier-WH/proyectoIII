import React, {Component} from "react";
import './studentName.css'

class StudenName extends Component{
    render(){
        return <div id="studentName">
            <label htmlFor="input-student-name" id="lbl-student-name">Nombre del Estudiante</label>
            
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" className="arrowName" id="arrowBack">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>

            <input type="text" id="input-student-name" autoComplete="off"/>

            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"  className="arrowName" id="arrowForward">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
            </svg>
            <div id="ci">
                <label htmlFor="input-student-ci" id="lbl-student-ci">C.I.</label>
                <input type="number" id="input-student-ci"/>
            </div>
            <img src={process.env.PUBLIC_URL + '/IMG/placeholder.svg'}  alt="" id="student-image"/>
        </div>
    }
}

export default StudenName;