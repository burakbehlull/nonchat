import { Container } from "@chakra-ui/react"
import Routes from "../routes/index"


function Layout() {
  return (
	<Container
		padding="15px"
		bg={"gray.100"}
		minH="100vh"
		maxW="100vw"
	>
		<Routes />
	</Container>
  )
}

export default Layout
