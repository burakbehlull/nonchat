import { useRef } from "react";

import { Box, Flex, Text, useBreakpointValue, Icon } from "@chakra-ui/react";
import { InputUI, Bubble, Members, DrawerUI, ModalInputUI, ModalUI, NumberInputUI, TextUI } from "@ui";

import { FaUsersGear, FaUsers, HiUsers, HiOutlineUsers } from "@icons";
import { Darkmode } from "@components"

export default function ChatRoom() {
  const isMobile = useBreakpointValue({ base: true, sm: false, md: false, lg: false });
  const ref = useRef(null)
  const users = [
    {
      id: "1",
      name: "John Mason",
      email: "john.mason@example.com",
      avatar: "https://i.pravatar.cc/300?u=iu",
      content: "selam"
    },
    {
      id: "2",
      name: "Melissa Jones",
      email: "melissa.jones@example.com",
      avatar: "https://i.pravatar.cc/300?u=po",
      content: "naber"
    }
  ];
  
  const GroupSettings = ()=> {
	  return (
		<ModalUI 
			modalTitle="Oda Ayarları"
			content={<Icon size="md" color={{ base: "gray.800", _dark: "gray.100" }} cursor="pointer"><FaUsersGear /></Icon>}
			ref={ref}
		>
			<ModalInputUI
				placeholder="Grup Başlığı"
				label="Grup Başlığı"
				ref={ref}
			/>
			<Flex gap={4} align="center">
				<TextUI 
					text="Limit" 
					color="#09090B" 
					fontWeight="medium"
					textStyle="md"
				/>
				<NumberInputUI 
					icon={<Icon size="md" color={{ base: "gray.800", _dark: "gray.100" }} cursor="pointer"><HiOutlineUsers /></Icon>} 
					value={1}
					min={0}
				/>
			</Flex>
		</ModalUI>
	  )
  }

  return (
    <Box p={0}>
	  
      <Flex
        direction={{ base: "column", md: "row" }}
        height="100vh"
        overflow="hidden"
      >
		
			
		{isMobile ?(<></>) : (<Flex
          direction="column"
          width={{ base: "100%", md: "290px" }}
          height={{ base: "auto", md: "100vh" }}
          borderRight={{ base: "none", md: "1px solid #e4e4e7", _dark: "1px solid #18181b" }}
          borderBottom={{ base: "1px solid #e4e4e7", _dark: "1px solid #18181b", md: "none" }}
          flexShrink={0}
		>
          <Box borderBottom={{base: "1px solid #e4e4e7", _dark: "1px solid #18181b"}} p="18px">
			<Flex gap={4} justify="space-between">
				{isMobile ? null : <>
					<Darkmode size="md" />
					<GroupSettings />
				</>}
				
			</Flex>
          </Box>
          <Box flex="1" p={4} overflowY="auto">
            <TextUI text="Kullanıcılar" fontWeight="medium" textStyle="md" mb={4} />
            <Members data={users} />
          </Box>
        </Flex>)}
		

        <Flex
          direction="column"
          flex="1"
          height={{ base: "auto", md: "97vh" }}
        >
          <Box borderBottom={{base: "1px solid #e4e4e7", _dark: "1px solid #18181b"}} p={4}>
			<Flex justify={isMobile ? "space-around" : "normal"}>
				<TextUI text="Lorem ipsum dolor sit amet." isTruncated />
				{isMobile && (
					<Box display="flex" gap={4} mt={1}>
						<DrawerUI title="Katılımcılar" content={<Icon size="md" color={{ base: "gray.800", _dark: "gray.100" }} cursor="pointer"><FaUsers /></Icon>}>
							<Members data={users} />
						</DrawerUI>
						<GroupSettings />
						<Darkmode size="md" />
						
					</Box>
					
					)
				}
		    </Flex>
          </Box>

          <Box flex="1" position="relative" overflow="hidden">
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="80px"
              overflowY="auto"
              pt={5}
			  px={5}
            >
              {Array(40)
                .fill(null)
                .map((_, i) => (
                  <Bubble key={i} data={users} />
                ))}
				
            </Box>

            <Box
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              pt={5}
			  px={4}
			  pb={{
				  base: "4",md:"1", lg: "1"
			  }}
			  
              color={{base: "black", _dark: "white"}}
            >
              <InputUI placeholder="Mesaj gönder" size="lg" borderRadius={15}
				type="text"
				onKeyDown={(e)=> {
					if (e.key === 'Enter') {
					  alert('Enter key was pressed!');
					}
				}}
			  />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
