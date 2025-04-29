import { Flex, Box } from "@chakra-ui/react"
function Home() {
  return (
	<>
		<Flex
			direction={{ base: "column", md: "row" }} // Mobilde dikey, md ve yukarısında yatay
			height="100vh"
			>
			<Box
				flex={{ base: 1, md: 3 }} // Mobilde eşit oran (1), md ve yukarısında %30
				bg="blue.200"
			>
				Sol Alan
			</Box>

			<Box
				flex={{ base: 1, md: 7 }} // Mobilde eşit oran (1), md ve yukarısında %70
				bg="green.200"
			>
				Sağ Alan
			</Box>
		</Flex>
	</>
  )
}

export default Home
