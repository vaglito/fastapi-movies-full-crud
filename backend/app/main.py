from app.routers.movies import router as movie_router

from fastapi import FastAPI

app = FastAPI()


@app.get("/", tags=["Home"])
def home():
    return "Hola universo!"


@app.get("/hello/{name}", tags=["Home"])
def greeting(name):
    response = {"message": f"Hello {name}"}
    return response


app.include_router(movie_router)
