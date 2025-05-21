import { Avatar, HStack, Stack, Text, Badge } from "@chakra-ui/react"
import NoneUser from '@assets/none-user.jpg'
import { HiAtSymbol, HiStar } from "react-icons/hi"

const Members = ({data}) => {
  return (
    <Stack gap="5">
      {data.map((user) => (
        <HStack key={user?.id} gap="3">
          <Avatar.Root size="xl">
            <Avatar.Fallback name={user.name} /> 
            <Avatar.Image src={NoneUser} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="medium">{user.name}
				<Badge variant="solid" colorPalette="green" ml={2}>
					<HiAtSymbol />
					None
				</Badge>
			</Text>
          </Stack>
        </HStack>
      ))}
    </Stack>
  )
}
export default Members


