import { Avatar, HStack, Stack, Text, Badge, Box } from "@chakra-ui/react";
import NoneUser from '@assets/none-user.jpg';
import { HiAtSymbol, TbCrown } from "@icons"
import React from "react"

const Bubble = React.memo(({ data, isSelf, isOwner }) => {
	
  return (
    <Stack gap="6" pt={4}>
      <HStack key={data?.id} gap="4" alignItems="flex-start">
        <Avatar.Root size="xl">
          <Avatar.Fallback name={data.name} />
          <Avatar.Image src={NoneUser} />
        </Avatar.Root>
        
        <Stack gap="0" flex="1">
          <HStack>
            <Text fontWeight="medium">{data.name}</Text>
			<Text fontSize={12}>{new Date(data.timestamp).toLocaleTimeString()}</Text>
            <Badge 
              variant="solid" 
              colorPalette={data.role=="owner" ? "yellow" : "green"}
              ml={1}
            >
              {data.role=="owner" ? <TbCrown /> : <HiAtSymbol />}
              {data.role=="owner" ? "Owner" : "Member"}
            </Badge>
          </HStack>
          <Text textStyle="sm" fontWeight={isSelf ? "600" : "400" }>
            {data?.content}
          </Text>
        </Stack>
      </HStack>
    </Stack>
  )
})

export default Bubble;