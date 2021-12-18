import React, {Component} from "react";
import './logo.css';

class Logo extends Component{
    render(){
        return <div id="logo-container">
           <img src="icon.svg" alt="" id="logo"/>
           <span id="title">U.E. Colegio Btalla de la Victoria</span>
        </div>
    }
};

export default Logo;