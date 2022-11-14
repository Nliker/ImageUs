from sqlalchemy import text

class RoomDao:
    def __init__(self,database):
        self.db=database
        
    def insert_room(self,user_id,title):
        row=self.db.execute(text("""
            insert into rooms(
                title,
                host_user_id
            ) values (
                :title,
                :user_id
            )
            """),{
                    'user_id':user_id,
                    'title':title
                }).lastrowid
        new_room_id=row

        return new_room_id
    def get_room_info(self,room_id):
        row=self.db.execute(text("""
            select
                id,
                title,
                host_user_id
            from rooms
            where id=:room_id
            """),{
                    'room_id':room_id
                }).fetchone()
        room_info={
            'id':row['id'],
            'title':row['title'],
            'host_user_id':row['host_user_id']
        }
        return room_info
        
    def get_user_roomlist(self,user_id):
        rows=self.db.execute(text("""
            select
                r_u.id,
                r.title,
                r.host_user_id
            from rooms_user_list as r_u
            left join rooms as r
            on r_u.user_id=:user_id
            and r_u.id=r.id
            """),{
                    'user_id':user_id
                }).fetchall()
        
        user_room_info_list=[{
            'id':user_room_info['id'],
            'title':user_room_info['title'],
            'host_user_id':user_room_info['host_user_id']    
        } for user_room_info in rows]

        return user_room_info_list
        
    def get_room_userlist(self,room_id): 
        rows=self.db.execute(text("""
            select
                r_u.user_id as id,
                u.name,
                u.email,
                u.profile
            from rooms_user_list as r_u
            left join users as u
            on r_u.id=:room_id
            and r_u.user_id=u.id                    
            """),{
                'room_id':room_id
            }).fetchall()
        
        room_user_info_list=[{
            'id':room_user_info['id'],
            'name':room_user_info['name'],
            'email':room_user_info['email'],
            'profile':room_user_info['profile']
        } for room_user_info in rows]

        return room_user_info_list

    def insert_room_user(self,room_id,user_id):
        row=self.db.execute(text("""
                insert into rooms_user_list(
                    room_id,
                    user_id
                ) values (
                    :room_id,
                    :user_id
                )
            """),{
                    'room_id':room_id,
                    'user_id':user_id
                }).rowcount

        return row

    def delete_room_user(self,room_id,user_id):
        row=self.db.execute(text("""
            delete from rooms_user_list
            where room_id=:room_id
            and user_id=:user_id
            """),{
                    'room_id':room_id,
                    'user_id':user_id
                }).rowcount

        return row