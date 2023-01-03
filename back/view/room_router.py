from flask import request,jsonify,make_response
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from auth import login_required,g

from flask_restx import Resource,Namespace
from tool import ParserModule,ApiModel,ApiError

room_namespace=Namespace('room',description='방의 정보를 생성,호출,수정,삭제 합니다.')

def room_router(api,services):
    room_service=services.room_service
    image_service=services.image_service
    user_service=services.user_service

    api.add_namespace(room_namespace,'')
    api_error=ApiError(room_namespace)
    api_model=ApiModel(room_namespace)
    api_parser_module=ParserModule()

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
    
    post_room_parser=api_parser_module.get_parser(['Authorization'])
    post_room_model=api_model.get_model("post_room_model",['userlist','title'])
    post_room_response_model=api_model.get_model("post_room_response_model",['room_info','success'])
    @room_namespace.route("")
    class room(Resource):
        @room_namespace.expect(post_room_parser,post_room_model,validate=False)
        @room_namespace.response(200,'방 생성에 성공하였습니다.',post_room_response_model)
        @login_required
        def post(self):
            '''
            방을 생성합니다.
            '''
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
    post_room_image_parser=api_parser_module.get_parser(['Authorization','image'])
    post_room_image_response_model=api_model.get_model("post_room_image_response_model",['image_info','success'])

    delete_room_image_parser=api_parser_module.get_parser(['Authorization'])
    delete_room_image_model=api_model.get_model("delete_room_image_model",['delete_room_image_id'])
    @room_namespace.route("/<int:room_id>/image")
    class room_image(Resource):
        @room_namespace.expect(post_room_image_parser,validate=False)
        @room_namespace.response(200,'방에 이미지를 업로드 성공하였습니다',post_room_image_response_model)
        @room_namespace.response(api_error.file_missing_error()['status_code'],
                                 '파일이 존재하지 않습니다.',
                                 api_error.file_missing_error_model())
        @login_required
        def post(self,room_id):
            '''
            id가 room_id인 room에 이미지를 업로드 합니다.
            '''
            current_user_id=g.user_id
            
            if 'image' not in request.files or request.files['image'].filename=='':
                return make_response(jsonify({'message':api_error.file_missing_error()['message']}),api_error.file_missing_error()['status_code'])

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
                return make_response(jsonify({'message':result['message']}),result['status_code'])
            
    #input
    # {
    #     'delete_room_image_id':<int>
    # }
    #output
    # "{result}장 삭제 완료"
        @room_namespace.expect(delete_room_image_parser,delete_room_image_model,validate=False)
        @room_namespace.response(200,'삭제를 완료하였습니다')
        @room_namespace.response(api_error.image_existance_error()['status_code'],
                                 '이미지가 존재하지 않습니다.',
                                 api_error.image_existance_error_model())
        @room_namespace.response(api_error.authorizaion_error()['status_code'],
                                 '소유물이 아니기에 권한이 없습니다',
                                api_error.authorizaion_error_model())
        @login_required
        def delete(self,room_id):
            '''
            id가 room_id인 room에서 id가 image_id인 image를 삭제합니다.
            '''
            current_user_id=g.user_id
            delete_room_image_id=request.json['delete_room_image_id']
            if not image_service.get_image_info(delete_room_image_id):
                return make_response(jsonify({'message':api_error.image_existance_error()['message']})
                                     ,api_error.image_existance_error()['status_code'])
            
            if not image_service.is_user_image(current_user_id,delete_room_image_id):
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            delete_room_image_id=request.json['delete_room_image_id']
            result=image_service.delete_room_image(room_id,delete_room_image_id)
            
            return make_response(f"{result}장 삭제 완료",200)
            
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
    get_room_imagelist_parser=api_parser_module.get_parser(['Authorization','start','limit'])
    get_room_imagelist_response_model=api_model.get_model('get_room_imagelist_response_model',['imagelist'])
    @room_namespace.route("/<int:room_id>/imagelist")
    class room_imagelist(Resource):
        @room_namespace.expect(get_room_imagelist_parser,validate=False)
        @room_namespace.response(200,'이미지의 정보 목록을 불러옵니다.',get_room_imagelist_response_model)
        @room_namespace.response(api_error.room_existance_error()['status_code'],
                                 '방이 존재하지 않습니다.',
                                 api_error.room_existance_error_model())
        @room_namespace.response(api_error.authorizaion_error()['status_code'],
                                 '소유물이 아니기에 권한이 없습니다',
                                api_error.authorizaion_error_model())
        @login_required
        def get(self,room_id):
            '''
            id가 room_id인 room의 이미지 정보 목록을 불러옵니다.
            '''
            current_user_id=g.user_id
            if not room_service.get_room_info(room_id):
                return make_response(jsonify({'message':api_error.room_existance_error()['message']}),
                                     api_error.room_existance_error()['status_code'])
            
            if not room_service.is_room_user(room_id,current_user_id):
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            if 'start' not in request.args or 'limit' not in request.args:
                return make_response(jsonify({'message':"필수 성분이 없습니다."}),
                                    405)
            def check_int(s):
                if s[0] in ('-', '+'):
                    return s[1:].isdigit()
                return s.isdigit()
            start=request.args['start']
            limit=request.args['limit']
            if not check_int(start) or not check_int(limit):
                return make_response(jsonify({'message':"형태변환 불가능!"}),
                                     405)

            start=int(start)
            limit=int(limit)
            if start < 0 or limit < 0 :
                return make_response(jsonify({'message':"범위 초과!"}),
                                    405)

            pages={
                'start':int(start),
                'limit':int(limit) if int(limit) >= 0 else int(limit)*(-1)
            }
            user_read_room_history_info=user_service.get_user_read_room_history_info(current_user_id,room_id)
            if user_read_room_history_info==None:
                result=user_service.create_user_read_room_history(current_user_id,room_id)
                print(result)
                read_history=0
            else:
                read_history=user_read_room_history_info['row']

            imagelist=image_service.get_room_imagelist(room_id,pages)
            result=user_service.update_user_read_history(current_user_id,room_id,start+limit)
            
            return make_response(jsonify({'read_history':read_history,'imagelist':imagelist}),200)
            
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
    get_room_userlist_parser=api_parser_module.get_parser(['Authorization'])
    get_room_userlist_response_model=api_model.get_model('get_room_userlist_response_model',['user_info_list'])
    @room_namespace.route("/<int:room_id>/userlist") 
    class room_userlist(Resource):
        @room_namespace.expect(get_room_userlist_parser,validate=False)
        @room_namespace.response(200,
                                 '유저의 정보 목록을 불러옵니다.',
                                 get_room_userlist_response_model)
        @room_namespace.response(api_error.room_existance_error()['status_code'],
                                 '방이 존재하지 않습니다.',
                                 api_error.room_existance_error_model())
        @room_namespace.response(api_error.authorizaion_error()['status_code'],
                                 '소유물이 아니기에 권한이 없습니다',
                                api_error.authorizaion_error_model())
        @login_required
        def get(self,room_id):
            '''
            id가 room_id인 room의 유저 정보 목록을 불러옵니다.
            '''
            current_user_id=g.user_id
            if not room_service.get_room_info(room_id):
                return make_response(jsonify({'message':api_error.room_existance_error()['message']}),
                                     api_error.room_existance_error()['status_code'])
            
            if not room_service.is_room_user(room_id,current_user_id):
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            room_user_info_list=room_service.get_room_userlist(room_id)

            return make_response(jsonify({'userlist':room_user_info_list}),200)
    
    #input
    # {
    #     'invite_userlist':[1,2,]
    # }
    #output
    #'{result}명 초대 성공'
    post_room_user_parser=api_parser_module.get_parser(['Authorization'])
    post_room_user_model=api_model.get_model("post_room_user_model",['invite_userlist'])

    delete_room_user_parser=api_parser_module.get_parser(['Authorization'])
    delete_room_user_model=api_model.get_model("delete_room_user_model",['delete_room_user_id'])
    @room_namespace.route("/<int:room_id>/user") 
    class room_user(Resource):
        @room_namespace.expect(post_room_user_parser,post_room_user_model,validate=False)
        @room_namespace.response(200,'초대를 성공하였습니다.')
        @room_namespace.response(api_error.room_existance_error()['status_code'],
                                 '방이 존재하지 않습니다.',
                                 api_error.room_existance_error_model())
        @room_namespace.response(api_error.room_user_error()['status_code'],
                                 '방의 유저가 아니기에 권한이 없습니다.',
                                 api_error.room_user_error_model())
        @login_required
        def post(self,room_id):
            '''
            id가 room_id인 room에 id가 user_id인 유저를 초대합니다.(방 초대)
            '''
            if not room_service.get_room_info(room_id):
                return make_response(jsonify({'message':api_error.room_existance_error()['message']}),
                                     api_error.room_existance_error()['status_code'])
            
            current_user_id=g.user_id
            if not room_service.is_room_user(room_id,current_user_id): 
                return make_response(jsonify({'message':api_error.room_existance_error()['message']}),
                                     api_error.room_user_error()['status_code'])
            
            #실제 존재 유저이면 초대 가능 유저로 선정
            invite_userlist=request.json['invite_userlist']
            exist_invite_userlist=[]
            for user_id in invite_userlist:
                if user_service.get_user_info(user_id):
                    exist_invite_userlist.append(user_id)

            result=room_service.create_room_users(room_id,exist_invite_userlist)

            return make_response(f'{result}명 초대 성공',200)

    #input
    # {
    #     'delete_room_user_id':<int>
    # }
    #output
    #'{result}명 강퇴 성공'
        @room_namespace.expect(delete_room_user_parser,delete_room_user_model,validate=False)
        @room_namespace.response(200,'방에서 유저를 강퇴하였습니다.')
        @room_namespace.response(api_error.room_existance_error()['status_code'],
                                 '방이 존재하지 않습니다.',
                                 api_error.room_existance_error_model())
        @room_namespace.response(api_error.authorizaion_error()['status_code'],
                                 '방장이 아니기에 권한이 없습니다',
                                api_error.authorizaion_error_model())
        @room_namespace.response(api_error.user_existance_error()['status_code'],
                                 '해당 유저가 존재하지 않습니다.',
                                api_error.user_existance_error_model())
        @login_required
        def delete(self,room_id):
            '''
            id가 room_id인 room에서 id가 user_id인 유저를 강퇴합니다.
            '''
            current_user_id=g.user_id
            delete_room_user_id=request.json['delete_room_user_id']
            if not room_service.get_room_info(room_id):
                return make_response(jsonify({'message':api_error.room_existance_error()['message']}),
                                     api_error.room_existance_error()['status_code'])
            #방장이 아니라면
            if current_user_id!= room_service.get_room_info(room_id)['host_user_id']:
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            if not user_service.get_user_info(delete_room_user_id):
                return make_response(jsonify({'message':api_error.user_existance_error()['message']}),
                                     api_error.user_existance_error()['status_code'])
            
            delete_room_user_id=request.json['delete_room_user_id']
            result=room_service.delete_room_user(room_id,delete_room_user_id)
            delete_image_result=image_service.delete_room_user_image(room_id,delete_room_user_id)

            return make_response(f'{result}명 강퇴 및 {delete_image_result}장 관련 사진 삭제 성공',200)