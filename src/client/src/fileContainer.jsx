import React, { Component } from 'react';
import NavBar from './navBar/navBar.jsx';
import StudentList from './studentList/studentList.jsx';
import GradeContainer from './grades/gradeContainer.jsx';
import './mainContainer.css';

class MainContainer extends Component{
   render(){
       return <div id="mainContainer" >
           <NavBar/>
    
           <StudentList/>
           <GradeContainer/>
       </div>
       
   }
}


export default MainContainer;