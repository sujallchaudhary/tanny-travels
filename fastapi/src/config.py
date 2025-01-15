from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Tanny Travels API"
    OPENAI_API_KEY: str
    RAPIDAPI_KEY: str
    app_env: str
    debug: bool
    host: str
    port: int
    reload: bool

    class Config:
        env_file = ".env"
        extra = "allow"


settings = Settings()