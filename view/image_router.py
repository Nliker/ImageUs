from flask import request,jsonify
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

def image_router(app,services):
    image_service=services.image_service

    #새로운 사진을 게시합니다.
    @app.route("/image",methods=["POST"])
    def image():
    
    #id가 image_id 인 사진의 정보를 불러옵니다.
    @app.route("/image/<int:image_id>",methods=["GET"])
    def image(image_id):
    
    
    #id가 image_id 인 사진의 방 리스트를 불러옵니다.
    @app.route("/image/<int:image_id>/roomlist",methods=["GET"])
    def image_roomlist(image_id):
        
    #id가 image_id 인 사진의 방 리스트를 수정합니다.
    @app.route("/image/<int:image_id>/roomlist",methods=["POST"])
    def image_roomlist(image_id):