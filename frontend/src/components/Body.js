import React, { Component } from 'react'
import "./Body.css"
import Header from "./Header"
import Products from "./Products"
import History from "./History"
import CreateTransaction from "./CreateTransaction"
import { HashRouter, Route, Switch} from 'react-router-dom'
import APIrequest from "../apiServices";

class Body extends Component{
    constructor(props) {
        super(props);
        this.state = {
            budget: '0.00'
        };

        this.getMessage = this.getMessage.bind(this);
    }

    async getMessage(){
        try {
            let response = await APIrequest.get('/api/budget/');
            const message = response.data;
            console.log(message[0].budget)
            this.setState({
                budget: message[0].budget,
            });
            return message;
        }catch(error){
            console.log("Budget error: ", JSON.stringify(error, null, 4));
            
        }
    }

    componentDidMount(){
        
        this.getMessage();
    }

    render(){
        return(
            <div className="body">
                
                <Header budget = {this.state.budget}/>
                <Switch>
                    <Route exact path={this.props.path}  render={(props) => <CreateTransaction {...props} action={this.getMessage} budget={this.state.budget}  />} />
                    <Route path={`${this.props.path}/history`} component={History} />
                    <Route path={`${this.props.path}/products`} component={Products} />
                </Switch>

            </div>
        )
    }
}
export default Body