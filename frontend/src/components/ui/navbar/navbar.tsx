import { Box, Container, Stack, Flex } from "@chakra-ui/react";
import { CreateMovieDialog } from "./create-movie-modal";

export function Navbar() {
  return (
    <Box
      as="nav"
      bg="gray.800"
      color="white"
      py={4}
      position="relative" // Ayuda con el posicionamiento del diálogo
      zIndex="docked"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between">
          <Stack direction="row" align="center">
            {/* Add your navigation items here */}
            <Box>Home</Box>
            <Box>About</Box>
            <Box>Contact</Box>
          </Stack>
          <Stack direction="row">
            <CreateMovieDialog />
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}
