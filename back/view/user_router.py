from flask import request,jsonify,make_response
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from auth import login_required,g

from flask_restx import Resource,Namespace,reqparse

def user_router(api,services):
    user_service=services.user_service
    image_service=services.image_service
    room_service=services.room_service
    
    parser=reqparse.RequestParser()
    parser.add_argument('Authorization',type=str,
                        location='headers',
                        help='access_token')
    
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
    #     'user_info':
    #     {
    #             'id':<int>,
    #             'name':<str>,
    #             'email':<str>,
    #             'profile':<str>,
    #     }
    # }
    @api.route("/sign-up",methods=["POST"])
    def post_sign_up():
        new_user=request.json

        if user_service.is_email_exists(new_user['email']):
            return '이메일이 이미 존재합니다.',401
        
        new_user_id=user_service.create_new_user(new_user)
        user_info=user_service.get_user_info(new_user_id)
        
        return jsonify({'user_info':user_info}),200

    #id가 user_id인 유저의 정보를 불러옵니다.
    #input
    #output
    # {
    #     'user_info':
    #     {
    #         'id':<int>,
    #         'name':<str>,
    #         'email':<str>,
    #         'profile':<str>,
    #     }
    # }
    @app.route("/user/<int:user_id>",methods=["GET"])
    def get_user(user_id):
        user_info=user_service.get_user_info(user_id)
        if user_info:
            return jsonify({'user_info':user_info}),200
        else:
            return '해당 유저가 존재하지 않습니다.',404
    
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
            return '존재하지 않는 이메일 입니다.',404
        
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
    # {
    #     'imagelist':[
    #         {
    #             'id':123,
    #             'link':'http://...',
    #             'user_id':11
    #         },
    #         {
    #             'id':12,
    #             'link':'http://...',
    #             'user_id':12
    #         }
    #     ]
    # }
    @app.route("/user/<int:user_id>/imagelist",methods=["GET"])
    @login_required
    def get_user_imagelist(user_id):
        current_user_id=g.user_id
        
        #current_usre_id와 user_id를 따로 받으면 추후 누가 조회 했는지 알 수 있음
        if current_user_id != user_id:
            return '권한이 없습니다.',401
        
        image_list=image_service.get_user_imagelist(current_user_id)

        return jsonify({'imagelist':image_list})
    
    
    #id가 user_id인 유저의 친구를 생성합니다.
    #input
    # {
    #     'friend_user_id':<int>
    # }
    #output
    # '친구 저장 성공'
    # '친구 저장 실패'
    @app.route("/user/<int:user_id>/friend",methods=["POST"])
    @login_required
    def post_user_friend(user_id):
        current_user_id=g.user_id
        friend_user_id=request.json['friend_user_id']
        
        if current_user_id != user_id:
            return '권한이 없습니다.',401
        
        if not user_service.get_user_info(friend_user_id):
            return '해당 유저가 존재하지 않습니다.',404
        
        if user_service.is_user_friend(current_user_id,friend_user_id):
            return '이미 친구인 유저입니다.',401
        
        result=user_service.create_user_friend(current_user_id,friend_user_id)

        return f"{result}명 친구 생성 성공"

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
    @login_required
    def get_user_friendlist(user_id):
        current_user_id=g.user_id
        
        if current_user_id != user_id:
            return '권한이 없습니다.',401
        
        user_friend_info_list=user_service.get_user_friendlist(current_user_id)
        return jsonify({'friendlist':user_friend_info_list}),200
    
    #id가 user_id인 유저의 친구를 삭제합니다.
    #input
    # {
    #     'delete_friend_user_id':<int>
    # }
    #output
    # {result}명 삭제 성공
    # '존재하지 않는 유저입니다.'
    @app.route("/user/<int:user_id>/friend",methods=["DELETE"])
    @login_required
    def delete_user_friend(user_id):
        current_user_id=g.user_id

        if current_user_id != user_id:
            return '권한이 없습니다.',401
        
        delete_friend_user_id=request.json['delete_friend_user_id']

        if not user_service.get_user_info(delete_friend_user_id):
            return '존재하지 않는 유저입니다.',404
            
        result=user_service.delete_user_friend(current_user_id,delete_friend_user_id)
        return f"{result}명 삭제 성공"
    
    #id가 user_id인 유저의 방 리스트를 불러옵니다.
    #input
    #output
    # {
    #     'roomlist':[
    #         {
    #           'id':<int>,
    #           'title':<str>,
    #           'host_user_id':<int>
    #           'userlist':[
    #               {
    #                   'id':<int>,
    #                   'name':<str>,
    #                   'email':<str>,
    #                   'profile':<str>
    #               },
    #               {
    #                   'id':<int>,
    #                   'name':<str>,
    #                   'email':<str>,
    #                   'profile':<str>
    #               }    
    #           ]
    #          },
    #         {
    #           'id':<int>,
    #           'title':<str>,
    #           'host_user_id':<int>
    #           ...
    #          }
    #     ]
    # }
    @app.route("/user/<int:user_id>/roomlist",methods=["GET"])
    @login_required
    def get_user_roomlist(user_id):
        current_user_id=g.user_id
        
        if current_user_id != user_id:
            return '권한이 없습니다.',401
        
        room_info_list=room_service.get_user_roomlist(current_user_id)

        for room_info in room_info_list:
            room_id=room_info['id']
            user_info_list=room_service.get_room_userlist(room_id)
            room_info['userlist']=user_info_list
        
        return jsonify({'roomlist':room_info_list}),200
        
        
    #id가 user_id인 유저의 id가 room_id인 방을 삭제 합니다.(방 나가기)
    #input
    # {
    #     'delete_user_room_id':'room_id'
    # }
    #output
    # '삭제 성공'
    @app.route("/user/<int:user_id>/room",methods=["DELETE"])
    @login_required
    def delete_user_roomlist(user_id):
        current_user_id=g.user_id
        
        if current_user_id != user_id:
            return '권한이 없습니다.',401
        
        delete_user_room_id=request.json['delete_user_room_id']

        result=room_service.delete_user_room(current_user_id,delete_user_room_id)

        return f"{result}개 방 삭제 성공",200 