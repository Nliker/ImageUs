from flask_restx import reqparse,fields
from werkzeug.datastructures import FileStorage

class ParserModule:
    def __init__(self,args):
        self.parser=reqparse.RequestParser()
        if 'Authorization' in args:
            self.parser.add_argument('Authorization',type=str,
                        location='headers',
                        help='access_token',
                        required=False)
        if 'image' in args:
            self.parser.add_argument('image',type=FileStorage,
                            location='files',
                            help='imagefile',
                            required=False)
    def get_parser(self):
        return self.parser

class ApiModel:
    def __init__(self,args):
        self.payload={}
        if 'name' in args:
            self.payload['name']=fields.String(
                default="testname",
                description="str_user_name",
                required=False
            )
        if 'email' in args:
            self.payload['email']=fields.String(
                default="test@test.com",
                description="str_user_email",
                required=False
            )
        if 'profile' in args:
            self.payload['profile']=fields.String(
                default="im testuser",
                description="str_user_profile",
                required=False
            )
        if 'password' in args:
            self.payload['password']=fields.String(
                default="test_password",
                description="str_user_password",
                required=False
            )
        if 'friend_user_id' in args:
            self.payload['friend_user_id']=fields.Integer(
                default=1,
                description="int_friend_user_id",
                required=False
            )
        
        if 'delete_friend_user_id' in args:
            self.payload['delete_friend_user_id']=fields.Integer(
                default=1,
                description="int_delete_user_id",
                required=False
            )
        if 'delete_user_room_id' in args:
            self.payload['delete_user_room_id']=fields.Integer(
                default=1,
                description="int_delete_user_room_id",
                required=False
            )
        if 'userlist' in args:
            self.payload['delete_friend_user_id']=fields.List(
                fields.Integer(),
                default=[1,2,3],
                description="int_user_id_list",
                required=False
            )
    
        if 'title' in args:
            self.payload['title']=fields.String(
                default=1,
                description="str_room_title",
                required=False
            )
        
        if 'delete_room_image_id' in args:
            self.payload['delete_room_image_id']=fields.Integer(
                default=1,
                description="int_delete_room_image_id",
                required=False
            )
        if 'delete_room_user_id' in args:
            self.payload['delete_room_user_id']=fields.Integer(
                default=1,
                description="int_delete_room_user_id",
                required=False
            )
        if 'invite_userlist' in args:
            self.payload['invite_userlist']=fields.List(
                fields.Integer(),
                default=[1,2,3],
                description="int_user_id_list",
                required=False
            )
        if 'delete_image_id' in args:
            self.payload['delete_image_id']=fields.Integer(
                default=1,
                description="int_delete_image_id",
                required=False
            )
        if 'update_roomlist' in args:
            self.payload['update_roomlist']=fields.List(
                fields.Integer(),
                default=[1,2,3],
                description="int_room_id_list",
                required=False
            )
            
    def get_model(self,api,modelname):
        self.api_model=api.model(modelname,self.payload)
        return self.api_model