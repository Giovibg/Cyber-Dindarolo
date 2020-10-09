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
            
            <div className="historyRow">
                
                <div className="historyRow__info">
                <div className="history__info">
            <h4>#id</h4> <h4>Product</h4> <h4>Unit price</h4> <h4>type</h4> <h4>quantity</h4> <h4>currency</h4> <h4>date</h4> <h4>subtotal</h4>
            </div>
            <hr className="history_line" />
                {this.state.transactions.map(transaction => 
                <div> <tr className="history__table" key={transaction.id}>
                     {Object.values(transaction).map((val) => ( 
                    <td className="history__element"><h4>{val}</h4></td>
                    ))}
                    
                    </tr> 

                
                </div>)}
                
                </div>
            </div>
            </div>
        )
    }
}

export default History;