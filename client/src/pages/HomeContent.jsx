import { Box, Button, Center, Heading, Stack, Highlight, Text, useBreakpointValue } from "@chakra-ui/react";
import { HiChatAlt2 } from "react-icons/hi";
import { InputUI } from "@ui";

export default function HomeContent(){
    const isMobile = useBreakpointValue({ base: true, md: false });

    const ButtonCheck = (props) => {
        return (
            <Button 
                size="lg"
                variant="solid"
                bg="#2563eb"
                color="white"
                _hover={{ bg: '#1e40af' }}
                _active={{ bg: '#1e3a8a' }}
                _focus={{ bg: 'outline' }}
                rounded="lg"
                transition="background-color 0.2s ease-in-out"
                shadow="md"
                minWidth="15rem" // Minimum genişlik belirliyoruz
                width={isMobile ? "100%" : "auto"} // Mobilde tam genişlik, masaüstünde otomatik
                {...props}
            >
                <HiChatAlt2 />
                Yeni Oda
            </Button>
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
                            />
                            <ButtonCheck mt={4} />
                        </Stack>
                    ) : (
                        <Box display="flex" gap={4} width="100%" alignItems="center">
                            <ButtonCheck size="lg" /> 
                            <InputUI 
                                placeholder="Kod giriniz" 
                                size="lg" 
                                flex="1"
                            />
                        </Box>
                    )}
                </Stack>
            </Center>
        </>
    )
}