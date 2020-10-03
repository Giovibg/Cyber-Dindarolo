import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route , Switch} from 'react-router-dom'
import './App.css'
//import Navbar from './Navbar'
import Register from './Register'
import Login from './Login'
import Hello from './Hello'
import Products from './Products'
import Generics from '../Generics'
import Dashboard from './Dashboard'
import History from './History'
class App extends Component {
    
    render(){

        return( 
           
            <HashRouter>
                  
                
            <Switch>
                <Route exact path= {"/login"} component={Login}/>
                <Route exact path= {"/"} component={Login}/>
                <Route exact path= {"/register"} component={Register}/>
                <Route exact path= {"/hello"} component={Hello}/>
                <Route exact path= {"/history"} component={History}/>
                <Route exact path= {"/home"} component={Dashboard}/>
                
            </Switch>
            </HashRouter>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('app'));
