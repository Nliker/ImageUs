from sqlalchemy import text
from sqlalchemy.exc import IntegrityError

class RoomDao:
    def __init__(self,database):
        self.db=database
        
    def insert_room(self,new_room):
        result=self.db.execute(text("""
            insert into rooms(
                title,
                host_user_id
            ) values (
                :title,
                :user_id
            )
            """),new_room)
        row=result.lastrowid
        result.close()
        new_room_id=row

        return new_room_id
    
    def get_room_info(self,room_id):
        result=self.db.execute(text("""
            select
                id,
                title,
                host_user_id
            from rooms
            where id=:room_id
            and deleted=0
            """),{
                    'room_id':room_id
                })
        row=result.fetchone()
        result.close()

        room_info={
            'id':row['id'],
            'title':row['title'],
            'host_user_id':row['host_user_id']
        } if row else None
        return room_info
        
    def get_user_roomlist(self,user_id):
        result=self.db.execute(text("""
            select
                r_u.room_id as id,
                r.title,
                r.host_user_id
            from rooms_user_list as r_u
            left join rooms as r
            on r_u.room_id=r.id 
            where r_u.user_id=:user_id
            and r.deleted=0
            and r_u.deleted=0
            """),{
                    'user_id':user_id
                })
        rows=result.fetchall()
        result.close()
        
        user_room_info_list=[{
            'id':user_room_info['id'],
            'title':user_room_info['title'],
            'host_user_id':user_room_info['host_user_id']    
        } for user_room_info in rows]

        return user_room_info_list
        
    def get_room_userlist(self,room_id): 
        result=self.db.execute(text("""
            select
                r_u.user_id as id,
                u.name,
                u.email,
                u.profile
            from rooms_user_list as r_u
            left join users as u
            on r_u.user_id=u.id
            where r_u.room_id=:room_id
            and u.deleted=0
            and r_u.deleted=0
            """),{
                'room_id':room_id
            })
        rows=result.fetchall()
        result.close()
        
        room_user_info_list=[{
            'id':room_user_info['id'],
            'name':room_user_info['name'],
            'email':room_user_info['email'],
            'profile':room_user_info['profile']
        } for room_user_info in rows]

        return room_user_info_list

    def insert_room_user(self,room_id,user_id):
        try:
            result=self.db.execute(text("""
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
                })
            row=result.rowcount
            result.close()
            return 1
        except IntegrityError as e:
            return 0

    def delete_room_user(self,room_id,user_id):
        result=self.db.execute(text("""
            update rooms_user_list
            set deleted=1
            where (room_id=:room_id
            and user_id=:user_id)
            and deleted=0
            """),{
                    'room_id':room_id,
                    'user_id':user_id
                })
        row=result.rowcount
        result.close()

        return row
    
    def get_room_user(self,room_id,user_id):
        result=self.db.execute(text("""
            select
                room_id,
                user_id
            from rooms_user_list
            where room_id=:room_id
            and user_id=:user_id
            """),{'room_id':room_id,'user_id':user_id})
        row=result.fetchone()
        result.close()

        room_user={
            'room_id':row['room_id'],
            'user_id':row['user_id']
        }if row else None

        return room_user

    def insert_room_user_history(self,room_id,user_id):
        result=self.db.execute(text("""
            insert into rooms_user_history(
                user_id,
                room_id
            ) values (
                :user_id,
                :room_id
            )
            """),{'user_id':user_id,'room_id':room_id})
        row=result.rowcount
        result.close()
        
        return row
    
    def get_room_user_history_info(self,room_id,user_id):
        result=self.db.execute(text("""
            select *
            from rooms_user_history
            where room_id=:room_id
            and user_id=:user_id
            """),{'room_id':room_id,'user_id':user_id})
        row=result.fetchone()
        result.close()
        
        user_read_history={
            'user_id':row['user_id'],
            'room_id':row['room_id'],
            'last_unread_row':row['last_unread_row'],
            'read_start_row':row['read_start_row'],
            'marker_row':row['marker_row']
        } if row else None

        return user_read_history

    def update_room_user_history_start(self,room_id,user_id,images_len):

        result=self.db.execute(text("""
            update rooms_user_history
            set marker_row=:images_len-last_unread_row
            ,last_unread_row=:images_len
            ,read_start_row=:images_len-1
            where room_id=:room_id
            and user_id=:user_id
            and deleted=0            
        """),{'room_id':room_id,'user_id':user_id,'images_len':images_len})
        row=result.rowcount
        result.close()

        return row
        
    def update_room_user_history_last_unread_row(self,room_id,user_id,last_unread_row):
        result=self.db.execute(text("""
            update rooms_user_history
            set last_unread_row=:last_unread_row
            where room_id=:room_id
            and user_id=:user_id
            and deleted=0
        """),{'room_id':room_id,'user_id':user_id,'last_unread_row':last_unread_row})
        row=result.rowcount
        result.close()
        
        return row
    
    def delete_user_rooms(self,user_id):
        result=self.db.execute(text("""
            update rooms_user_list
            set deleted=1
            where user_id=:user_id
            and deleted=0
        """),{'user_id':user_id})
        row=result.rowcount
        result.close()

        return row

    def delete_user_room_history(self,user_id):
        result=self.db.execute(text("""
            update rooms_user_history
            set deleted=1
            where user_id=:user_id
            and deleted=0
        """),{'user_id':user_id})
        row=result.rowcount
        result.close()

        return row