import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext.js"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password })
      .then(res => {
        login(res.data.token)
        navigate("/")
      })
      .catch(()=>alert("Login failed"))
  }

  return (
    <form onSubmit={handleSubmit} style={{padding:20}}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
      <button type="submit">Login</button>
    </form>
  )
}
