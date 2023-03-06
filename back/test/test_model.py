import pytest
import sys,os
import bcrypt
from datetime import datetime
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from models import *
from model import UserDao,RoomDao,ImageDao
from sqlalchemy import text

# database=create_engine(config.test_config['DB_URL'],encoding='utf-8',max_overflow=0)
    
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
        truncate rooms_user_history
    """))
    database.execute(text("""
        truncate images
    """))
    database.execute(text("""
        truncate images_room_list
    """))
    database.execute(text("""
        truncate email_auth
    """))
    database.execute(text("""
        truncate users_token_auth
    """))
    
    print("초기화 완료")
    print("샘플 기입")

    hashed_password=bcrypt.hashpw(
        "test_password".encode('utf-8'),
        bcrypt.gensalt()
    )
    new_email_auths=[{
        'email':"test_auth1@naver.com",
        'auth_password':"1234"
    }]
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
    
    new_user_token_auths=[{
        'user_id':1,
        'refresh_token_secret_key':'test_key',
    }]
    for new_email_auth in new_email_auths:
        database.execute(text("""
            insert into email_auth(
                email,
                auth_password
            ) values (
                :email,
                :auth_password
            )
        """),{**new_email_auth})
    for new_user in new_users:
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
        """),{**new_user})
    for new_users_friend in new_users_friend_list:
        database.execute(text("""
            insert into users_friend_list (
                user_id,
                friend_user_id
            ) values (
                :user_id,
                :friend_user_id
            )
        """),{**new_users_friend})
    
    for new_room in new_rooms:    
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
        """),{**new_room})
    for new_rooms_user in new_rooms_user_list:
        database.execute(text("""
            insert into rooms_user_list (
                room_id,
                user_id
            ) values (
                :room_id,
                :user_id
            )
        """),{**new_rooms_user})
    for new_image in new_images:
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
        """),{**new_image})
    for new_images_room in new_images_room_list:
        database.execute(text("""
            insert into images_room_list (
                image_id,
                room_id
            ) values (
                :image_id,
                :room_id
            )
        """),{**new_images_room})
    for new_user_token_auth in new_user_token_auths:
        database.execute(text("""
            insert into users_token_auth (
                user_id,
                refresh_token_secret_key
            ) values (
                :user_id,
                :refresh_token_secret_key
            )
            """),{**new_user_token_auth})
    
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
        truncate rooms_user_history
    """))
    database.execute(text("""
        truncate images
    """))
    database.execute(text("""
        truncate images_room_list
    """))
    database.execute(text("""
        truncate email_auth
    """))
    database.execute(text("""
        truncate users_token_auth
    """))
    print("초기화 완료")
    print("======================")

def test_setup():
    assert True


#새로운 유저 가입 검증
def test_insert_user(user_dao):
    #type이 기본 회원가입인 유저
    new_user={
        'name':'test4',
        'email':'test4@naver.com',
        'profile':'testuser4',
        'password':'test_password',
        'type':'image_us'
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
    #1번 유저의 민감 정보 확인
    sample_email='test1@naver.com'
    user_credential=user_dao.get_user_id_and_password(sample_email,type="image_us")
    assert 'id' in user_credential and 'hashed_password' in user_credential
    authorized=bcrypt.checkpw('test_password'.encode('utf-8'),user_credential['hashed_password'].encode('utf-8'))
    assert authorized
    #존재하지 않는 유저 민감 정보 확인
    user_credential=user_dao.get_user_id_and_password('test100@naver.com',type="image_us")
    assert user_credential==None
    
#2번 유저의 정보 검증
def test_get_user_info(user_dao):
    #2번 유저의 정보 확인
    user_info=user_dao.get_user_info(2)
    assert user_info=={
        'id':2,
        'name':'test2',
        'email':'test2@naver.com',
        'profile':'testuser2'
    }
    #존재하지 않는 유저의 정보 확인
    user_info=user_dao.get_user_info(100)
    assert user_info==None

#1번 유저의 친구 삽입 검증
def test_insert_user_friend(user_dao):
    #1번유저의 기존 친구 목록 확인
    user_friend_info_list=get_user_friendlist(1)
    assert user_friend_info_list==[
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2',
        }
    ]
    #3번유저의 기존 친구 목록 확인
    user_friend_info_list=get_user_friendlist(3)
    assert user_friend_info_list==[
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2',
        }
    ]
    
    #1번이 3번유저한테 친구 추가 후 1번의 친구 목록 확인
    result=user_dao.insert_user_friend(1,3)
    assert result==1
    user_friend_info_list=get_user_friendlist(1)
    assert user_friend_info_list==[
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2',
        },
        {
            'id':3,
            'name':'test3',
            'email':'test3@naver.com',
            'profile':'testuser3',
        }
    ]

    #3번유저의 친구록목 확인
    user_friend_info_list=get_user_friendlist(3)
    assert user_friend_info_list==[
        {
            'id':1,
            'name':'test1',
            'email':'test1@naver.com',
            'profile':'testuser1',
        },
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2',
        }
    ]

    #같은 유저를 친구추가 하면 삽입 안됨
    result=user_dao.insert_user_friend(1,3)
    assert result==0

#친구데이터 삽입 확인
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
#친구삭제된 친구 확인
def test_deleted_user_friend(user_dao):
    #1번유저의 기존 친구목록 확인
    user_friend_info_list=get_user_friendlist(1)
    assert user_friend_info_list==[
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2'
        },
    ]
    #1번유저의 2번친구를 삭제
    result=delete_user_friend(1,2)
    assert result==1
    user_friend_info_list=get_user_friendlist(1)
    assert user_friend_info_list==[]
    #1번유저의 친구삭제된 2번유저 확인
    result=user_dao.get_deleted_user_friend(1,2)
    assert result=={
        'user_id':1,
        'friend_user_id':2
    }

def test_update_user_deleted_friend(user_dao):
    user_friend_info_list=get_user_friendlist(1)
    assert user_friend_info_list==[
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2'
        },
    ]
    #1번유저의 2번친구를 삭제
    result=delete_user_friend(1,2)
    assert result==1
    user_friend_info_list=get_user_friendlist(1)
    assert user_friend_info_list==[]
    #1번유저의 친구삭제된 2번유저를 업데이트 및 확인
    result=user_dao.update_user_deleted_friend(1,2)
    assert result==1

    user_friend_info_list=get_user_friendlist(1)
    assert user_friend_info_list==[
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2'
        },
    ]

    
#유저의 친구 목록 확인
def test_get_user_friendlist(user_dao):
    #1번 유저의 기존 친구 목록 정보 확인 
    user_friend_info_list=get_user_friendlist(1)
    assert user_friend_info_list==[
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2'
        },
    ]
    #1번에서 3번을 친구 추가 후 1번과 3번의 친구 목록 정보 확인
    user_dao.insert_user_friend(1,3)
    user_friend_info_list=get_user_friendlist(1)
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
    user_friend_info_list=get_user_friendlist(3)
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

#친구 삭제 확인
def test_delete_user_friend(user_dao):  
    #1번 유저의 기존 친구 유저 확인
    user_friend_info_list=get_user_friendlist(1)
    assert user_friend_info_list==[
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2'
        },
    ]
    #2번 유저의 기존 친구 목록 확인
    user_friend_info_list=get_user_friendlist(2)
    assert user_friend_info_list==[
        {
            'id':1,
            'name':'test1',
            'email':'test1@naver.com',
            'profile':'testuser1'
        },
        {
            'id':3,
            'name':'test3',
            'email':'test3@naver.com',
            'profile':'testuser3'
        },
    ]
    #친구 삭제 후 1번과 2번 유저 확인
    result=user_dao.delete_user_friend(1,2)
    assert result==1
    user_friend_info_list=get_user_friendlist(1)
    assert user_friend_info_list==[]
    user_friend_info_list=get_user_friendlist(2)
    assert user_friend_info_list==[
        {
            'id':3,
            'name':'test3',
            'email':'test3@naver.com',
            'profile':'testuser3'
        }
    ]
    #이미 삭제한 친구를 친구삭제 실패 확인
    result=user_dao.delete_user_friend(1,2)
    assert result==0
#이메일 인증번호를 발급후 지난 시간 확인
def test_get_email_auth_time_diff(user_dao):
    sample_email="test_auth1@naver.com"
    time_diff=user_dao.get_email_auth_time_diff(sample_email)
    assert isinstance(time_diff,int)

#이메일 인증번호 발급 정보 확인
def test_get_email_auth_info(user_dao):
    sample_email="test_auth1@naver.com"
    sample_password="1234"
    email_auth_info=user_dao.get_email_auth_info(sample_email)
    assert email_auth_info=={
        'email':sample_email,
        'auth_password':sample_password,
        'activated':0
    }

#이메일 인증 업데이트 확인
def test_update_email_auth(user_dao):
    sample_email="test_auth1@naver.com"
    sample_password="5678"
    result=user_dao.update_email_auth(sample_email,sample_password)
    email_auth_info=get_email_auth_info(sample_email)
    assert email_auth_info=={
        'email':sample_email,
        'auth_password':sample_password,
        'activated':0
    }

#이메일 정상 인증 시 활성화 확인
def test_update_email_auth_activate(user_dao):
    sample_email="test_auth1@naver.com"

    result=user_dao.update_email_auth_activate(sample_email)
    email_auth_info=get_email_auth_info(sample_email)
    assert email_auth_info=={
        'email':sample_email,
        'auth_password':"1234",
        'activated':1
    }
    
#이메일 인증 발급 확인
def test_insert_email_auth(user_dao):
    new_email="test_auth24@test.com"
    auth_password="1234"
    result=user_dao.insert_email_auth(new_email,auth_password)
    
    assert result==1
    
    new_email_auth_info=get_email_auth_info(new_email)
    assert new_email_auth_info=={
        'email':new_email,
        'auth_password':auth_password,
        'activated':0
    }
    
#유저의 정보 변경 확인
def test_update_user(user_dao):
    sample_user_id=1
    sample_attr='profile'
    sample_value="im updating user profile"
    result=user_dao.update_user(sample_user_id,sample_attr,sample_value)

    user_info=get_user_info(sample_user_id)
    assert user_info=={
        'id':1,
        'email':'test1@naver.com',
        'profile':sample_value,
        'name':'test1'
    }

#유저 삭제 확인
def test_delete_user(user_dao):
    sample_user_id=1
    result=user_dao.delete_user(sample_user_id)
    user_info=get_user_info(sample_user_id)
    assert user_info==None


#방 삽입 확인
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


#방의 정보 확인
def test_get_room_info(room_dao):
    #1번 방의 정보 확인
    room_info=room_dao.get_room_info(1)
    assert room_info=={
        'id':1,
        'title':'testroom1',
        'host_user_id':1,
    }
    #존재하지 않는 방 정보 확인
    room_info=room_dao.get_room_info(3)
    assert room_info==None


#유저의 방의 정보 록목 확인
def test_get_user_roomlist(room_dao):
    #1번 유저의 룸의 정보 목록 확인
    user_room_info_list=room_dao.get_user_roomlist(1)
    assert user_room_info_list==[
        {
            'id':1,
            'title':'testroom1',
            'host_user_id':1
        },
    ]
    #2번 유저의 방의 정보 목록 확인
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

#방의 유저 정보 목록 확인
def test_get_room_userlist(room_dao):
    #1번방의 유저 정보 목록 확인
    room_user_info_list=room_dao.get_room_userlist(1)
    assert room_user_info_list==get_room_userlist(1)
    #2번방의 유저 정보 목록 확인
    room_user_info_list=room_dao.get_room_userlist(2)
    assert room_user_info_list==get_room_userlist(2)

#방에 유저 삽입 확인
def test_insert_room_user(room_dao):
     #3번 유저의 방 정보 목록 확인 및 1번 방의 유저 정보 목록 확인
    user_room_info_list=get_user_roomlist(3)
    assert user_room_info_list==[
        {
            'id':2,
            'title':'testroom2',
            'host_user_id':2
        }
    ]
    room_user_info_list=get_room_userlist(1)
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
    #1번 방에 3번 유저 삽입 및 3번 유저의 방 정보 목록 확인 및 1번 방의 유저 정보 목록 확인
    result=room_dao.insert_room_user(1,3)
    assert result==1
    user_room_info_list=get_user_roomlist(3)
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
    room_user_info_list=get_room_userlist(1)
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
        },{
            'id':3,
            'name':'test3',
            'email':'test3@naver.com',
            'profile':'testuser3',
        }
    ]
    #이미 방에 삽입한 유저의 중복 삽입 확인
    result=room_dao.insert_room_user(1,3)
    assert result==0

#방의 유저 삭제 확인
def test_delete_room_user(room_dao):
    #2번 유저의 방 정보 및 1번 방의 유저 정보 확인
    user_room_info_list=get_user_roomlist(2)
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
    room_user_info_list=get_room_userlist(1)
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
    #1번방의 2번 유저를 삭제 후 2번 유저의 방 정보 및 1번 방의 유저 정보 확인
    result=room_dao.delete_room_user(1,2)
    user_room_info_list=get_user_roomlist(2)
    assert user_room_info_list==[
        {
            'id':2,
            'title':'testroom2',
            'host_user_id':2
        }
    ]
    room_user_info_list=get_room_userlist(1)
    assert room_user_info_list==[
        {
            'id':1,
            'name':'test1',
            'email':'test1@naver.com',
            'profile':'testuser1'
        }
    ]
    #방에서 삭제된 유저 중복 삭제 확인
    result=room_dao.delete_room_user(1,2)
    assert result==0

#방의 유저 확인
def test_get_room_user(room_dao):
    #1번방의 2번 유저 확인
    room_user=room_dao.get_room_user(1,2)
    assert room_user=={
        'room_id':1,
        'user_id':2
    }
    #1번방의 존재하지 않는 유저 확인
    room_user=room_dao.get_room_user(1,100)
    assert room_user==None

#방에서 삭제된 유저 확인
def test_get_room_deleted_user(room_dao):
    room_user_info_list=get_room_userlist(1)
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
    
    result=delete_room_user(1,2)
    assert result==1
    
    room_user_info_list=get_room_userlist(1)
    assert room_user_info_list==[
        {
            'id':1,
            'name':'test1',
            'email':'test1@naver.com',
            'profile':'testuser1'
        }
    ]
    result=room_dao.get_room_deleted_user(1,2)
    assert result==get_room_deleted_user(1,2)

#방에서 삭제된 유저를 다시 업데이트합니다.
def test_update_room_user_deleted(room_dao):
    room_user_info_list=get_room_userlist(1)
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
    result=room_dao.update_room_user_deleted(1,2,deleted=1)
    assert result==1
    
    room_user_info_list=get_room_userlist(1)
    assert room_user_info_list==[
        {
            'id':1,
            'name':'test1',
            'email':'test1@naver.com',
            'profile':'testuser1'
        }
    ]
    
    result=room_dao.update_room_user_deleted(1,2,deleted=0)
    assert result==1

    room_user_info_list=get_room_userlist(1)
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

#방의 유저 읽기 기록을 삽입
def test_insert_room_user_history(room_dao):
    result=room_dao.insert_room_user_history(1,1)
    assert result==1
    
    room_user_history_info=get_room_user_history_info(1,1)
    assert room_user_history_info=={
        'user_id':1,
        'room_id':1,
        'last_unread_row':0,
        'read_start_row':-1,
        'marker_row':0
    }

#방에서 유저의 읽기 정보를 확인
def test_get_room_user_history_info(room_dao):
    result=insert_room_user_history(1,1)
    assert result==1
    
    room_user_history_info=room_dao.get_room_user_history_info(1,1)
    assert room_user_history_info==get_room_user_history_info(1,1)
    

def test_update_room_user_history_start(room_dao):
    result=insert_room_user_history(1,1)
    assert result==1
    
    room_user_history_info=get_room_user_history_info(1,1)
    assert room_user_history_info=={
        'user_id':1,
        'room_id':1,
        'last_unread_row':0,
        'read_start_row':-1,
        'marker_row':0
    }
    result=room_dao.update_room_user_history_start(1,1,30)
    assert result==1

    room_user_history_info=get_room_user_history_info(1,1)
    assert room_user_history_info=={
        'user_id':1,
        'room_id':1,
        'last_unread_row':30,
        'read_start_row':29,
        'marker_row':30
    }
    
def test_update_room_user_history_last_unread_row(room_dao):
    result=insert_room_user_history(1,1)
    assert result==1
    
    room_user_history_info=get_room_user_history_info(1,1)
    assert room_user_history_info=={
        'user_id':1,
        'room_id':1,
        'last_unread_row':0,
        'read_start_row':-1,
        'marker_row':0
    }
    result=room_dao.update_room_user_history_last_unread_row(1,1,50)
    assert result==1

    room_user_history_info=get_room_user_history_info(1,1)
    assert room_user_history_info=={
        'user_id':1,
        'room_id':1,
        'last_unread_row':50,
        'read_start_row':-1,
        'marker_row':0
    }
    
def test_delete_user_rooms(room_dao):
    user_room_info_list=get_user_roomlist(1)
    assert user_room_info_list==[
        {
            'id':1,
            'title':'testroom1',
            'host_user_id':1
        },
    ]
    result=room_dao.delete_user_rooms(1)
    assert result==1
    
    user_room_info_list=get_user_roomlist(1)
    assert user_room_info_list==[]

def test_delete_user_room_history(room_dao):
    result=insert_room_user_history(1,1)
    assert result==1
    
    room_user_history_info=get_room_user_history_info(1,1)
    assert room_user_history_info=={
        'user_id':1,
        'room_id':1,
        'last_unread_row':0,
        'read_start_row':-1,
        'marker_row':0
    }
    
    result=room_dao.delete_user_room_history(1)
    assert result==1
    room_user_history_info=get_room_user_history_info(1,1)

    assert room_user_history_info==None
    
def test_update_room_user_deleted_history(room_dao):
    result=insert_room_user_history(1,1)
    assert result==1
    
    room_user_history_info=get_room_user_history_info(1,1)
    assert room_user_history_info=={
        'user_id':1,
        'room_id':1,
        'last_unread_row':0,
        'read_start_row':-1,
        'marker_row':0
    }
    
    result=delete_user_room_history(1)
    assert result==1
    room_user_history_info=get_room_user_history_info(1,1)

    assert room_user_history_info==None
    
    result=room_dao.update_room_user_deleted_history(1,1)
    assert result==1
    
    room_user_history_info=get_room_user_history_info(1,1)
    assert room_user_history_info=={
        'user_id':1,
        'room_id':1,
        'last_unread_row':0,
        'read_start_row':-1,
        'marker_row':0
    }
    
def test_update_user_room_host_user_id(room_dao):
    room_info=room_dao.get_room_info(1)
    assert room_info=={
        'id':1,
        'title':'testroom1',
        'host_user_id':1,
    }
    
    result=room_dao.update_user_room_host_user_id(2,1)
    assert result==1

    room_info=room_dao.get_room_info(1)
    assert room_info=={
        'id':1,
        'title':'testroom1',
        'host_user_id':2,
    }

def test_delete_room(room_dao):
    room_info=room_dao.get_room_info(1)
    assert room_info=={
        'id':1,
        'title':'testroom1',
        'host_user_id':1,
    }
    
    result=room_dao.delete_room(1)
    assert result==1

    room_info=room_dao.get_room_info(1)
    assert room_info==None

def test_get_room_user_deleted_history_info(room_dao):
    result=insert_room_user_history(1,1)
    assert result==1
    
    room_user_history_info=get_room_user_history_info(1,1)
    assert room_user_history_info=={
        'user_id':1,
        'room_id':1,
        'last_unread_row':0,
        'read_start_row':-1,
        'marker_row':0
    }
    
    result=delete_user_room_history(1)
    assert result==1
    room_user_history_info=get_room_user_history_info(1,1)

    assert room_user_history_info==None
    
    result=room_dao.get_room_user_deleted_history_info(1,1)
    assert result==get_room_user_deleted_history_info(1,1)

#이미지 삽입 확인
def test_insert_image(image_dao):
    new_image={
        'link':'testlink5',
        'user_id':1,
    }
    new_image_id=image_dao.insert_image(new_image)
    image_info=get_image_info(new_image_id)
    assert extract_arguments_from_data(image_info,image_args)=={
        'id':new_image_id,
        'link':new_image['link'],
        'user_id':new_image['user_id']
    }

#유저의 이미지 정보 목록 확인
def test_get_user_imagelist(image_dao):
    #1유저의 이미지 정보 목록 확인
    user_image_info_list=image_dao.get_user_imagelist(1,{'start':0,'limit':10})
    assert extract_arguments_from_data(user_image_info_list,image_args)==[
        {
            'id':1,
            'link':'testlink1',
            'user_id':1
        },
    ]
    #3번 유저의 이미지 정보 목록 확인
    user_image_info_list=image_dao.get_user_imagelist(3,{'start':0,'limit':10})
    assert extract_arguments_from_data(user_image_info_list,image_args)==[
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

#이미지 정보 확인
def test_get_image_info(image_dao):
    #1번 이미지 정보 확인
    image_info=image_dao.get_image_info(1)
    assert extract_arguments_from_data(image_info,image_args)=={
        'id':1,
        'link':'testlink1',
        'user_id':1
    }
    #4번 이미지 정보 확인
    image_info=image_dao.get_image_info(4)
    assert extract_arguments_from_data(image_info,image_args)=={
        'id':4,
        'link':'testlink4',
        'user_id':3
    }
    #존재하지 않는 이미지 정보 확인
    image_info=image_dao.get_image_info(100)
    assert image_info==None

#이미지 삭제 확인
def test_delete_image(image_dao):
    #3번 유저의 이미지 정보 목록 확인
    user_image_info_list=get_user_imagelist(3,{'start':0,'limit':10})
    assert extract_arguments_from_data(user_image_info_list,image_args)==[
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
    #1번 이미지 삭제 및 유저의 이미지 리스트 확인
    result=image_dao.delete_image(3)
    assert result==1
    user_image_info_list=get_user_imagelist(3,{'start':0,'limit':10})
    assert extract_arguments_from_data(user_image_info_list,image_args)==[
        {
            'id':4,
            'link':'testlink4',
            'user_id':3
        }
    ]
    #이미 삭제된 이미지 정보 확인
    image_info=image_dao.get_image_info(3)
    assert image_info==None
    #이미 삭제한 1번 이미지를 중복 삭제 및 삭제된 사진의 방 목록 확인
    result=image_dao.delete_image(3)
    assert result==0

#사진의 방 정보 목록 확인
def test_get_image_roomlist(image_dao):
    #1번 이미지의 방 정보 목록 확인
    image_room_info_list=image_dao.get_image_roomlist(1)
    assert image_room_info_list==[
        {
            'id':1,
            'title':'testroom1',
            'host_user_id':1
        }
    ]
    #2번 이미지의 방 정보 목록 확인
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
    #4번 이미지의 방 정보 목록 확인
    image_room_info_list=image_dao.get_image_roomlist(4)
    assert image_room_info_list==[]

#방에 이미지 삽입 확인
def test_insert_room_image(image_dao):
    #1번방의 이미지 정보 목록과 3번 이미지의 방 정보 목록 확인
    room_image_info_list=get_room_imagelist(1,{'start':0,'limit':10})
    assert extract_arguments_from_data(room_image_info_list,image_args)==[
        {
            'id':1,
            'link':'testlink1',
            'user_id':1,
            'user_name':'test1'
        },
        {
            'id':2,
            'link':'testlink2',
            'user_id':2,
            'user_name':'test2'
        }
    ]
    image_room_info_list=get_image_roomlist(3)
    assert image_room_info_list==[
        {
            'id':2,
            'title':'testroom2',
            'host_user_id':2
        }
    ]
    #1번방에 3번 이미지를 추가 후 1번방의 이미지 정보 목록과 3번 이미지의 방 정보 목록 확인
    result=image_dao.insert_room_image(1,3)
    assert result==1
    room_image_info_list=get_room_imagelist(1,{'start':0,'limit':10})
    assert extract_arguments_from_data(room_image_info_list,image_args)==[
        {
            'id':1,
            'link':'testlink1',
            'user_id':1,
            'user_name':'test1'
        },
        {
            'id':2,
            'link':'testlink2',
            'user_id':2,
            'user_name':'test2'
        },
        {
            'id':3,
            'link':'testlink3',
            'user_id':3,
            'user_name':'test3'
        }
    ]
    image_room_info_list=get_image_roomlist(3)
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
    #방에 이미 삽입된 사진 중복 삽입 확인
    result=image_dao.insert_room_image(1,3)
    assert result==0
    room_imagelist=[image_info['id'] for image_info in get_room_imagelist(1,{'start':0,'limit':10})]
    assert room_imagelist==[1,2,3]
    image_roomlist=[room_info['id'] for room_info in get_image_roomlist(3)]
    assert image_roomlist==[1,2]

#방의 이미지 삭제 확인
def test_delete_room_image(image_dao):
    #1번방의 이미지 정보 목록과 2번 이미지의 방 정보 목록 확인
    room_image_info_list=get_room_imagelist(1,{'start':0,'limit':10})
    assert extract_arguments_from_data(room_image_info_list,image_args)==[
        {
            'id':1,
            'link':'testlink1',
            'user_id':1,
            'user_name':'test1'
        },
        {
            'id':2,
            'link':'testlink2',
            'user_id':2,
            'user_name':'test2'
        }
    ]
    image_room_info_list=get_image_roomlist(2)
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
    #1번 방에서 2번 이미지 삭제 후 1번방의 이미지 정보 목록과 2번 이미지의 방 정보 목록 확인
    result=image_dao.delete_room_image(1,2)
    assert result==1
    room_image_info_list=get_room_imagelist(1,{'start':0,'limit':10})
    assert extract_arguments_from_data(room_image_info_list,image_args)==[
        {
            'id':1,
            'link':'testlink1',
            'user_id':1,
            'user_name':'test1'
        },
        {
            'id':2,
            'link':None,
            'user_id':None,
            'user_name':None
        }
    ]
    image_room_info_list=get_image_roomlist(2)
    assert image_room_info_list==[
        {
            'id':2,
            'title':'testroom2',
            'host_user_id':2
        }
    ]
    #방에서 이미 삭제한 이미지 중복 삭제 확인
    result=image_dao.delete_room_image(1,2)
    assert result==0
    room_image_info_list=get_room_imagelist(1,{'start':0,'limit':10})
    assert extract_arguments_from_data(room_image_info_list,image_args)==[
        {
            'id':1,
            'link':'testlink1',
            'user_id':1,
            'user_name':'test1'
        },
        {
            'id':2,
            'link':None,
            'user_id':None,
            'user_name':None
        }
    ]
    image_room_info_list=get_image_roomlist(2)
    assert image_room_info_list==[
        {
            'id':2,
            'title':'testroom2',
            'host_user_id':2
        }
    ]

#방의 이미지 정보 목록 확인
def test_get_room_imagelist(image_dao):
    #1번방의 이미지 정보 정보 확인
    room_image_info_list=image_dao.get_room_imagelist(1,{'start':0,'limit':10})
    assert room_image_info_list==get_room_imagelist(1,{'start':0,'limit':10})
    room_image_info_list=image_dao.get_room_imagelist(2,{'start':0,'limit':10})
    assert room_image_info_list==get_room_imagelist(2,{'start':0,'limit':10})
        
    
def test_get_room_imagelist_by_date(image_dao):
    start_date=datetime.strftime(datetime.now(),"%Y-%m-%d")
    dates={
        'start_date':start_date,
        'end_date':start_date
    }
    pages={'start':0,'limit':10}
    room_image_info_list_by_date=image_dao.get_room_imagelist_by_date(1,dates,pages)

    assert room_image_info_list_by_date==get_room_imagelist_by_date(1,dates,pages) 

    

#방의 특정 유저의 이미지 모두 삭제 확인
def test_delete_room_user_image(image_dao):
    #1번 방의 이미지 목록과 2번 사진의 방 목록 확인
    room_image_info_list=get_room_imagelist(1,{'start':0,'limit':10})
    assert extract_arguments_from_data(room_image_info_list,image_args)==[
        {
            'id':1,
            'link':'testlink1',
            'user_id':1,
            'user_name':'test1'
        },
        {
            'id':2,
            'link':'testlink2',
            'user_id':2,
            'user_name':'test2'
        }
    ]
    image_room_info_list=get_image_roomlist(2)
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

    #1번방의 2번 유저 사진 삭제 확인
    result=image_dao.delete_room_user_image(1,2)
    assert result==1
    room_image_info_list=image_dao.get_room_imagelist(1,{'start':0,'limit':10})
    assert extract_arguments_from_data(room_image_info_list,image_args)==[
        {
            'id':1,
            'link':'testlink1',
            'user_id':1,
            'user_name':'test1'
        },
        {
            'id':2,
            'link':None,
            'user_id':None,
            'user_name':None
        }
    ]
    image_room_info_list=get_image_roomlist(2)
    assert image_room_info_list==[
        {
            'id':2,
            'title':'testroom2',
            'host_user_id':2
        }
    ]
    result=image_dao.delete_room_user_image(1,2)
    assert result==0
    
#이미지가 속한 방을 삭제
def test_delete_image_room(image_dao):
    image_roomlist=[image_room_info['id'] for image_room_info in get_image_roomlist(2)]
    assert image_roomlist==[1,2]
    #2번 이미지가 속한 방들을 삭제
    result=image_dao.delete_image_room(2)
    assert result==2

    image_roomlist=[image_room_info['id'] for image_room_info in get_image_roomlist(2)]
    assert image_roomlist==[]


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

def test_get_room_imagelist_len(image_dao):
    room_image_info_list=get_room_imagelist(1,{'start':0,'limit':10})
    assert extract_arguments_from_data(room_image_info_list,image_args)==[
        {
            'id':1,
            'link':'testlink1',
            'user_id':1,
            'user_name':'test1'
        },
        {
            'id':2,
            'link':'testlink2',
            'user_id':2,
            'user_name':'test2'
        }
    ]

    result=image_dao.get_room_imagelist_len(1)
    assert result==2
def test_get_user_imagelist_len(image_dao):
    user_image_info_list=get_user_imagelist(3,{'start':0,'limit':10})
    assert extract_arguments_from_data(user_image_info_list,image_args)==[
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

    result=image_dao.get_user_imagelist_len(3)
    assert result==2
    
def test_delete_user_imagelist(image_dao):
    user_image_info_list=get_user_imagelist(3,{'start':0,'limit':10})
    assert extract_arguments_from_data(user_image_info_list,image_args)==[
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

    result=image_dao.delete_user_imagelist(3)
    assert result==2
    
    user_image_info_list=get_user_imagelist(3,{'start':0,'limit':10})
    assert extract_arguments_from_data(user_image_info_list,image_args)==[]

def test_insert_user_token_auth(user_dao):
    new_user_token_auth={
        'user_id':2,
        'refresh_token_secret_key':"test_key"
    }
    result=user_dao.insert_user_token_auth(new_user_token_auth['user_id'],new_user_token_auth['refresh_token_secret_key'])
    assert result==1
    user_token_auth=get_user_token_auth(new_user_token_auth['user_id'])
    for key,value in new_user_token_auth.items():
        assert user_token_auth[key]==new_user_token_auth[key]

def test_get_user_token_auth(user_dao):
    user_id=1
    stock_user_token_auth=get_user_token_auth(user_id)
    assert stock_user_token_auth!=None
    
    user_token_auth=user_dao.get_user_token_auth(user_id)
    assert stock_user_token_auth==user_token_auth
    

def test_update_user_token_auth(user_dao):
    user_id=1

    stock_user_token_auth=get_user_token_auth(user_id)
    assert stock_user_token_auth!=None

    updater={
        'refresh_token_secret_key':'updated_key'
    }
    result=user_dao.update_user_token_auth(user_id,updater)
    assert result==1

    updated_user_token_auth=get_user_token_auth(user_id)
    for key,value in updater.items():
        assert updated_user_token_auth[key]==updater[key]
        
    
    
'''
    유저 1,2,3 (친구 1-2,친구 2-1,3,친구 3-2)
    룸 1(유저 1,2, 이미지 1,2),2(유저 2,3 이미지 2,3)
    이미지 1(유저 1),2(유저 2),3,4(유저 3)
'''