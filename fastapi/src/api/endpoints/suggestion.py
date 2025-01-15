from fastapi import APIRouter, HTTPException
from src.schemas.travel import UserSuggestionRequest
from src.services.ai_service import AIService

router = APIRouter()
ai_service = AIService()

@router.post("/suggest-itinerary")
async def suggest_itinerary(request: UserSuggestionRequest):
    try:
        updated_itinerary = await ai_service.update_itinerary(request)
        return {"updated_itinerary": updated_itinerary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
