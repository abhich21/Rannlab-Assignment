import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function Login() {
    const [user, setUser] = useState({})
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
        // console.log("user",user)
        let payload = JSON.stringify(user)
        axios.post("http://localhost:8000/auth/login", payload)
        .then((res)=>{
            console.log("res", res.data)
        })
        .then((data)=>{
            if (data.token) {
                localStorage.setItem("userId", JSON.stringify(data._id))
                navigate("/")
            } else {
                console.log(data.message)
            }
        })
        .catch((err)=> console.log(err))
    }
  return (
      <div>
          <h2>Login</h2>
      <form onSubmit={handleSubmit}>
              <input type="text" placeholder='email' name="email" onChange={handleChange} />
              <br />
              <br/>
              <input type="text" placeholder='password' name="password" onChange={handleChange} />
              <br />
              <br/>
              <input type="submit" value="Login"/>
      </form>
    </div>
  )
}

export default Login
