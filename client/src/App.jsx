import React, { createContext, useEffect, useState } from 'react';
import Navbar from './Component/Navbar'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from './Component/Register';
import Login from './Component/Login';
import Home from './Component/Home';
import axios from 'axios';
import Create from './Component/Create';
import Post from './Component/Post';
import EditPost from './Component/EditPost';

export const userContext= createContext()

export default function App() {

 const [user , setUser] = useState({})
  
 axios.defaults.withCredentials = true;
 useEffect(()=> {
  axios.get("http://localhost:8081")
  .then(user => {
   setUser(user.data)
  })
  .catch(err => console.log(err))
 }, [])


  return (
    <userContext.Provider value={user}>
    <BrowserRouter>
    <Navbar/>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/> 
       <Route path="/create" element={<Create/>}/> 
       <Route path="/post/:id" element={<Post/>}/> 
       <Route path="/editpost/:id" element={<EditPost/>}/> 
      
     </Routes>
    </BrowserRouter>
    </userContext.Provider>
   
      
 
  )
}