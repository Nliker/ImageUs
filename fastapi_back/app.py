from fastapi import FastAPI
from sqlalchemy import create_engine

from model import UserDao,ImageDao,RoomDao
from service import UserService,ImageService,RoomService
from view import user_router,room_router,image_router
from fastapi.responses import PlainTextResponse
from config import dev_settings,test_settings
import os
import aiomysql
import asyncio

class Services:
    pass

async def good():
    print("imgood")

def create_app():
    app=FastAPI()

    if os.environ["APP_ENV"]=="test":
        settings=test_settings
        print("테스트환경입니다.")
    else:
        settings=dev_settings
        print("개발환경입니다.")
    
    print(settings)

    @app.on_event("startup")
    async def startup_event():
        print("DB_POOL생성 시작...")
        app.db_pool=await aiomysql.create_pool(host=settings.DB_HOST,
                                            port=settings.DB_PORT,
                                            user=settings.DB_USER,
                                            password=settings.DB_PASSWORD,
                                            db=settings.DB_DATABASE,
                                            autocommit=True,
                                            maxsize=10)
        print("DB_POOL생성 성공!")

        print("model 생성 시작")
        user_dao=UserDao(app.db_pool)
        image_dao=ImageDao(app.db_pool)
        room_dao=RoomDao(app.db_pool)
        print("model 생성 완료")
            
        print("service 생성 시작")
        services=Services
        services.user_service=UserService(user_dao,settings)
        services.image_service=ImageService(image_dao,settings)
        services.room_service=RoomService(room_dao,settings)
        user_router.services=services
        print("service  생성 완료")
        
        app.include_router(user_router,prefix='/user',tags=['user'])


    # database=create_engine(settings.DB_URL,encoding='utf-8',max_overflow=0)
    # print("DB is connected....")
    @app.get("/ping",status_code=200,response_class=PlainTextResponse)
    async def ping():
        return "pong"
    
    # user_dao=UserDao(app.db_pool)
    # image_dao=ImageDao(app.db_pool)
    # room_dao=RoomDao(app.db_pool)
        
    # services=Services
        
    # services.user_service=UserService(user_dao,settings)
    # services.image_service=ImageService(image_dao,settings)
    # services.room_service=RoomService(room_dao,settings)
        
        
    # app.include_router(user_router,prefix='/user',tags=['user'])
    # user_router(app,services)
    # room_router(app,services)
    # image_router(app,services)

    @app.on_event("shutdown")
    async def shutdown_event():
        print("DB is closing")
        app.db_pool.close()
        await app.db_pool.wait_closed()
        print("DB is closed")
        print("Good Bye")
    return app

app=create_app()