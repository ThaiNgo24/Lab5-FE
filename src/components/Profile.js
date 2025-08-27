import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.js"

export default function Profile() {
  const { user } = useContext(AuthContext)
  if (!user) return <div>Loading...</div>
  return (
    <div style={{padding:20}}>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}
