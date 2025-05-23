import { useRef } from "react"

import { Avatar, HStack, Stack, Text, Badge, Flex, Icon } from "@chakra-ui/react"

import { HiAtSymbol, HiStar, BsThreeDotsVertical } from "@icons"
import { TooltipMenu, TooltipMenuItem, ModalUI, ModalInputUI } from "@ui"

import NoneUser from '@assets/none-user.jpg'


const Members = ({data}) => {
  const usernameRef = useRef(null)
  const usernameInputRef = useRef(null)
  
  return (
    <Stack gap="5">
      {data.map((user) => (
        <HStack key={user?.id} gap="3">
          <Avatar.Root size="lg">
            <Avatar.Fallback name={user.name} /> 
            <Avatar.Image src={NoneUser} />
          </Avatar.Root>
          <Stack gap="0">
            <Flex 
				fontWeight="medium"
			    justifyContent="center"
				alignItems="center" 
			>{user.name}
				
				<Badge variant="solid" colorPalette="green" ml={2}>
					<HiAtSymbol />
					None
					
					
				</Badge>
				<TooltipMenu content={<Icon size="sm" color={{ base: "gray.800", _dark: "gray.100" }} cursor="pointer" ml={1}><BsThreeDotsVertical /></Icon>}>
					<TooltipMenuItem value="username-change" title="Kullanıcı Adını Değiştirir"
						onClick={()=> usernameRef.current.click()}
					>İsim Değiştir</TooltipMenuItem>
				</TooltipMenu>
			</Flex>
          </Stack>
		  
		  <ModalUI
			modalTitle="Adını Değiştir"
			ref={usernameInputRef}
			clickRef={usernameRef}
		   >
			<ModalInputUI
				placeholder="Bir Kullanıcı Adı Giriniz."
				label="Kullanıcı Adı"
				ref={usernameInputRef}
				
			/>	
		  </ModalUI>
        </HStack>
      ))}
    </Stack>
  )
}
export default Members


