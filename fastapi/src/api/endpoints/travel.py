from fastapi import APIRouter, HTTPException
from src.schemas.travel import TravelRequest
from src.services.ai_service import AIService

router = APIRouter()
ai_service = AIService()

@router.post("/generate-itinerary")
async def generate_itinerary(request: TravelRequest):
    try:
        itinerary = await ai_service.generate_itinerary(request, request.attractions)
        return {"itinerary": itinerary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
