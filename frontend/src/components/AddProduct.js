import React, { Component } from 'react'
import "./Detail.css"
import SkyLight from 'react-skylight';
import APIrequest from '../apiServices'
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name_prod: '',
        description: '',
        quantity: 0,
        unit_price: 0.00,
        errors:{},
        message: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const response =  await APIrequest.put('/api/products/',{
        name: this.state.name_prod,
        description: this.state.description,
        unit_price: this.state.unit_price,
        quantity: this.state.quantity
      });
      console.log("response:", response)
      this.setState({message : response.data});
      return response;
    } catch (error) {
      console.log(error.response);
    this.setState({errors:error.response.data});
    }
    
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
    this.setState({errors:{}});
    this.setState({message:{}});
  }

  componentDidMount(){
    this.dialogWithCallBacks.show();
  }

  render(){
    var modalStyle = {
      backgroundColor: '#282828',
      opacity:'0.95',
      color: '#ffffff',
      width: '35%',
      height: '600px',
      marginTop: '-300px',
      marginLeft: '-10%',
      padding: '50px',
      position: 'fixed'
    };

    return(
        <SkyLight  dialogStyles={modalStyle}
          afterClose={this.props.action} 
          hideOnOverlayClicked ref={ref => this.dialogWithCallBacks = ref} 
          title="Add Product">
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            Name
                            <input className="name_prod" type="text" name="name_prod" placeholder="Name" value={this.state.name_prod} onChange={this.handleChange} />
                            <div className="errors">{ this.state.errors.name ? this.state.errors.name : null}</div>
                            Description
                            <input className="description_prod" type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                            <div className="errors">{ this.state.errors.description ? this.state.errors.description : null}</div>
                            
                            Quantity
                            <input className="name_prod" type="number" name="quantity" min="1" placeholder="Quantity" value={this.state.quantity} onChange={this.handleChange}/>
                            <div className="errors">{this.state.errors.quantity ? this.state.errors.quantity : null}</div>
                            
                            Unit Price
                            <input className="name_prod" type="number" step="0.01" min="0.01" name="unit_price" placeholder="Unit Price" value={this.state.unit_price} onChange={this.handleChange}/>
                            <div className="errors">{ this.state.errors.unit_price ? this.state.errors.unit_price : null}</div>
                            
                            <input className="submit" type="submit" value= "Add Product" />
                            <div className="errors">{ this.state.errors.message ? this.state.errors.message : null}</div>
                            <div className="created">{ this.state.message.message ? this.state.message.message : null}</div>
                        </form>
                    </div>
        </SkyLight>  
    );
  }
}
export default AddProduct