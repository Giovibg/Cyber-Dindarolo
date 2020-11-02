import React, { Component } from 'react'
import "./CreateTransaction.css"
import APIrequest from '../apiServices'
import Select from 'react-select'
class CreateTransaction extends Component{
    constructor(props){
        super(props);
        this.state = {
            product_name: '',
            product_id: null,
            unit_price: 0.00,
            quantity:1,
            errors:{},
            list_product: [],
            update_budget: false,
            message: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.stateChange_p = this.stateChange_p.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        this.setState({errors:{}})
        this.setState({message:{}})
        //console.log(`option selected: `, this.state.product_name)
    }

    stateChange_p = product_name =>{
        //console.log(product_name)
        this.setState({product_id:product_name.value})
        this.setState({product_name:product_name.label})
        this.setState({unit_price:product_name.unit_price})
        //console.log("unit price", product_name.unit_price);
        this.setState({errors:{}})
        this.setState({message:{}})
    }
    

    async handleSubmit(event) {
        event.preventDefault();
        try {
                
                const response =  await APIrequest.put('/api/transactions/', {
                product: this.state.product_id,
                quantity:this.state.quantity
                
            });
            //console.log("res:",response.data.message)
            this.setState({message : response.data});
            this.setState({update_budget: true})
            this.props.action();
            return response;
        } catch (error) {
            //console.log(error.response.data);
        this.setState({
            errors:error.response.data
        });
        }
    }

    async getMessage(){
        try {
            let response = await APIrequest.get('/api/products/');
            const message = response.data;
            //console.log(message)
            this.setState({
                list_product: message
            });
            return message;
        }catch(error){
            //console.log("Product error: ", JSON.stringify(error, null, 4));
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
              color: state.selectProps.menuColor,
              padding: 20,
              backgroundColor: '#383838'
            }),
          
            control: (_, { selectProps: { width }}) => ({
              width: width
            })
            
        }

        return(
            
            <div className="tr">
                <div className="title_create">
                    <h1>Buy Product</h1>
                </div>
                <div className="form_trans">
                    <form onSubmit={this.handleSubmit}>
                        <div className="custom_select">
                            Choose a product
                            <Select className="selection"
                                value={this.state.product_name}
                                onChange={this.stateChange_p}
                                options={this.state.list_product.map(t=> ({value: t.id, label: t.name, unit_price: t.unit_price}))}
                                placeholder={this.state.product_name}
                                styles={customStyles}
                            />
                        </div>
                        <div className="errors">{ this.state.errors.product ? this.state.errors.product : null}</div>
                        
                        Quantity
                        <input className="quantity" type="number" name="quantity" min="1" placeholder="Quantity" value={this.state.quantity} onChange={this.handleChange}/>
                        {this.state.unit_price > 0 && ( <div>{this.state.unit_price}€ each </div>)}
                         
                        <div className="errors">{this.state.errors.quantity ? this.state.errors.quantity : null}</div>
        
                        <input className="submit" type="submit" value= "Buy" onEnded={this.props.action}/>
                        
                        <div className="errors">{ this.state.errors.message ? this.state.errors.message : null}</div>
                        <div className="created">{ this.state.message.message ? this.state.message.message : null}</div>
                    </form>
                </div>   
            </div>
            
        )
    }
}
export default CreateTransaction