import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { InputUI, Bubble, Members } from "@ui";
import { useEffectc } from "react";

export default function ChatRoom() {
	const isMobile = useBreakpointValue({ base: true, sm: false, md: false, lg: false });
	
  const users = [
    {
      id: "1",
      name: "John Mason",
      email: "john.mason@example.com",
      avatar: "https://i.pravatar.cc/300?u=iu",
      content: "selam"
    },
    {
      id: "2",
      name: "Melissa Jones",
      email: "melissa.jones@example.com",
      avatar: "https://i.pravatar.cc/300?u=po",
      content: "naber"
    }
  ];

  return (
    <Box p={0}>
      <Flex
        direction={{ base: "column", md: "row" }}
        height="100vh"
        overflow="hidden"
      >
	  {isMobile ? (<p>1</p>) : (<p>2</p>)}

      <Flex
          direction="column"
          width={{ base: "100%", md: "290px" }}
          height={{ base: "auto", md: "100vh" }}
          borderRight={{ base: "none", md: "1px solid #e4e4e7" }}
          borderBottom={{ base: "1px solid #e4e4e7", md: "none" }}
          flexShrink={0}
        >
          <Box borderBottom="1px solid #e4e4e7" p={4}>
            ODA AYARLARI
          </Box>
          <Box flex="1" p={4} overflowY="auto">
            <Text fontWeight="medium" textStyle="md" mb={4}>
              Kullanıcılar
            </Text>
            <Members data={users} />
          </Box>
        </Flex>

        <Flex
          direction="column"
          flex="1"
          height={{ base: "auto", md: "97vh" }}
        >
          <Box borderBottom="1px solid #e4e4e7" p={4}>
            <Text isTruncated>Lorem ipsum dolor sit amet.</Text>
          </Box>

          <Box flex="1" position="relative" overflow="hidden">
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="80px"
              overflowY="auto"
              pt={5}
			  px={5}
            >
              {Array(40)
                .fill(null)
                .map((_, i) => (
                  <Bubble key={i} data={users} />
                ))}
            </Box>

            <Box
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              pt={5}
			  px={4}
			  pb={{
				  base: "4",md:"1", lg: "1"
			  }}
			  
              bg="white"
              // borderTop="1px solid gray"
            >
              <InputUI placeholder="Mesaj gönder" size="lg" borderRadius={15}
				onKeyDown={(e)=> {
					if (e.key === 'Enter') {
					  alert('Enter key was pressed!');
					}
				}}
			  />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
