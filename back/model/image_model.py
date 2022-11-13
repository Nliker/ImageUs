from sqlalchemy import text

class ImageService:
    def __init__(self,database):
        self.db=database
    
    def get_user_imagelist(self,user_id):
    
    def insert_image(self,user_id,link):
    
    def get_image_info(self,image_id):
        
    def delete_image(self,delete_image_id):
    
    def get_image_roomlist(self,image_id):
    
    def insert_room_image(self,room_id,new_image_id):
    
    def delete_room_image(self,room_id,image_id):
    
    def get_room_imagelist(self,room_id):
        