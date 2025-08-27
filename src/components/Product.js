import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext.js"

export default function Products() {
  const { token } = useContext(AuthContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!token) return
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res=>setProducts(res.data)).catch(()=>{})
  }, [token])

  const addToCart = async (productId) => {
    if (!token) return
    await axios.post(`${process.env.REACT_APP_API_URL}/api/cart`, { productId, quantity: 1 }, {
      headers: { Authorization: `Bearer ${token}` }
    }).catch(()=>alert("Add to cart failed"))
    alert("Added to cart")
  }

  return (
    <div style={{padding:20}}>
      <h2>Products</h2>
      <ul>
        {products.map(p=>(
          <li key={p._id}>
            {p.name} - ${p.price}
            <button onClick={()=>addToCart(p._id)} style={{marginLeft:10}}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
