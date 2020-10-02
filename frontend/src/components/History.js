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
        // It's not the most straightforward thing to run an async method in componentDidMount

        // Version 1 - no async: Console.log will output something undefined.
        this.getMessage();
    }

    render(){
        return (
            <div>
            <h1>History</h1>
            <div className="historyRow">
                <div className="historyRow__info">
                {this.state.transactions.map(transaction => 
                <div key={transaction.id}><h2>{transaction.id}</h2>  
                    <h2>{transaction.product}</h2>
                    <h2>{transaction.unit_price}</h2>
                    <h2>{transaction.quantity}</h2>
                    <h2>{transaction.subtotal}</h2>
                    <h2>{transaction.transaction_timestamp}</h2>

                <hr className="history_line" />
                </div>)}
                
                </div>
            </div>
            </div>
        )
    }
}

export default History;