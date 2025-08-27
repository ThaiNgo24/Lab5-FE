import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext.js"

export default function Cart() {
  const { token } = useContext(AuthContext)
  const [cart, setCart] = useState([])

  const fetchCart = () => {
    if (!token) return
    axios.get(`${process.env.REACT_APP_API_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res=>setCart(res.data.items)).catch(()=>{})
  }

  useEffect(() => { fetchCart() }, [token])

  const updateQuantity = async (productId, quantity) => {
    if (!token) return
    await axios.put(`${process.env.REACT_APP_API_URL}/api/cart`, { productId, quantity }, {
      headers: { Authorization: `Bearer ${token}` }
    }).catch(()=>alert("Update failed"))
    fetchCart()
  }

  const removeItem = async (productId) => {
    if (!token) return
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).catch(()=>alert("Remove failed"))
    fetchCart()
  }

  return (
    <div style={{padding:20}}>
      <h2>Cart</h2>
      <ul>
        {cart.map(i=>(
          <li key={i.product._id}>
            {i.product.name} x {i.quantity} 
            <button onClick={()=>updateQuantity(i.product._id, i.quantity+1)} style={{marginLeft:5}}>+</button>
            <button onClick={()=>updateQuantity(i.product._id, i.quantity-1)} disabled={i.quantity<=1}>-</button>
            <button onClick={()=>removeItem(i.product._id)} style={{marginLeft:5}}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
