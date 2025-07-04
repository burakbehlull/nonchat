import { Avatar, HStack, Stack, Text, Badge, Box } from "@chakra-ui/react";
import NoneUser from '@assets/none-user.jpg';
import { HiAtSymbol, TbCrown } from "@icons"
import React from "react"

const Bubble = React.memo(({ data, isSelf, isOwner, showMeta }) => {
  return (
    <Stack gap="1" pt={showMeta ? 4 : 0}>
		<HStack key={data?.id} gap="4" alignItems="flex-start">
		  {showMeta ? (
			<Avatar.Root size="xl">
			  <Avatar.Fallback name={data.name} />
			  <Avatar.Image src={NoneUser} />
			</Avatar.Root>
		  ) : (
			<Box w="48px" h="28px" flexShrink={0} />
		  )}

		  <Stack gap="0" flex="1">
			{showMeta && (
			  <HStack>
				<Text fontWeight="medium">{data.name}</Text>
				<Text fontSize={12}>
				  {new Date(data.timestamp).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				  })}
				</Text>
				<Badge
				  variant="solid"
				  colorPalette={data.role == "owner" ? "yellow" : "green"}
				  ml={1}
				>
				  {data.role == "owner" ? <TbCrown /> : <HiAtSymbol />}
				  {data.role == "owner" ? "Owner" : "Member"}
				</Badge>
			  </HStack>
			)}

			<Text
			  textStyle="sm"
			  fontWeight={isSelf ? "600" : "400"}
			  whiteSpace="pre-line"
			>
			  {data?.content}
			</Text>
		  </Stack>
		</HStack>
    </Stack>
  );
});


export default Bubble;