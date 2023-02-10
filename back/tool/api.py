from flask_restx import reqparse,fields
from werkzeug.datastructures import FileStorage

class ParserModule:
    def get_parser(self,args):
        parser=reqparse.RequestParser()
        if 'Authorization' in args:
            parser.add_argument('Authorization',type=str,
                        location='headers',
                        help='access_token',
                        required=False)
        if 'image' in args:
            parser.add_argument('image',type=FileStorage,
                            location='files',
                            help='imagefile',
                            required=False)
        if 'email' in args:
            parser.add_argument('email',type=str,
                                location='args',
                                help='email_str',
                                required=False)
        if 'start' in args:
            parser.add_argument('start',type=str,
                                location='args',
                                help='page start',
                                required=False)
        if 'limit' in args:
            parser.add_argument('limit',type=str,
                                location='args',
                                help='page limit',
                                required=False)
        
        if 'start_date' in args:
            parser.add_argument('start_date',type=str,
                                location='args',
                                help='start date',
                                required=False)
            
        if 'end_date' in args:
            parser.add_argument('end_date',type=str,
                                location='args',
                                help='end date',
                                required=False)
        
        return parser
    

class ApiModel:
    id=fields.Integer(
                default=1,
                description="int_id",
                required=False
            )
    name=fields.String(
                default="testname",
                description="str_user_name",
                required=False
            )
    
    email=fields.String(
                default="test@test.com",
                description="str_user_email",
                required=False
            )

    profile=fields.String(
                default="im testuser",
                description="str_user_profile",
                required=False
            )
    
    password=fields.String(
                default="test_password",
                description="str_user_password",
                required=False
            )
    
    friend_user_id=fields.Integer(
                default=1,
                description="int_friend_user_id",
                required=False
            )
    
    delete_friend_user_id=fields.Integer(
                default=1,
                description="int_delete_friend_user_id",
                required=False
            )
    
    delete_user_id=fields.Integer(
                default=1,
                description="int_delete_user_id",
                required=False        
    )
    
    delete_user_room_id=fields.Integer(
                default=1,
                description="int_delete_user_room_id",
                required=False
            )
    
    userlist=fields.List(
                fields.Integer(),
                default=[1,2,3],
                description="int_user_id_list",
                required=False
            )
    title=fields.String(
                default=1,
                description="str_room_title",
                required=False
            )

    delete_room_image_id=fields.Integer(
                default=1,
                description="int_delete_room_image_id",
                required=False
            )
    
    delete_room_user_id=fields.Integer(
                default=1,
                description="int_delete_room_user_id",
                required=False
            )
    
    invite_userlist=fields.List(
                fields.Integer(),
                default=[1,2,3],
                description="int_user_id_list",
                required=False
            )
    
    delete_image_id=fields.Integer(
                default=1,
                description="int_delete_image_id",
                required=False
            )
    
    update_roomlist=fields.List(
                fields.Integer(),
                default=[1,2,3],
                description="int_room_id_list",
                required=False
            )
    access_token=fields.String(
            default="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjA0MTI0fQ.fSmmDgTan1cpE1kOK2xM_fM3NzYnN-3EeZgPmbssnsY",
            description='str_access_token',
            required=False
    )
    
    auth_password=fields.String(
            default="1234",
            description='str_auth_password',
            required=False
    )
    
    imagelist_len=fields.Integer(
                default=10,
                description="int_imagelist_len",
                required=False
    )
    
    search_user_info={
                    'id':fields.Integer,
                    'email':fields.String,
                    'name':fields.String
    }
    
    user_info={
                    'id':fields.Integer,
                    'name':fields.String,
                    'email':fields.String,
                    'profile':fields.String
                }
    
    image_info={
                    'id':fields.Integer,
                    'link':fields.String,
                    'user_id':fields.Integer,
                    'created_at':fields.String
                }

    room_info={
                    'id':fields.Integer,
                    'title':fields.String,
                    'host_user_id':fields.String
            }
    success=fields.Integer(
        default=3,
        description='int_success',
        required=False
    )
    
    marker=fields.Integer(
        default=2,
        description='int_marker',
        required=False
    )

    image_room_update_result={
        'addlist':fields.List(fields.Integer),
        'add_result':fields.Integer,
        'deletelist':fields.List(fields.Integer),
        'delete_result':fields.Integer
    }
    
    read_history_row=fields.Integer(
                default=23,
                description="int_user_read_room_history_row",
                required=False
            )
    
    
    def __init__(self,api):
        self.api=api
        
    def get_model(self,modelname,args):
        payload={}
        if 'id' in args:
            payload['id']=self.id
        
        if 'name' in args:
            payload['name']=self.name
            
        if 'email' in args:
            payload['email']=self.email

        if 'profile' in args:
            payload['profile']=self.profile
            
        if 'password' in args:
            payload['password']=self.password
            
        if 'friend_user_id' in args:
            payload['friend_user_id']=self.friend_user_id
        
        if 'delete_friend_user_id' in args:
            payload['delete_friend_user_id']=self.delete_friend_user_id

        if 'delete_user_room_id' in args:
            payload['delete_user_room_id']=self.delete_user_room_id

        if 'delete_user_id' in args:
            payload['delete_user_id']=self.delete_user_id

        if 'userlist' in args:
            payload['userlist']=self.userlist
    
        if 'title' in args:
            payload['title']=self.title
        
        if 'delete_room_image_id' in args:
            payload['delete_room_image_id']=self.delete_room_image_id

        if 'delete_room_user_id' in args:
            payload['delete_room_user_id']=self.delete_room_user_id

        if 'invite_userlist' in args:
            payload['invite_userlist']=self.invite_userlist

        if 'delete_image_id' in args:
            payload['delete_image_id']=self.delete_image_id
            
        if 'update_roomlist' in args:
            payload['update_roomlist']=self.update_roomlist
            
        if 'auth_password' in args:
            payload['auth_password']=self.auth_password
            
        if 'read_history_row' in args:
            payload['read_history_row']=self.read_history_row
            
        if 'imagelist_len' in args:
            payload['imagelist_len']=self.imagelist_len  

        if 'imagelist' in args:
            payload['imagelist']=fields.List(
                fields.Nested(self.api.model("image_model",self.image_info)),
                default=[{
                    'id':1,
                    'link':'11/example1.jpg',
                    'user_id':1,
                    'created_at':'2023-01-01 01:01:01 UTC+09:00'
                },{
                    'id':2,
                    'link':'20/example2.jpg',
                    'user_id':1,
                    'created_at':'2023-01-01 10:10:10 UTC+09:00'
                }],
                required=False
            )
            
        if 'user_info' in args:
            payload['user_info']=fields.Nested(self.api.model("user_info_model",
                self.user_info),
                default={
                    'id':1,
                    'name':'testuser1',
                    'email':'test1user@test.com',
                    'profile':'testuser1'
                },
                required=False
            )
            
        if 'user_info_list' in args:
            payload['userlist']=fields.List(
                fields.Nested(self.api.model("user_info_model",
                self.user_info)),
                default=[{
                    'id':1,
                    'name':'testuser1',
                    'email':'test1user@test.com',
                    'profile':'testuser1'
                },{
                    'id':2,
                    'name':'testuser2',
                    'email':'test2user@test.com',
                    'profile':'testuser2'
                }],
                required=False
            )
        
        if 'friendlist' in args:
            payload['firendlist']=fields.List(
                fields.Nested(self.api.model("user_info_model",
                self.user_info)),
                default=[{
                    'id':1,
                    'name':'testuser1',
                    'email':'test1user@test.com',
                    'profile':'testuser1'
                },{
                    'id':2,
                    'name':'testuser2',
                    'email':'testuser2@test.com',
                    'profile':'testuser2'
                }],
                required=False
            )

        if 'access_token' in args:
            payload['access_token']=self.access_token

        if 'room_info_list' in args:
            user_info_list=fields.List(
                fields.Nested(self.api.model("user_info_model",
                self.user_info)))
            room_info={**self.room_info,'userlist':user_info_list}

            payload['roomlist']=fields.List(
                fields.Nested(self.api.model("room_info_list_model",
                room_info)),
                default=[{
                    'id':1,
                    'title':'서울여행',
                    'host_user_id':1,
                    'userlist':[{
                        'id':1,
                        'name':'testuser1',
                        'email':'testuser1@test.com',
                        'profile':'im testuser1'
                    },{
                        'id':2,
                        'name':'testuser2',
                        'email':'testuser2@test.com',
                        'profile':'im testuser2'
                    }]
                },{
                    'id':3,
                    'title':'부산여행',
                    'host_user_id':4,
                    'userlist':[{
                        'id':4,
                        'name':'testuser4',
                        'email':'testuser4@test.com',
                        'profile':'im testuser4'
                    },{
                        'id':3,
                        'name':'testuser3',
                        'email':'testuser3@test.com',
                        'profile':'im testuser3'
                    }]
                }],
                required=False
            )
            
        if 'room_info' in args:
            payload['room_info']=fields.Nested(self.api.model("room_info_model",
            self.room_info 
            ),
            default={
                'id':2,
                'title':'경주여행',
                'host_user_id':3
            },
            required=False)
        
        if 'image_info' in args:
            payload['image_info']=fields.Nested(self.api.model("image_info_model",
            self.image_info
            ),
            default={
                'id':3,
                'link':'30/example3.jpg',
                'user_id':2,
                'created_at':'2023-01-01 10:10:10 UTC+09:00'
            },
            required=False
            )
        
        if 'success' in args:
            payload['success']=self.success
        
        if 'update_image_room_result' in args:
            payload['result']=fields.Nested(self.api.model("update_image_room_result",
            self.image_room_update_result
            ),
            default={
                'addlist':[1,3,5],
                'add_result':3,
                'deletelist':[2,5],
                'delete_list':2
            },
            required=False)
            
        if 'user_search_result' in args:
            payload['result']=fields.List(
                fields.Nested(self.api.model("user_search_result",
                self.search_user_info)),
                default=[
                    {
                        'id':3,
                        'name':'testuser3',
                        'email':'testuser3@test.com'
                    },
                    {
                        'id':5,
                        'name':'testuser5',
                        'email':'testuser5@test.com'
                    },
                    {
                        'id':6,
                        'name':'testuser6',
                        'email':'testuser6@test.com'
                    }
                ],
                required=False
            )
        if 'marker' in args:
            payload['marker']=self.marker
    
        api_model=self.api.model(modelname,payload)
        
        return api_model
        
class ApiError:
    errors={
        'email_existance_sign_up_error':{
            'message':"이메일이 이미 존재합니다.",
            'status_code':402
        },
        'email_existance_login_error':{
            'message':"이메일이 존재하지 않습니다.",
            'status_code':404
        },
        'user_existance_error':{
            'message':"해당 유저가 존재하지 않습니다.",
            'status_code':404
        },
        'credential_error':{
            'message':"비밀번호가 일치하지 않습니다.",
            'status_code':401
        },
        'authorizaion_error':{
            'message':"권한이 없습니다.",
            'status_code':403
        },
        'friend_existance_error':{
            'message':"이미 친구인 유저입니다.",
            'status_code':402
        },
        'file_missing_error':{
            'message':"file is missing.",
            'status_code':404
        },
        'image_existance_error':{
            'message':"이미지가 존재하지 않습니다.",
            'status_code':404
        },
        'room_existance_error':{
            'message':"방이 존재하지 않습니다.",
            'status_code':404
        },
        'room_user_error':{
            'message':"방의 유저가 아닙니다.",
            'status_code':403
        },
        'user_search_no_arg_error':{
            'message':"email성분이 존재하지 않습니다.",
            'status_code':400
        },
        'user_email_existance_auth_error':{
            'message':"해당 이메일은 이미 가입된 이메일입니다.",
            'status_code':402
        },
        'user_email_get_auth_error':{
            'message':"인증번호를 발급해주세요.",
            'status_code':404
        },
        'user_email_auth_password_error':{
            'message':"인증번호가 일치하지 않습니다.",
            'status_code':401
        },
        'email_auth_expire_error':{
            'message':"인증번호가 만료되었습니다.",
            'status_code':401
        },
        'user_email_auth_activate_error':{
            'message':"먼저 이메일 인증을 진행해 주세요",
            'status_code':401
        }
        
    }
    
    def __init__(self,api):
        self.api=api
        
    def email_existance_sign_up_error(self):
        return self.errors['email_existance_sign_up_error']
    
    def email_existance_sign_up_error_model(self):
        return self.api.model('email_existance_sign_up_error_model',{'message':fields.String(self.errors['email_existance_sign_up_error']['message'])})
    
    def email_existance_login_error(self):
        return self.errors['email_existance_login_error']
    
    def email_existance_login_error_model(self):
        return self.api.model('email_existance_login_error_model',{'message':fields.String(self.errors['email_existance_login_error']['message'])})
            
    
    def user_existance_error(self):
        return self.errors['user_existance_error']
    
    def user_existance_error_model(self):
        return self.api.model('user_existance_error_model',{'message':fields.String(self.errors['user_existance_error']['message'])})

    
    def credential_error(self):
        return self.errors['credential_error']
    
    def credential_error_model(self):
        return self.api.model('credential_error_model',{'message':fields.String(self.errors['credential_error']['message'])})

    def authorizaion_error(self):
        return self.errors['authorizaion_error']
    
    def authorizaion_error_model(self):
        return self.api.model('authorizaion_error_model',{'message':fields.String(self.errors['authorizaion_error']['message'])})
                 
    def friend_existance_error(self):
        return self.errors['friend_existance_error']
    
    def friend_existance_error_model(self):
        return self.api.model('friend_existance_error_model',{'message':fields.String(self.errors['friend_existance_error']['message'])})
                  
    def file_missing_error(self):
        return self.errors['file_missing_error']
    
    def file_missing_error_model(self):
        return self.api.model('file_missing_error_model',{'message':fields.String(self.errors['file_missing_error']['message'])})
          
    def image_existance_error(self):
        return self.errors['image_existance_error']
    
    def image_existance_error_model(self):
        return self.api.model('image_existance_error_model',{'message':fields.String(self.errors['image_existance_error']['message'])})
                    
    def room_existance_error(self):
        return self.errors['room_existance_error']
    
    def room_existance_error_model(self):
        return self.api.model('room_existance_error_model',{'message':fields.String(self.errors['room_existance_error']['message'])})
               
    def room_user_error(self):
        return self.errors['room_user_error']
    
    def room_user_error_model(self):
        return self.api.model('room_user_error_model',{'message':fields.String(self.errors['room_user_error']['message'])})    
    
    def user_search_no_arg_error(self):
        return self.errors['user_search_no_arg_error']

    def user_search_no_arg_error_model(self):
        return self.api.model('user_search_no_arg_model',{'message':fields.String(self.errors['user_search_no_arg_error']['message'])}) 
    
    def user_email_existance_auth_error(self):
        return self.errors['user_email_existance_auth_error']
    
    def user_email_existance_auth_error_model(self):
        return self.api.model('user_email_existance_auth_error_model',{'message':fields.String(self.errors['user_email_existance_auth_error']['message'])})
    
    def user_email_get_auth_error(self):
        return self.errors['user_email_get_auth_error']
    
    def user_email_get_auth_error_model(self):
        return self.api.model('user_email_get_auth_error_model',{'message':fields.String(self.errors['user_email_get_auth_error']['message'])})
    
    def user_email_auth_password_error(self):
        return self.errors['user_email_auth_password_error']
    
    def user_email_auth_password_error_model(self):
        return self.api.model('user_email_auth_password_error_model',{'message':fields.String(self.errors['user_email_auth_password_error']['message'])})
    
    def email_auth_expire_error(self):
        return self.errors['email_auth_expire_error']

    def email_auth_expire_error_model(self):
        return self.api.model('email_auth_expire_error_model',{'message':fields.String(self.errors['email_auth_expire_error']['message'])})
    
    def user_email_auth_activate_error(self):
        return self.errors['user_email_auth_activate_error']

    def user_email_auth_activate_error_model(self):
        return self.api.model('user_email_auth_activate_error_model',{'message':fields.String(self.errors['user_email_auth_activate_error']['message'])})