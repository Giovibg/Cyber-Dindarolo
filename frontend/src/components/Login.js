import React, { Component } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import APIrequest from "../apiServices"
import Body from "./Body"
import Generics from "../Generics"
class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            username:"", 
            password:"",
            errors:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try{
            localStorage.setItem('access_token', null);
            localStorage.setItem('refresh_token', null);
            localStorage.setItem('username', null);
            const response = await APIrequest.post('/api/token/',{
                username: this.state.username,
                password: this.state.password
            });
               
                APIrequest.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                localStorage.setItem('username',this.state.username);
                window.location.href = "/#/home/";
               
                return response;
            }catch (error){
                console.log(error.response.data);
                this.setState({errors:error.response.data});
            }
            
    } 
    componentDidMount(){
        if(Generics.isAuthenticated()){
            window.location.href = "/#/home/";
        }
    }

    render(){
        return(
        <div className="login">
            
            <h1 className="title">Cyber Dindarolo</h1>
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <input className="username" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                    <div className="errors">{ this.state.errors.username ? this.state.errors.username : null}</div>
                    <input className="password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    <div className="errors">{ this.state.errors.password ? this.state.errors.password : null}</div>
                    <div className="errors">{ this.state.errors.detail ? this.state.errors.detail : null}</div>
                    <input className="submit" type="submit" value= "Submit" />
                </form>
            </div>
            <div className="sign">
                <Link to ="/register"><button className="signup">Sign UP</button></Link>
            </div>
        </div>
        )
    }
}
export default Login