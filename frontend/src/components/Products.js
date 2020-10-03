import React, { Component } from "react";
import APIrequest from "../apiServices";
import "./Products.css"
class Products extends Component {
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
            console.log("Product error: ", JSON.stringify(error, null, 4));
        }
    }

    componentDidMount(){
        
        this.getMessage();
    }

    render(){
        return (
            <div>
            <h1>Products</h1>
            <div className="productRow">
                <div className="productRow__info">
                {this.state.products.map(product => 
                <div key={product.id}><h2>{product.name}</h2>  <p>{product.description}</p>
                <hr className="product_line" />
                </div>)}
                
                </div>
            </div>
            </div>
        )
    }
}

export default Products;