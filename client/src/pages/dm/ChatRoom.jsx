import { Box, Flex, Text } from "@chakra-ui/react";
import { InputUI, Bubble, Members } from "@ui";

export default function ChatRoom() {
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
    <Flex height="100vh" overflow="hidden">
      {/* SOL MENÜ */}
      <Flex
        direction="column"
        width={{ base: "100%", md: "300px" }}
        borderRight="1px solid gray"
        height="100vh"
        flexShrink={0}
      >
        <Box borderBottom="1px solid gray" p={4}>
          ODA AYARLARI
        </Box>
        <Box flex="1" p={4} overflowY="auto">
          <Text fontWeight="medium" textStyle="md" mb={4}>
            Kullanıcılar
          </Text>
          <Members data={users} />
        </Box>
      </Flex>


      <Flex direction="column" flex="1" height="100vh">
        <Box borderBottom="1px solid gray" p={4}>
          <Text truncate>Lorem ipsum dolor sit amet.</Text>
        </Box>

        <Box flex="1" position="relative" overflow="hidden">
          
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="80px"
            overflowY="auto"
            p={4}
          >
		  {/* Denemei için böyle bırakıldı */}
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
            p={4}
            bg="white"
            borderTop="1px solid gray"
          >
            <InputUI placeholder="Mesaj gönder" size="lg" borderRadius={15} />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
