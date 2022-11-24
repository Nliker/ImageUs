from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine
from model import ImageDao
from service import ImageService
from view import image_router

from flask_restx import Api

class Services:
    pass

def create_app(test_config=None):
    app=Flask(__name__)

    CORS(app)
    
    api = Api(app, title='API 문서', description='Swagger 문서', doc="/api-docs")

    if test_config is None:
        app.config.from_pyfile("config.py")
    else:
        app.config.update(test_config)
        
    database=create_engine(app.config['DB_URL'],encoding='utf-8',max_overflow=0)

    print("데이터베이스 연결 성공")

    @app.route("/ping",methods=["GET"])
    def ping():
        return "pong",200
    
    image_dao=ImageDao(database)

    services=Services

    services.image_service=ImageService(image_dao,app.config)

    image_router(api,services)
    
    return app