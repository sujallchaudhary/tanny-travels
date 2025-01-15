import httpx
from src.core.settings import get_settings


class AttractionService:
    def __init__(self):
        settings = get_settings()
        self.api_key = settings.RAPIDAPI_KEY
        self.base_url = "https://travel-advisor.p.rapidapi.com"

    async def get_attractions(self, destination: str):
        headers = {
            "X-RapidAPI-Key": self.api_key,
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com"
        }
        params = {"location": destination, "currency": "USD", "lang": "en_US"}

        async with httpx.AsyncClient() as client:
            response = await client.get(self.base_url, headers=headers, params=params)
            if response.status_code == 200:
                data = response.json()
                return data.get("data", [])
            else:
                return []