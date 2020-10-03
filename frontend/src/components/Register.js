import React, { Component } from 'react'
import "./Register.css"
import axios from 'axios'
import APIrequest from '../apiServices'
class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            confirm_password:"",
            email:"",
            errors:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.username, this.state.password, this.state.confirm_password, this.state.email)
        try {
                localStorage.setItem('access_token', null);
                localStorage.setItem('refresh_token', null);
                localStorage.setItem('username', null);
                const response =  await axios.post('/jwt_auth/register/', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                password2:this.state.confirm_password
                
            });
            APIrequest.defaults.headers['Authorization'] = "Bearer " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('username',this.state.username)
            console.log("AT "+ response.data.access)
            window.location.href = "/#/hello/";
            return response;
        } catch (error) {
            console.log(error.response.data);
        this.setState({
            errors:error.response.data
        });
        }
    }
    

    render(){
        return(
            
            <div className="reg">
                
                <h1 className="title">Create Account</h1>
                <div className="form_reg">
                    <form onSubmit={this.handleSubmit}>
                        <input className="username" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                        <div className="errors">{ this.state.errors.username ? this.state.errors.username : null}</div>
                        <input className="email" type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange}/>
                        <div className="errors">{this.state.errors.email ? this.state.errors.email : null}</div>
                        <input className="password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                        <div className="errors">{ this.state.errors.password ? this.state.errors.password : null}</div>
                        <input className="confirm_password" type="password" name="confirm_password" placeholder="Confirm Password" value={this.state.confirm_password} onChange={this.handleChange}/>
                        <div className="errors">{ this.state.errors.password2 ? this.state.errors.password2 : null}</div>
                        <input className="submit" type="submit" value= "SIGN UP" />
                    </form>
                </div>
                
               
            </div>
            
        )
    }
}
export default Register