import React, { Component } from "react";
import APIrequest from "../apiServices";
import jwt from  'jsonwebtoken'
class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:"",
        };

        this.getMessage = this.getMessage.bind(this)
    }
    getPayload() {
        console.log("AfT "+localStorage.getItem("access_token"));
        console.log(jwt.decode(localStorage.getItem("refresh_token")))
        return jwt.decode(localStorage.getItem("access_token"))
      }

    async getMessage(){
        try {
            let response = await APIrequest.get('/api/products/');
            const message = response.data.hello;
            this.setState({
                message: message,
            });
            return message;
        }catch(error){
            console.log("Hello error: ", JSON.stringify(error, null, 4));
            // throw error; todo
        }
    }

    componentDidMount(){
        // It's not the most straightforward thing to run an async method in componentDidMount

        // Version 1 - no async: Console.log will output something undefined.
        this.getMessage();
    }

    render(){
        return (
            <div>
            <h1>Ciao, {this.getPayload().user_id}</h1>
            <div>
                <p>{this.state.message}</p>
            </div>
            </div>
        )
    }
}

export default Hello;