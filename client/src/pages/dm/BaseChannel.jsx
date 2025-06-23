import { useParams, useLocation } from "react-router-dom"
import { ChatRoom } from "@pages"

export default function BaseChannel(){
    const { channelId } = useParams()
	 const { state } = useLocation()
    return (
        <>
            <ChatRoom roomId={channelId} password={state?.data ?? null} />
        </>
    )
}