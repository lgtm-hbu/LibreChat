# routes/ingest.py
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from file_service_py.middlewares.authentication import api_key_auth
import httpx

router = APIRouter()

@router.get("/ping")
async def ping(api_key: str = Depends(api_key_auth)):
    return {"message": "Ping successful"}

@router.post("/file")
async def ask(file: UploadFile = File(...), api_key: str = Depends(api_key_auth)):
    try:
        async with httpx.AsyncClient() as client:
            files = {'files': (file.filename, await file.read(), file.content_type)}

            response = await client.post('http://localhost:8000/general/v0/general', files=files)
            print(response.json())
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

