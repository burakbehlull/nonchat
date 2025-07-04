import { toast } from "react-hot-toast"
import { Box, Text, IconButton } from "@chakra-ui/react"

function CustomToastDesignChakra({ message, icon, t }) {
  return (
    <Box
      bg="white"
      color="black"
      p={3}
      borderRadius="md"
      shadow="md"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="250px"
	  onClick={() => toast.dismiss(t.id)}
    >
      <Text>{icon} {message}</Text>
      <IconButton
        icon={icon}
        size="sm"
        onClick={() => toast.dismiss(t.id)}
        variant="ghost"
        color="white"
        aria-label="Kapat"
      />
    </Box>
  );
}

export function showToast(message, icon = "✅", duration, id){
	toast.custom((t) => (
		<CustomToastDesignChakra t={t} icon={icon} message={message} />
	), {
		duration: duration ||3000, id
	});
};
