import React, { useState, } from 'react'
import {  useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credential,setCredential]=useState({name:"",email:"",password:"",cpassword:""});
    let history=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
       const {name,email,password}=credential;
            const response=await fetch("http://localhost:5000/api/auth/createUser"
            ,{
              method:'POST',
              headers:{
                'content-Type':'application/json'
              },
              body:JSON.stringify({name,email,password})
            })
            const json=await response.json()
            console.log(json)
            // setNotes(json);
                //
                if(json.success){

                    localStorage.setItem('token',json.authtoken);
                    props.showAlert("Account created sucessfully credetials " ,"success");
                    history("/")
                }
                else{
                    props.showAlert("Envalid credetials " ,"danger");
                }
            
          }
          const onChange = (e) => {
            setCredential({ ...credential, [e.target.name]: e.target.value })
          }
    return (
        <div className='container'>
            {/* on submit use karne ka 
            sabse bad fayda hai ki ham required bana sakte hai cheso ko */}
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <h2>Signup To continue to inotebook</h2>
                    <label for="name">Name</label>
                    <input type="text" class="form-control"name='name' id="name" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email"/>
                      
                </div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" minLength={5} required/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" class="form-control" name="password" minLength={5} required id="password" onChange={onChange} placeholder="Password"/>
                </div>
                <div class="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="cpassword" class="form-control" name='cpassword'  minLength={5} required id="cpassword" onChange={onChange} placeholder="Password"/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
