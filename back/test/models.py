import config
from sqlalchemy import create_engine,text

database=create_engine(config.test_config['DB_URL'],encoding='utf-8',max_overflow=0)

def get_user_id_and_password(email,type):
    result=database.execute(text("""
            select
                id,
                hashed_password
            from users
            where email=:email
            and type=:type
            """),{'email':email,'type':type})
    row=result.fetchone()
    result.close()

    user_id_and_password={
            'id':row['id'],
            'hashed_password':row['hashed_password']
        } if row else None
        
    return user_id_and_password

def get_user_info(user_id):
    row=database.execute(text("""
            select
                id,
                name,
                email,
                profile
            from users
            where id=:user_id
            and deleted=0
            """),{'user_id':user_id}).fetchone()
    user_info={
            'id':row['id'],
            'name':row['name'],
            'email':row['email'],
            'profile':row['profile']
        } if row else None
    return user_info

def get_user_friendlist(user_id):
        rows=database.execute(text("""
            select
                u_f.friend_user_id as id,
                u.name,
                u.email,
                u.profile
            from users_friend_list as u_f
            left join users as u
            on u_f.friend_user_id=u.id
            where u_f.user_id=:user_id
            and u.deleted=0
            and u_f.deleted=0
            """),{'user_id':user_id}).fetchall()

        user_friend_info_list=[
            {
                'id':user_friend_info['id'],
                'name':user_friend_info['name'],
                'email':user_friend_info['email'],
                'profile':user_friend_info['profile']
            } for user_friend_info in rows
        ]
        
        return user_friend_info_list

def get_room_info(room_id):
        row=database.execute(text("""
            select
                id,
                title,
                host_user_id
            from rooms
            where id=:room_id
            and deleted=0
            """),{
                    'room_id':room_id
                }).fetchone()
        room_info={
            'id':row['id'],
            'title':row['title'],
            'host_user_id':row['host_user_id']
        } if row else None
        return room_info

def get_room_userlist(room_id):
    rows=database.execute(text("""
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
            }).fetchall()
        
    room_user_info_list=[{
            'id':room_user_info['id'],
            'name':room_user_info['name'],
            'email':room_user_info['email'],
            'profile':room_user_info['profile']
        } for room_user_info in rows]

    return room_user_info_list

def get_user_roomlist(user_id):
    rows=database.execute(text("""
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
                }).fetchall()
        
    user_room_info_list=[{
            'id':user_room_info['id'],
            'title':user_room_info['title'],
            'host_user_id':user_room_info['host_user_id']    
        } for user_room_info in rows]

    return user_room_info_list

def get_user_imagelist(user_id,pages):
    rows=database.execute(text("""
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

def get_image_info(image_id):
    row=database.execute(text("""
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

def get_image_roomlist(image_id):
    rows=database.execute(text("""
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

def get_room_imagelist(room_id,pages):
    result=database.execute(text("""
            select
                i_r.image_id as id,
                i.link,
                i.user_id,
                u.name,
                i_r.created_at
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
                })
    rows=result.fetchall()
    result.close()

    room_image_info_list=[{
            'id':room_image_info['id'],
            'link':room_image_info['link'],
            'user_id':room_image_info['user_id'],
            'user_name':room_image_info['name'],
            'created_at':room_image_info['created_at']
        } for room_image_info in rows]

    return room_image_info_list

def get_image_room_userlist(image_id):
        rows=database.execute(text("""
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

def get_email_auth_info(email):
    row=database.execute(text("""
            select
                email,
                auth_password,
                activated
            from email_auth
            where email=:email
        """),{'email':email}).fetchone()
    
    email_auth={
            'email':row['email'],
            'auth_password':row['auth_password'],
            'activated':row['activated']
        } if row else None

    return email_auth

def delete_user_friend(user_id,delete_friend_user_id):
    result=database.execute(text("""
            update users_friend_list
            set deleted=1
            where ((user_id=:user_id
            and friend_user_id=:delete_friend_user_id)
            or (user_id=:delete_friend_user_id
            and friend_user_id=:user_id))
            and deleted=0
            """),{
                    'user_id':user_id,
                    'delete_friend_user_id':delete_friend_user_id
                })
    row=result.rowcount
    result.close()
    if row>=1:
        return 1
    else:
        return 0

def delete_room_user(room_id,user_id):
    result=database.execute(text("""
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

def get_room_deleted_user(room_id,user_id):
    result=database.execute(text("""
            select
                room_id,
                user_id
            from rooms_user_list
            where room_id=:room_id
            and user_id=:user_id
            and deleted=1
            """),{'room_id':room_id,'user_id':user_id})
    row=result.fetchone()
    result.close()

    room_user={
            'room_id':row['room_id'],
            'user_id':row['user_id']
        }if row else None

    return room_user

def get_room_user_history_info(room_id,user_id):
    result=database.execute(text("""
            select *
            from rooms_user_history
            where room_id=:room_id
            and user_id=:user_id
            and deleted=0
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

def delete_user_room_history(user_id):
    result=database.execute(text("""
            update rooms_user_history
            set deleted=1
            where user_id=:user_id
            and deleted=0
        """),{'user_id':user_id})
    row=result.rowcount
    result.close()

    return row

def get_room_user_deleted_history_info(room_id,user_id):
    result=database.execute(text("""
            select *
            from rooms_user_history
            where room_id=:room_id
            and user_id=:user_id
            and deleted=1
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

def get_room_imagelist_by_date(room_id,dates,pages):
    result=database.execute(text("""
            select
                i_r.image_id as id,
                i.link,
                i.user_id,
                u.name,
                i_r.created_at
            from images_room_list as i_r
            left join images  as i
            on (i_r.image_id=i.id 
            and i_r.deleted=0
            and i.deleted=0)
            left join users as u
            on (i.user_id=u.id)
            where i_r.room_id=:room_id
            and DATE_FORMAT(i_r.created_at,'%Y-%m-%d')>=DATE_FORMAT(:start_date,'%Y-%m-%d')
            and DATE_FORMAT(i_r.created_at,'%Y-%m-%d')<=DATE_FORMAT(:end_date,'%Y-%m-%d')
            order by i_r.created_at
            limit :start,:limit
            """),{
                    'room_id':room_id,
                    'start_date':dates['start_date'],
                    'end_date':dates['end_date'],
                    'limit':pages['limit'],
                    'start':pages['start']
                })
    
    rows=result.fetchall()
    result.close()

    room_image_info_list=[{
            'id':room_image_info['id'],
            'link':room_image_info['link'],
            'user_id':room_image_info['user_id'],
            'user_name':room_image_info['name'],
            'created_at':room_image_info['created_at']
    } for room_image_info in rows]
        
    return room_image_info_list

def insert_room_user_history(room_id,user_id):
    result=database.execute(text("""
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

