import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { nanoid } from "nanoid";

let userId = Cookies.get("userId");
if (!userId) {
  userId = nanoid(12);
  Cookies.set("userId", userId, {
	  path: "/",
	  expires: 1,
	  sameSite: "Strict",
  });
}

const socket = io(import.meta.env.VITE_SOCKET_URI || "http://localhost:80", {
  transports: ["websocket"],
  query: { userId }
});

export default socket;
