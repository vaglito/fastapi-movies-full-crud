import { Stack, Heading, Text } from "@chakra-ui/react";
import { Billboard } from "./ui/billboard/billboard";
import { fetchMovies } from "@/app/lib/movie";

export async function BillboardContainer() {
  const movies = await fetchMovies();

  return (
    <Stack>
      <Heading size="2xl">Nuevas Peliculas</Heading>
      <Text>Descubre las ultimas adiciones a nuestra cartelera.</Text>

      <Stack>
        {movies.detail ? <Text>{movies.detail}</Text> : <Billboard movies={movies} />}
      </Stack>
    </Stack>
  );
}
