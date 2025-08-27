import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.js"

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  return (
    <nav style={{padding:10, borderBottom:"1px solid #ccc"}}>
      <Link to="/" style={{marginRight:10}}>Home</Link>
      <Link to="/products" style={{marginRight:10}}>Products</Link>
      <Link to="/cart" style={{marginRight:10}}>Cart</Link>
      {user ? (
        <>
          <Link to="/profile" style={{marginRight:10}}>Profile</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{marginRight:10}}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  )
}
