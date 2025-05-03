import { Box, Text, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {

    const navigate = useNavigate();
    const handleGoBack = () => navigate(-1)
    

    return (
        <Box textAlign="center" mt="10">
            <Text fontSize="3xl" fontWeight="bold">404 - Sayfa Bulunamadı</Text>
            <Text mt={2}>Böyle bir sayfa yok.</Text>
            <Button
                mt={4}
                colorScheme="teal"
                onClick={handleGoBack}
                size="lg"
            >Geri Dön</Button>
        </Box>
    )
}

export default NotFound