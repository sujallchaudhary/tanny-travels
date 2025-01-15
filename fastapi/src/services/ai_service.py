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
        print(request, attractions)

        attractions_list = "\n".join(
            [f"- {attr.name}: {attr.shortDescription} (Price: {attr.price} {attr.currency})" for attr in attractions]
        )

        prompt = f"""
        Plan a {request.travel_days}-day {request.travel_style} trip from {request.origin} to {request.destination} by {request.means_of_transport}.

        Include these attractions:
        {attractions_list}

        Keep the user engaged throughout the day with activities. For each day, provide:
        - Time
        - Activity Name
        - Activity Description(Give the complete description of the activity if it's incomplete, in fact enhance the pregiven description but just make it concise, keep it one-liner)
        - Redirect Link (if available, if not then give redirect link as null)

        Format the response only and only in JSON.
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
        Here is the current {request.travel_days}-day itinerary from {request.origin} to {request.destination} by {request.means_of_transport}:

        {itinerary_summary}

        Attractions to consider:
        {attractions_list}

        User's feedback: "{request.user_prompt}"

        Based on the feedback, update the itinerary while keeping the user engaged all day. Provide:
        - Time
        - Activity Name
        - Activity Description
        - Redirect Link (if available, if not then give redirect link as null)

        Format the response in JSON.
        """

        response = self.llm.predict(prompt)
        try:
            response_json = json.loads(response)
        except json.JSONDecodeError:
            raise ValueError("Failed to parse AI response to JSON.")

        return response_json
