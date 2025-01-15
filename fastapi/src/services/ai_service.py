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
        Plan a detailed {request.travel_days}-day {request.travel_style} trip from {request.origin} to {request.destination} by {request.means_of_transport}.

        Include these attractions:
        {attractions_list}
        
        Guidelines:
        - Provide a complete itinerary covering EVERY DAY of the trip. Do not skip any day.
        - Suggest AT LEAST 3 and AT MOST 5 activities per day. Ensure these activities are realistic and enjoyable.
        - Assign SPECIFIC visit times in 12-HOUR CLOCK FORMAT (e.g., 9:00 AM, 3:00 PM) for each activity.
        
        For each day, provide:
        - Time: Exact time in 12-hour format (e.g., 10:00 AM)
        - Activity Name: Clear and engaging activity title
        - Activity Description: Concise and exciting details (Enhance the provided descriptions and don't lose information, complete if existing description is incomplete)
        - Redirect Link: Use the provided links only. If no link is available, set it to 'null'.

        Respond ONLY in valid JSON format.
        """

        response = self.llm.predict(prompt)
        try:
            response_json = json.loads(response)
        except json.JSONDecodeError:
            raise ValueError("Failed to parse AI response to JSON.")

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

        The user wants to improve this itinerary. Consider the following attractions:
        {attractions_list}

        Guidelines:
        - Ensure the itinerary covers ALL {request.travel_days} DAYS of the trip. Do not skip any days.
        - Suggest 3 TO 5 practical and enjoyable activities per day.
        - Provide SPECIFIC visit times in 12-HOUR CLOCK FORMAT (e.g., 9:00 AM, 2:30 PM) for each activity.
        
        For each day, provide:
        - Time: Exact time in 12-hour format (e.g., 10:00 AM)
        - Activity Name: Clear and engaging activity title
        - Activity Description: Concise and exciting details (Enhance the provided descriptions and don't lose information, complete if existing description is incomplete)
        - Redirect Link: Use the provided links only. If no link is available, set it to 'null'.

        Respond ONLY in valid JSON format.
        """

        response = self.llm.predict(prompt)
        try:
            response_json = json.loads(response)
        except json.JSONDecodeError:
            raise ValueError("Failed to parse AI response to JSON.")

        return response_json
