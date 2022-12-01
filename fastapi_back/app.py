import uvicorn
from fastapi import FastAPI
from sqlalchemy import create_engine
from fastapi.responses import JSONResponse
from config import Settings
from functools import lru_cache

from model import UserDao,ImageDao,RoomDao
from service import UserService,ImageService,RoomService
from view import user_router,image_router,room_router

class Services:
    pass

def create_app(test_config=None):
    app=FastAPI()
    
    @lru_cache()
    def get_settings():
        return Settings()
    
    
    if test_config is None:
        settings: Settings=get_settings()
    else:
        settings: Settings=get_settings(test_config)

    database=create_engine(settings.DB_URL,encoding='utf-8',max_overflow=0)
    print("DB is connected....")

    @app.get("/ping",status_code=200)
    async def ping():
        return "pong"
    
    user_dao=UserDao(database)
    image_dao=ImageDao(database)
    room_dao=RoomDao(database)
    
    services=Services
    
    services.user_service=UserService(user_dao,settings)
    services.image_service=ImageService(image_dao,settings)
    services.room_service=RoomService(room_dao,app,settings)
    
    user_router(app,services)
    # room_router(app,services)
    # image_router(app,services)
    
    return app

app=create_app()

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

