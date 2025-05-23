import { Text } from "@chakra-ui/react"

const TextUI = ({text,...props}) => {
	return <Text {...props}>{text}</Text>
}

export default TextUI

