from flask import request,jsonify,make_response,redirect,url_for
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from auth import login_required,g

from flask_restx import Resource,Namespace

from tool import ParserModule,ApiModel,ApiError

user_namespace=Namespace('user',description='유저의 정보를 생성,호출,수정,삭제 합니다.')

def user_router(app,api,services,config,es):
    user_service=services.user_service
    image_service=services.image_service
    room_service=services.room_service

    api.add_namespace(user_namespace,'')
    api_error=ApiError(user_namespace)
    api_model=ApiModel(user_namespace)
    api_parser_module=ParserModule()
    
    #input
    #output
    # {
    #     'result':[
    #         {
    #             'id':2,
    #             'email':'test1@test.com'
    #         },
    #         {
    #             'id':3,
    #             'email':'test3@test.com',
    #         }
    #     ]
    # }
    
    get_user_search_parser=api_parser_module.get_parser(['email'])
    get_user_search_response_model=api_model.get_model("get_user_search_response_model",['user_search_result'])
    @user_namespace.route("/search")
    class user_search(Resource):
        @user_namespace.expect(get_user_search_parser,validate=False)
        @user_namespace.response(200,'검색한 유저의 정보를 반환합니다.',get_user_search_response_model)
        @user_namespace.response(api_error.user_search_no_arg_error()['status_code'],
                                 '해당 필드가 없습니다.',
                                 api_error.user_search_no_arg_error_model())
        def get(self):
            if 'email' not in request.args:
                print(api_error.user_search_no_arg_error()['message'])
                return make_response(jsonify({'message':api_error.user_search_no_arg_error()['message']}),
                                     api_error.user_search_no_arg_error()['status_code'])
            query=request.args['email']
            tokens=query.split(" ")
            not_allow_tokens=['',' ']
            tokens=[token for token in tokens if token not in not_allow_tokens]
            
            if(len(tokens)>=1):    
                terms=[
                    {
                        'term':{
                            "email":token 
                        }
                    } for token in tokens
                ]
                print(terms)
                
                payload={   
                            "_source":  ["email","name"],
                            "size":config['ELASTIC_MAX_SIZE'],
                            "query": {
                                "bool": {
                                    "must":terms
                                }
                            },
                            "sort":[
                                {
                                    "email.keyword":"asc",
                                    "_score":{
                                        "order":"desc"
                                    }
                                }
                            ]
                        }
                resp=es.search(index=config['ELASTIC_INDEX'],body=payload)
                print(resp)
                search_result=[{'id':result['_id'],'email':result['_source']['email'],'name':result['_source']['name']} for result in resp['hits']['hits']]
                return make_response(jsonify({'result':search_result}),200)
            else:
                return make_response(jsonify({'result':[]}),200)


    
    #input
    #query ->email='tjwjdgus83@naver.com'
    #output
    # '1 send mail success'
    get_user_email_auth=api_parser_module.get_parser(['email'])
    
    post_user_email_auth_model=api_model.get_model("post_user_email_auth_model",['auth_password'])
    post_user_email_auth=api_parser_module.get_parser(['email'])
    @user_namespace.route("/auth")
    class email_auth(Resource):
        @user_namespace.expect(get_user_email_auth,validate=False)
        @user_namespace.response(200,"1 send mail success")
        @user_namespace.response(api_error.user_search_no_arg_error()['status_code'],
                                 '해당 필드가 없습니다.',
                                 api_error.user_search_no_arg_error_model())
        @user_namespace.response(api_error.user_email_existance_auth_error()['status_code'],
                                 '해당 필드가 없습니다.',
                                 api_error.user_email_existance_auth_error_model())
        def get(self):
            
            if 'email' not in request.args:
                print(api_error.user_search_no_arg_error()['message'])
                return make_response(jsonify({'message':api_error.user_search_no_arg_error()['message']}),
                                     api_error.user_search_no_arg_error()['status_code'])
            email=request.args['email']
            print(email)
            if user_service.is_email_exists(email):
                return make_response(jsonify({'message':api_error.user_email_existance_auth_error()['message']}),
                                     api_error.user_email_existance_auth_error()['status_code'])
            
            auth_password=user_service.generate_auth_password()

            if user_service.get_email_auth_info(email):
                user_service.initiate_email_auth(email,auth_password)

            else:
                user_service.create_new_email_auth(email,auth_password)

            send_result=user_service.send_email_auth_password(email,auth_password)

            return make_response(jsonify({'result':f'{send_result} send mail success'}))
        
        #input
        #query ->email='tjwjdgus83@naver.com'
        # {
        #     'auth_password':'1234'
        # }
        #output
        # 'tjwjdgus83@naver.com auth success'
        @user_namespace.expect(post_user_email_auth,post_user_email_auth_model,validate=False)
        @user_namespace.response(200,"email:test@test.com has auth success")
        @user_namespace.response(api_error.user_search_no_arg_error()['status_code'],
                                 '해당 필드가 없습니다.',
                                 api_error.user_search_no_arg_error_model())
        @user_namespace.response(api_error.user_email_get_auth_error()['status_code'],
                                 '먼저 인증번호 발급이 필요합니다.',
                                 api_error.user_email_get_auth_error_model())
        @user_namespace.response(api_error.user_email_auth_password_error()['status_code'],
                                 "인증번호가 일치하지 않습니다.",
                                 api_error.user_email_auth_password_error_model())
        def post(self):    
            if 'email' not in request.args:
                return make_response(jsonify({'message':api_error.user_search_no_arg_error()['message']}),
                                     api_error.user_search_no_arg_error()['status_code'])

            email=request.args['email']
            auth_credential=request.json
            auth_password=auth_credential['auth_password']

            if not user_service.get_email_auth_info(email):
                return make_response(jsonify({'message':api_error.user_email_get_auth_error()['message']}),
                                     api_error.user_email_get_auth_error()['status_code'])
            if user_service.is_email_auth_expired(email):
                 return make_response(jsonify({'message':api_error.email_auth_expire_error()['message']}),
                                     api_error.email_auth_expire_error()['status_code'])

            authorized=user_service.authorize_email_auth(email,auth_password)

            if authorized==False:
                return make_response(jsonify({'message':api_error.user_email_auth_password_error()['message']}),
                                     api_error.user_email_auth_password_error()['status_code'])
            
            result=user_service.activate_email_auth(email)
            
            return make_response(jsonify({'result':f'email:{email} has auth success'}))        

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
        @user_namespace.response(api_error.user_email_get_auth_error()['status_code'],
                                 '이메일 인증 비밀번호를 먼저 발급해주세요.',
                                 api_error.user_email_get_auth_error_model())     
        @user_namespace.response(api_error.user_email_auth_activate_error()['status_code'],
                                 '이메일 비밀번호 인증을 먼저 진행해주세요.',
                                 api_error.user_email_auth_activate_error_model())
        def post(self):
            '''
            회원가입을 합니다.
            '''
            new_user=request.json

            if user_service.is_email_exists(new_user['email']):
                return make_response(jsonify({'message':api_error.email_existance_sign_up_error()['message']}),
                                     api_error.email_existance_sign_up_error()['status_code'])
                                     
            email_auth_info=user_service.get_email_auth_info(new_user['email'])

            if email_auth_info==None:
                return make_response(jsonify({'message':api_error.user_email_get_auth_error()['message']}),
                                     api_error.user_email_get_auth_error()['status_code'])
            
            if email_auth_info['activated']==0:
                return make_response(jsonify({'message':api_error.user_email_auth_activate_error()['message']}),
                                     api_error.user_email_auth_activate_error()['status_code'])
            
            new_user_id=user_service.create_new_user(new_user)
            user_info=user_service.get_user_info(new_user_id)
            
            return make_response(jsonify({'user_info':user_info}))

        
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
        @login_required
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
    #output
    # {
    #     'user_info':{
    #         'id':1,
    #         'name':'test1',
    #         'email':'test1@test.com',
    #         'profile':'test1user'
    #     }
    # }
    get_my_response_model_parser=api_parser_module.get_parser(['Authorization'])
    get_my_response_model=api_model.get_model('get_my_response_model',['user_info'])
    
    @user_namespace.route("/my")
    class my(Resource):
        @user_namespace.expect(get_my_response_model_parser,validate=False)
        @user_namespace.response(200,'유저의 정보를 반환합니다.',get_my_response_model)
        @user_namespace.response(api_error.user_existance_error()['status_code'],
                                 '해당 유저가 존재하지 않습니다.',
                                api_error.user_existance_error_model())
        @login_required
        def get(self):
            '''
            현재 로그인된 유저의 정보를 불러옵니다.
            '''
            current_user_id=g.user_id
            user_info=user_service.get_user_info(current_user_id)
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
                return make_response(jsonify({'access_token':access_token,'user_id':user_credential['id']}))
            
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
    get_user_imagelist_parser=api_parser_module.get_parser(['Authorization','start','limit'])
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
            current_user_id=g.user_id
            
            #current_usre_id와 user_id를 따로 받으면 추후 누가 조회 했는지 알 수 있음
            if current_user_id != user_id:
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            image_list=image_service.get_user_imagelist(current_user_id,pages)

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
                return make_response(jsonify({'message':api_error.friend_existance_error()['message']}),
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