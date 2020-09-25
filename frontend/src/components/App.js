import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar'


class App extends Component {

    render(){

        return( 
            <div>
            <h1>Cyber Dindarolo</h1>
            <Navbar />
            </div>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('app'));
