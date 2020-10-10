import React, { Component } from 'react'
import "./Body.css"
import Header from "./Header"
import Products from "./Products"
import History from "./History"
import CreateTransaction from "./CreateTransaction"
import { HashRouter, Route, Switch} from 'react-router-dom'
class Body extends Component{
    
    render(){
        return(
            <div className="body">
                
                <Header />
                <Switch>
                <Route exact path={this.props.path} component={CreateTransaction} />
                <Route path={`${this.props.path}/history`} component={History} />
                <Route path={`${this.props.path}/products`} component={Products} />
                </Switch>
                {/*<Products />*/}
            </div>
        )
    }
}
export default Body