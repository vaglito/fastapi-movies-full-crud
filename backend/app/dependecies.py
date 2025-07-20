from app.repositories.movie_repository import MovieRepository

movie_repo = MovieRepository()

def get_movie_repository():
    return movie_repo