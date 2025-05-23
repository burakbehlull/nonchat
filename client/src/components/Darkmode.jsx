import { Icon } from "@chakra-ui/react";
import { useStore } from "@hooks"
import { MdDarkMode, MdLightMode } from "@icons"

export default function Darkmode({size, ...props}) {  
  	const { setTheme, getTheme } = useStore()
	const theme = getTheme()
	const toggle = ()=> setTheme(theme=="light" ? "dark" : "light")
	
  
  return (
	   <Icon size={size} {...props}>
			{theme === "light" ? <MdLightMode onClick={toggle} color="black" cursor="pointer" /> 
			: <MdDarkMode onClick={toggle} color="white" cursor="pointer" />}
	   </Icon>
  );
}