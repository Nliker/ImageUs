from sqlalchemy import text

class RoomModel:
    def __init__(self,database):
        self.db=database
        
    def get_user_roomlist(self,user_id):
    
    def get_room_userlist(self,room_id):
        
    def insert_room(self,user_id):
        
    def insert_room_user(self,room_id,user_id):
    
    def delete_room_user(self,room_id,user_id):