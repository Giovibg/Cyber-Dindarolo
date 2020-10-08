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
                {this.state.transactions.map(transaction => 
                <div> <tr className="table" key={transaction.id}>
                     {Object.values(transaction).map((val) => (
                    <td className="element"><h4>{val}</h4></td>
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