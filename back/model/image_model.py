from sqlalchemy import text

class ImageDao:
    def __init__(self,database):
        self.db=database

    def insert_image(self,user_id,link):
        row=self.db.execute(text("""
            insert into images(
                user_id,
                link
            ) values (
                :user_id,
                :link
            )
            """),{
                    'user_id':user_id,
                    'link':link
                }).lastrowid
        new_image_id=row
        return new_image_id
    
    def get_user_imagelist(self,user_id):
        rows=self.db.execute(text("""
            select
                i.id,
                i.link,
                i.user_id
            from images as i
            left join users as u
            on i.user_id=:user_id
            and i.user_id=u.id
            """),{
                    'user_id':user_id
                }).fetchall()

        user_image_info_list=[
            {
                'id':user_image_info['id'],
                'link':user_image_info['link'],
                'user_id':user_image_info['user_id']
            } for user_image_info in rows
        ]
        
        return user_image_info_list
    
    def get_image_info(self,image_id):
        row=self.db.execute(text("""
            select
                id,
                link,
                user_id
            from images
            where id=:image_id
            """),{
                    'image_id':image_id
                }).fetchone()

        image_info={
            'id':row['id'],
            'link':row['link'],
            'user_id':row['user_id']
        }

        return image_info
    
    def delete_image(self,delete_image_id):
        row=self.db.execute(text("""
            delete from images
            where id=:delete_image_id
            """),{
                    'delete_image_id':delete_image_id
                }).rowcount

    def get_image_roomlist(self,image_id):
        rows=self.db.execute(text("""
            select
                i_r.room_id as id,
                title,
                host_user_id
            from images_room_list as i_r
            left join rooms as r
            on i_r.image_id=:image_id
            and i_r.room_id=r.id
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

        return row

    def delete_room_image(self,room_id,image_id):
        row=self.db.execute(text("""
            delete from images_room_list
            where image_id=:image_id
            and room_id=:room_id
            """),{
                    'image_id':image_id,
                    'room_id':room_id
                }).rowcount

        return row

    def get_room_imagelist(self,room_id):
        rows=self.db.execute(text("""
            select
                i_r.image_id as id,
                i.link,
                i.user_id
            from images_room_list as i_r
            left join images as i
            on i_r.room_id=:room_id
            and i_r.image_id=i.id
            """),{
                    'room_id':room_id
                }).fetchall()

        room_image_info_list=[{
            'id':room_image_info['id'],
            'link':room_image_info['link'],
            'user_id':room_image_info['user_id']
        } for room_image_info in rows]

        return room_image_info_list