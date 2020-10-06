import React, { Component } from 'react'
import "./Dashboard.css"
import Sidebar from "./Sidebar"
import Body from "./Body"
import Products from './Products'
import History from "./History"
import { HashRouter, Route , Switch} from 'react-router-dom'
class Dashboard extends Component{
    
    render(){
        const path = this.props.match.path
        return(
            
            <div className="dashboard">
               
                <div className="dashboard_body">
                    
                    <Sidebar />
                    <Body path={path}/>
                </div>
                {/*Footer*/}
                
            </div>
        )
    }
}
export default Dashboard