import React, { Component } from 'react'
import "./CreateTransaction.css"
import axios from 'axios'
import APIrequest from '../apiServices'
import Select from 'react-select'
class CreateTransaction extends Component{
    constructor(props){
        super(props);
        this.state = {
            product_name: '',
            product_id: null,
            unit_price: 0.0,
            trans_type:"",
            quantity:0,
            currency:"EUR",
            errors:{},
            list_product: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.stateChange_p = this.stateChange_p.bind(this);
        this.stateChange_t = this.stateChange_t.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(`option selected: `, this.state.product_name)
    }

    stateChange_p = product_name =>{
        console.log(product_name)
        this.setState({product_id:product_name.value})
        this.setState({product_name:product_name.label})
    }

    stateChange_t = trans_type =>{
        console.log(trans_type)
        this.setState({trans_type:trans_type.value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log("export: ",this.state.product_name, this.state.trans_type, this.state.quantity, this.state.unit_price)
        try {
                const response =  await APIrequest.put('/api/transactions/', {
                product: this.state.product_id,
                unit_price: this.state.unit_price,
                trans_type: this.state.trans_type,
                quantity:this.state.quantity,
                currency:this.state.currency
            });
            return response;
        } catch (error) {
            console.log(error.response.data);
        this.setState({
            errors:error.response.data
        });
        }
    }

    async getMessage(){
        try {
            let response = await APIrequest.get('/api/products/');
            const message = response.data;
            console.log(message)
            this.setState({
                list_product: message
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
        const customStyles = {
            menu: (provided, state) => ({
              ...provided,
              width: state.selectProps.width,
              borderBottom: '1px dotted pink',
              color: state.selectProps.menuColor,
              padding: 20,
            }),
          
            control: (_, { selectProps: { width }}) => ({
              width: width
            })
            
          }

        const options = [
            { value: "UP", label: "UP" },
            { value: "DOWN", label: "DOWN" }
          ]
        return(
            
            <div className="tr">
                <h1 className="title">Create Transaction</h1>
                <div className="form_trans">
                    <form onSubmit={this.handleSubmit}>
                        <div className="custom_select">
                            Select product
                        <Select className="selection"
                            value={this.state.product_name}
                            onChange={this.stateChange_p}
                            options={this.state.list_product.map(t=> ({value: t.id, label: t.name}))}
                            placeholder={this.state.product_name}
                            styles={customStyles}
                        />
                        </div>
                        <div className="errors">{ this.state.errors.product ? this.state.errors.product : null}</div>
                        Unit price
                        <input className="unit_price" type="number" step="0.01" min="0" name="unit_price" placeholder="Unit Price" value={this.state.unit_price} onChange={this.handleChange}/>
                        
                        <div className="errors">{ this.state.errors.unit_price ? this.state.errors.unit_price : null}</div>
                        Quantity
                        <input className="quantity" type="number" name="quantity" min="1" placeholder="Quantity" value={this.state.quantity} onChange={this.handleChange}/>
                        
                        <div className="errors">{this.state.errors.quantity ? this.state.errors.quantity : null}</div>
                        
                        <div className="custom_select">
                            Transaction Type
                        <Select className="selection"
                            value={this.state.trans_type}
                            onChange={this.stateChange_t}
                            options={options}
                            placeholder={this.state.trans_type}
                            styles={customStyles}
                        />
                        </div>
                        <div className="errors">{this.state.errors.trans_type ? this.state.errors.trans_type : null}</div>
                        
                        <input className="submit" type="submit" value= "Create Transaction" />
                        <div className="errors">{ this.state.errors.message ? this.state.errors.message : null}</div>
                    </form>
                </div>   
            </div>
            
        )
    }
}
export default CreateTransaction