from flask import request,jsonify
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from tool import generate_random_sting
from auth import login_required,g

def room_router(app,services):
    room_service=services.room_service
    image_service=services.image_service
    user_service=services.user_service

    #room을 생성합니다.
    #input
    # {
    #     userlist:[1,2,3],
    #     title:<str>
    # }
    #output
    # '방 생성 성공 및 {result}명 초대 성공',200
    @app.route("/room",methods=["POST"])
    @login_required
    def room():
        room_userlist=request.json['userlist']
        current_user_id=g.user_id
        
        new_room={
            'title':request.json['title'],
            'user_id':current_user_id
        }
        
        new_room_id=room_service.create_room(new_room)

        room_userlist.append(current_user_id)

        #존재하지 않는 유저는 배제합니다.
        real_room_userlist=[]
        for user_id in room_userlist:
            if user_service.get_user_info(user_id):
                real_room_userlist.append(user_id)
        
        result=room_service.create_room_users(new_room_id,real_room_userlist)

        return f'방 생성 성공 및 {result}명 초대 성공',200
    
    #id가 room_id인 room에 이미지를 업로드 합니다.
    #input
    # {
    #     'files':{
    #         'image':file
    #     }
    # }
    #output
    # '{result}개를 업로드 성공'
    @app.route("/room/<int:room_id>/image",methods=["POST"])
    @login_required
    def room_image(room_id):
        current_user_id=g.user_id
        
        if 'image' not in request.files or request.files['image'].filename=='':
            return 'file is missing',404

        image=request.files['image']
        new_image={
            'image':image,
            'user_id':current_user_id
        }
        result=image_service.upload_room_image(room_id,new_image)
        
        return f'{result}개를 업로드 성공',200
    #id가 room_id인 room의 id가 image_id인 image의 권한을 삭제합니다.
    #input
    # {
    #     'delete_room_image_id':<int>
    # }
    #output
    # "{result}장 삭제 완료"
    @app.route("/room/<int:room_id>/image",methods=["DELETE"])
    @login_required
    def room_image(room_id,image_id):
        current_user_id=g.user_id

        if not image_service.get_image_info(image_id):
            return '이미지가 존재하지 않습니다.',400
        
        if not image_service.is_user_image(current_user_id,image_id):
            return '권한이 없습니다.',401
        delete_room_image_id=request.json['delete_room_image_id']
        result=image_service.delete_room_image(room_id,delete_room_image_id)
        
        return f"{result}장 삭제 완료",200
            
    #id가 room_id인 room의 이미지 리스트를 불러옵니다.
    #input
    #output
    # {
    #     'imagelist':[
    #         {
    #             'id':<int>,
    #             'link':<str>,
    #             'user_id':<int>
    #         },
    #         {
    #             'id':<int>,
    #             'link':<str>,
    #             'user_id':<int>
    #         }
    #     ]
    # }
    @app.route("/room/<int:room_id>/imagelist",methods=["GET"])
    @login_required
    def room_imagelist(room_id):
        current_user_id=g.user_id
        if not room_service.get_room_info(room_id):
            return '방이 존재하지 않습니다.',400
        
        if not room_service.is_room_user(room_id,current_user_id):
            return '권한이 없습니다.',401
        
        imagelist=image_service.get_room_imagelist(room_id)
            
        return jsonify({'imagelist':imagelist}),200
            
    
    #id가 room_id인 room의 유저 리스트를 불러옵니다.
    #input
    #output
    # {
    #     'userlist':[
    #         {
    #             'id':<int>,
    #             'email':<str>,
    #             'name':<str>,
    #             'profile':<str>
    #         },
    #         {
    #             'id':<int>,
    #             'email':<str>,
    #             'name':<str>,
    #             'profile':<str>
    #         }
    #     ]
    # }
    @app.route("/room/<int:room_id>/userlist",methods=["GET"]) 
    @login_required
    def room_userlist(room_id):
        current_user_id=g.user_id
        if not room_service.get_room_info(room_id):
            return '방이 존재하지 않습니다.',400
        
        if not room_service.is_room_user(room_id,current_user_id):
            return '권한이 없습니다.',401
        
        room_user_info_list=room_service.get_room_userlist(room_id)

        return jsonify({'userlist':room_user_info_list}),200
    
    #id가 room_id인 room의 id가 user_id인 유저를 강퇴합니다.
    #input
    # {
    #     'delete_room_user_id':<int>
    # }
    #output
    #'{result}명 강퇴 성공'
    @app.route("/room/<int:room_id>/user",methods=["DELETE"]) 
    @login_required
    def room_user(room_id,user_id):
        current_user_id=g.user_id
        
        if not room_service.get_room_info(room_id):
            return '방이 존재하지 않습니다.',400
        #방장이 아니라면
        if user_id!= room_service.get_room_info(room_id)['host_user_id']:
            return '권한이 없습니다.',401
        
        if not user_service.get_user_info(user_id):
            return '해당 유저는 존재하지 않습니다.',400
        
        delete_room_user_id=request.json['delete_room_user_id']
        result=room_service.delete_room_user(room_id,delete_room_user_id)
        
        return f'{result}명 강퇴 성공',200
    
    #id가 room_id인 room의 id가 user_id인 유저를 초대합니다.
    #input
    # {
    #     'invite_userlist':[1,2,]
    # }
    #output
    #'{result}명 초대 성공'
    @app.route("/room/<int:room_id>/user",methods=["post"]) 
    @login_required
    def room_user(room_id):
        if not room_service.get_room_info(room_id):
            return '방이 존재하지 않습니다.',400
        
        current_user_id=g.user_id
        if not room_service.is_room_user(current_user_id): 
            return '방의 유저가 아닙니다.',401
        
        #실제 존재 유저이면 초대 가능 유저로 선정
        invite_userlist=request.json['invite_user_id']
        exist_invite_userlist=[]
        for user_id in invite_userlist:
            if user_service.get_user_info(user_id):
                exist_invite_userlist.append(user_id)

        result=room_service.create_room_users(room_id,exist_invite_userlist)

        return f'{result}명 초대 성공',200