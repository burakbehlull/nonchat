import { Flex } from "@chakra-ui/react"
import { ModalUI, ModalInputUI, NumberInputUI, TextUI } from "@ui"

export default function CreateRoomModal({ children, onCreate, clickName }) {

    return (
        <>
            <ModalUI
                size="md"
                content={children}
                modalTitle="Oda Oluştur"
                onClick={onCreate}
                clickName="Oluştur"
            >

                <ModalInputUI
                    placeholder="Oda Adı"

                    label="Oda Adı"
                    type="text"
                />
                <ModalInputUI
                    placeholder="Şifre (opsiyonel)"
                    label="Şifre"
                    type="password"
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
                    />
                </Flex>
                
            </ModalUI>
        </>
    )
}