import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";


export default function ChatRoom(){
	const flexDirection = useBreakpointValue({ base: "column", md: "row" });

    return (
		<Flex direction={flexDirection} height="100vh">
		  <Box
			width={{ base: "100%", md: "30%" }}
			bg="blue.100"
			p={4}
			minHeight="200px"
		  >
			Sol Panel
		  </Box>

		  
		  <Box
			width={{ base: "100%", md: "70%" }}
			bg="green.100"
			p={4}
			minHeight="200px"
		  >
			Sağ Panel
		  </Box>
		</Flex>
    )
}