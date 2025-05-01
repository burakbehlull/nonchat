"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"
import { useStore } from "@hooks"

export function Provider(props) {
	
  const { getTheme } = useStore()
  const theme = getTheme()
  
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider 
		  forcedTheme={theme}
		  {...props} 
	  />
    </ChakraProvider>
  )
}
