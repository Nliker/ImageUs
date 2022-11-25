from flask_restx import reqparse
from werkzeug.datastructures import FileStorage

class ParserModule:
    def __init__(self,args):
        self.parser=reqparse.RequestParser()

        if 'Authorization in args':
            self.parser.add_argument('Authorization',type=str,
                        location='headers',
                        helsp='access_token',
                        required=False)
        
        if 'name' in args:
            self.parser.add_argument('name',type=str,
                        location='json',
                        help='str_name',
                        required=False)
        
        if 'email' in args:
            self.parser.add_argument('email',type=str,
                        location='json',
                        help='str_email',
                        required=False)
        
        if 'profile' in args:
            self.parser.add_argument('profile',type=str,
                        location='json',
                        help='str_profile',
                        required=False)
        
        if 'password' in args:
            self.parser.add_argument('password',type=str,
                        location='json',
                        help='str_password',
                        required=False)
        
        if 'friend_user_id' in args:
            self.parser.add_argument('friend_user_id',type=int,
                        location='json',
                        help='int_friend_user_id',
                        required=False)
        
        if 'delete_friend_user_id' in args:
            self.parser.add_argument('delete_friend_user_id',type=int,
                        location='json',
                        help='int_delete_friend_user_id',
                        required=False)
        
        if 'delete_user_room_id' in args:
            self.parser.add_argument('delete_user_room_id',tpye=int,
                        location='json',
                        help='int_delete_user_room_id',
                        required=False)
        
        if 'userlist' in args:
            self.parser.add_argument('userlist[]',type=int,action='append',
                        location='json',
                        help='int_array_userlist',
                        required=False)
    
        if 'title' in args:
            self.parser.add_argument('title',type=str,
                        location='json',
                        help='str_title',
                        required=False)

        if 'image' in args:
            self.parser.add_argument('image',type=FileStorage,
                            location='files',
                            help='imagefile',
                            required=False)
        
        if 'delete_room_image_id' in args:
            self.parser.add_argument('delete_room_image_id',type=int,
                        location='json',
                        help='int_delete_room_image_id',
                        required=False)
            
        if 'delete_room_user_id' in args:
            self.parser.add_argument('delete_room_user_id',type=int,
                        location='json',
                        help='int_delete_room_user_id',
                        required=False)
                
        if 'invite_userlist' in args:
            self.parser.add_argument('invite_userlist[]',
                        type=int,
                        action='append',
                        location='json',
                        help='int_array_invite_userlist',
                        required=False)

        if 'delete_image_id' in args:
            self.parser.add_argument('delete_image_id',
                        type=int,
                        location='json',
                        help='int_delete_image_id',
                        required=False)
        
        if 'update_roomlist' in args:
            self.parser.add_argument('update_roomlist',
                        type=int,
                        action='append',
                        loacation='json',
                        help='int_array_update_roomlist',
                        required=False)
            
        return self.parser
            
        