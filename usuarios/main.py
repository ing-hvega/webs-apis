import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from src.infrastructure.api.controllers.usuario_controller import router as usuario_router
from src.infrastructure.config.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API de Usuarios",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuario_router)

@app.get("/")
def root():
    return {"message": "Api de Usuarios"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8100, reload=True)
