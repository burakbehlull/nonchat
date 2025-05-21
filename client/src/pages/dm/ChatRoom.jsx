import { Box, Flex, useBreakpointValue, Text } from "@chakra-ui/react";
import { InputUI, Bubble, Members } from "@ui";

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
	<Flex height="95vh" direction={{ base: "column", md: "row" }}>
      <Flex
        direction="column"
        width={{ base: "100%", md: "300px" }}
        borderRight="1px solid gray"
        height={{ base: "auto", md: "95vh" }}
      >
        <Box borderBottom="1px solid gray" p={4}>
          ODA AYARLARI
        </Box>
        <Box flex="1" p={4}>
		  <Text fontWeight="medium" 
			textStyle="md"
			mb={4}>Kullanıcılar</Text>
          <Members data={users} />
        </Box>
      </Flex>

      
      <Flex direction="column" flex="1" height="95vh">
        <Box borderBottom="1px solid gray" p={4}>
           <Text truncate>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</Text>
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