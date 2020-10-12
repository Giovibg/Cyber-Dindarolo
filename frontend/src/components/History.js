import React, { Component } from "react";
import APIrequest from "../apiServices";
import "./History.css"
import Detail from "./Detail"
import SkyLight from 'react-skylight';
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions:[],
            single_transaction: 0,
            detail : false
        };

        this.getMessage = this.getMessage.bind(this)
        this.handleClick = this.handleClick.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        
    }
    

    async getMessage(){
        try {
            let response = await APIrequest.get('/api/transactions/');
            const message = response.data;
            console.log(message)
            this.setState({
                transactions: message,
            });
            return message;
        }catch(error){
            console.log("Transaction error: ", JSON.stringify(error, null, 4));
            // throw error; todo
        }
    }
    

    componentDidMount(){

        this.getMessage();
    }
    

  handleClick(val) {
    console.log(val.product_name); 
    this.setState({
        detail: !this.state.detail,
        single_transaction: val
    });
    
  }

  changeStatus(){
    this.setState({
      detail: false
    })
  }
    
    render(){

    
        
        return (
            <div className="history">
            <h1>History</h1>
            
            
            <div className="history__info">
                <h4>Product</h4>
                <h4>date</h4>
                <h4>subtotal</h4>
              </div>
              
              
              <hr className="history_line" />
            <table className="table">
            <tbody>
              
              {this.state.transactions.map(transaction =>
              <tr key={transaction.id} className="history__table" onClick={() => this.handleClick(transaction)}>
                <td className="history__element">{transaction.product_name}</td>
                <td className="history__element">{(transaction.transaction_timestamp).substring(0, 10)}</td>
                <td className="history__element">{transaction.subtotal}</td>
            
              </tr>)}
              
            </tbody>
            
          </table>
          {this.state.detail ? <Detail action={this.changeStatus} transact={this.state.single_transaction}/> : null}
          
            </div>
        )
    }
}

export default History;