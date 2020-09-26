import React, { Component } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            username:"", 
            password:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        alert('A username and password was submitted: ' + this.state.username + " " + this.state.password);
        event.preventDefault();
    }

    render(){
        return(
        <div className="login">
            
            <h1>Cyber Dindarolo</h1>
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <input className="username" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                    <input className="password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    <input className="submit" type="submit" value= "Submit" />
                </form>
            </div>
            <div>
            
            <Link to ="/register"><button className="Register">Sign UP</button></Link>
            
            </div>
        </div>
        )
    }
}
export default Login