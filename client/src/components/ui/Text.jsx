import { Text } from "@chakra-ui/react"

const TextUI = ({text,...props}) => {
	return <Text {...props}
		_dark={{color: "white"}}
	>{text}</Text>
}

export default TextUI

