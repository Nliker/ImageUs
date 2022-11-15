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
        } if row else None
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
        } if row else None

        return image_info

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
            """),{
                    'image_id':image_id
                }).fetchone()

    image_info={
            'id':row['id'],
            'link':row['link'],
            'user_id':row['user_id']
        }

    return image_info

def get_image_roomlist(image_id):
    rows=database.execute(text("""
            select
                i_r.room_id as id,
                title,
                host_user_id
            from images_room_list as i_r
            left join rooms as r
            on i_r.room_id=r.id
            where i_r.image_id=:image_id
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
            left join images as i
            on i_r.image_id=i.id
            where i_r.room_id=:room_id
            """),{
                    'room_id':room_id
                }).fetchall()

    room_image_info_list=[{
            'id':room_image_info['id'],
            'link':room_image_info['link'],
            'user_id':room_image_info['user_id']
        } for room_image_info in rows]

    return room_image_info_list
    
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
    user_info=user_dao.get_user_info(2)
    assert user_info=={
        'id':2,
        'name':'test2',
        'email':'test2@naver.com',
        'profile':'testuser2'
    }
    user_info=user_dao.get_user_info(100)
    assert user_info==None

#1번 유저의 친구 삽입 검증
def test_insert_user_friend(user_dao):
    #1번유저의 기존 친구 목록 확인
    user_friend_id_list=[user_friend_info['id'] for user_friend_info in get_user_friendlist(1)]
    assert user_friend_id_list==[2]
    #3번유저의 기존 친구 목록 확인
    user_friend_id_list=[user_friend_info['id'] for user_friend_info in get_user_friendlist(3)]
    assert user_friend_id_list==[2]
    
    #1번이 3번유저한테 친구 추가 후 확인
    result=user_dao.insert_user_friend(1,3)
    assert result==1
    user_friend_id_list=[user_friend_info['id'] for user_friend_info in get_user_friendlist(1)]
    assert user_friend_id_list==[2,3]

    #3번유저의 친구록목 확인
    user_friend_id_list=[user_friend_info['id'] for user_friend_info in get_user_friendlist(3)]
    assert user_friend_id_list==[1,2]

    #같은 유저를 친구추가 하면 삽입 안됨
    result=user_dao.insert_user_friend(1,3)
    assert result==0

def test_get_user_friend(user_dao):
    user_friend=user_dao.get_user_friend(1,2)
    assert user_friend=={
        'user_id':1,
        'friend_user_id':2
    }
    user_friend=user_dao.get_user_friend(3,2)
    assert user_friend=={
        'user_id':3,
        'friend_user_id':2
    }

    #친구 추가후 확인
    user_dao.insert_user_friend(1,3)
    user_friend=user_dao.get_user_friend(1,3)
    assert user_friend=={
        'user_id':1,
        'friend_user_id':3
    }
    user_friend=user_dao.get_user_friend(3,1)
    assert user_friend=={
        'user_id':3,
        'friend_user_id':1
    }
    
def test_get_user_friendlist(user_dao):
    #1번 유저의 기존 친구 정보 확인 
    user_friend_info_list=user_dao.get_user_friendlist(1)
    assert user_friend_info_list==[
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2'
        },
    ]
    #1번에서 3번을 친구 추가 후 1번과 3번의 친구 정보 확인
    user_dao.insert_user_friend(1,3)
    user_friend_info_list=user_dao.get_user_friendlist(1)
    assert user_friend_info_list==[
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2'
        },
        {
            'id':3,
            'name':'test3',
            'email':'test3@naver.com',
            'profile':'testuser3'
        },
    ]
    user_friend_info_list=user_dao.get_user_friendlist(3)
    assert user_friend_info_list==[
        {
            'id':1,
            'name':'test1',
            'email':'test1@naver.com',
            'profile':'testuser1'
        },
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2'
        },
    ]

def test_delete_user_friend(user_dao):  
    #기존 친구 유저 확인
    user_friend_id_list=[user_friend_info['id'] for user_friend_info in get_user_friendlist(1)]
    assert user_friend_id_list==[2]
    #3번유저의 기존 친구 목록 확인
    user_friend_id_list=[user_friend_info['id'] for user_friend_info in get_user_friendlist(2)]
    assert user_friend_id_list==[1,3]
    #친구 삭제 후 확인
    result=user_dao.delete_user_friend(1,2)
    assert result==1
    user_friend_id_list=[user_friend_info['id'] for user_friend_info in get_user_friendlist(1)]
    assert user_friend_id_list==[]
    user_friend_id_list=[user_friend_info['id'] for user_friend_info in get_user_friendlist(2)]
    assert user_friend_id_list==[3]
    #친구 삭제 실패 확인
    result=user_dao.delete_user_friend(1,2)
    assert result==0

def test_insert_room(room_dao):
    new_room={
        'title':'testroom1',
        'user_id':1
    }
    new_room_id=room_dao.insert_room(new_room)
    room_info=get_room_info(new_room_id)
    #기존 방은 2개 였음
    assert new_room_id==3
    assert room_info=={
        'id':new_room_id,
        'title':new_room['title'],
        'host_user_id':new_room['user_id']
    }
    
def test_get_room_info(room_dao):
    room_info=room_dao.get_room_info(1)
    assert room_info=={
        'id':1,
        'title':'testroom1',
        'host_user_id':1,
    }
    room_info=room_dao.get_room_info(3)
    assert room_info==None
    
def test_get_user_roomlist(room_dao):
    #1번 유저가 속한 룸들의 정보 확인
    user_room_info_list=room_dao.get_user_roomlist(1)
    assert user_room_info_list==[
        {
            'id':1,
            'title':'testroom1',
            'host_user_id':1
        },
    ]
    #2번 유저가 속한 룸들의 정보 확인
    user_room_info_list=room_dao.get_user_roomlist(2)
    assert user_room_info_list==[
        {
            'id':1,
            'title':'testroom1',
            'host_user_id':1
        },
        {
            'id':2,
            'title':'testroom2',
            'host_user_id':2
        }
    ]
    
def test_get_room_userlist(room_dao):
    #1번방의 유저 리스트 확인
    room_user_info_list=room_dao.get_room_userlist(1)
    assert room_user_info_list==[
        {
            'id':1,
            'name':'test1',
            'email':'test1@naver.com',
            'profile':'testuser1'
        },{
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2',
        }
    ]
    #2번방의 유저 리스트 확인
    room_user_info_list=room_dao.get_room_userlist(2)
    assert room_user_info_list==[
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2'
        },{
            'id':3,
            'name':'test3',
            'email':'test3@naver.com',
            'profile':'testuser3',
        }
    ]
    
def test_insert_room_user(room_dao):
     #기존 1번 방의 유저정보와 3번 유저의 방정보 확인
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(3)]
    assert user_roomlist==[2]
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(1)]
    assert room_userlist==[1,2]
    #1번 방에 3번 유저를 초대
    result=room_dao.insert_room_user(1,3)
    assert result==1
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(3)]
    assert user_roomlist==[1,2]
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(1)]
    assert room_userlist==[1,2,3]
    #이미 추가한 뒤 추가 확인
    result=room_dao.insert_room_user(1,3)
    assert result==0
    
def test_delete_room_user(room_dao):
    #기존 1번 방의 유저정보와 2번 유저의 방정보 확인
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(2)]
    assert user_roomlist==[1,2]
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(1)]
    assert room_userlist==[1,2]
    #1번방의 2번 유저를 강퇴하고 1번방의 유저정보와 2번유저의 방 정보 확인
    result=room_dao.delete_room_user(1,2)
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(2)]
    assert user_roomlist==[2]
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(1)]
    assert room_userlist==[1]
    #1번방에서 이미 강퇴당한 2번 유저의 강퇴 실패 확인
    result=room_dao.delete_room_user(1,2)
    assert result==0

def test_insert_image(image_dao):
    new_image={
        'link':'testlink5',
        'user_id':1
    }
    new_image_id=image_dao.insert_image(new_image)
    image_info=get_image_info(new_image_id)
    assert image_info=={
        'id':new_image_id,
        'link':new_image['link'],
        'user_id':new_image['user_id']
    }

def test_get_user_imagelist(image_dao):
    #1유저의 이미지 정보 확인
    user_image_info_list=image_dao.get_user_imagelist(1)
    assert user_image_info_list==[
        {
            'id':1,
            'link':'testlink1',
            'user_id':1
        },
    ]
    #3번 유저의 이미지 정보 확인
    user_image_info_list=image_dao.get_user_imagelist(3)
    assert user_image_info_list==[
        {
            'id':3,
            'link':'testlink3',
            'user_id':3
        },
        {
            'id':4,
            'link':'testlink4',
            'user_id':3
        }
    ]
    
def test_get_image_info(image_dao):
    #1번 이미지 정보 확인
    image_info=image_dao.get_image_info(1)
    assert image_info=={
        'id':1,
        'link':'testlink1',
        'user_id':1
    }
    #4번 이미지 정보 확인
    image_info=image_dao.get_image_info(4)
    assert image_info=={
        'id':4,
        'link':'testlink4',
        'user_id':3
    }
    #존재하지 않는 이미지 정보 확인
    image_info=image_dao.get_image_info(100)
    assert image_info==None
    
def test_delete_image(image_dao):
    #1번 이미지 삭제 후 유저의 이미지 리스트 확인
    result=image_dao.delete_image(1)
    assert result==1
    image_info=image_dao.get_image_info(1)
    assert image_info==None
    user_image_info_list=get_user_imagelist(1)
    assert user_image_info_list==[]
    #이미 삭제한 1번 이미지를 다시 삭제 확인
    result=image_dao.delete_image(1)
    assert result==0
    
def test_get_image_roomlist(image_dao):
    #1번 이미지의 방 정보 확인
    image_room_info_list=image_dao.get_image_roomlist(1)
    assert image_room_info_list==[
        {
            'id':1,
            'title':'testroom1',
            'host_user_id':1
        }
    ]
    #2번 이미지의 방 정보 확인
    image_room_info_list=image_dao.get_image_roomlist(2)
    assert image_room_info_list==[
        {
            'id':1,
            'title':'testroom1',
            'host_user_id':1
        },
        {
            'id':2,
            'title':'testroom2',
            'host_user_id':2
        }
    ]
    #4번 이미지의 방 정보 확인
    image_room_info_list=image_dao.get_image_roomlist(4)
    assert image_room_info_list==[]

def test_insert_room_image(image_dao):
    #기존 1번방의 이미지 정보와 3번 이미지의 방 정보 확인
    room_imagelist=[image_info['id'] for image_info in get_room_imagelist(1)]
    assert room_imagelist==[1,2]
    image_roomist=[room_info['id'] for room_info in get_image_roomlist(3)]
    assert image_roomist==[2]
    #1번방에 3번 이미지를 추가 후 정보 확인
    result=image_dao.insert_room_image(1,3)
    assert result==1
    room_imagelist=[image_info['id'] for image_info in get_room_imagelist(1)]
    assert room_imagelist==[1,2,3]
    image_roomlist=[room_info['id'] for room_info in get_image_roomlist(3)]
    assert image_roomlist==[1,2]
    #이미 추가한 뒤 추가 확인
    result=image_dao.insert_room_image(1,3)
    assert result==0

def test_delete_room_image(image_dao):
    #기존 1번방의 이미지 정보와 2번 이미지의 방 정보 확인
    room_imagelist=[image_info['id'] for image_info in get_room_imagelist(1)]
    assert room_imagelist==[1,2]
    image_roomist=[room_info['id'] for room_info in get_image_roomlist(2)]
    assert image_roomist==[1,2]
    #1번 방에서 2번 이미지 삭제 후 확인
    result=image_dao.delete_room_image(1,2)
    assert result==1
    room_imagelist=[image_info['id'] for image_info in get_room_imagelist(1)]
    assert room_imagelist==[1]
    image_roomlist=[room_info['id'] for room_info in get_image_roomlist(2)]
    assert image_roomlist==[2]
    #이미 삭제 후 삭제 확인
    result=image_dao.delete_room_image(1,2)
    assert result==0
    
def test_get_room_imagelist(image_dao):
    #1번방의 이미지 정보 확인
    room_image_info_list=image_dao.get_room_imagelist(1)
    assert room_image_info_list==[
        {
            'id':1,
            'link':'testlink1',
            'user_id':1
        },
        {
            'id':2,
            'link':'testlink2',
            'user_id':2
        }
    ]
    room_image_info_list=image_dao.get_room_imagelist(2)
    assert room_image_info_list==[
        {
            'id':2,
            'link':'testlink2',
            'user_id':2
        },
        {
            'id':3,
            'link':'testlink3',
            'user_id':3
        }
    ]