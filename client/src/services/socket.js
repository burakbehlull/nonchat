import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URI || "http://localhost:80", {
    transports: ["websocket"],
})

export default socket