import React, { useState } from 'react'
import "./Style.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/login', {email, password})
        .then(res => {
            if(res.data === "Success"){
              window.location.href = "/"
            }
        })
        
        .catch(err => console.log(err))

    }


    return (
        <div className='signup_container'>

            <div className='signup_form'>

                <form onSubmit={handleSubmit} >
                    <h2>Login</h2>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" 
                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='********' 
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button >Log in</button>
                    <br></br>
                    <p>Not Registered? </p>
                    <button className='btn'><Link to='/register'  >Register</Link></button>
                </form>

            </div>

        </div>

    
    )
}

export default Login