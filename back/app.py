from flask import Flask,make_response,render_template,request,abort
from flask_cors import CORS
from sqlalchemy import create_engine
from model import UserDao,ImageDao,RoomDao
from service import UserService,ImageService,RoomService
from view import user_router,image_router,room_router
from flask_restx import Api,Resource
from elasticsearch import Elasticsearch
import os

class Services:
    pass
good_ip_list=['127.0.0.1','49.143.162.147']

def create_app(test_config=None):
    
    app=Flask(__name__)

    CORS(app)
    
    api=Api(app,title='cloudy back-server api docs',doc='/api-docs')

    if test_config is None:
        app.config.from_pyfile("config.py")
    else:
        app.config.update(test_config)
        
    database=create_engine(app.config['DB_URL'],encoding='utf-8',max_overflow=0)
    print("mysql 데이터베이스 연결 성공")
    es=Elasticsearch(hosts=app.config['ELASTIC_URL'])
    print("elastic 데이터베이스 연결 성공")

    @app.before_request
    def block_method():
        ip=request.environ.get('REMOTE_ADDR')
        print("Current IP Address:",ip,flush=True)
        print("Current Process:",os.getpid(),flush=True)
        if ip not in good_ip_list:
            abort(403)
            
    @api.route("/search")
    class search_user(Resource):
        def get(self):
            headers = {'Content-Type': 'text/html'}
            return make_response(render_template('index.html'),200,
                                              headers)
    
    @api.route("/ping")
    class ping(Resource):
        def get(self):
            '''back 작동 테스트를 위한 api입니다.'''
            return make_response("pong",200)
    
    user_dao=UserDao(database)
    image_dao=ImageDao(database)
    room_dao=RoomDao(database)
    
    services=Services

    services.user_service=UserService(user_dao,app.config)
    services.image_service=ImageService(image_dao,app.config)
    services.room_service=RoomService(room_dao,app.config)

    user_router(app,api,services,app.config,es)
    room_router(api,services)
    image_router(api,services)
    
    return app
app=create_app()
    
    