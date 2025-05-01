import { Flex, Box, Stack, Heading,Text, Highlight, Button, Center } from "@chakra-ui/react"
import { Navbar } from "@components"
import { HiChatAlt2 } from "react-icons/hi";

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
				<Center
					height="100%"
					justifyContent="center"
					alignItems="center"
					flexDirection="column"
					textAlign="center"
				>
					<Stack>
						<Heading size="4xl" letterSpacing="tight">
							<Highlight query="talk anonymously" styles={{ color: "teal.600" }}>
								A communication tool where you can talk anonymously
							</Highlight>
						</Heading>
						<Text fontSize="lg" color="fg.muted">
							Talk to people anonymously, end-to-end encrypted communication channels
			
						</Text>
						<Box 
							mt={4}
						>
							<Button colorScheme="teal" size="lg" variant="solid"
								bg="#2563eb"
								color="white"
								_hover={{ bg: '#1e40af' }}
								_active={{ bg: '#1e3a8a' }}
								_focus={{ bg: 'outline' }}
								rounded="lg"
								
								transition="background-color 0.2s ease-in-out"
								shadow="md"

							>
								<HiChatAlt2 />
								Yeni Oda
							</Button>
						</Box>
					</Stack>
				</Center>
			</Box>
		</Flex>
	</>
  )
}

export default Home
