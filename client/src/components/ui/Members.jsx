import { useRef } from "react"

import { Avatar, HStack, Stack, Text, Badge, Flex, Icon } from "@chakra-ui/react"

import { HiAtSymbol, HiStar, BsThreeDotsVertical, TbCrown } from "@icons"
import { TooltipMenu, TooltipMenuItem, ModalUI, ModalInputUI } from "@ui"
import { useSocket } from "@services"

import NoneUser from '@assets/none-user.jpg'
import toast from "react-hot-toast"


const Members = ({data, roomId, isOwner, currentUserId}) => {
  const usernameRef = useRef(null)
  const usernameInputRef = useRef(null)
  const usernameCloseRef = useRef(null)
  
  const socket = useSocket()
  
  const handleBan = (targetSocketId) => {
	 socket.emit('kickUser', { roomId, targetSocketId }, (response) => {
		toast.error("Kullanıcı banlandı!", { duration: 2000 })
     })
  }
  
  
  const handleChangeName = () => {
	const username = usernameInputRef.current.value
	
	if(!username || username==="") {
		toast.error("Bir isim giriniz.", { duration: 2000 })
		return
	}
	if(username.length > 12){
		toast.error("Sadece 12 harf", { duration: 2000 })
		return
	}
    socket.emit('changeName', { roomId, newName: username, targetSocketId: currentUserId })
	usernameCloseRef.current.click()
  }
  return (
    <Stack gap="5">
      {data.map((user) => {
	  
	 const isSelf = user.id === currentUserId
	  return (

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
				
				<Badge variant="solid" colorPalette={user.role=="owner" ? "yellow" : "green"} ml={2}>
					{user.role=="owner" ? <TbCrown /> : <HiAtSymbol />}
					{user.role=="owner" ? "Owner" : "Member"}
				</Badge>
				<TooltipMenu content={<Icon size="sm" color={{ base: "gray.800", _dark: "gray.100" }} cursor="pointer" ml={1}><BsThreeDotsVertical /></Icon>}>
					{isSelf && 
						<TooltipMenuItem value="username-change" title="Kullanıcı Adını Değiştirir" 	 onClick={()=> usernameRef.current.click()} 
						>İsim Değiştir</TooltipMenuItem>
					}
					
					{isOwner && !isSelf &&
						<TooltipMenuItem value="ban-user" title="Kullanıcıyı Yasakla"
							onClick={()=> handleBan(user.id)}
							color="red"
						> Yasakla</TooltipMenuItem>
					}
				</TooltipMenu>
			</Flex>
          </Stack>
		  
		  <ModalUI
			modalTitle="Adını Değiştir"
			ref={usernameInputRef}
			clickRef={usernameRef}
			clickName="Değiştir"
			onClick={()=> handleChangeName()}
			closeRef={usernameCloseRef}
		   >
			<ModalInputUI
				placeholder="Bir Kullanıcı Adı Giriniz."
				label="Kullanıcı Adı"
				ref={usernameInputRef}
				onKeyDown={(e) => e.key === "Enter" && handleChangeName()}
				
			/>	
		  </ModalUI>
        </HStack>
      )}
	)}
    </Stack>
  )
}
export default Members


