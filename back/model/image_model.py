from sqlalchemy import text
from sqlalchemy.exc import IntegrityError

class ImageDao:
    def __init__(self,database):
        self.db=database

    def insert_image(self,new_image):
        row=self.db.execute(text("""
            insert into images(
                user_id,
                link
            ) values (
                :user_id,
                :link
            )
            """),new_image).lastrowid
        new_image_id=row
        return new_image_id
    
    def get_user_imagelist(self,user_id,pages):
        rows=self.db.execute(text("""
            select
                id,
                link,
                user_id,
                created_at
            from images
            where user_id=:user_id
            and deleted=0
            order by created_at
            limit :start,:limit
            """),{
                    'user_id':user_id,
                    'limit':pages['limit'],
                    'start':pages['start']
                }).fetchall()

        user_image_info_list=[
            {
                'id':user_image_info['id'],
                'link':user_image_info['link'],
                'user_id':user_image_info['user_id'],
                'created_at':user_image_info['created_at']
            } for user_image_info in rows
        ]
        
        return user_image_info_list
    
    def get_image_info(self,image_id):
        row=self.db.execute(text("""
            select
                id,
                link,
                user_id,
                created_at
            from images
            where id=:image_id
            and deleted=0
            """),{
                    'image_id':image_id
                }).fetchone()
        
        image_info={
            'id':row['id'],
            'link':row['link'],
            'user_id':row['user_id'],
            'created_at':row['created_at'],
        } if row else None

        return image_info
    
    def delete_image(self,delete_image_id):
        row=self.db.execute(text("""
            update images
            set deleted=1
            where id=:delete_image_id
            and deleted=0
            """),{
                    'delete_image_id':delete_image_id
                }).rowcount
        return row
    
    def get_image_roomlist(self,image_id):
        rows=self.db.execute(text("""
            select
                i_r.room_id as id,
                r.title,
                r.host_user_id
            from images_room_list as i_r
            left join rooms as r
            on i_r.room_id=r.id
            where i_r.image_id=:image_id
            and r.deleted=0
            and i_r.deleted=0
            order by title
            """),{
                    'image_id':image_id
                }).fetchall()

        image_room_info_list=[{
            'id':image_room_info['id'],
            'title':image_room_info['title'],
            'host_user_id':image_room_info['host_user_id']
        } for image_room_info in rows]

        return image_room_info_list
    
    def insert_room_image(self,room_id,image_id):
        try:
            row=self.db.execute(text("""
            insert into images_room_list(
                image_id,
                room_id
            ) values (
                :image_id,
                :room_id
            )
            """),{
                    'image_id':image_id,
                    'room_id':room_id
                }).rowcount
            return 1
        except IntegrityError as e:
            return 0

    def delete_room_image(self,room_id,image_id):
        row=self.db.execute(text("""
            update images_room_list
            set deleted=1
            where image_id=:image_id
            and room_id=:room_id
            and deleted=0
            """),{
                    'image_id':image_id,
                    'room_id':room_id
                }).rowcount

        return row

    def get_room_imagelist(self,room_id,pages):
        rows=self.db.execute(text("""
            select
                i_r.image_id as id,
                i.link,
                i.user_id,
                u.name,
                i.created_at
            from images_room_list as i_r
            left join images  as i
            on (i_r.image_id=i.id 
            and i_r.deleted=0
            and i.deleted=0)
            left join users as u
            on (i.user_id=u.id)
            where i_r.room_id=:room_id
            order by i_r.created_at
            limit :start,:limit
            """),{
                    'room_id':room_id,
                    'limit':pages['limit'],
                    'start':pages['start']
                }).fetchall()

        room_image_info_list=[{
            'id':room_image_info['id'],
            'link':room_image_info['link'],
            'user_id':room_image_info['user_id'],
            'user_name':room_image_info['name'],
            'created_at':room_image_info['created_at']
        } for room_image_info in rows]

        return room_image_info_list
    
    def delete_room_user_image(self,room_id,user_id):
        row=self.db.execute(text("""
            update images_room_list as i_r
            left join images as i
            on i_r.image_id=i.id
            set i_r.deleted=1
            where i.user_id=:user_id
            and i_r.room_id=:room_id
            and i_r.deleted=0
            """),{'room_id':room_id,'user_id':user_id}).rowcount
        return row
    
    def delete_image_room(self,image_id):
        row=self.db.execute(text("""
            update images_room_list
            set deleted=1
            where image_id=:image_id
            and deleted=0
            """),{'image_id':image_id}).rowcount
        
        return row

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
    
    def get_room_imagelist_len(self,room_id):
        row_count=self.db.execute(text("""
            select
                count(*)
            from images_room_list as i_r
            left join images  as i
            on (i_r.image_id=i.id 
            and i_r.deleted=0
            and i.deleted=0)
            where i_r.room_id=:room_id
            """),{
                    'room_id':room_id
                }).scalar()
        return row_count
    
    def get_user_imagelist_len(self,user_id):
        row_count=self.db.execute(text("""
            select
                count(*)
            from images
            where deleted=0
            and user_id=:user_id
            """),{
                    'user_id':user_id
                }).scalar()
        return row_count
    
    def delete_user_imagelist(self,user_id):
        row=self.db.execute(text("""
            update images
            set deleted=1
            where user_id=:user_id
            and deleted=0
            """),{'user_id':user_id}).rowcount
        
        return row