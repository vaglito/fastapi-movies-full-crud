import {
  Button,
  Text,
  Heading,
  RatingGroup,
  Stack,
  Image,
  Skeleton,
  HStack,
  Badge,
} from "@chakra-ui/react";

export function BillboardCard({
  movies,
}: {
  movies: Array<{
    id: number;
    title: string;
    overview: string;
    year: number;
    rating: number;
    genre: string;
    image: string | null;
  }>;
}) {
  return (
    <Stack direction="row">
      {movies.map((movie) => (
        <Stack key={movie.id} borderWidth="1px" borderRadius="lg" padding={4}>
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
            <Badge size="lg">{movie.genre}</Badge>
          </HStack>
          <Button colorScheme="teal">View Details</Button>
        </Stack>
      ))}
    </Stack>
  );
}
