import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext.js"
import Navbar from "./components/Navbar.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import Profile from "./components/Profile.js"
import Home from "./components/Home.js"
import Chat from "./components/Chat.js"
import Products from "./components/Product.js"
import Cart from "./components/Cart.js"
import PrivateRoute from "./utils/PrivateRoute.js"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/chat/:room" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
