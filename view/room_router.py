from flask import request,jsonify
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from auth import login_required,g

def room_router(app,services):
    #room_service.create_room(current_user_id)
    #room_service.is_room_exists(room_id)
    #room_service.get_room_userlist(room_id)
    #room_service.delete_room_user(room_id,user_id)
    room_service=services.room_service

    #image_service.get_room_imagelist(room_id)
    image_service=services.image_service
    
    #user_service.is_user_exists(invite_user_id):
    user_service=services.user_service

    #room을 생성합니다.
    #input
    # {
    #     userlist:['user_id']
    # }
    #output
    @app.route("/room",methods=["POST"])
    @login_required
    def room():
        room_userlist=request.json['userlist']
        current_user_id=g.user_id
        
        new_room_id=room_service.create_room(current_user_id)

        room_userlist.append(current_user_id)

        #존재하지 않는 유저는 배제합니다.
        real_room_userlist=[]
        for user_id in room_userlist:
            if user_service.get_user_info(user_id):
                real_room_userlist.append(user_id)
        
        result=room_service.create_room_user(new_room_id,real_room_userlist)

        return f'방 생성 성공 및 {result}명 초대 성공',200
    
    #id가 room_id인 room의 이미지 리스트를 불러옵니다.
    #input
    #output
    # {
    #     'imagelist':[
    #         {
    #             'image_id':<int>,
    #             'room_id':<int>
    #         },
    #         {
    #             'image_id':<int>,
    #             'room_id':<int>
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
    #             'user_id':<int>,
    #             'room_id':<int>
    #         },
    #         {
    #             'user_id':<int>,
    #             'room_id':<int>
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
        
        room_userlist=room_service.get_room_userlist(room_id)

        room_user_info_list=[]
        for user_id in room_userlist:
            #유저가 존재 할 경우에만 불러모은다.
            user_info=user_service.get_user_info(user_id)
            if user_info:
                room_user_info_list.append(user_info)

        return jsonify({'userlist':room_user_info_list}),200
    
    #id가 room_id인 room의 id가 user_id인 유저를 강퇴합니다.
    #input
    #output
    @app.route("/room/<int:room_id>/user/<int:user_id>",methods=["delete"]) 
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
        
        if not room_service.is_room_user(user_id): 
            return '해당 유저가 방에 존재하지 않습니다.',400
        
        room_service.delete_room_user(room_id,user_id)
        
        return '강퇴 성공',200
    
    #id가 room_id인 room의 id가 user_id인 유저를 초대합니다.
    #input
    # {
    #     'invite_userlist':[1,2,]
    # }
    #output
    #'초대 성공',200
    @app.route("/room/<int:room_id>/user",methods=["post"]) 
    @login_required
    def room_user(room_id):
        if not room_service.get_room_info(room_id):
            return '방이 존재하지 않습니다.',400
        
        current_user_id=g.user_id
        if not room_service.is_room_user(current_user_id): 
            return '방의 유저가 아닙니다.',401
        
        #방에 존재하지 않는 멤버이며 실제 존재 유저이면 초대 가능 유저로 선정
        invite_userlist=request.json['invite_user_id']
        real_invite_userlist=[]
        for user_id in invite_userlist:
            if user_service.get_user_info(user_id) and not room_service.is_room_user(user_id): 
                real_invite_userlist.append(user_id)

        room_service.create_room_user(room_id,real_invite_userlist)

        return '초대 성공',200