import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    const history = useNavigate();
    


    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',  
            headers: {
              'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({name, email, password}) 
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            //to redirect use history hook and local storage
            localStorage.setItem('auth-token', json.authToken)
            history('/');
            props.showAlert("successfully created yur account", "success");
        }
        else{
            //show alert
            props.showAlert("invalid credentials", "danger");
        
        }


    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className="container my-3">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">confirm Password</label>
                <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} minLength={5} required/>
            </div>
            
            <button type="submit" className="btn btn-primary" >Sign Up</button>
        </form>
    </div>
  )
}

export default Signup