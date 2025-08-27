import { useRef, useEffect } from "react"
import { io } from "socket.io-client"

export default function useSocket(token) {
  const socketRef = useRef(null)

  useEffect(() => {
    if (!token) return
    socketRef.current = io(process.env.REACT_APP_API_URL, {
      auth: { token }
    })
    return () => socketRef.current.disconnect()
  }, [token])

  return socketRef
}
