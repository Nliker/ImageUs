from flask import request,jsonify
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

def user_router(app,services):
    user_service=services.user_service
    
    #회원가입을 합니다.
    @app.route("/sign-up",methods=["POST"])
    def sign_up():
    
    #id가 user_id인 유저의 정보를 불러옵니다.
    @app.route("/user/<int:user_id>",methods=["GET"])
    def user(user_id):
    
    #로그인을 합니다.
    @app.route("/login",methods=["POST"])
    def login():

    @app.route("/user/<int:user_id>/imagelist",methods=["GET"])
    def user_imagelist(user_id):
    
    
    #id가 user_id인 유저의 친구를 생성합니다.
    @app.route("/user/<int:user_id>/friend",methods=["POST"])
    def user_friend(user_id):
        
    #id가 user_id인 유저의 친구 리스트를 불러옵니다.
    @app.route("/user/<int:user_id>/friendlist",methods=["GET"])
    def user_friendlist(user_id):
    
    #id가 user_id인 유저의 친구를 삭제합니다.
    @app.route("/user/<int:user_id>/friend",methods=["DELETE"])
    def user_friend(user_id):
        
    
    #id가 user_id인 유저의 방 리스트를 불러옵니다.
    @app.route("/user/<int:user_id>/roomlist",methods=["GET"])
    def user_roomlist(user_id):
    
    #id가 user_id인 유저의 id가 room_id인 방을 삭제 합니다.(방 나가기)
    @app.route("/user/<int:user_id>/room/<int:room_id>",methods=["DELETE"])
    def user_roomlist(user_id):