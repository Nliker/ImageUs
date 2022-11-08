from flask import request,jsonify
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from auth import login_required,g

def user_router(app,services):
    #user_service.get_user_info
    #user_service.create_new_user
    #user_service.login(credential)
    #user_service.generate_access_token(user_credential['id'])
    #user_service.get_user_id_and_password(credential['email'])
    #user_service.is_email_exists(new_user['email'])
    #user_service.is_user_exists(friend_user_id)
    #user_service.create_user_friend(current_user_id,friend_user_id)
    #user_service.get_user_friendlist(current_user_id)
    #user_service.delete_user_friend(current_user_id,friend_user_id)
    user_service=services.user_service
    
    #image_service.get_user_imagelist(current_user_id)
    image_service=services.image_service
    
    #room_service.get_user_roomlist(current_user_id)
    #room_service.is_room_exists(room_id)
    #room_service.delete_user_room(current_user_id,room_id)
    room_service=services.room_services
    
    #회원가입을 합니다.
    #input
    # {
    #     'name':<str>,
    #     'email':<str>,
    #     'password':<str>,
    #     'profile':<str>;
    # }
    #output
    # {
    #     'id':<int>,
    #     'name':<str>,
    #     'email':<str>,
    #     'profile':<str>,
    # }
    @app.route("/sign-up",methods=["POST"])
    def sign_up():
        new_user=request.json
        if user_service.is_email_exists(new_user['email']):
            return '이메일이 이미 존재합니다.',401
        
        new_user_id=user_service.create_new_user(new_user)
        user_info=user_service.get_user_info(new_user_id)
        
        return jsonify({user_info}),200

    #id가 user_id인 유저의 정보를 불러옵니다.
    #output
    # {
    #     'id':<int>,
    #     'name':<str>,
    #     'email':<str>,
    #     'profile':<str>,
    # }
    @app.route("/user/<int:user_id>",methods=["GET"])
    def user(user_id):
        if not user_service.is_user_exists(user_id):
            return '해당 유저가 존재하지 않습니다.',400
        
        user_info=user_service.get_user_info(user_id)
        
        return jsonify({user_info}),200
    
    #로그인을 합니다.
    #input
    # {
    #     'email':<str>,
    #     'password':<str>
    # }
    #output
    # {
    #     'access_token':<str>
    # }
    @app.route("/login",methods=["POST"])
    def login():
        credential=request.json
         
        if not user_service.is_email_exists(credential['email']):
            return '존재하지 않는 이메일 입니다.',400
        
        authorized=user_service.login(credential)
        if authorized:
            user_credential=user_service.get_user_id_and_password(credential['email'])
            access_token=user_service.generate_access_token(user_credential['id'])
            return jsonify({'access_token':access_token})
        
        else:
            return '비밀번호가 일치하지 않습니다.',401

    #id가 user_id인 유저의 이미지리스트를 불러옵니다.
    #input
    #output
    @app.route("/user/<int:user_id>/imagelist",methods=["GET"])
    @login_required
    def user_imagelist(user_id):
        current_user_id=g.user_id
        
        #current_usre_id와 user_id를 따로 받으면 추후 누가 조회 했는지 알 수 있음
        if current_user_id != user_id:
            return '권한이 없습니다.',401
        
        image_list=image_service.get_user_imagelist(current_user_id)

        return jsonify({'imagelist':image_list})
    
    
    #id가 user_id인 유저의 친구를 생성합니다.
    #input
    # {
    #     'friend_user_id':<str>
    # }
    #output
    # '저장성공'
    @app.route("/user/<int:user_id>/friend",methods=["POST"])
    @login_required
    def user_friend(user_id):
        current_user_id=g.user_id
        friend_user_id=request.json['friend_user_id']
        
        if current_user_id != user_id:
            return '권한이 없습니다.',401
        
        if not user_service.is_user_exists(friend_user_id):
            return '해당 유저가 존재하지 않습니다.',400
        
        result=user_service.create_user_friend(current_user_id,friend_user_id)
        if result:
            return '저장성공',200
        else:
            return '이미 친구인 유저입니다.',401

    #id가 user_id인 유저의 친구 리스트를 불러옵니다.
    #input
    #output
    # {
    #     'friendlist':[
    #         {
    #             'id':<int>,
    #             'name':<str>,
    #             'email':<str>,
    #             'profile':<str>
    #         },
    #         {
    #             'id':<int>,
    #             'name':<str>,
    #             'email':<str>,
    #             'profile':<str>
    #         }        
    #     ]
    # }
    @app.route("/user/<int:user_id>/friendlist",methods=["GET"])
    def user_friendlist(user_id):
        current_user_id=g.user_id
        
        if current_user_id != user_id:
            return '권한이 없습니다.',401
        
        friendlist=user_service.get_user_friendlist(current_user_id)
        return jsonify({'friendlist':friendlist}),200
    
    #id가 user_id인 유저의 친구를 삭제합니다.
    #input
    # {
    #     'delete_friend_user_id':<int>
    # }
    #output
    # '삭제성공'
    @app.route("/user/<int:user_id>/friend",methods=["DELETE"])
    def user_friend(user_id):
        current_user_id=g.user_id

        if current_user_id != user_id:
            return '권한이 없습니다.',401
        
        delete_friend_user_id=request.json['delete_friend_user_id']
        if user_service.is_user_exists(delete_friend_user_id):
            user_service.delete_user_friend(current_user_id,delete_friend_user_id)
            return '저장 성공',200
        else:
            return '존재하지 않는 유저입니다.',400
    
    #id가 user_id인 유저의 방 리스트를 불러옵니다.
    #input
    #output
    # {
    #     'roomlist':[
    #         {
    #           'id':<int>,
    #           'title':<str>,
    #           'host_user_id':<int>
    #          },
    #         {
    #           'id':<int>,
    #           'title':<str>,
    #           'host_user_id':<int>
    #          }
    #     ]
    # }
    @app.route("/user/<int:user_id>/roomlist",methods=["GET"])
    def user_roomlist(user_id):
        current_user_id=g.user_id
        
        if current_user_id != user_id:
            return '권한이 없습니다.',401
        
        roomlist=room_service.get_user_roomlist(current_user_id)
        
        return jsonify({'roomlist':roomlist}),200
        
        
    #id가 user_id인 유저의 id가 room_id인 방을 삭제 합니다.(방 나가기)
    #input
    # {
    #     'delete_room_id':'room_id'
    # }
    #output
    # '삭제 성공'
    @app.route("/user/<int:user_id>/room",methods=["DELETE"])
    def user_roomlist(user_id):
        current_user_id=g.user_id
        
        if current_user_id != user_id:
            return '권한이 없습니다.',401
        
        delete_room_id=request.json['delete_room_id']
        if room_service.is_room_exists(delete_room_id):
            room_service.delete_user_room(current_user_id,delete_room_id)
            return '삭제 성공'
        
        else:
            return '존재 하지 않는 방입니다.',400