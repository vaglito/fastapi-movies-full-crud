import { Stack, Heading, Text } from "@chakra-ui/react";
import { BillboardCard } from "@/components/ui/billboard/billboard-card";
import { fetchMovies } from "@/app/lib/movie";

export async function Billboard() {
  const movies = await fetchMovies();

  return (
    <Stack>
      <Heading size="2xl">Nuevas Peliculas</Heading>
      <Text>Descubre las ultimas adiciones a nuestra cartelera.</Text>

      <Stack>
        {movies.detail ? <Text>{movies.detail}</Text> : <BillboardCard movies={movies} />}
      </Stack>
    </Stack>
  );
}
