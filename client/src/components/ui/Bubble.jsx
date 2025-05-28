import { Avatar, HStack, Stack, Text } from "@chakra-ui/react"
import NoneUser from '@assets/none-user.jpg'

const Bubble = ({data}) => {
  return (
    <Stack gap="6">
      {data?.map((user) => (
        <HStack key={user?.id} gap="4">
          <Avatar.Root size="xl">
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={NoneUser} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="medium">{user.name}</Text>
            <Text textStyle="sm">
              {user?.content}
            </Text>
          </Stack>
        </HStack>
      ))}
    </Stack>
  )
}
export default Bubble


