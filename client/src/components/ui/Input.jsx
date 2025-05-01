import { Input, InputGroup, Kbd } from "@chakra-ui/react"

export default function InputUI({placeholder, size, ...props}){
    return (
        <InputGroup flex="1" endElement={<Kbd>⌘K</Kbd>}>
            <Input placeholder={placeholder} size={size} {...props} />
        </InputGroup>
    )
}