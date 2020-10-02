import React, { Component } from 'react'
import "./Body.css"
import Header from "./Header"
import Products from "./Products"
class Body extends Component{
    
    render(){
        return(
            <div className="body">
                
                <Header />
                <Products />
            </div>
        )
    }
}
export default Body