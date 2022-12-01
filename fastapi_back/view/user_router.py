import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from auth import login_required,g

from flask_restx import Resource,Namespace

from tool import ParserModule,ApiModel,ApiError

user_namespace=Namespace('user',description='유저의 정보를 생성,호출,수정,삭제 합니다.')

def user_router(api,services):
    user_service=services.user_service
    image_service=services.image_service
    room_service=services.room_service

    api.add_namespace(user_namespace,'')
    api_error=ApiError(user_namespace)
    api_model=ApiModel(user_namespace)
    api_parser_module=ParserModule()
    #input
    # {
    #     'name':<str>,
    #     'email':<str>,
    #     'password':<str>ss,
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
    post_sign_up_model=api_model.get_model("post_sign_up_model",
                                ['name','email','password','profile'])
    post_sign_up_response_model=api_model.get_model('post_sign_up_response_model',['user_info'])
    @user_namespace.route("/sign-up")
    class sign_up(Resource):
        @user_namespace.expect(post_sign_up_model,validate=False)
        @user_namespace.response(200,'유저의 정보를 반환합니다.',post_sign_up_response_model)
        @user_namespace.response(api_error.email_existance_sign_up_error()['status_code'],
                                 '이메일이 이미 등록 되어있어 실패하였습니다.',
                                 api_error.email_existance_sign_up_error_model())
        def post(self):
            '''
            회원가입을 합니다.
            '''
            new_user=request.json

            if user_service.is_email_exists(new_user['email']):
                return make_response(jsonify({'message':api_error.email_existance_sign_up_error()['message']}),
                                     api_error.email_existance_sign_up_error()['status_code'])
            
            new_user_id=user_service.create_new_user(new_user)
            user_info=user_service.get_user_info(new_user_id)
            
            return make_response(jsonify({'user_info':user_info}),200)

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
    get_user_response_model=api_model.get_model('post_sign_up_response_model',['user_info'])
    @user_namespace.route("/<int:user_id>")
    class user(Resource):
        @user_namespace.response(200,'유저의 정보를 반환합니다.',get_user_response_model)
        @user_namespace.response(api_error.user_existance_error()['status_code'],
                                 '해당 유저가 존재하지 않습니다.',
                                api_error.user_existance_error_model())
        def get(self,user_id):
            '''
            id가 user_id인 유저의 정보를 불러옵니다.
            '''
            user_info=user_service.get_user_info(user_id)
            if user_info:
                return make_response(jsonify({'user_info':user_info}),200)
            else:
                return make_response(jsonify({'message':api_error.user_existance_error()['message']}),
                                     api_error.user_existance_error()['status_code'])
    
    #input
    # {
    #     'email':<str>,
    #     'password':<str>
    # }
    #output
    # {
    #     'access_token':<str>
    # }
    post_login_model=api_model.get_model("post_login_model",['email','password'])
    post_login_response_model=api_model.get_model("post_login_response_model",['access_token'])
    @user_namespace.route("/login")
    class login(Resource):
        @user_namespace.expect(post_login_model,validate=False)
        @user_namespace.response(200,'접근 토큰을 반환합니다.',post_login_response_model)
        @user_namespace.response(api_error.email_existance_login_error()['status_code'],
                                 '이메일이 존재하지 않습니다.',
                                 api_error.email_existance_login_error_model())
        @user_namespace.response(api_error.credential_error()['status_code'],
                                 '비밀번호가 일치하지 않습니다.',
                                 api_error.credential_error_model())
        def post(self):
            '''
            로그인을 합니다.
            '''
            credential=request.json
            
            if not user_service.is_email_exists(credential['email']):
                return make_response(jsonify({'message':api_error.email_existance_login_error()['message']}),
                                     api_error.email_existance_login_error()['status_code'])
            
            authorized=user_service.login(credential)
            if authorized:
                user_credential=user_service.get_user_id_and_password(credential['email'])
                access_token=user_service.generate_access_token(user_credential['id'])
                return make_response(jsonify({'access_token':access_token}))
            
            else:
                return make_response(jsonify({'message':api_error.credential_error()['message']}),
                                     api_error.credential_error()['status_code'])

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
    get_user_imagelist_parser=api_parser_module.get_parser(['Authorization'])
    get_user_imagelist_response_model=api_model.get_model('get_user_imagelist_response_model',['imagelist'])
    @user_namespace.route("/<int:user_id>/imagelist")
    class user_imagelist(Resource):
        @user_namespace.expect(get_user_imagelist_parser,validate=False)
        @user_namespace.response(200,'유저의 이미지 정보 목록을 반환합니다.',get_user_imagelist_response_model)
        @user_namespace.response(api_error.authorizaion_error()['status_code'],
                                 '소유물이 아니기에 권한이 없습니다',
                                api_error.authorizaion_error_model())
        @login_required
        def get(self,user_id):
            '''
            id가 user_id인 유저의 이미지 정보 목록을 불러옵니다.
            '''
            current_user_id=g.user_id
            
            #current_usre_id와 user_id를 따로 받으면 추후 누가 조회 했는지 알 수 있음
            if current_user_id != user_id:
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            image_list=image_service.get_user_imagelist(current_user_id)

            return make_response(jsonify({'imagelist':image_list}),200)
    
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
    get_user_friendlist_parser=api_parser_module.get_parser(['Authorization'])
    get_user_friendlist_response_model=api_model.get_model("get_user_friendlist_response_model",['friendlist'])
    @user_namespace.route("/<int:user_id>/friendlist")
    class user_friendlist(Resource):
        @user_namespace.expect(get_user_friendlist_parser,validate=False)
        @user_namespace.response(200,'친구의 유저 정보 목록을 불러옵니다.',get_user_friendlist_response_model)
        @user_namespace.response(api_error.authorizaion_error()['status_code'],
                                 '소유물이 아니기에 권한이 없습니다',
                                api_error.authorizaion_error_model())
        @login_required
        def get(self,user_id):
            '''
            id가 user_id인 유저의 친구 정보 목록을 불러옵니다.
            '''
            current_user_id=g.user_id
            
            if current_user_id != user_id:
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            user_friend_info_list=user_service.get_user_friendlist(current_user_id)
            return make_response(jsonify({'friendlist':user_friend_info_list}),200)
    
    post_user_friend_parser=api_parser_module.get_parser(['Authorization'])
    post_user_friend_model=api_model.get_model('post_user_friend_model',['friend_user_id'])
    
    delete_user_friend_parser=api_parser_module.get_parser(['Authorization'])
    delete_user_friend_model=api_model.get_model("delete_user_friend_model",['delete_friend_user_id'])
    
    #input
    # {
    #     'delete_friend_user_id':<int>
    # }
    #output
    # {result}명 삭제 성공
    # '존재하지 않는 유저입니다.'
    @user_namespace.route("/<int:user_id>/friend")
    class user_friend(Resource):
        @user_namespace.expect(delete_user_friend_parser,delete_user_friend_model,validate=False)
        @user_namespace.response(200,'친구를 삭제 하였습니다.')
        @user_namespace.response(api_error.authorizaion_error()['status_code'],
                                 '소유물이 아니기에 권한이 없습니다',
                                api_error.authorizaion_error_model())
        @user_namespace.response(api_error.user_existance_error()['status_code'],
                                 '해당 유저가 존재하지 않습니다.',
                                api_error.user_existance_error_model())
        @login_required
        def delete(self,user_id):
            '''
            id가 user_id인 유저의 친구를 삭제합니다.
            '''
            current_user_id=g.user_id

            if current_user_id != user_id:
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            delete_friend_user_id=request.json['delete_friend_user_id']

            if not user_service.get_user_info(delete_friend_user_id):
                return make_response(jsonify({'message':api_error.user_existance_error()['message']}),
                                     api_error.user_existance_error()['status_code'])
                
            result=user_service.delete_user_friend(current_user_id,delete_friend_user_id)
            return make_response(f"{result}명 삭제 성공")
            
    #input
    # {
    #     'friend_user_id':<int>
    # }
    #output
    # '친구 저장 성공'
    # '친구 저장 실패'
        @user_namespace.expect(post_user_friend_parser,post_user_friend_model,validate=False)
        @user_namespace.response(200,'삭제를 성공하였습니다.')
        @user_namespace.response(api_error.authorizaion_error()['status_code'],
                                 '소유물이 아니기에 권한이 없습니다',
                                api_error.authorizaion_error_model())
        @user_namespace.response(api_error.user_existance_error()['status_code'],
                                 '해당 유저가 존재하지 않습니다.',
                                api_error.user_existance_error_model())
        @user_namespace.response(api_error.friend_existance_error()['status_code'],
                                '이미 친구로 등록되어 있어 실패하였습니다.',
                                api_error.friend_existance_error_model())
        @login_required
        def post(self,user_id):
            '''
            id가 user_id인 유저의 친구를 생성합니다.
            '''
            current_user_id=g.user_id
            friend_user_id=request.json['friend_user_id']
            
            if current_user_id != user_id:
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            if not user_service.get_user_info(friend_user_id):
                return make_response(jsonify({'message':api_error.user_existance_error()['message']}),
                                     api_error.user_existance_error()['status_code'])
            
            if user_service.is_user_friend(current_user_id,friend_user_id):
                return make_response(jsonify({'message':api_error.friend_existance_error()['status_code']}),
                                     api_error.friend_existance_error()['status_code'])
            
            result=user_service.create_user_friend(current_user_id,friend_user_id)

            return make_response(f"{result}명 친구 생성 성공")
    
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
    get_user_roomlist_parser=api_parser_module.get_parser(['Authorization'])
    get_user_roomlist_response_model=api_model.get_model('get_user_roomlist_response_model',['room_info_list'])
    @user_namespace.route("/<int:user_id>/roomlist")
    class user_roomlist(Resource):
        @user_namespace.expect(get_user_roomlist_parser,validate=False)
        @user_namespace.response(200,'방의 정보 목록을 불러옵니다.',get_user_roomlist_response_model)
        @user_namespace.response(api_error.authorizaion_error()['status_code'],
                                 '소유물이 아니기에 권한이 없습니다',
                                api_error.authorizaion_error_model())
        @login_required
        def get(self,user_id):
            '''
            id가 user_id인 유저의 방 정보 목록을 불러옵니다.
            '''
            current_user_id=g.user_id
            
            if current_user_id != user_id:
                return make_response(jsonify({'message':api_error.authorizaion_error()['status_code']}),
                                     api_error.authorizaion_error()['status_code'])
            
            room_info_list=room_service.get_user_roomlist(current_user_id)

            for room_info in room_info_list:
                room_id=room_info['id']
                user_info_list=room_service.get_room_userlist(room_id)
                room_info['userlist']=user_info_list
            
            return make_response(jsonify({'roomlist':room_info_list}),200)
        
    #input
    # {
    #     'delete_user_room_id':'room_id'
    # }
    #output
    # '삭제 성공'
    delete_user_room_parser=api_parser_module.get_parser(['Authorization'])   
    delete_user_room_model=api_model.get_model("delete_user_room_model",['delete_user_room_id'])
    @user_namespace.route("/<int:user_id>/room")
    class user_room(Resource):
        @user_namespace.expect(delete_user_room_parser,delete_user_room_model,validate=False)
        @user_namespace.response(200,'친구 삭제에 성공하였습니다')
        @user_namespace.response(api_error.authorizaion_error()['status_code'],
                                 '소유물이 아니기에 권한이 없습니다',
                                api_error.authorizaion_error_model())
        @login_required
        def delete(self,user_id):
            '''
            id가 user_id인 유저의 id가 room_id인 방을 삭제 합니다.(방 나가기)
            '''
            current_user_id=g.user_id
            
            if current_user_id != user_id:
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            delete_user_room_id=request.json['delete_user_room_id']

            result=room_service.delete_user_room(current_user_id,delete_user_room_id)

            return make_response(f"{result}개 방 삭제 성공",200)