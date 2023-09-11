import React, { useState } from 'react' ; 
import "./Style.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Register() {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/register', {username, email, password})
        .then(res => navigate("/login") )
        .catch(err => console.log(err))
    }

    return (
        <div className='signup_container'>
            <div  className='signup_form'>

                <form onSubmit={handleSubmit} >
                    <h2>Sign up</h2>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" 
                        onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" 
                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" 
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button >Sign up</button>
                    <br></br>
                    <p>Already have account</p>
                    <button className='btn'><Link to="/login" >Login</Link></button>
                </form>

            </div>

        </div>
    )
}