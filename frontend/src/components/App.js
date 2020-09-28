import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route , Switch} from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import Register from './Register'
import Login from './Login'

class App extends Component {
    
    render(){

        return( 
           
            <HashRouter>
                
            <Switch>
                
                <Route exact path= {"/login"} component={Login}/>
                <Route exact path= {"/register"} component={Register}/>
                
            </Switch>
            </HashRouter>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('app'));
