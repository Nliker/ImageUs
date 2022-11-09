from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine
from model import UserDao,ImageDao,RoomDao
from service import UserService,ImageService,RoomService
from view import user_router,image_router,room_router

class Services:
    pass

def create_app(test_config=None):
    app=Flask(__name__)

    CORS(app)

    if test_config is None:
        app.config.from_pyfile("config.py")
    else:
        app.config.update(test_config)
        
    database=create_engine(app.config['DB_URL'],encoding='utf-8',max_overflow=0)

    print("데이터베이스 연결 성공")

    @app.route("/ping",methods=["GET"])
    def ping():
        return "pong",200
    
    user_dao=UserDao(database)
    image_dao=ImageDao(database)
    room_dao=RoomDao(database)
    
    services=Services

    services.user_service=UserService(user_dao,app.config)
    services.image_service=ImageService(image_dao,app.config)
    services.room_service=RoomService(room_dao,app.config)

    user_router(app,services)
    image_router(app,services)
    room_router(app,services)
    
    return app