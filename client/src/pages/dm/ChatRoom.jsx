import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Box, Flex, useBreakpointValue, Icon } from "@chakra-ui/react";
import { InputUI, BubbleUI, Members, DrawerUI, ModalInputUI, ModalUI, NumberInputUI, TextUI } from "@ui";
import { FaUsersGear, FaUsers, HiOutlineUsers, FiSend } from "@icons";
import { Darkmode } from "@components";
import { useSocket } from "@services";
import toast from "react-hot-toast";

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
		  toast.error(res.message || "Oda bulunamadı");
		  return navigate("/");
		}

		setInfo(res);
		setIsOwner(res.isOwner);
		setCurrentUserId(socket.id);

		socket.emit("joinRoom", { roomId, password }, (joinRes) => {
		  if (!joinRes.success) {
			toast.error(joinRes.message || "Odaya katılamadın");
			return navigate("/");
		  }

		  setJoinedRoom(true);
		  if(res.isOwner){
			toast.success("Oda oluşturuldu!");
		  } else {
			toast.success("Odaya katıldın!"); 
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
		toast.error("Bu odadan banlandınız!");
		navigate("/")
	  });

	  return () => socket.off("bannedFromRoom");
  }, [socket]);


  const sendMessage = () => {
	  if (!input.trim()) return;
	  socket.emit("sendMessage", { roomId, message: input }, (res) => {
		if (res?.success) {
		  setInput("");
		} else {
		  toast.error("Mesaj gönderilemedi");
		}
	  });
  };
  
  const handleRoomSettingChange = ()=>{
	  const newName = groupTitleRef.current.value
	  if(newName.length > 12){
		toast.error("Sadece 12 harf")
		return
	  }
	  const newLimit = Number(groupLimitRef.current.value)
	  socket.emit("updateRoom", { roomId, name: newName, limit: newLimit,}, (res) => {
		if (res.success) {
		  toast.success("Oda ayarları güncellendi!");
		  setInfo(res.room);
		} else {
		  toast.error(res.message || "Güncelleme başarısız!");
		}
	  });
  }

  const GroupSettings = () => (
    <ModalUI
      modalTitle="Oda Ayarları"
      content={
        <Icon size="md" color="gray.800" cursor="pointer">
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
      <Flex gap={4} align="center">
        <TextUI text="Limit" fontWeight="medium" textStyle="md" />
        <NumberInputUI icon={<HiOutlineUsers />}
		onKeyDown={(e) => e.key === "Enter" && handleRoomSettingChange()}
		value={info?.limit || 10} min={0} ref={groupLimitRef} />
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


  return (
    <Box p={0}>
      <Flex direction={{ base: "column", md: "row" }} height="100vh" overflow="hidden">
        {!isMobile && (
          <Flex direction="column" width="290px" borderRight="1px solid #e4e4e7" flexShrink={0}>
            <Box borderBottom="1px solid #e4e4e7" p="18px">
              <Flex gap={4} justify="space-between">
                <Darkmode size="md" />
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
          <Box borderBottom="1px solid #e4e4e7" p={4} >
            <Flex justify={isMobile ? "space-around" : "normal"}>
              <TextUI text={info?.name || roomId || "Oda"} isTruncated />
              {isMobile && (
                <Box display="flex" gap={4} mt={1}>
                  <DrawerUI title="Katılımcılar" content={<Icon as={FaUsers} />}>
                    <Members data={users} isOwner={isOwner} currentUserId={currentUserId} />
                  </DrawerUI>
				  {isOwner && <GroupSettings />}
					  
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
                  <Icon size="md" cursor="pointer" onClick={sendMessage}>
                    <FiSend />
                  </Icon>
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
