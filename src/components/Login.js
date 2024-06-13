import React, { useState, } from 'react'
import {  useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credential,setCredential]=useState({email:"",password:""});
    let history=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
            const response=await fetch("http://localhost:5000/api/auth/login"
            ,{
              method:'POST',
              headers:{
                'content-Type':'application/json'
              },
              body:JSON.stringify({email:credential.email,password:credential.password})
            })
            const json=await response.json()
            console.log(json)
        // setNotes(json);  
            if(json.success){
                //here we are saving the token here
                localStorage.setItem('token',json.authtoken);
                props.showAlert("Logged in sucessfully " ,"success");
                history("/")
            }
            else{
                props.showAlert("Unable to login " ,"danger");
            }
          }
          const onChange = (e) => {
            setCredential({ ...credential, [e.target.name]: e.target.value })
          }
    
    return (

        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h2>Login To Continue to i notebook</h2>
                    <label for="email">Email address</label>
                    <input type="email" className="form-control" value={credential.email}name="email"id="emails" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control"  value={credential.password} name="password"id="password" placeholder="Password" onChange={onChange}/>
                </div>
                <button type="submit" class="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
