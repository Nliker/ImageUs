from flask_restx import reqparse

class ParserModule:
    def __init__(self,api,args):
        self.api=api
        self.parser=reqparse.RequestParser()

        if 'Authorization in args':
            self.parser.add_argument('Authorization',type=str,
                        location='headers',
                        helsp='access_token')
        
        if 'name' in args:
            self.parser.add_argument('name',type=str,
                        location='json',
                        help='str_name')
        
        if 'email' in args:
            self.parser.add_argument('email',type=str,
                        location='json',
                        help='str_email')
        
        if 'profile' in args:
            self.parser.add_argument('profile',type=str,
                        location='json',
                        help='str_profile')
        
        if 'password' in args:
            self.parser.add_argument('password',type=str,
                        location='json',
                        help='str_password')
        
        if 'friend_user_id' in args:
            self.parser.add_argument('friend_user_id',type=int,
                        location='json',
                        help='int_friend_user_id')
        
        if 'delete_friend_user_id' in args:
            self.parser.add_argument('delete_friend_user_id',type=int,
                        location='json',
                        help='int_delete_friend_user_id')
        
        if 'delete_user_room_id' in args:
            self.parser.add_argument('delete_user_room_id',tpye=int,
                        location='json',
                        help='int_delete_user_room_id')
        
        