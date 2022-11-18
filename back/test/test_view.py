import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
import json
from app import create_app
import pytest
from sqlalchemy import create_engine,text
import config

database=database=create_engine(config.test_config['DB_URL'],encoding='utf-8',max_overflow=0)

pytest.fixture()
def api():
    app=create_engine(test_config=config.tesst_config)
    app.config['TEST']=True
    api=app.test_client()

    return api

def setup_function():
    print("============setup_func============")
    print("초기화")
    database.execute(text("""
        truncate users
    """))
    database.execute(text("""
        truncate users_friend_list
    """))
    database.execute(text("""
        truncate rooms
    """))
    database.execute(text("""
        truncate rooms_user_list
    """))
    database.execute(text("""
        truncate images
    """))
    database.execute(text("""
        truncate images_room_list
    """))
    print("초기화 완료")
    print("샘플 기입")
    hashed_password=bcrypt.hashpw(
        "test_password".encode('utf-8'),
        bcrypt.gensalt()
    )
    new_users=[{
        'id':1,
        'name':'test1',
        'email':'test1@naver.com',
        'profile':'testuser1',
        'hashed_password':hashed_password
    },{
        'id':2,
        'name':'test2',
        'email':'test2@naver.com',
        'profile':'testuser2',
        'hashed_password':hashed_password
    },{
        'id':3,
        'name':'test3',
        'email':'test3@naver.com',
        'profile':'testuser3',
        'hashed_password':hashed_password
    }]
    new_users_friend_list=[{
        'user_id':1,
        'friend_user_id':2
    },{
        'user_id':2,
        'friend_user_id':1
    },{
        'user_id':2,
        'friend_user_id':3
    },{
        'user_id':3,
        'friend_user_id':2
    }]
    new_rooms=[{
        'id':1,
        'title':'testroom1',
        'host_user_id':1,
    },{
        'id':2,
        'title':'testroom2',
        'host_user_id':2,
    }]
    new_rooms_user_list=[{
        'room_id':1,
        'user_id':1
    },{
        'room_id':1,
        'user_id':2
    },
    {
        'room_id':2,
        'user_id':2
    },{
        'room_id':2,
        'user_id':3
    }]
    new_images=[{
        'id':1,
        'link':'testlink1',
        'user_id':1
    },{
        'id':2,
        'link':'testlink2',
        'user_id':2
    },{
        'id':3,
        'link':'testlink3',
        'user_id':3
    },{
        'id':4,
        'link':'testlink4',
        'user_id':3
    }]
    new_images_room_list=[{
        'image_id':1,
        'room_id':1
    },{
        'image_id':2,
        'room_id':1
    },{
        'image_id':2,
        'room_id':2
    },{
        'image_id':3,
        'room_id':2
    }]
    database.execute(text("""
        insert into users (
            id,
            name,
            email,
            profile,
            hashed_password
        ) values (
            :id,
            :name,
            :email,
            :profile,
            :hashed_password
        )
    """),new_users)
    database.execute(text("""
        insert into users_friend_list (
            user_id,
            friend_user_id
        ) values (
            :user_id,
            :friend_user_id
        )
    """),new_users_friend_list)
    database.execute(text("""
        insert into rooms (
            id,
            title,
            host_user_id
        ) values (
            :id,
            :title,
            :host_user_id
        )
    """),new_rooms)
    database.execute(text("""
        insert into rooms_user_list (
            room_id,
            user_id
        ) values (
            :room_id,
            :user_id
        )
    """),new_rooms_user_list)
    database.execute(text("""
        insert into images (
            id,
            link,
            user_id
        ) values (
            :id,
            :link,
            :user_id
        )
    """),new_images)
    database.execute(text("""
        insert into images_room_list (
            image_id,
            room_id
        ) values (
            :image_id,
            :room_id
        )
    """),new_images_room_list)
    print("샘플 기입 완료")
    print("======================")

def teardown_function():
    print("============teardown_func============")
    print("초기화")
    database.execute(text("""
        truncate users
    """))
    database.execute(text("""
        truncate users_friend_list
    """))
    database.execute(text("""
        truncate rooms
    """))
    database.execute(text("""
        truncate rooms_user_list
    """))
    database.execute(text("""
        truncate images
    """))
    database.execute(text("""
        truncate images_room_list
    """))
    print("초기화 완료")
    print("======================")

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

def get_user_imagelist(user_id):
    rows=database.execute(text("""
            select
                id,
                link,
                user_id
            from images
            where user_id=:user_id
            and deleted=0
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

def get_image_info(image_id):
    row=database.execute(text("""
            select
                id,
                link,
                user_id
            from images
            where id=:image_id
            and deleted=0
            """),{
                    'image_id':image_id
                }).fetchone()

    image_info={
            'id':row['id'],
            'link':row['link'],
            'user_id':row['user_id']
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
            """),{
                    'image_id':image_id
                }).fetchall()

    image_room_info_list=[{
            'id':image_room_info['id'],
            'title':image_room_info['title'],
            'host_user_id':image_room_info['host_user_id']
        } for image_room_info in rows]

    return image_room_info_list

def get_room_imagelist(room_id):
    rows=database.execute(text("""
            select
                i_r.image_id as id,
                i.link,
                i.user_id
            from images_room_list as i_r
            left join images  as i
            on (i_r.image_id=i.id 
            and i_r.deleted=0
            and i.deleted=0) 
            where i_r.room_id=:room_id
            order by id asc
            """),{
                    'room_id':room_id
                }).fetchall()

    room_image_info_list=[{
            'id':room_image_info['id'],
            'link':room_image_info['link'],
            'user_id':room_image_info['user_id']
        } for room_image_info in rows]

    return room_image_info_list
    
def test__sign_up(api):

def test_login(api):

def test_get_user(api):

def test_get_user_imagelist(api):
    
def test_post_user_friend(api):
    
def test_get_user_friendlist(api):

def test_delete_user_friend(api):

def test_get_user_roomlist(api):
    
def test_delete_user_room(api):


def test_post_room(api):

def test_post_room_image(api):
    
def test_delete_room_image(api):
    
def test_get_room_imagelist(api):

def test_get_room_userlist(api):

def test_room_user(api):

def test_post_room_user(api):
    


'''
    유저 1,2,3 (친구 1-2,친구 2-1,3,친구 3-2)
    룸 1(유저 1,2, 이미지 1,2),2(유저 2,3 이미지 2,3)
    이미지 1(유저 1),2(유저 2),3,4(유저 3)
'''
