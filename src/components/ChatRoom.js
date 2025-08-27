import { useEffect, useState, useContext } from "react"
import useSocket from "../hooks/useSocket.js"
import { AuthContext } from "../context/AuthContext.js"
import axios from "axios"

export default function ChatRoom({ room }) {
  const { token } = useContext(AuthContext)
  const socketRef = useSocket(token)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [typingUsers, setTypingUsers] = useState({})
  const emojis = ["😀","😂","😍","😅","👍","🎉"]

  useEffect(() => {
    if (!room || !token) return
    axios.get(`${process.env.REACT_APP_API_URL}/api/rooms/${room}/messages`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res=>setMessages(res.data)).catch(()=>{})
  }, [room, token])

  useEffect(() => {
    const socket = socketRef.current
    if (!socket) return
    socket.emit("join_room", room)
    socket.on("receive_message", msg => setMessages(prev=>[...prev,msg]))
    socket.on("typing", ({ userId, username, isTyping }) => {
      setTypingUsers(prev => {
        const copy = {...prev}
        if (isTyping) copy[userId] = username
        else delete copy[userId]
        return copy
      })
    })
    return () => {
      socket.emit("leave_room", room)
      socket.off("receive_message")
      socket.off("typing")
    }
  }, [socketRef.current, room])

  const sendMessage = () => {
    if (!text.trim()) return
    const socket = socketRef.current
    socket && socket.emit("send_message", { room, content: text })
    setText("")
  }

  const handleTyping = e => {
    setText(e.target.value)
    const socket = socketRef.current
    socket && socket.emit("typing", { room, isTyping: e.target.value.length>0 })
  }

  return (
    <div style={{padding:20}}>
      <h3>Room: {room}</h3>
      <div style={{height:300,overflowY:"auto",border:"1px solid #ccc",padding:10}}>
        {messages.map(m=>(
          <div key={m._id} style={{marginBottom:8}}>
            <strong>{m.sender?.username || "Unknown"}</strong>
            <span style={{marginLeft:8}}>{m.content}</span>
            <div style={{fontSize:11,color:"#666"}}>{new Date(m.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
      {Object.keys(typingUsers).length>0 && <div>{Object.values(typingUsers).join(", ")} typing...</div>}
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <input value={text} onChange={handleTyping} onKeyDown={e=>e.key==="Enter"&&sendMessage()}/>
        <button onClick={sendMessage}>Send</button>
      </div>
      <div style={{marginTop:8}}>
        {emojis.map(em=><button key={em} onClick={()=>setText(prev=>prev+em)} style={{marginRight:6}}>{em}</button>)}
      </div>
    </div>
  )
}
