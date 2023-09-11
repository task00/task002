import React, { useContext, useState } from 'react'
import axios from 'axios'
import { userContext } from '../App'

function Create() {
    const [title, setTitle] = useState()
    const [description, setDesc] = useState()
    const [file, setFile] = useState()
    const user = useContext(userContext)


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append ('title', title)
        formData.append ('desc', desc)
        formData.append ('email', user.email)
        formData.append ('file', file)
        
        axios.post('http://localhost:8081/create', formData)
        .then(res => {
            if(res.data === "Success"){
              window.location.href = "/"
            }
        })
        
        .catch(err => console.log(err))

    }

    return (
        <div>
            <div className='post_container'>
                <div className='post_form'>
                    <form onSubmit={handleSubmit} >
                        <h2>Create Post</h2>
                        <input type='text' placeholder='Enter Title' onChange={e => setTitle(e.target.value)}/>
                        <textarea name="desc" id="desc" cols="35" rows="15" placeholder='Enter Description' onChange={e => setDesc(e.target.value)}></textarea>
                        <input type='file' className='file' placeholder='Select File' onChange={e => setFile(e.target.files[0])}/>
                        <button>Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create