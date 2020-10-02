import React, { Component } from 'react'
import "./Dashboard.css"
import Sidebar from "./Sidebar"
import Body from "./Body"
import Footer from "./Footer"
class Dashboard extends Component{
    
    render(){
        return(
            
            <div className="dashboard">
               
                <div className="dashboard_body">
                    
                    <Sidebar />
                    <Body />
                </div>
                {/*Footer*/}
                
            </div>
        )
    }
}
export default Dashboard