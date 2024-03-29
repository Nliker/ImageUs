import bcrypt
from datetime import datetime, timedelta
import jwt

class UserService:
    def __init__(self,user_dao,settings):
        self.settings=settings
        self.user_dao=user_dao
    '''
    userdao
    get_user_id_and_password(email)->{id,password}
    insert_user(new_user)->new_user_id
    get_user_info(user_id)->{id,name,email,profile}
    insert_user_friend(user_id,friend_user_id)->0 or 1
    get_user_friend(user_id,friend_user_id)->'id':<int>,'friend_user_info':<int> or None
    get_user_frinedlist(user_id)->[
        {
            'id':<int>,
            'name':<str>,
            'email':<str>,
            'profile':<str>
        },
        {
            'id':<int>,
            'name':<str>,
            'email':<str>,
            'profile':<str>
        }
    ]
    delete_user_friend(user_id,delete_friend_user_id)->0 or 1
    '''
    
    async def is_email_exists(self,email):
        user=await self.user_dao.get_user_id_and_password(email)
        #유저가 없다면 False,있으면 True
        if user:
            return True
        else:
            return False
        
    def create_new_user(self,new_user):
        password=new_user['password']
        new_user['hashed_password']=bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
        print(new_user['hashed_password'])
        new_user_id=self.user_dao.insert_user(new_user)
        return new_user_id

    def get_user_info(self,user_id):
        user=self.user_dao.get_user_info(user_id)

        return user

    def login(self,credential):
        user_credential=self.user_dao.get_user_id_and_password(credential['email'])
        authorized=bcrypt.checkpw(credential['password'].encode('utf-8'),user_credential['hashed_password'].encode('utf-8')) if user_credential else None

        return authorized
    
    def generate_access_token(self,user_id):
        print(self.settings)
        jwt_expire_time= timedelta(seconds=self.settings.JWT_EXPIRE_TIME)
        payload={
            'user_id':user_id,
            'exp':datetime.utcnow()+jwt_expire_time,
            'iat':datetime.utcnow()
        }
        access_token=jwt.encode(payload,self.settings.JWT_SECRET_KEY,'HS256')

        return access_token
    
    def get_user_id_and_password(self,email):
        user_credential=self.user_dao.get_user_id_and_password(email)

        return user_credential

    def is_user_friend(self,user_id,friend_user_id):
        result=self.user_dao.get_user_friend(user_id,friend_user_id) and self.user_dao.get_user_friend(friend_user_id,user_id) 
        
        if result:
            return True
        else:
            return False
    
    def create_user_friend(self,user_id,friend_user_id):
        result=self.user_dao.insert_user_friend(user_id,friend_user_id)

        return result
        
    def get_user_friendlist(self,user_id):
        user_friend_info_list=self.user_dao.get_user_friendlist(user_id)

        return user_friend_info_list
        
    def delete_user_friend(self,user_id,delete_friend_user_id):
        result=self.user_dao.delete_user_friend(user_id,delete_friend_user_id)
        return result