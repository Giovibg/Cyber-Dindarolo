import React, { Component } from 'react'
import "./Register.css"
class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            confirm_password: "",
            email:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        alert('submitted: ' + this.state.username + " " + this.state.password + " " + this.state.email);
        event.preventDefault();
    }

    render(){
        return(
            
            <div className="register">
                
                <h1>Create Account</h1>
                <div className="form_reg">
                    <form onSubmit={this.handleSubmit}>
                        <input className="username" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                        <input className="email" type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange}/>
                        <input className="password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                        <input className="confirm_password" type="password" name="confirm_password" placeholder="Confirm Password" value={this.state.confirm_password} onChange={this.handleChange}/>
                        <input className="submit" type="submit" value= "SIGN UP" />
                    </form>
                </div>
               
            </div>
            
        )
    }
}
export default Register