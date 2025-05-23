import { Flex, Text } from "@chakra-ui/react";
import { Darkmode } from "@components";

export default function Navbar() {  

  
  return (
    <Flex 
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      width="100%"
    >
      
      <Text fontSize="xl" fontWeight="bold" color={{base: "black", _dark: "white"}}>
        NoneChat
      </Text>
	  
	   <Darkmode size="lg" />
	  
      {/* <Link href="#" _hover={{ textDecoration: "underline" }}>None</Link> */}
      
    </Flex>
  );
}