from flask import request,jsonify
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

def room_router(app,services):
    room_services=services.room_service

    #room을 생성합니다.
    @app.route("/room",methods=["POST"])
    def room():
    
    #id가 room_id인 room의 이미지 리스트를 불러옵니다.
    @app.route("/room/<int:room_id>/imagelist",methods=["GET"])
    def room_imagelist(room_id):
    
    
    #id가 room_id인 room의 유저 리스트를 불러옵니다.
    @app.route("/room/<int:room_id>/userlist",methods=["GET"]) 
    def room_userlist(room_id):
    
    #id가 room_id인 room의 id가 user_id인 유저를 강퇴합니다.
    @app.route("/room/<int:room_id>/user/<int:user_id>",methods=["delete"]) 
    def room_user(room_id,user_id):
    
    #id가 room_id인 room의 id가 user_id인 유저를 초대합니다.
    @app.route("/room/<int:room_id>/user/<int:user_id>",methods=["post"]) 
    def room_user(room_id,user_id):