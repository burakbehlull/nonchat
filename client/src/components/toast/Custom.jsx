function CustomToastDesignChakra({ message, icon, t }) {
  return (
    <Box
      bg="white.500"
      color="white"
      p={3}
      borderRadius="md"
      shadow="md"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="300px"
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

function showCustomToast(message, icon = "✅"){
	toast.custom((t) => (
		<CustomToastDesignChakra t={t} icon={icon} message={message} {...props} />
	), {
		duration: 3000, ...props
	});
};
