class UserService:
    def __init__(self,user_dao,config):
        self.config=config
        self.user_dao=user_dao
    '''
    userdao
    
    '''
    
    def is_email_exists(self,email):

    def create_new_user(self,new_user):
    
    def is_user_exists(self,user_id):
        
    def get_user_info(self,user_id):
        
    def login(self,credential):
        
    def generate_access_token(self,user_id):
        
    def get_user_id_and_password(self,email):
        
    def create_user_friend(self,user_id,friend_user_id):
        
    def get_user_friendlist(self,user_id):
        
    def delete_user_friend(self,user_id,friend_user_id):