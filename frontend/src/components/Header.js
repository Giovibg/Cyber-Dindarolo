import React, { Component } from "react";
import APIrequest from "../apiServices";
import "./Header.css"
class Header extends Component {
    
    render(){
        return (
            <div className="header">
                <div className="header_left">
                    <h4>Budget:</h4>
                </div>

                <div className="header_right">
                    <h4>Ciao, ...</h4>
                </div>
            </div>
        )
    }
}

export default Header;