import React, { Component } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import APIrequest from "../apiServices"

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
        event.preventDefault();
        /*try{
            
            await APIrequest.post('/api/token/',{
                username: this.state.username,
                password: this.state.password
            }).then((response) =>{
               
                APIrequest.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                return response.data;
            }, (error) =>{
                console.log(error);
            });
            */
           localStorage.setItem('access_token', null);
           localStorage.setItem('refresh_token', null);
           APIrequest.post('api/token/', {
            username: this.state.username,
            password: this.state.password
            }).then(
            result => {
                APIrequest.defaults.headers['Authorization'] = "Bearer " + result.data.access;
                localStorage.setItem('access_token', result.data.access);
                localStorage.setItem('refresh_token', result.data.refresh);
                console.log("AT "+ result.data.access)
                window.location.href = "/#/products/";
            }
    ).catch (error => {
        throw error;
    })
            //console.log(response)
                           
            //APIrequest.defaults.headers['Authorization'] = "Bearer " + response.data.access;
            //localStorage.setItem('access_token', response.data.access);
            //localStorage.setItem('refresh_token', response.data.refresh);
            //return data;
       /* }catch(error){
            throw error;
        }*/
    } 

    render(){
        return(
        <div className="login">
            
            <h1 className="title">Cyber Dindarolo</h1>
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <input className="username" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                    <input className="password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
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