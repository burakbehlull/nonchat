import { useParams, useLocation } from "react-router-dom"
import { ChatRoom } from "@pages"

export default function BaseChannel(){
    const { channelId } = useParams()
	 const { state } = useLocation()
	 console.log("state", state)
    return (
        <>
            <ChatRoom roomId={channelId} password={state?.data} />
        </>
    )
}