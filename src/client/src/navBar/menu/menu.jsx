import React, {Component} from "react";
import './menu.css';


class Menu extends Component{
    openMenu(){
      document.getElementById("menuList").classList.toggle("invisible");
    }
    render(){
        return <div id="menu-container">
            <div id="menu" onClick={this.openMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF" id="menu-logo">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
                <span id="menu-title">Menu</span>
            </div>
             <MenuList/>
        </div>
    }
}
///////////////////////
class MenuList extends Component{
    render(){
        return <ul  id="menuList" className="invisible">
            <li>1er item</li>
            <li>2do item</li>
            <li>3er item</li>
        </ul>
    }
}

export default Menu;