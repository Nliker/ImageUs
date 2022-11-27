import pytest
import sys,os
import bcrypt

sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
import config

from model import ImageDao
from sqlalchemy import create_engine,text

database=create_engine(config.test_config['DB_URL'],encoding='utf-8',max_overflow=0)

@pytest.fixture
def image_dao():
    return ImageDao(database)

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
    
'''
    유저 1,2,3 (친구 1-2,친구 2-1,3,친구 3-2)
    룸 1(유저 1,2, 이미지 1,2),2(유저 2,3 이미지 2,3)
    이미지 1(유저 1),2(유저 2),3,4(유저 3)
'''

def get_image_info(user_id,image_link):
        row=database.execute(text("""
            select id,user_id,link
            from images
            where user_id=:user_id
            and link=:image_link
            """),{'user_id':user_id,'image_link':image_link}).fetchone()
        
        image_info={
            'id':row['id'],
            'user_id':row['user_id'],
            'link':row['link']
        } if row else None

        return image_info

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

def test_get_image_info(image_dao):
    image_info=get_image_info(2,'testlink2')
    assert image_info=={
        'id':2,
        'link':'testlink2',
        'user_id':2
    }

def test_get_image_info_by_id(image_dao):
    image_info=image_dao.get_image_info_by_id(1)
    assert image_info=={
        'id':1,
        'link':'testlink1',
        'user_id':1,
        'public':0
    }
    image_info=image_dao.get_image_info_by_id(4)
    assert image_info=={
        'id':4,
        'link':'testlink4',
        'user_id':3,
        'public':0
    }
  
def test_image_room_userlist(image_dao):
    image_room_userlist=get_image_room_userlist(1)
    assert image_room_userlist==[
        {
            'room_id':1,
            'user_id':1
        },
        {
            'room_id':1,
            'user_id':2
        }
    ]
    image_room_userlist=get_image_room_userlist(2)
    assert image_room_userlist==[
        {
            'room_id':1,
            'user_id':1
        },
        {
            'room_id':1,
            'user_id':2
        },
        {
            'room_id':2,
            'user_id':2
        },
        {
            'room_id':2,
            'user_id':3
        }
    ]
    image_room_userlist=get_image_room_userlist(3)
    assert image_room_userlist==[
        {
            'room_id':2,
            'user_id':2
        },
        {
            'room_id':2,
            'user_id':3
        }
    ]
    image_room_userlist=get_image_room_userlist(4)
    assert image_room_userlist==[]
    
    row=database.execute(text("""
        update rooms_user_list
        set deleted=1
        where room_id=1
        and user_id=2
        """)).rowcount
    assert row==1
    
    
    image_room_userlist=get_image_room_userlist(1)
    assert image_room_userlist==[
        {
            'room_id':1,
            'user_id':1
        }
    ]
    image_room_userlist=get_image_room_userlist(2)
    assert image_room_userlist==[
        {
            'room_id':1,
            'user_id':1
        },
        {
            'room_id':2,
            'user_id':2
        },
        {
            'room_id':2,
            'user_id':3
        }
    ]
    image_room_userlist=get_image_room_userlist(3)
    assert image_room_userlist==[
        {
            'room_id':2,
            'user_id':2
        },
        {
            'room_id':2,
            'user_id':3
        }
    ]
    image_room_userlist=get_image_room_userlist(4)
    assert image_room_userlist==[]