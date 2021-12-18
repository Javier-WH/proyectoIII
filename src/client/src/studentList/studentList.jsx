import React, {Component} from "react";
import {getSudentList} from '../system/fetchData.js';
import './studenList.css';
import './bootstrap.css';

class StudentList extends Component{
    render(){
        return <div id="table-container">
        <table id="table" className="table table-hover">
        <thead id="thead">
            <tr> 
                <th scope="col" className="td-id">N°</th>
                <th scope="col" className="td-ci">Cedula</th>
                <th scope="col" className="td-name">Nombres</th>
                <th scope="col" className="td-lastName">Apellidos</th>
                <th scope="col" className="td-notas">1er lapso</th>
                <th scope="col" className="td-notas">2do lapso</th>
                <th scope="col" className="td-notas">3er lapso</th>
            </tr>
        </thead>
        <tbody>
            {getSudentList().map(e => <Student data={e} key={e.id}/> )}
        </tbody>

        </table>
          
        </div>
    }
}


class Student extends Component{
    constructor(e){
        super();
        this.id = e.data.id
        this.name = e.data.name;
        this.lastName = e.data.lastName;
        this.ci = e.data.ci;
        this.n1 = e.data.n1;
        this.n2 = e.data.n2;
        this.n3 = e.data.n3;
    }
    render(){
        return <>
            <tr>
            <td className="td-id">{this.id}</td>
                <td className="td-ci">{this.ci}</td>
                <td className="td-name">{this.name}</td>
                <td className="td-lastName">{this.lastName}</td>
                <td className="td-notas">{this.n1}</td>
                <td className="td-notas">{this.n2}</td>
                <td className="td-notas">{this.n3}</td>
            </tr>
        </>
    }
}

export default StudentList;