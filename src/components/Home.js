import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext.js"

export default function Home() {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (!token) return
    axios.get(`${process.env.REACT_APP_API_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTasks(res.data))
    .catch(()=>{})
  }, [token])

  return (
    <div style={{padding:20}}>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(t => <li key={t._id}>{t.title} - {t.completed ? "Done" : "Pending"}</li>)}
      </ul>
      <div style={{marginTop:20}}>
        <button onClick={()=>navigate("/products")} style={{marginRight:10}}>Go to Products</button>
        <button onClick={()=>navigate("/cart")}>Go to Cart</button>
      </div>
    </div>
  )
}
