import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useSocket } from "@services";
import { ModalUI, ModalInputUI } from "@ui"

export default function RoomPasswordModal({ children, onClick, clickName, data, clickRef }) {

    const socket = useSocket();
	const passwordRef = useRef(null)
	const closeRef = useRef(null);
	

    return (
        <>
            <ModalUI
                size="md"
                content={children}
                modalTitle="Odaya Giriş"
                onClick={onClick}
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