import { useParams } from "react-router-dom"
import ChatRoom from "./ChatRoom.js"

export default function Chat() {
  const { room } = useParams()
  return <ChatRoom room={room} />
}
