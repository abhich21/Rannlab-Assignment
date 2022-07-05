import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function Signup() {
    const [user, setUser] = useState({})
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
         console.log("user",user)
        let payload = JSON.stringify(user)
        axios.post("http://localhost:8000/auth/register", payload)
        .then((res)=>{
            navigate("/login")
        })
        .catch((err)=> console.log(err))
    }
  return (
    <div>
          <h2>SignUp</h2>
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder='name' name="name" onChange={handleChange} />
              <br /><br/>
              <input type="text" placeholder='email' name="email" onChange={handleChange} />
              <br /><br />
              <input type="text" placeholder='password' name="password" onChange={handleChange} />
              <br /><br />
              <input type="file" onChange={(e) => {
                  setUser({ ...user, profile_pic: e.target.files[0] })
              }
              } />
              <br /><br />
              <input type='submit' value='register'/>
          </form>
    </div>
  )
}

export default Signup
