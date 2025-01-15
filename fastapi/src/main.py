from fastapi import FastAPI
from src.api.endpoints import travel, health, suggestion
from src.core.settings import settings

app = FastAPI(title=settings.APP_NAME)

app.include_router(health.router, tags=["health"])
app.include_router(travel.router, prefix="/api/v1", tags=["travel"])
app.include_router(suggestion.router, prefix="/api/v1", tags=["suggestion"])