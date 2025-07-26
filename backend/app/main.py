from app.routers.movies import router as movie_router
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Home"])
def home():
    return "Hola universo!"


@app.get("/hello/{name}", tags=["Home"])
def greeting(name):
    response = {"message": f"Hello {name}"}
    return response


app.include_router(movie_router)
