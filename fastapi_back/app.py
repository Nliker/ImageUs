import uvicorn
from fastapi import FastAPI
from sqlalchemy import create_engine

from model import UserDao,ImageDao,RoomDao
from service import UserService,ImageService,RoomService
from view import user_router,room_router,image_router
from fastapi.responses import PlainTextResponse
from config import dev_settings,test_settings
import os
class Services:
    pass

def create_app():
    app=FastAPI()

    if os.environ["APP_ENV"]=="test":
        settings=test_settings
        print("테스트환경입니다.")
    else:
        settings=dev_settings
        print("개발환경입니다.")

    print(settings)
    database=create_engine(settings.DB_URL,encoding='utf-8',max_overflow=0)
    print("DB is connected....")
    @app.get("/ping",status_code=200,response_class=PlainTextResponse)
    async def ping():
        return "pong"
        
    print("good")
        
    user_dao=UserDao(database)
    image_dao=ImageDao(database)
    room_dao=RoomDao(database)
        
    services=Services
        
    services.user_service=UserService(user_dao,settings)
    services.image_service=ImageService(image_dao,settings)
    services.room_service=RoomService(room_dao,settings)
        
    user_router(app,services)
    room_router(app,services)
    image_router(app,services)

    return app

app=create_app()

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

