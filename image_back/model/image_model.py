from sqlalchemy import text
from sqlalchemy.exc import IntegrityError

class ImageDao:
    def __init__(self,database):
        self.db=database
    def get_image_info(self,user_id,image_link):
        row=self.db.execute(text("""
            select id,user_id,link
            from images
            where user_id=:user_id
            and link=:image_link
            and deleted=0
            """),{'user_id':user_id,'image_link':image_link}).fetchone()
        
        image_info={
            'id':row['id'],
            'user_id':row['user_id'],
            'link':row['link']
        } if row else None

        return image_info
    
    def get_image_info_by_id(self,image_id):
        row=self.db.execute(text("""
            select id,user_id,link,public
            from images
            where id=:image_id
            and deleted=0
            """),{'image_id':image_id}).fetchone()

        image_info={
            'id':row['id'],
            'user_id':row['user_id'],
            'link':row['link'],
            'public':row['public']
        } if row else None
        
        return image_info
    
    def image_room_userlist(self,image_id):
        rows=self.db.execute(text("""
            select
                i_r.room_id as room_id,
                r_u.user_id as user_id
            from images_room_list as i_r
            join rooms_user_list as r_u
            on (i_r.room_id=r_u.room_id
            and i_r.deleted=0
            and r_u.deleted=0)
            where i_r.image_id=:image_id
            """),{'image_id':image_id}).fetchall()

        image_room_userlist=[{
            'room_id':row['room_id'],
            'user_id':row['user_id']
        } for row in rows]

        return image_room_userlist