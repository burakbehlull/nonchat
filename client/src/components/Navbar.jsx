import { Flex, Text, Icon } from "@chakra-ui/react";
import { useStore } from "@hooks"
import { Fragment } from "react"
import { MdDarkMode, MdLightMode } from "react-icons/md"

export default function Navbar() {  
  	const { setTheme, getTheme } = useStore()
	const theme = getTheme()
	const toggle = ()=> setTheme(theme=="light" ? "dark" : "light")
	
  
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
	  
	   <Icon size="lg">
			{theme === "light" ? <MdLightMode onClick={toggle} color="black" cursor="pointer" /> 
			: <MdDarkMode onClick={toggle} color="white" cursor="pointer" />}
	   </Icon>
	   
	  
      {/* <Link href="#" _hover={{ textDecoration: "underline" }}>None</Link> */}
      
    </Flex>
  );
}