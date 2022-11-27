from flask import request,jsonify,make_response
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from auth import login_required,g

from flask_restx import Resource,Namespace,fields
from tool import ParserModule,ApiModel

room_namespace=Namespace('room',description='방의 정보를 생성,호출,수정,삭제 합니다.')

def room_router(api,services):
    room_service=services.room_service
    image_service=services.image_service
    user_service=services.user_service

    api.add_namespace(room_namespace,'')
    
    #room을 생성합니다.
    #input
    # {
    #     userlist:[1,2,3],
    #     title:<str>
    # }
    #output
    # {
    #     'room_info':room_info,
    #     'success':3(초대한 사람 수)
    # }
    
    post_room_model=ApiModel(['userlist','title']).get_model(room_namespace,"post_room_model")
    post_room_parser=ParserModule(['Authorization']).get_parser()

    @room_namespace.route("")
    class room(Resource):
        @room_namespace.expect(post_room_parser,post_room_model,validate=False)
        @login_required
        def post(self):
            room_userlist=request.json['userlist']
            current_user_id=g.user_id
            
            new_room={
                'title':request.json['title'],
                'user_id':current_user_id
            }
            
            new_room_id=room_service.create_room(new_room)
            room_info=room_service.get_room_info(new_room_id)

            room_userlist.append(current_user_id)

            #존재하지 않는 유저는 배제합니다.
            real_room_userlist=[]
            for user_id in room_userlist:
                if user_service.get_user_info(user_id):
                    real_room_userlist.append(user_id)
            
            result=room_service.create_room_users(new_room_id,real_room_userlist)

            return make_response(jsonify({
                'room_info':room_info,
                'success':result}),200)
    
    #id가 room_id인 room에 이미지를 업로드 합니다.
    #input
    # {
    #     'files':{
    #         'image':file
    #     }
    # }
    #output
    # {
    #     'image_info':image_info,
    #     'success':1
    # }
    post_room_image_parser=ParserModule(['Authorization','image']).get_parser()
    @room_namespace.route("/<int:room_id>/image")
    class room_image(Resource):
        @api.doc(parser=post_room_image_parser)
        @login_required
        def post(self,room_id):
            current_user_id=g.user_id
            
            if 'image' not in request.files or request.files['image'].filename=='':
                return make_response('file is missing',404)

            image=request.files['image']
            new_image={
                'image':image,
                'user_id':current_user_id
            }
            result=image_service.upload_room_image(room_id,new_image)
            if 'message' not in result:
                new_image_id=result['new_image_id']
                image_info=image_service.get_image_info(new_image_id)
                return make_response(jsonify(
                    {
                        'image_info':image_info,
                        'success':result['result']
                    }),200)
            else:
                return make_response(result['message'],result['status_code'])
    #id가 room_id인 room의 id가 image_id인 image의 권한을 삭제합니다.
    #input
    # {
    #     'delete_room_image_id':<int>
    # }
    #output
    # "{result}장 삭제 완료"
    delete_room_image_parser=ParserModule(['Authorization','delete_room_image_id']).get_parser()
    @room_namespace.route("/<int:room_id>/image")
    class room_image(Resource):
        @api.doc(parser=delete_room_image_parser)
        @login_required
        def delete(self,room_id):
            current_user_id=g.user_id
            delete_room_image_id=request.json['delete_room_image_id']
            if not image_service.get_image_info(delete_room_image_id):
                return make_response('이미지가 존재하지 않습니다.',400)
            
            if not image_service.is_user_image(current_user_id,delete_room_image_id):
                return make_response('권한이 없습니다.',401)
            delete_room_image_id=request.json['delete_room_image_id']
            result=image_service.delete_room_image(room_id,delete_room_image_id)
            
            return make_response(f"{result}장 삭제 완료",200)
            
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
    get_room_imagelist_parser=ParserModule(['Authorization']).get_parser()
    @room_namespace.route("/<int:room_id>/imagelist")
    class room_imagelist(Resource):
        @api.doc(parser=get_room_imagelist_parser)
        @login_required
        def get(self,room_id):
            current_user_id=g.user_id
            if not room_service.get_room_info(room_id):
                return make_response('방이 존재하지 않습니다.',400)
            
            if not room_service.is_room_user(room_id,current_user_id):
                return make_response('권한이 없습니다.',401)
            
            imagelist=image_service.get_room_imagelist(room_id)
                
            return make_response(jsonify({'imagelist':imagelist}),200)
            
    
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
    get_room_userlist_parser=ParserModule(['Authorization']).get_parser()
    @room_namespace.route("/<int:room_id>/userlist") 
    class room_userlist(Resource):
        @api.doc(parser=get_room_userlist_parser)
        @login_required
        def get(self,room_id):
            current_user_id=g.user_id
            if not room_service.get_room_info(room_id):
                return make_response('방이 존재하지 않습니다.',400)
            
            if not room_service.is_room_user(room_id,current_user_id):
                return make_response('권한이 없습니다.',401)
            
            room_user_info_list=room_service.get_room_userlist(room_id)

            return make_response(jsonify({'userlist':room_user_info_list}),200)
    
    #id가 room_id인 room의 id가 user_id인 유저를 강퇴합니다.
    #input
    # {
    #     'delete_room_user_id':<int>
    # }
    #output
    #'{result}명 강퇴 성공'
    delete_room_user_parser=ParserModule(['Authorization','delete_room_parser']).get_parser()
    @room_namespace.route("/<int:room_id>/user")
    class room_user(Resource):
        @api.doc(parser=delete_room_user_parser)
        @login_required
        def delete(self,room_id):
            current_user_id=g.user_id
            delete_room_user_id=request.json['delete_room_user_id']
            if not room_service.get_room_info(room_id):
                return make_response('방이 존재하지 않습니다.',400)
            #방장이 아니라면
            if current_user_id!= room_service.get_room_info(room_id)['host_user_id']:
                return make_response('권한이 없습니다.',401)
            
            if not user_service.get_user_info(delete_room_user_id):
                return make_response('해당 유저는 존재하지 않습니다.',400)
            
            delete_room_user_id=request.json['delete_room_user_id']
            result=room_service.delete_room_user(room_id,delete_room_user_id)
            delete_image_result=image_service.delete_room_user_image(room_id,delete_room_user_id)

            return make_response(f'{result}명 강퇴 및 {delete_image_result}장 관련 사진 삭제 성공',200)
    
    #id가 room_id인 room의 id가 user_id인 유저를 초대합니다.
    #input
    # {
    #     'invite_userlist':[1,2,]
    # }
    #output
    #'{result}명 초대 성공'
    post_room_user_parser=ParserModule(['Authorization','invite_userlist']).get_parser()
    @room_namespace.route("/<int:room_id>/user") 
    class room_user(Resource):
        @api.doc(parser=post_room_user_parser)
        @login_required
        def post(self,room_id):
            if not room_service.get_room_info(room_id):
                return make_response('방이 존재하지 않습니다.',400)
            
            current_user_id=g.user_id
            if not room_service.is_room_user(room_id,current_user_id): 
                return make_response('방의 유저가 아닙니다.',401)
            
            #실제 존재 유저이면 초대 가능 유저로 선정
            invite_userlist=request.json['invite_userlist']
            exist_invite_userlist=[]
            for user_id in invite_userlist:
                if user_service.get_user_info(user_id):
                    exist_invite_userlist.append(user_id)

            result=room_service.create_room_users(room_id,exist_invite_userlist)

            return make_response(f'{result}명 초대 성공',200)