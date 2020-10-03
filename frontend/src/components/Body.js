import React, { Component } from 'react'
import "./Body.css"
import Header from "./Header"
import Products from "./Products"
import History from "./History"
import { HashRouter, Route , Switch} from 'react-router-dom'
class Body extends Component{
    
    render(){
        return(
            <div className="body">
                
                <Header />
                <History />
                {/*<Products />*/}
            </div>
        )
    }
}
export default Body