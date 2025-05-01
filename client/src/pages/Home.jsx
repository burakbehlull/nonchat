import { Flex, Box } from "@chakra-ui/react"
import { Navbar } from "@components"
import { HomeContent } from "@pages"

function Home() {
  return (
	<>
		<Flex direction="column" height="100vh">
			<Box
				height="10vh"
				color="white"
				display="flex"
				alignItems="center"
				justifyContent="center"
				px={{
					base: 4,
					md: 8,
					lg: 16,
				}}
			>
				<Navbar />
			</Box>


			<Box
				flex="1"
				p={4}
				overflowY="auto"
				bg={{base: "white", _dark: "black"}}
				className="dark"
			>
				<HomeContent />
			</Box>
		</Flex>
	</>
  )
}

export default Home
