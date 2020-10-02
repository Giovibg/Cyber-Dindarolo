import React, { Component } from "react";
import APIrequest from "../apiServices";
import jwt from  'jsonwebtoken'
class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
        };

        this.getMessage = this.getMessage.bind(this)
    }
    

    async getMessage(){
        try {
            let response = await APIrequest.get('/api/products/');
            const message = response.data;
            console.log(message)
            this.setState({
                products: message,
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
            <h1>Prodotti</h1>
            <div>
                {this.state.products.map(product => 
                <div key={product.id}>{product.name}  {product.id}
                
                </div>)}
            </div>
            </div>
        )
    }
}

export default Hello;