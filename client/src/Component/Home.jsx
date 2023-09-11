import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Home() {
  
  const [posts ,setPosts] = useState([])

  useEffect(() => {
     axios.get("http://localhost:8081/getposts")
     .then(posts => {
      setPosts(posts.data)
     } )
     .catch(err => console.log(err))
  },[])

  return (
      <div className='posts_container'>
        {
          posts.map(post => (
            <Link to={`/post/${post._id}`} className='post'>
            
              <img src={`http://localhost:8081/Images/${post.file}`} alt='' />
            <div className='post_text'> 
            <h3>{post.title} </h3>
            <p>{post.desc} </p>
            </div>
            
            </Link>
          ))
        }
      </div>
  )
}

export default Home;