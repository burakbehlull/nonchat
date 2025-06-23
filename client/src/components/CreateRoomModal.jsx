import { ModalUI, ModalInputUI, NumberInputUI } from "@ui"
export default function CreateRoomModal({ content, onCreate }) {

    return (
        <>
            <ModalUI
                size="md"
                content={content}
                modalTitle="Oda Oluştur"
                onClick={onCreate}
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
                <NumberInputUI
                    placeholder="Limit"
                    label="Limit"
                    icon={null}
                    type="number"
                    value={10}
                    min={0}
                />
            </ModalUI>
        </>
    )
}