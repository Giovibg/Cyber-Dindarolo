import React, { Component } from "react";
import APIrequest from "../apiServices";
import "./Products.css"
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import SkyLight from 'react-skylight';
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            name_prod: '',
            description: '',
            errors:{}
        };

        this.getMessage = this.getMessage.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }


    async handleSubmit(event) {
        event.preventDefault();
        try {
                const response =  await APIrequest.post('/api/products/', {
                name: this.state.name_prod,
                description: this.state.description,
            });
            this.customDialog.hide();
            this.getMessage();
            return response;
        } catch (error) {
            console.log(error.response.data);
        this.setState({
            errors:error.response.data
        });
        }
        
    }

    componentDidMount(){
        
        this.getMessage();

    }

    render(){
        var modalStyle = {
            backgroundColor: '#282828',
            opacity:'0.95',
            color: '#ffffff',
            width: '25%',
            height: '600px',
            marginTop: '-300px',
            marginLeft: '-10%',
            padding: '50px',
            position: 'fixed'
            
          };
        
        return (
            
            
            
            <div>

            <div className="add_prod">
            <h1>Available Products</h1>
            
            <Fab color="secondary" aria-label="add"onClick={() => this.customDialog.show()} className="add_btn"><AddIcon />
            </Fab>
            </div>
            <SkyLight dialogStyles={modalStyle} hideOnOverlayClicked ref={ref => this.customDialog = ref} title="Add Product">
                <div>
            <form onSubmit={this.handleSubmit}>
                    <input className="name_prod" type="text" name="name_prod" placeholder="name" value={this.state.name_prod} onChange={this.handleChange} />
                    <div className="errors">{ this.state.errors.name ? this.state.errors.name : null}</div>
                    <input className="description_prod" type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                    <div className="errors">{ this.state.errors.description ? this.state.errors.description : null}</div>
                    <div className="errors">{ this.state.errors.message ? this.state.errors.message : null}</div>
                    <input className="submit" type="submit" value= "Add Product" />
                   
                </form>
                </div>
             </SkyLight>
            
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