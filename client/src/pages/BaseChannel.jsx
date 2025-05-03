import { useParams } from "react-router-dom"

export default function BaseChannel(){
    const { channelId } = useParams()
    return (
        <>
            {channelId}
        </>
    )
}