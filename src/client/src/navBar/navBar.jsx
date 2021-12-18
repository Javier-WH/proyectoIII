import React, {Component} from "react";
import Logo from "./logo/logo.jsx";
import Menu from "./menu/menu.jsx";
import './navBar.css';

class NavBar extends Component{

render(){
    return <div id="navBar">
            <Logo/>
            <Menu/>
    </div>
}


}

export default NavBar;