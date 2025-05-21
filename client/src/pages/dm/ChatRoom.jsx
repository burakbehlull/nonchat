import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { InputUI, Bubble } from "@ui";
import NoneUser from '@assets/none-user.jpg'

export default function ChatRoom(){
	const users = [
	  {
		id: "1",
		name: "John Mason",
		email: "john.mason@example.com",
		avatar: "https://i.pravatar.cc/300?u=iu",
		content:"selam"
	  },
	  {
		id: "2",
		name: "Melissa Jones",
		email: "melissa.jones@example.com",
		avatar: "https://i.pravatar.cc/300?u=po",
		content: "naber"
	  },
	]
	const flexDirection = useBreakpointValue({ base: "column", md: "row" });

    return (
	<Flex height="100vh" direction={{ base: "column", md: "row" }}>
      <Flex
        direction="column"
        width={{ base: "100%", md: "300px" }}
        borderRight="1px solid black"
        height={{ base: "auto", md: "100vh" }}
      >
        <Box borderBottom="1px solid black" p={4}>
          ODA AYARLARI
        </Box>
        <Box flex="1" p={4}>
          KATILIMCILAR
        </Box>
      </Flex>

      
      <Flex direction="column" flex="1" height="95vh">
        <Box borderBottom="1px solid black" p={4}>
          ODA ADI
        </Box>
		
        <Flex
			flex="1"
			direction="column"
			justify="space-between"
			m={2}
			p={4}
			// border="1px solid gray"
			borderRadius={10}
		  >
			<Box flex="1" overflowY="auto" mb={4}>
			  <Bubble data={users} />
			</Box>

			<Box pt={4}>
			  <InputUI
				placeholder="Mesaj gönder"
				size="lg"
				borderRadius={15}
			  />
			</Box>
		</Flex>
		  
      </Flex>
    </Flex>
    )
}