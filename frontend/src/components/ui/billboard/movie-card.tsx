"use client";
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
import { useRouter } from "next/navigation";
import { toaster, Toaster } from "@/components/ui/toaster";
import { fetchDeleteMovie } from "@/app/lib/movie";

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
  const router = useRouter();

  const handleRemove = async () => {
    try {
      const res = await fetchDeleteMovie(movie.id);

      if (!res.ok) {
        toaster.error({
          title: "Error al eliminar",
          description: "No se pudo eliminar la película.",
        });
        return;
      }

      toaster.success({
        title: "Película eliminada",
        description: "La película fue eliminada correctamente.",
      });

      router.refresh();
    } catch (error) {
      toaster.error({
        title: "Error del servidor",
        description: "Intenta nuevamente más tarde.",
      });
    }
  };
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
      <Button colorPalette="red" variant="outline" onClick={handleRemove}>Remove movie</Button>
      <Toaster />
    </Stack>
  );
}
