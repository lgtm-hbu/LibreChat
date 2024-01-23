# main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run

from file_service_py.routes.ingest import router as ingest_router
from file_service_py.middlewares.authentication import api_key_auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingest_router, prefix="/ingest", dependencies=[Depends(api_key_auth)])

if __name__ == "__main__":
    run(app, host="0.0.0.0", port=8080)
