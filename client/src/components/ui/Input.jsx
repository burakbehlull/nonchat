import { Input, InputGroup } from "@chakra-ui/react"

export default function InputUI({placeholder, size, endElement, ...props}){
    return (
        <InputGroup flex="1" endElement={endElement}>
            <Input placeholder={placeholder} size={size} {...props} />
        </InputGroup>
    )
}