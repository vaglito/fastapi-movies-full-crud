"use client";
import { Stack } from "@chakra-ui/react";
import { Movie, MovieCard } from "./movie-card";

export function Billboard({ movies }: { movies: Movie[] }) {
  return (
    <Stack direction="row" overflowX="auto" paddingY={4}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Stack>
  );
}
