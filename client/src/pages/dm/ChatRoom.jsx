import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex, useBreakpointValue, Icon } from "@chakra-ui/react";
import toast from "react-hot-toast";

import { InputUI, BubbleUI, Members, DrawerUI, ModalInputUI, 
	ModalUI, NumberInputUI, TextUI } from "@ui";
import { FaUsersGear, FaUsers, HiOutlineUsers, FiSend, 
	RiGroup2Fill, AiOutlineDisconnect } from "@icons";
import { Darkmode, EmojiPicker } from "@components";
import { useSocket } from "@services";

export default function ChatRoom({ roomId: propRoomId, password }) {
  const { roomId: urlRoomId } = useParams();
  const roomId = propRoomId || urlRoomId;
  const socket = useSocket();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);  
  const [isOwner, setIsOwner] = useState(false);
  const [info, setInfo] = useState(null);
  const [input, setInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(false);

  const modalRef = useRef(null);
  const groupTitleRef = useRef(null);
  const groupLimitRef = useRef(null);
  const groupPasswordRef = useRef(null);
  
  const scrollRef = useRef(null);
  
  useEffect(() => {
	  if (scrollRef.current) {
		scrollRef.current.scrollIntoView({ behavior: "smooth" });
	  }
   }, [messages]);

  useEffect(() => {
	  if (!roomId || !socket) return;

	  socket.emit("getRoomInfo", { roomId }, (res) => {
		if (!res.success) {
		  toast.error(res.message || "Oda bulunamadı", {
			  duration: 4000,
			  id: "join-room"
		  });
		  return navigate("/");
		}

		setInfo(res);
		
		setIsOwner(res.isOwner);
		setCurrentUserId(socket.id);
		setUsers(res.users);
		
		socket.emit("joinRoom", { roomId, password }, (joinRes) => {
		  if (!joinRes.success) {
			toast.error(joinRes.message || "Odaya katılamadın", {
				duration: 4000,
				id: "join-room"
			});
			return navigate("/");
		  }
		  
		  setJoinedRoom(true);
		  if(res.isOwner){
			toast.success("Oda oluşturuldu!", {
				 duration: 2000,
				 id: "join-room"
			});
		  } else {
			toast.success("Odaya katıldın!", {
				 duration: 2000,
				 id: "join-room"
			}); 
		  }
		});
	  });
  }, [roomId, socket]);

  useEffect(() => {
	  if (!joinedRoom || !socket) return;

	  socket.on("roomUsers", setUsers);
	  socket.on("receiveMessage", (msg) => {
		setMessages((prev) => [...prev, msg]);
	  });

	  return () => {
		socket.off("roomUsers");
		socket.off("receiveMessage");
	  };
   }, [joinedRoom, socket]);
   
  useEffect(() => {
	  socket.on("bannedFromRoom", ({ roomId }) => {
		toast.error("Bu odadan banlandınız!", { id: "banned" });
		navigate("/")
	  });

	  return () => socket.off("bannedFromRoom");
  }, [socket]);
  
  useEffect(() => {
	  if (!socket) return;

	  const handleRoomClosed = () => {
		toast.error("Oda kapatıldı!", { id: "room-closed" });
		navigate("/");
	  };

	  socket.on("roomClosed", handleRoomClosed);

	  return () => {
		socket.off("roomClosed", handleRoomClosed);
	  };
  }, [socket]);

  const sendMessage = () => {
	  if (!input.trim()) return;
	  socket.emit("sendMessage", { roomId, message: input }, (res) => {
		if (res?.success) {
		  setInput("");
		} else {
		  toast.error("Mesaj gönderilemedi", { duration: 2000, id: "message" });
		}
	  });
  };
  
  const handleRoomSettingChange = ()=>{
	  const newName = groupTitleRef.current.value
	  const newPassword = groupPasswordRef.current.value
	  
	  if(newName.length > 12){
		toast.error("Sadece 12 harf", { duration: 2000, id: "room-settings" })
		return
	  }
	  const newLimit = Number(groupLimitRef.current.value)
	  socket.emit("updateRoom", { roomId, name: newName, limit: newLimit, password: newPassword}, (res) => {
		if (res.success) {
		  toast.success("Oda ayarları güncellendi!", { duration: 2000, id: "room-settings" });
		  setInfo(res.room);
		} else {
		  toast.error(res.message || "Güncelleme başarısız!", { duration: 2000, id: "room-settings" });
		}
	  });
  }

  const handleLeave = () => {
    socket.emit("leaveRoom", { roomId });
	toast.success("Odadan çıkış yapıldı!", {
		duration: 3000, id: "room-closed"
	})
    navigate("/");
  };

  const GroupSettings = () => (
    <ModalUI
      modalTitle="Oda Ayarları"
      content={
        <Icon 
          size="md" 
          color={{ base: "gray.800", _dark: "gray.300" }} 
          cursor="pointer"
          aria-label="Oda Ayarları"
          alt="Oda Ayarları"
        >
          <FaUsersGear />
        </Icon>
      }
      dialogRef={modalRef}
      onClick={handleRoomSettingChange}
    >
      <ModalInputUI
        placeholder={info?.name || "Grup Başlığı"}
        label="Grup Başlığı"
        ref={groupTitleRef}
        type="text"
		onKeyDown={(e) => e.key === "Enter" && handleRoomSettingChange()}
		
      />
	  <ModalInputUI
        placeholder="Yeni parola giriniz"
        label="Parola"
        ref={groupPasswordRef}
        type="password"
		onKeyDown={(e) => e.key === "Enter" && handleRoomSettingChange()}
      />
      <Flex gap={4} align="center">
        <TextUI text="Limit" fontWeight="medium" textStyle="md" />
        <NumberInputUI icon={<HiOutlineUsers />}
          onKeyDown={(e) => e.key === "Enter" && handleRoomSettingChange()}
          value={info?.limit || 10} min={0} ref={groupLimitRef} 
		/>
      </Flex>
    </ModalUI>
  );
  
  const MessageList = React.memo(({ messages, socketId }) => {
	  return (
		<>
		  {messages.map((msg, i) => {
			const prev = messages[i - 1];

			const sameSender = prev?.from === msg.from;
			const prevTime = new Date(prev?.timestamp || 0);
			const currentTime = new Date(msg.timestamp);

			const sameMinute =
			  prevTime.getHours() === currentTime.getHours() &&
			  prevTime.getMinutes() === currentTime.getMinutes();

			const showMeta = !(sameSender && sameMinute);

			return (
			  <BubbleUI
				key={msg.id || i}
				data={msg}
				isSelf={msg.from === socketId}
				isOwner={msg.role === "owner"}
				showMeta={showMeta}
			  />
			);
		  })}
		</>
	  );
	});
	
	
  function DisconnectButton(){
	 return <Icon 
				onClick={handleLeave}
				size="md" 
				color={{ base: "gray.800", _dark: "gray.300" }} 
				cursor="pointer" 
				aria-label="Odadan Çık" 
				alt="Odadan Çık" 
			>
				<AiOutlineDisconnect />
			</Icon>
  }



  function copyHandle(){
	// const link = window.location.href;
	
    navigator.clipboard.writeText(roomId)
      .then(() => {
        toast.success("Link kopyalandı!", { duration: 1000, id: "copy-link" });
		// setCopyLinkShower(true)
		// setTimeout(() => setCopyLinkShower(false), 2000)
      })
      .catch(() => {
        toast.error("Kopyalama başarısız.", { duration: 1000, id: "copy-link" });
    })
  }
  
  return (
    <Box p={0}>
      <Flex direction={{ base: "column", md: "row" }} height="100vh" overflow="hidden">
        {!isMobile && (
          <Flex direction="column" width="290px" borderRight={{ base: "1px solid #e4e4e7", _dark: "1px solid #27272a" }}  flexShrink={0}>
            <Box 
				borderBottom={{ base: "1px solid #e4e4e7", _dark: "1px solid #27272a" }} 
				p="18px"
			>
              <Flex gap={4} justify="space-between">
                <Darkmode size="md" />
				<DisconnectButton />
                {isOwner && <GroupSettings />}
              </Flex>
            </Box>
            <Box flex="1" p={4} overflowY="auto">
              <TextUI text="Kullanıcılar" fontWeight="medium" textStyle="md" mb={4} />
              <Members data={users} roomId={roomId} isOwner={isOwner} currentUserId={currentUserId} />
            </Box>
          </Flex>
        )}

        <Flex direction="column" flex="1" height={{ base: "auto", md: "97vh" }}>
          <Box borderBottom={{ base: "1px solid #e4e4e7", _dark: "1px solid #27272a" }} p={4} >
            <Flex justify={isMobile ? "space-around" : "normal"}>
			<Box display="flex">
				<Icon size="lg"><RiGroup2Fill /></Icon>
				<TextUI 
					ml={2}
					mr={1}
					text={`${info?.name || roomId}`}
					onClick={copyHandle}
					cursor="pointer"
					fontWeight="bold" 
					isTruncated 
					
				/>
				{/*<Icon size="sm" mt={1}
					onClick={copyHandle}
					cursor="pointer"
				>
				{copyLinkShower ? <LuCopyCheck /> : <LuCopy />}
				</Icon>
				*/}
			</Box>
			{isMobile && (
                <Box display="flex" gap={4} mt={1}>
                  <DrawerUI title="Katılımcılar" content={ 
						<Icon 
						  size="md" 
						  color={{ base: "gray.800", _dark: "gray.300" }} 
						  cursor="pointer"
						  aria-label="Katılımcılar"
						  alt="Katılımcılar"
						>
						  <FaUsers />
						</Icon>
		}>
                    <Members data={users} roomId={roomId} isOwner={isOwner} currentUserId={currentUserId} />
                  </DrawerUI>
				  {isOwner && <GroupSettings />}
				  <DisconnectButton />
				  <Darkmode size="md" />
                </Box>
              )}
            </Flex>
          </Box>

          <Box flex="1" position="relative" overflow="hidden">
            <Box position="absolute" top="0" left="0" right="0" bottom="80px" overflowY="auto" pt={5} px={5}>
               <MessageList messages={messages} socketId={socket.id} />
			   <div ref={scrollRef} />
            </Box>

            <Box position="absolute" bottom="0" left="0" right="0" pt={5} px={4} pb={{ base: 4, md: 1 }}>
              <InputUI
                placeholder="Mesaj gönder"
                size="lg"
                borderRadius={15}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                endElement={
                  <Flex align="center" gap={3} mr={2}>
                    <EmojiPicker
                      theme="dark"
                      onEmojiSelect={(emoji) => setInput((prev) => prev + emoji)}
                    />
                    <Icon 
                      size="md" 
                      cursor="pointer" 
                      aria-label="Mesaj Gönder"
                      alt="Mesaj Gönder"
                      onClick={sendMessage}
                    >
                      <FiSend />
                    </Icon>
                  </Flex>
                }
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
