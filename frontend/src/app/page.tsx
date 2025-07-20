import { Button, HStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold">Welcome to Movie API</h1>
      <p className="mt-4">Explore the world of movies with our API.</p>
      <HStack>
        <Button colorPalette="green">Click me</Button>
      </HStack>
    </main>
  );
}
