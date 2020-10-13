import React, { Component } from "react";
import APIrequest from "../apiServices";
import "./Header.css"
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    
    render(){
        return (
            <div className="header">
                <div className="header_left">
                    <h3>budget available</h3>
                    <h3 className="header_budget">{this.props.budget} €</h3>
                </div>

                <div className="header_right">
                    <h4>{localStorage.getItem('username')}</h4>
                </div>
            </div>
        )
    }
}

export default Header;