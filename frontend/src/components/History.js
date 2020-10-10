import React, { Component } from "react";
import APIrequest from "../apiServices";
import "./History.css"
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions:[],
        };

        this.getMessage = this.getMessage.bind(this)
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

    render(){
        return (
            <div className="history">
            <h1>History</h1>
            
            
            <div className="history__info">
                <h4>Product</h4>
                <h4>Unit Price</h4>
                <h4>type</h4>
                <h4>quantity</h4>
                <h4>currency</h4>
                <h4>date</h4>
                <h4>subtotal</h4>
              </div>
              
              
              <hr className="history_line" />
            <table className="table">
            <tbody>
              
              {this.state.transactions.map(transaction =>
              <tr key={transaction.id} className="history__table">
                <td className="history__element">{transaction.product_name}</td>
                <td className="history__element">{transaction.unit_price}</td>
                <td className="history__element">{transaction.trans_type}</td>
                <td className="history__element">{transaction.quantity}</td>
                <td className="history__element">{transaction.currency}</td>
                <td className="history__element">{(transaction.transaction_timestamp).substring(0, 10)}</td>
                <td className="history__element">{transaction.subtotal}</td>
                <tr class="bordered"></tr>
              </tr>)}
              
            </tbody>
            
          </table>
            </div>
        )
    }
}

export default History;