import React, { Component } from "react";
import APIrequest from "../apiServices";
import "./Header.css"
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.logOut = this.logOut.bind(this);
    }
    async logOut() {
        try {
            const refresh_token = localStorage.getItem('refresh_token');
            const response = await APIrequest.post('/jwt_auth/blacklist/', {
                refresh_token: refresh_token
            });
            APIrequest.defaults.headers['Authorization'] = null;
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('access_token')
            window.location.href = "/#/login/";
            return response
        } catch (error) {
            throw error;
        }
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
                    <a className="logout" onClick={() => this.logOut()}>logout</a>
                </div>
            </div>
        )
    }
}

export default Header;