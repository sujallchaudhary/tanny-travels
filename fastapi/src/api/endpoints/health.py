from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def read_root():
    return {"message": "Alive and Well"}

@router.get("/health")
def health_check():
    return {"status": "ok"}