import pytest
import sys,os
import bcrypt

sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
import config

from model import UserDao,RoomDao,ImageDao
from sqlalchemy import create_engine,text

database=create_engine(config.test_config['DB_URL'],encoding='utf-8',max_overflow=0)

@pytest.fixture
def user_dao():
    return UserDao(database)

@pytest.fixture
def room_dao():
    return RoomDao(database)

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
    '''
    유저 1,2,3 (친구 1-2,친구 2-1,3,친구 3-2)
    룸 1(유저 1,2, 이미지 1,2),2(유저 2,3 이미지 2,3)
    이미지 1(유저 1),2(유저 2),3,4(유저 3)
    '''
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
        'link':'testlink14',
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
            """),{'user_id':user_id}).fetchone()
    user_info={
            'id':row['id'],
            'name':row['name'],
            'email':row['email'],
            'profile':row['profile']
        }
    return user_info

def get_user_frinedlist(user_id):
        rows=database.execute(text("""
            select
                f.friend_user_id as id,
                u.name,
                u.email,
                u.profile
            from users_friend_list as f
            left join users as u
            on f.user_id=:user_id
            and f.friend_user_id=u.id
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
            """),{
                    'room_id':room_id
                }).fetchone()
        room_info={
            'id':row['id'],
            'title':row['title'],
            'host_user_id':row['host_user_id']
        }
        return room_info
    
def get_image_info(image_id):
        row=database.execute(text("""
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
    
def test_setup():
    assert True

#새로운 유저 가입 검증
def test_insert_user(user_dao):
    new_user={
        'name':'test4',
        'email':'test4@naver.com',
        'profile':'testuser4',
        'password':'test_password'
    }
    hashed_password=bcrypt.hashpw(new_user['password'].encode('utf-8'),bcrypt.gensalt())
    new_user['hashed_password']=hashed_password
    
    new_user_id=user_dao.insert_user(new_user)
    user=get_user_info(new_user_id)
    
    assert user=={
        'id':new_user_id,
        'name':new_user['name'],
        'email':new_user['email'],
        'profile':new_user['profile']
    }

#1번 유저의 민감 정보 검증
def test_get_user_id_and_password(user_dao):
    sample_email='test1@naver.com'

    user_credential=user_dao.get_user_id_and_password(sample_email)

    assert user_credential['id']==1
    authorized=bcrypt.checkpw('test_password'.encode('utf-8'),user_credential['hashed_password'].encode('utf-8'))
    assert authorized
    
#2번 유저의 정보 검증
def test_get_user_info(user_dao):
    user=user_dao.get_user_info(2)
    assert user=={
        'id':2,
        'name':'test2',
        'email':'test2@naver.com',
        'profile':'testuser2'
    }

#1번 유저의 친구 삽입 검증    
def test_insert_user_friend(user_dao):
    
# def test_get_user_friend(user_dao):

# def test_get_user_frinedlist(user_dao):
    
# def test_delete_user_friend(user_dao):