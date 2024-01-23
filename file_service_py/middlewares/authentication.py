# middlewares/authentication.py
from fastapi import Request, Depends, HTTPException
from fastapi.security import APIKeyHeader

API_KEY_NAME = "api_key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

MASTER_API_KEY = "your_master_api_key_here"

async def api_key_auth(request: Request, api_key: str = Depends(api_key_header)):
    if api_key != MASTER_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return api_key
