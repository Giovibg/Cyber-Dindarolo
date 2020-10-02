import React, { Component } from 'react'
import "./Sidebar.css"
import SidebarOption from './SidebarOption'
import HomeIcon from "@material-ui/icons/Home"
import ListIcon from '@material-ui/icons/List';
import HistoryIcon from '@material-ui/icons/History';
class Sidebar extends Component{
    
    render(){
        return(
            <div className="sidebar">
                <h1 className="sidebar_title">Cyber Dindarolo</h1>
                <hr className="sidebar_line" />
                <a href='#/home/'><SidebarOption Icon={HomeIcon} title="Home" /></a>
                <SidebarOption Icon={ListIcon} title="Products" />
                <SidebarOption Icon={HistoryIcon}title="History" />
                <hr/>
            </div>
        )
    }
}
export default Sidebar