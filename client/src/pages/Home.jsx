import { Flex, Box } from "@chakra-ui/react"
import { Navbar } from "@components"
import { HomeContent } from "@pages"

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
				p={4}
				overflowY="auto"
			>
				<HomeContent />
			</Box>
		</Flex>
	</>
  )
}

export default Home
