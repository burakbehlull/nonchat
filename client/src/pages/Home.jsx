import { Flex, Box } from "@chakra-ui/react"
import { Navbar } from "@components"

function Home() {
  return (
	<>
		<Flex direction="column" height="100vh">
		<Box
			height="10vh"
			bg="teal.500"
			color="white"
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<Navbar />
		</Box>


		<Box
			flex="1"
			bg="gray.100"
			p={4}
			overflowY="auto"
		>
			Sayfanın geri kalanı burası. Buraya tüm component'lerini koyabilirsin.
		</Box>
		</Flex>
	</>
  )
}

export default Home
