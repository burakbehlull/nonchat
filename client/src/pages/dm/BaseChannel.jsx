import { useParams } from "react-router-dom"
import { ChatRoom } from "@pages"

export default function BaseChannel(){
    const { channelId } = useParams()
    return (
        <>
            <ChatRoom />
        </>
    )
}