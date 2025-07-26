from app.routers.movies import router as movie_router
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],            # Permitir estos orígenes
    allow_credentials=True,           # Permitir cookies/autenticación
    allow_methods=["*"],              # Permitir todos los métodos (GET, POST, etc)
    allow_headers=["*"],              # Permitir todos los headers
)

@app.get("/", tags=["Home"])
def home():
    return "Hola universo!"


@app.get("/hello/{name}", tags=["Home"])
def greeting(name):
    response = {"message": f"Hello {name}"}
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movie_router)
