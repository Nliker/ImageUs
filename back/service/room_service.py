class RoomService:
    def __init__(self,room_dao,config):
        self.config=config
        self.room_dao=room_dao
    '''
    roomdao
    get_user_roomlist(user_id)->[
        {
            'id':<int>,
            'title':<str>,
            'host_user_id':<int>
        },
        {
            'id':<int>,
            'title':<str>,
            'host_user_id':<int>
        }
    ]
    get_room_userlist(self,room_id)->[
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
    delete_user_room(user_id,room_id)->0 or 1
    is_room_exists(room_id)
    delete_user_room(current_user_id,room_id)
    get_user_roomlist(current_user_id)
    is_room_exists(room_id)
    delete_user_room(current_user_id,room_id)
    '''
    
    def create_room(self,user_id):
        new_room_id=self.room_dao.insert_room(user_id)
        return new_room_id
    
    def get_room_info(self,room_id):
        return self.room_dao.get_room_info(room_id)
    
    def get_user_roomlist(self,user_id):
        room_info_list=self.room_dao.get_user_roomlist(user_id)

        return room_info_list
    #한 유저가 방을 나감
    def delete_user_room(self,user_id,room_id):
        result=self.room_dao.delete_user_room(user_id,room_id)
        return result

    def create_room_users(self,room_id,userlist):
        result=0
        for user_id in userlist:
            result+=self.room_dao.insert_room_user(room_id,user_id)
            
        return result
    
    def is_room_user(self,room_id,user_id):
        result=self.room_dao.get_room_user(room_id,user_id)
        if result:
            return True
        else:
            return False
    
    def get_room_userlist(self,room_id):
        userlist=self.room_dao.get_room_userlist(room_id)
        return userlist
    
    def delete_room_user(self,room_id,user_id):
        result=self.room_dao.delete_room_user(room_id,user_id)
        return result