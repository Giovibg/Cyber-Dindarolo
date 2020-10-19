import React, { Component } from "react";
import APIrequest from "../apiServices";
import "./Products.css"
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import AddProduct from './AddProduct'
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            create: false,
            errors:{}
        };

        this.getMessage = this.getMessage.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
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
    
    handleClick() { 
        
        this.setState({
            
            create: !this.state.create
        });
    }
    changeStatus(){
        this.setState({
          create: false
        })
        //Update list
        this.getMessage();

        //Update budget
        this.props.action();
      }
    componentDidMount(){
        
        this.getMessage();

    }

    render(){
        
        return (

            <div>
                <div className="add_prod">
                    <h1>Available Products</h1>

                    <Fab color="secondary" 
                     aria-label="add"onClick={() => this.handleClick()} 
                     className="add_btn"><AddIcon /></Fab>
                </div>

                <div className="productRow">
                    <div className="productRow__info">
                        {this.state.products.map(product => 
                        <div key={product.id}><div className="el"><h2>{product.name}</h2>  <h5>Available:{product.quantity} pcs at {product.unit_price}€/each</h5></div>
                            <hr className="product_line" />
                        </div>)}
                    
                    </div>
                </div>      
                {this.state.create ? <AddProduct action={this.changeStatus} /> : null}   
            </div>
        )
    }
}

export default Products;