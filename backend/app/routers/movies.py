from app.dependecies import get_movie_repository
from app.repositories.movie_repository import MovieRepository
from app.schemas.movie import Movie, MovieCreate
from starlette.status import HTTP_404_NOT_FOUND

from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()


@router.get("/movies", tags=["movies"])
def movies(repo: MovieRepository = Depends(get_movie_repository)):
    all_movies = repo.get_all()
    if not all_movies:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No hay peliculas registradas.",
        )
    return all_movies


@router.get("/movies/{id}", tags=["movies"])
def get_movie(id: int, repo: MovieRepository = Depends(get_movie_repository)):
    movie = repo.get_by_id(id)
    if not movie:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail="Pelicula no encontrada."
        )
    return movie


@router.get("/movies/", tags=["movies"])
def get_movies_by_genre(
    genero: str, repo: MovieRepository = Depends(get_movie_repository)
):
    filtered = repo.get_by_genre(genero)

    if not filtered:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=f"No se encontró ninguna película del género {genero}.",
        )

    return filtered


@router.post("/movies", status_code=status.HTTP_201_CREATED, tags=["movies"])
def create_movie(
    movie: MovieCreate, repo: MovieRepository = Depends(get_movie_repository)
):
    return repo.create


@router.put("/movies/{id}", tags=["movies"])
def update_movie(
    id: int, movie: Movie, repo: MovieRepository = Depends(get_movie_repository)
):
    if not repo.get_by_id(id):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail="Pelicula no encontrada."
        )
