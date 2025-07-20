from typing import List
from app.schemas.movie import Movie, MovieCreate


class MovieRepository:
    def __init__(self):
        self.movies = List[Movie]= []

    def get_all(self) -> List[Movie]:
        return self.movies
    
    def get_by_id(self, movie_id: int) -> Movie | None:
        for item in self.movies:
            if item.id == movie_id:
                return item
        return None
    
    def get_by_genre(self, genre: str) -> List[Movie]:
        return [m for m in self.movies if m.genero.lower() == genre.lower()]
    
    def create(self, movie: MovieCreate) -> Movie:
        new_id = len(self.movies) + 1
        new_movie = Movie(id=new_id, **movie.model_dump())
        self.movies.append(new_movie)
        return new_movie
    
    def update(self, movie_id: int, movie: Movie) -> Movie:
        for index, movie in enumerate(self.movies):
            if movie.id == movie_id:
                movie.id = movie_id
                self.movies[index] = movie
                return movie
        raise ValueError("Movie Not found")
    