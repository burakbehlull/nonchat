import { Container } from "@chakra-ui/react"
import Routes from "../routes/index"
import Helmet from 'react-helmet';

function Layout() {

  
  return (
	<>
		<Helmet>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="theme-color" content="#3fd4f2" />
			<meta name="description" content="Odalara gir, sohbet et, eğlen." />
			<meta name="keywords" content="sohbet, message chat,chat, web" />
			<meta name="robots" content="index, follow" />
			<title>None Chat</title>
		</Helmet>
		
		<Container
			padding={0}
			margin={0}
			minH="100vh"
			maxW="100vw"
		>
			<Routes />
		</Container>
	</>
  )
}

export default Layout
