"use client"
import {
  Badge,
  Button,
  Heading,
  HStack,
  Image,
  RatingGroup,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  year: number;
  rating: number;
  genre: string;
  image: string | null;
};

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {

    const handleRemove = async () => {
    const response = await fetch('')
    // Implement the logic to remove the movie here
    }
  return (
    <Stack borderWidth="1px" borderRadius="lg" padding={4} maxW="232px">
      {movie.image ? (
        <Image
          src={movie.image}
          alt={movie.title}
          htmlHeight="300"
          htmlWidth="200"
          objectFit="cover"
          borderRadius="md"
        />
      ) : (
        <Skeleton height="300px" width="200px" borderRadius="md" />
      )}
      <Heading size="md">
        {movie.title} ({movie.year})
      </Heading>
      <Text>{movie.overview}</Text>
      <RatingGroup.Root
        readOnly
        count={10}
        defaultValue={movie.rating}
        size="md"
        colorPalette="yellow"
      >
        <RatingGroup.HiddenInput />
        <RatingGroup.Control />
      </RatingGroup.Root>
      <HStack>
        <Badge>{movie.genre}</Badge>
      </HStack>
      <Button colorPalette="red" variant="outline" onClick={handleRemove}>
        Remove movie
      </Button>
    </Stack>
  );
}