import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react"

import { useSocket } from "@services";
import { ModalUI, ModalInputUI, NumberInputUI, TextUI } from "@ui"

export default function CreateRoomModal({ children, onCreate, clickName }) {

    const socket = useSocket();

    const roomNameRef = useRef(null);
    const passwordRef = useRef(null);
    const limitRef = useRef(null);
	const closeRef = useRef(null);
    
    const navigate = useNavigate();

    const onRoomCreated = (roomId) => {
        if (onCreate) {
            onCreate(roomId);
        }
    }

    const handleCreateRoom = () => {
        socket.emit('createRoom', { name: roomNameRef.current.value, password: passwordRef.current.value, limit: Number(limitRef.current.value) }, ({ success, roomId }) => {
            if (success) {
                onRoomCreated(roomId)
				closeRef?.current?.click()
                navigate(`/channel/${roomId}`, { state: { data: passwordRef.current.value } });
            }
        })
    }
    return (
        <>
            <ModalUI
                size="md"
                content={children}
                modalTitle="Oda Oluştur"
                onClick={handleCreateRoom}
                clickName="Oluştur"
				closeRef={closeRef}
            >

                <ModalInputUI
                    placeholder="Oda Adı"
                    label="Oda Adı"
                    type="text"
                    ref={roomNameRef}
                    required
                />
                <ModalInputUI
                    placeholder="Şifre (opsiyonel)"
                    label="Şifre"
                    type="password"
                    ref={passwordRef}
                    required={false}
                />
                <Flex gap={4} align="center">
                    <TextUI 
                        text="Limit" 
                        color="#09090B" 
                        fontWeight="medium"
                        textStyle="md"
                    />
                    <NumberInputUI
                        placeholder="Limit"
                        label="Limit"
                        icon={null}
                        type="number"
                        value={10}
                        min={0}
                        ref={limitRef}
                        required={false}
                    />
                </Flex>
            </ModalUI>
        </>
    )
}