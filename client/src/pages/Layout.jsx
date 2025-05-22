import { Container } from "@chakra-ui/react"
import Routes from "../routes/index"

function Layout() {

	
  return (
	<Container
		padding={0}
		margin={0}
		minH="100vh"
		maxW="100vw"
	>
		<Routes />
	</Container>
  )
}

export default Layout
