from pydantic import BaseModel, HttpUrl
from typing import List, Optional

class Attraction(BaseModel):
    id: str
    name: str
    shortDescription: str
    price: float
    currency: str
    photo: HttpUrl
    link: Optional[HttpUrl] = None

class TravelRequest(BaseModel):
    travel_days: int
    origin: str
    destination: str
    means_of_transport: str
    travel_style: str
    attractions: List[Attraction]

class Activity(BaseModel):
    time: str
    activity_name: str
    activity_description: str
    redirect_link: Optional[str] = None

class UserSuggestionRequest(BaseModel):
    travel_days: int
    origin: str
    destination: str
    means_of_transport: str
    travel_style: str
    attractions: List[Attraction]
    existing_itinerary: List[Activity]
    user_prompt: str
