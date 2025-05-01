import { Flex, Text } from "@chakra-ui/react";

export default function DiscordStyleNavbar() {
  return (
    <Flex 
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      width="100%"
    >
      
      <Text fontSize="xl" fontWeight="bold" color="black">
        NonChat
      </Text>

      {/* <Link href="#" _hover={{ textDecoration: "underline" }}>None</Link> */}
      
    </Flex>
  );
}