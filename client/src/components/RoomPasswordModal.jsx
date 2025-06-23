import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useSocket } from "@services";
import { ModalUI, ModalInputUI } from "@ui"

import { toast } from "react-hot-toast"

export default function RoomPasswordModal({ children, clickName, data, clickRef }) {

	const navigate = useNavigate()
    const socket = useSocket();
	const passwordRef = useRef(null)
	const closeRef = useRef(null);
	
	const handlePasswordSubmit = () => {
		
	socket.emit("joinRoom", { roomId: data, password: passwordRef.current.value }, ({ success, message }) => {
		if(!passwordRef.current.value) return toast("Şifre giriniz!")
		if (success) {
			closeRef.current.click();
			navigate(`/channel/${data}`);
			
		} else {
			toast(`Şifre yanlış`);
		}
	  });
	}

    return (
        <>
            <ModalUI
                size="md"
                content={children}
                modalTitle="Odaya Giriş"
                onClick={handlePasswordSubmit}
                clickName="Katıl"
				clickRef={clickRef}
				closeRef={closeRef}
            >
                <ModalInputUI
                    placeholder="Şifre (zorunlu)"
                    label="Şifre"
                    type="password"
                    ref={passwordRef}
                    required={false}
                />
            </ModalUI>
        </>
    )
}