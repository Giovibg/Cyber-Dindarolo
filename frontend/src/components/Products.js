import React, { Component } from "react";
import APIrequest from "../apiServices";
import "./Products.css"
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
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

            <div className="add_prod">
            <h1>Available Products</h1>
            
            <Fab color="secondary" aria-label="add">
            <a href="/#/home/transactions" className="add_btn"><AddIcon /></a>
            </Fab>
            </div>
            <div className="productRow">
                <div className="productRow__info">
                {this.state.products.map(product => 
                <div key={product.id}><div className="el"><h2>{product.name}</h2>  <p>{product.description}</p></div>
                <hr className="product_line" />
                </div>)}
                
                </div>
            </div>
            
            </div>
        )
    }
}

export default Products;