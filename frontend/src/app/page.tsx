import { BillboardContainer } from "@/components/billboard-container";
import { Container } from "@chakra-ui/react";
import { Button, Stack, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container>
      <Heading as="h1" size="3xl">
        Bienvenido a Cine Movie
      </Heading>
      <Stack>
        <BillboardContainer />
      </Stack>
    </Container>
  );
}
