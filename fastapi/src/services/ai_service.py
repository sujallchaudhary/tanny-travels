from langchain_openai import ChatOpenAI
from src.schemas.travel import TravelRequest, Attraction, UserSuggestionRequest
from src.core.settings import get_settings
import json


class AIService:
    def __init__(self):
        settings = get_settings()
        self.llm = ChatOpenAI(
            temperature=0.7,
            model_name="gpt-4",
            api_key=settings.OPENAI_API_KEY
        )

    async def generate_itinerary(self, request: TravelRequest, attractions: list[Attraction]):
        attractions_list = "\n".join(
            [
                f"- {attr.name}: {attr.shortDescription} (Price: {attr.price} {attr.currency}, Redirect Link: {attr.link if attr.link else 'null'})"
                for attr in attractions]
        )

        prompt = f"""
        Plan a {request.travel_days}-day {request.travel_style} trip from {request.origin} to {request.destination} by {request.means_of_transport}.

        Include these attractions:
        {attractions_list}
        
        Give atleast 3 activities and atmost 5 activities per day. Decide this yourself if a person can practically do those activities with complete enjoyment in a day or not.
        Keep the user engaged throughout the day with activities. For each day, provide:
        - Time
        - Activity Name
        - Activity Description (Enhance the provided descriptions to be engaging and concise, but don't lose information)
        - Redirect Link (Only use the provided links from the input; if no link is available, set it to 'null')

        Format the response only and only in JSON.
        """

        response = self.llm.predict(prompt)
        try:
            response_json = json.loads(response)
        except json.JSONDecodeError:
            raise ValueError("Failed to parse AI response to JSON.")

        return response_json

        return response_json

    async def update_itinerary(self, request: UserSuggestionRequest):
        attractions_list = "\n".join(
            [f"- {attr.name}: {attr.shortDescription}" for attr in request.attractions]
        )

        itinerary_summary = "\n".join(
            [f"Day {idx + 1}: {activity.activity_name} at {activity.time}" for idx, activity in
             enumerate(request.existing_itinerary)]
        )

        prompt = f"""
        The user has planned a {request.travel_days}-day {request.travel_style} trip from {request.origin} to {request.destination} by {request.means_of_transport}. Below is their existing itinerary:

        {itinerary_summary}

        The user would like suggestions for improving their itinerary. Take into account the following attractions:
        {attractions_list}

        Give atleast 3 activities and atmost 5 activities per day. Decide this yourself if a person can practically do those activities with complete enjoyment in a day or not.
        Keep the user engaged and offer suggestions to improve their itinerary. For each day, provide:
        - Time
        - Activity Name
        - Activity Description (if the provided description is incomplete, enhance it to make it more concise, keep it one-liner)
        - Redirect Link (if available, if not then provide null)

        Format the response only and only in JSON.
        """

        response = self.llm.predict(prompt)
        try:
            response_json = json.loads(response)
        except json.JSONDecodeError:
            raise ValueError("Failed to parse AI response to JSON.")

        return response_json
