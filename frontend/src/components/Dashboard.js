import React, { Component } from 'react'
import "./Dashboard.css"
import Sidebar from "./Sidebar"
import Body from "./Body"
import Products from './Products'
import History from "./History"
import { HashRouter, Route , Switch} from 'react-router-dom'
import Generics from "../Generics"
class Dashboard extends Component{
    
    componentDidMount(){
        if(!Generics.isAuthenticated()){
            window.location.href = "/#/login/";
        }
    }
    render(){
        const path = this.props.match.path
        return(
            
            <div className="dashboard">
                {Generics.isAuthenticated() &&(
                <div className="dashboard_body">
                   
                    <Sidebar />
                    <Body path={path}/>
                    
                </div>
                )}
                
            </div>
        )
    }
}
export default Dashboard