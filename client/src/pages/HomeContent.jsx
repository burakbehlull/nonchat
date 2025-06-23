import { Box, Button, Center, Heading, Stack, Highlight, Text, useBreakpointValue, Kbd } from "@chakra-ui/react";
import { HiChatAlt2 } from "@icons";
import { InputUI } from "@ui";
import { useNavigate } from "react-router-dom";
import { CreateRoomModal, RoomPasswordModal } from "@components";
import { useSocket } from "@services";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast"

export default function HomeContent(){
	
    const isMobile = useBreakpointValue({ base: true, md: false });
	const navigate = useNavigate()
	
	const clickRef = useRef(null)
	
	const socket = useSocket()
	const [inviteCode, setInviteCode] = useState("")
	
	const handleJoinClick = () => {
	
	  socket.emit("getRoomInfo", { roomId: inviteCode }, (res) => {
		if (!res.success) return toast.error(`Oda yok`)

		if (res.isOwner || !res.passwordProtected) {

		  socket.emit("joinRoom", { roomId: inviteCode }, ({ success, message }) => {
			if (success) {
			  toast.success("Giriş başarılı")
				
			  navigate(`/channel/${inviteCode}`);
			} else {
			  toast.error(`Katılamadı: ${message}`)
			}
		  });
		} else {
			clickRef.current.click();
		}
	  });
	};

	
    const ButtonCheck = (props) => {
        return (
            <CreateRoomModal>
                <Button 
                    size="lg"
                    variant="solid"
                    //1e293b
                    bg="#2563eb"
                    color="white"
                    _hover={{ bg: '#1e40af' }}
                    _active={{ bg: '#1e3a8a' }}
                    _focus={{ bg: 'outline' }}
                    rounded="lg"
                    transition="background-color 0.2s ease-in-out"
                    
                    minWidth="15rem" 
                    width={isMobile ? "100%" : "auto"}
                    {...props}
                >
                    <HiChatAlt2 />
                    Yeni Oda
                </Button>
            </CreateRoomModal>
        )
    }

    return (
        <>
            <Center
                height="100%"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                textAlign="center"
            >
                <Stack spacing={4} maxW="2xl" width="100%">
                    <Heading size="4xl" letterSpacing="tight">
                        <Highlight query="talk anonymously" styles={{ color: "teal.600" }}>
                            A communication tool where you can talk anonymously
                        </Highlight>
                    </Heading>
                    <Text fontSize="lg" color="fg.muted">
                        Talk to people anonymously, end-to-end encrypted communication channels
                    </Text>
                    <br/>
                    {isMobile ? (
                        /* mobil */
                        <Stack spacing={4} width="100%">
                            <InputUI 
                                placeholder="Kod giriniz" 
                                size="lg" 
                                width="100%"
								onChange={(e)=> setInviteCode(e.target.value)}
								value={inviteCode}
								endElement={<Kbd>⌘K</Kbd>}
                                aria-label="Kod giriniz"
                            />
                            <Button variant="subtle" onClick={handleJoinClick}>Katıl</Button>
                            <ButtonCheck mt={4} />
                        </Stack>
                    ) : (
                        <Box display="flex" gap={4} width="100%" alignItems="center">
                            <ButtonCheck size="lg" /> 
                            <InputUI 
								endElement={<Kbd>⌘K</Kbd>}
                                placeholder="Kod giriniz" 
                                size="lg" 
								onChange={(e)=> setInviteCode(e.target.value)}
								value={inviteCode}
                                flex="1"
                                aria-label="Kod giriniz"
                            />
                            <Button variant="subtle" size="lg" onClick={handleJoinClick}>Katıl</Button>
                        </Box>
                    )}
					<RoomPasswordModal data={inviteCode} clickRef={clickRef}><p></p></RoomPasswordModal>
                </Stack>
            </Center>
        </>
    )
}