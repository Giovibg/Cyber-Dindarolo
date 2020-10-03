import React, { Component } from "react";
import APIrequest from "../apiServices";
import "./Header.css"
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: '0.00',
        };

        this.getMessage = this.getMessage.bind(this)
    }
    

    async getMessage(){
        try {
            let response = await APIrequest.get('/api/budget/');
            const message = response.data;
            console.log(message[0].budget)
            this.setState({
                budget: message[0].budget,
            });
            return message;
        }catch(error){
            console.log("Budget error: ", JSON.stringify(error, null, 4));
            // throw error; todo
        }
    }
    componentDidMount(){
        
        this.getMessage();
    }
    render(){
        return (
            <div className="header">
                <div className="header_left">
                    <h3>budget available</h3>
                    <h3 className="header_budget">{this.state.budget} €</h3>
                </div>

                <div className="header_right">
                    <h4>{localStorage.getItem('username')}</h4>
                </div>
            </div>
        )
    }
}

export default Header;