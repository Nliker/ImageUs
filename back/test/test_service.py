import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
import pytest
import config
import bcrypt
import jwt
import shutil
from model import UserDao,RoomDao,ImageDao
from service import UserService,RoomService,ImageService
from sqlalchemy import text
import config
from models import *
from datetime import timezone,timedelta,datetime

parent_path=os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
projects_dir=os.path.dirname(os.path.abspath(parent_path))
image_dir=f"{projects_dir}/image_back/{config.test_config['IMAGE_PATH']}"

@pytest.fixture
def user_service():
    return UserService(UserDao(database),config.test_config)

@pytest.fixture
def room_service():
    return RoomService(RoomDao(database),config.test_config)

@pytest.fixture
def image_service():
    return ImageService(ImageDao(database),config.test_config)

'''
    유저 1,2,3 (친구 1-2,친구 2-1,3,친구 3-2)
    룸 1(유저 1,2, 이미지 1,2),2(유저 2,3 이미지 2,3)
    이미지 1(유저 1),2(유저 2),3,4(유저 3)
'''

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
    print("이미지 폴더 초기화")
    if os.path.isdir(f"{image_dir}"):
        shutil.rmtree(f"{image_dir}")
    print("이미지 폴더 초기화 완료")
    print("======================")

def test_setup():
    assert True

def test_get_email_auth_info(user_service):
    sample_email="test_auth1@naver.com"
    email_auth_info=user_service.get_email_auth_info(sample_email)
    assert email_auth_info=={
        'email':sample_email,
        'auth_password':"1234",
        'activated':0
    }
    
def test_generate_auth_password(user_service):
    generated_auth_password=user_service.generate_auth_password()
    assert type(generated_auth_password)==str
    assert len(generated_auth_password)==4

def test_initiate_email_auth(user_service):
    email="test_auth1@naver.com"
    auth_password="4321"
    result=user_service.initiate_email_auth(email,auth_password)
    assert result==1
    
    email_auth_info=get_email_auth_info(email)
    assert email_auth_info['activated']==0

def test_create_new_email_auth(user_service):
    email="test_auth2@naver.com"
    auth_password="1234"
    result=user_service.create_new_email_auth(email,auth_password)
    assert result==1

    email_auth_info=get_email_auth_info(email)
    assert email_auth_info=={
        'email':email,
        'auth_password':auth_password,
        'activated':0
    }

def test_send_email_auth_password(user_service):
    email="test_auth1@naver.com"
    auth_password="1234"

    result=user_service.send_email_auth_password(email,auth_password)
    assert result==1

def test_authorize_email_auth(user_service):
    email="test_auth1@naver.com"
    email_auth_info=get_email_auth_info(email)
    assert email_auth_info!=None

    auth_password="1234"
    result=user_service.authorize_email_auth(email,auth_password)

    assert result==True
    
    auth_password="9999"
    result=user_service.authorize_email_auth(email,auth_password)

    assert result==False

def test_is_email_auth_expired(user_service):
    email="test_auth1@naver.com"
    email_auth_info=get_email_auth_info(email)
    assert email_auth_info!=None
    
    result=user_service.is_email_auth_expired(email)
    assert result==False
    
def test_activate_email_auth(user_service):
    email="test_auth1@naver.com"
    email_auth_info=get_email_auth_info(email)
    assert email_auth_info['activated']==0

    result=user_service.activate_email_auth(email)
    assert result==1
    
    email_auth_info=get_email_auth_info(email)
    assert email_auth_info['activated']==1


#이메일의 존재 확인
def test_is_email_exists(user_service):
    #존재하는 이메일의 존재를 확인
    email='test1@naver.com'
    email_auth_info=get_user_id_and_password(email,type="image_us")
    assert email_auth_info!=None

    result=user_service.is_email_exists(email)
    assert result==True
    #존재하지 않는 이메일의 존재를 확인
    email='test100000@naver.com'
    email_auth_info=get_user_id_and_password(email,type="image_us")
    assert email_auth_info==None

    result=user_service.is_email_exists(email)
    assert result==False

#새로운 유저를 생성
def test_create_new_user(user_service):
    new_user={
        'name':'test4',
        'email':'test4@naver.com',
        'profile':'testuser4',
        'password':'test_password'
    }
    #새로운 유저를 만들고 정보를 확인
    new_user_id=user_service.create_new_user(new_user)
    new_user=get_user_info(new_user_id)
    
    assert new_user=={
        'id':new_user_id,
        'name':new_user['name'],
        'email':new_user['email'],
        'profile':new_user['profile']
    }

#유저의 정보 확인
def test_get_user_info(user_service):
    #1번 유저 정보 확인
    user_info=user_service.get_user_info(1)
    assert user_info==get_user_info(1)
    #존재하지 않는 유저 정보 확인
    user_info=user_service.get_user_info(100)
    assert user_info==None

#로그인 확인
def test_login(user_service):
    #1번 유저의 로그인 확인
    credential={
        'email':'test1@naver.com',
        'password':'test_password'
    }
    authorized=user_service.login(credential)
    assert authorized==True
    #1번 유저의 잘못된 로그인 확인
    credential={
        'email':'test1@naver.com',
        'password':'wrong_password'
    }
    authorized=user_service.login(credential)
    assert authorized==False
    #존재하지 않는 유저의 로그인 확인
    credential={
        'email':'test100@naver.com',
        'password':'wrong_password'
    }
    authorized=user_service.login(credential)
    assert authorized==None

#유저의 토큰 인증 정보를 불러옵니다.
def test_get_user_token_auth(user_service):
    user_id=1
    stock_user_token_auth=get_user_token_auth(user_id)
    assert stock_user_token_auth!=None
    
    user_token_auth=user_service.get_user_token_auth(user_id)
    assert stock_user_token_auth==user_token_auth

#유저의 리프레시 토큰 해석을 검증합니다.
def test_decode_from_refresh_token(user_service):
    user_id=1
    stock_user_token_auth=get_user_token_auth(user_id)
    assert stock_user_token_auth!=None

    refresh_token=generate_refresh_token(user_id,stock_user_token_auth['refresh_token_secret_key'])
    result=user_service.decode_from_refresh_token(refresh_token,user_id)
    
    assert result==True

    refresh_token=generate_refresh_token(user_id,'fake_key')
    result=user_service.decode_from_refresh_token(refresh_token,user_id)

    assert result==False

#액세스 토큰 생성 확인
def test_generate_access_token(user_service):
    user_id=1
    #토큰을 생성하고 토큰의 정보를 확인합니다.
    result=user_service.generate_access_token(user_id)
    assert 'access_token' in result
    assert 'access_token_expire_time' in result

    payload=jwt.decode(result['access_token'],config.test_config['JWT_SECRET_KEY'],'HS256')

    assert ('user_id' in payload) and ('exp' in payload) and ('iat' in payload)
    assert payload['user_id']==1
    
#액세스 토큰과 리프레시 토큰 생성 확인
def test_generate_token(user_service):
    user_id=1
    result=user_service.generate_token(user_id)
    assert 'access_token' in result
    assert 'access_token_expire_time' in result
    assert 'refresh_token' in result
    assert 'refresh_token_expire_time' in result
    
    user_token_auth=get_user_token_auth(user_id)

    assert user_token_auth!=None

    access_token_payload=jwt.decode(result['access_token'],config.test_config['JWT_SECRET_KEY'],'HS256')
    refresh_token_payload=jwt.decode(result['refresh_token'],user_token_auth['refresh_token_secret_key'],'HS256')

    assert ('user_id' in access_token_payload) and ('exp' in access_token_payload) and ('iat' in access_token_payload)
    assert ('user_id' in refresh_token_payload) and ('exp' in refresh_token_payload) and ('iat' in refresh_token_payload)



    

#유저의 민감 정보 확인
def test_get_user_id_and_password(user_service):
    #1번 유저의 민감 정보 확인
    user_credential=user_service.get_user_id_and_password('test1@naver.com')
    assert ('id' in user_credential) and ('hashed_password' in user_credential)
    password='test_password'
    authrized=bcrypt.checkpw(password.encode('utf-8'),user_credential['hashed_password'].encode('utf-8'))
    assert authrized
    #존재하지 않는 유저의 민감 정보 확인
    user_credential=user_service.get_user_id_and_password('test100@naver.com')
    assert user_credential==None

#유저의 친구 관계 확인
def test_is_user_friend(user_service):
    #1번과 2번의 친구 관계 확인
    result=user_service.is_user_friend(1,2)
    assert result==True
    result=user_service.is_user_friend(2,1)
    assert result==True
    #1번과 3번의 친구 관계 확인
    result=user_service.is_user_friend(1,3)
    assert result==False
    result=user_service.is_user_friend(3,1)
    assert result==False

#유저의 친구 생성
def test_create_user_friend(user_service):
    #1번 유저와 3번 유저의 친구 목록 확인
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(1)]
    assert user_friendlist==[2]
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(3)]
    assert user_friendlist==[2]
    #1번유저와 3번유저의 친구 생성 후 친구 목록 확인
    result=user_service.create_user_friend(1,3)
    assert result==1
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(1)]
    assert user_friendlist==[2,3]
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(3)]
    assert user_friendlist==[1,2]
    #중복 친구추가 확인
    result=user_service.create_user_friend(1,3)
    assert result==0
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(1)]
    assert user_friendlist==[2,3]
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(3)]
    assert user_friendlist==[1,2]

#유저의 친구 목록 정보 확인
def test_get_user_friendlist(user_service):
    #1번 유저와 3번 유저의 친구 목록 정보 확인
    user_friend_info_list=user_service.get_user_friendlist(1)
    assert user_friend_info_list==get_user_friendlist(1)
    user_friend_info_list=user_service.get_user_friendlist(3)
    assert user_friend_info_list==get_user_friendlist(3)

#유저의 친구 삭제
def test_delete_user_friend(user_service):
    #1번 유저와 2번 유저의 친구 목록 확인
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(1)]
    assert user_friendlist==[2]
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(2)]
    assert user_friendlist==[1,3]
    #1번 유저와 2번 유저의 친구 삭제 및 친구 목록 확인
    result=user_service.delete_user_friend(1,2)
    assert result==1
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(1)]
    assert user_friendlist==[]
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(2)]
    assert user_friendlist==[3]
    #중복 친구 삭제 확인
    result=user_service.delete_user_friend(1,2)
    assert result==0
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(1)]
    assert user_friendlist==[]
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(2)]
    assert user_friendlist==[3]
    
def test_update_user_info(user_service):
    user_info=get_user_info(1)
    assert user_info=={
        'id':1,
        'name':'test1',
        'email':'test1@naver.com',
        'profile':'testuser1'
    }
    
    update_user={
        'name':'updateuser1',
        'profile':'updatetestuser1'
    }
    result=user_service.update_user_info(1,update_user)
    assert result==2

    user_info=get_user_info(1)
    
    assert user_info=={
        'id':1,
        'name':update_user['name'],
        'email':'test1@naver.com',
        'profile':update_user['profile']
    }
    
def test_delete_user(user_service):
    result=user_service.delete_user(1)
    assert result==1
    
    assert get_user_info(1)==None

#새로운 방을 생성
def test_create_room(room_service):
    #호스트가 1번 유저인 방을 생성합니다.
    new_room={
        'title':'test_room3',
        'user_id':1
    }
    new_room_id=room_service.create_room(new_room)
    assert get_room_info(new_room_id)=={
        'id':3,
        'title':new_room['title'],
        'host_user_id':new_room['user_id']
    }

#방의 정보를 확인
def test_get_room_info(room_service):
    #1번 방의 정보를 확인
    room_info=room_service.get_room_info(1)
    assert room_info==get_room_info(1)
    #존재하지 않는 방의 정보 확인
    room_info=room_service.get_room_info(100)
    assert room_info==None

#유저의 방 정보 목록 확인
def test_get_user_roomlist(room_service):
    #1번 유저의 방 정보 목록 확인
    user_room_info_list=room_service.get_user_roomlist(1)
    assert user_room_info_list==get_user_roomlist(1)
    #2번 유저의 방 정보 목록 확인
    user_room_info_list=room_service.get_user_roomlist(2)
    assert user_room_info_list==get_user_roomlist(2)

#유저의 방 삭제
def test_delete_user_room(room_service):
    #기존 정보 확인
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(2)]
    assert user_roomlist==[1,2]
    
    #2번 유저의 1번방 삭제 후 정보 확인
    result=room_service.delete_user_room(2,1)
    assert result==1
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(2)]
    assert user_roomlist==[2]

    #2번 유저의 방 중복 삭제 확인
    result=room_service.delete_user_room(2,1)
    assert result==0
    
#방에 유저들 생성 확인
def test_create_room_users(room_service):
    #1번방의 유저 목록을 확인
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(1)]
    assert room_userlist==[1,2]
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(3)]
    assert user_roomlist==[2]
    #1번 방에 1,2,3번 유저 초대
    invite_users=[1,2,3]
    result=room_service.create_room_users(1,invite_users)
    assert result==1
    #새로 초대된 3번유저의 room_user_histroy 생성 확인
    assert get_room_user_history_info(1,3)=={
        'user_id':3,
        'room_id':1,
        'last_unread_row':0,
        'read_start_row':-1,
        'marker_row':0
    }
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(1)]
    assert room_userlist==[1,2,3]
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(3)]
    assert user_roomlist==[1,2]
    #1번방 이미 초대된 사람들의 중복 초대 확인
    invite_users=[1,2,3]
    result=room_service.create_room_users(1,invite_users)
    assert result==0
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(1)]
    assert room_userlist==[1,2,3]
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(3)]
    assert user_roomlist==[1,2]

#방에 속한 유저인지 확인
def test_is_room_user(room_service):
    #1번 방의 2번 유저 관계 확인
    result=room_service.is_room_user(1,2)
    assert result==True
    #1번 방의 존재하지 않는 유저 확인
    result=room_service.is_room_user(1,100)
    assert result==False

#방의 유저 정보 목록 확인
def test_get_room_userlist(room_service):
    #1번 방의 유저 정보목록 확인
    room_user_info_list=room_service.get_room_userlist(1)
    assert room_user_info_list==get_room_userlist(1)
    #2번 방의 유저 정보 목록 확인
    room_user_info_list=room_service.get_room_userlist(2)
    assert room_user_info_list==get_room_userlist(2)

#방의 유저 제거(강퇴)
def test_delete_room_user(room_service):
    #1번 방의 정보 확인
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(1)]
    assert room_userlist==[1,2]
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(2)]
    assert user_roomlist==[1,2]
    #1번 방의 2번 유저 제거 후 정보 확인
    result=room_service.delete_room_user(1,2)
    assert result==1
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(1)]
    assert room_userlist==[1]
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(2)]
    assert user_roomlist==[2]
    #1번방의 삭제된 유저 중복 삭제 확인
    result=room_service.delete_room_user(1,2)
    assert result==0
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(1)]
    assert room_userlist==[1]
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(2)]
    assert user_roomlist==[2]

#방의 유저의 읽기 기록 가져오기 확인
def test_get_room_user_history_info(room_service):
    result=insert_room_user_history(1,2)

    assert result==1
    
    room_user_history_info=room_service.get_room_user_history_info(1,2)

    assert get_room_user_history_info(1,2)==room_user_history_info

#방의 유저의 읽기 기록 업데이트 확인
def test_update_room_user_history_start(room_service):
    result= insert_room_user_history(1,3)
    assert result==1

    room_user_history_info=get_room_user_history_info(1,3)
    assert room_user_history_info=={
        'user_id':3,
        'room_id':1,
        'last_unread_row':0,
        'read_start_row':-1,
        'marker_row':0
    }
    
    result=room_service.update_room_user_history_start(1,3,10)
    assert result==1
    room_user_history_info=get_room_user_history_info(1,3)
    assert room_user_history_info=={
        'user_id':3,
        'room_id':1,
        'last_unread_row':10,
        'read_start_row':9,
        'marker_row':10
    }

#방의 유저의 읽기 기록 업데이트 확인
def test_update_room_user_history_last_unread_row(room_service):
    result= insert_room_user_history(1,3)
    assert result==1

    room_user_history_info=get_room_user_history_info(1,3)
    assert room_user_history_info=={
        'user_id':3,
        'room_id':1,
        'last_unread_row':0,
        'read_start_row':-1,
        'marker_row':0
    }
    result=room_service.update_room_user_history_last_unread_row(1,3,15)
    assert result==1
    room_user_history_info=get_room_user_history_info(1,3)
    assert room_user_history_info=={
        'user_id':3,
        'room_id':1,
        'last_unread_row':15,
        'read_start_row':-1,
        'marker_row':0
    }

def test_delete_user_roomlist(room_service):
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(2)]
    assert user_roomlist==[1,2]

    result=room_service.delete_user_roomlist(2)
    assert result==2

    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(2)]
    assert user_roomlist==[]
    
#유저의 방의 읽기 기록 삭제 확인
def test_delete_user_room_history(room_service):
    result=insert_room_user_history(1,3)
    assert result==1
    
    room_user_history_info=get_room_user_history_info(1,3)
    assert room_user_history_info=={
        'user_id':3,
        'room_id':1,
        'last_unread_row':0,
        'read_start_row':-1,
        'marker_row':0
    }

    result=room_service.delete_user_room_history(3)
    assert result==1
    room_user_history_info=get_room_user_history_info(1,3)
    assert room_user_history_info==None

#방의 방장을 변경 확인
def test_change_room_host_user_id(room_service):
    room_id=1
    room_info=get_room_info(room_id)
    assert room_info=={
        'id':1,
        'title':'testroom1',
        'host_user_id':1
    }
    
    user_id=2
    result=room_service.change_room_host_user_id(user_id,room_id)
    assert result==1
    
    room_info=get_room_info(room_id)
    assert room_info=={
        'id':1,
        'title':'testroom1',
        'host_user_id':2
    }

    
def test_delete_room(room_service):
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(2)]
    assert user_roomlist==[1,2] 

    result=room_service.delete_room(2)
    assert result==1
    
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(2)]
    assert user_roomlist==[1]

# #타임존업데이트
# def test_insert_datetime_timezone(image_service):

#유저의 이미지 업로드 확인
def test_upload_image(image_service):
    filename='sample_image.JPG'
    parent_path=os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
    test_image_path=f"{parent_path}/{config.test_config['TEST_IMAGE_PATH']}/{filename}"
    with open(test_image_path, 'rb') as f:
        byte_image = f.read()
    #request 의 file클래스 구현
    class image:
        file=None
        filename=None
        def __init__(self,file,filename):
            self.file=file
            self.filename=filename
        def read(self):
            return self.file
        
    request_image=image(byte_image,filename)

    new_image={
        'image':request_image,
        'user_id':1
    }
    result=image_service.upload_image(new_image)
    must_new_image_link=f"1/{filename}"
    new_image_id=result['new_image_id']
    new_image_info=get_image_info(new_image_id)
    assert extract_arguments_from_data(new_image_info,image_args)=={
        'id':5,
        'link':must_new_image_link,
        'user_id':1
    }
    #같은 사진을 두 번 올렸을 경우
    
    new_image={
        'image':request_image,
        'user_id':1
    }
    result=image_service.upload_image(new_image)
    new_image_id=result['new_image_id']
    filename='sample_image(1).JPG'
    must_new_image_link=f"1/{filename}"
    new_image_info=get_image_info(new_image_id)
    assert extract_arguments_from_data(new_image_info,image_args)=={
        'id':6,
        'link':must_new_image_link,
        'user_id':1
    }
        
def test_upload_room_image(image_service):
    filename='sample_image.JPG'
    parent_path=os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
    test_image_path=f"{parent_path}/{config.test_config['TEST_IMAGE_PATH']}/{filename}"
    with open(test_image_path, 'rb') as f:
        byte_image = f.read()
    #request 의 file클래스 구현
    class image:
        file=None
        filename=None
        def __init__(self,file,filename):
            self.file=file
            self.filename=filename
        def read(self):
            return self.file
        
    request_image=image(byte_image,filename)

    new_image={
        'image':request_image,
        'user_id':1
    }
    #1번 유저가 1번방에 사진 업로드 확인
    result=image_service.upload_room_image(1,new_image)
    new_image_id=result['new_image_id']
    new_image_link=f"1/{filename}"
    new_image_info=get_image_info(new_image_id)
    assert extract_arguments_from_data(new_image_info,image_args)=={
        'id':5,
        'link':new_image_link,
        'user_id':1
    }

    image_room_info_list=get_image_roomlist(1)
    assert image_room_info_list==[
        {
            'id':1,
            'title':'testroom1',
            'host_user_id':1,
        }
    ]

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
            'id':5,
            'link':new_image_link,
            'user_id':1,
            'user_name':'test1'
        }
    ]

    user_image_info_list=get_user_imagelist(1,{'start':0,'limit':10})
    assert extract_arguments_from_data(user_image_info_list,image_args)==[
        {
            'id':1,
            'link':'testlink1',
            'user_id':1
        },
        {
            'id':5,
            'link':new_image_link,
            'user_id':1
        }
    ]


#유저의 이미지 관계 확인
def test_is_user_image(image_service):
    #2번 유저의 2번 사진 관계 확인
    result=image_service.is_user_image(2,2)
    assert result==True
    #2번 유저의 3번 사진 관계 확인
    result=image_service.is_user_image(2,3)
    assert result==False

#이미지의 방 정보 목록 확인
def test_get_image_roomlist(image_service):
    #2번 이미지의 방 정보 목록 확인
    image_room_info_list=image_service.get_image_roomlist(2)
    assert image_room_info_list==get_image_roomlist(2)
    #4번 이미지의 방 정보 목록 확인
    image_room_info_list=image_service.get_image_roomlist(4)
    assert image_room_info_list==[]

#이미지의 정보 확인
def test_get_image_info(image_service):
    #1번 이미지의 정보 확인
    
    image_info=get_image_info(1)
    image_info['created_at']=insert_datetime_timezone(image_info['created_at'])
    assert image_info==image_service.get_image_info(1)
    #존재하지 않는 이미지의 정보 확인
    image_info=image_service.get_image_info(100)
    assert image_info==None

# #유저의 이미지 정보 목록 확인
def test_get_user_imagelist(image_service):
    #3번 유저의 이미지 정보 목록 확인
    user_image_info_list=get_user_imagelist(3,{'start':0,'limit':10})

    for image_info in user_image_info_list:
        image_info['created_at']=insert_datetime_timezone(image_info['created_at'])
    
    user_image_info_list.reverse()
    
    assert user_image_info_list==image_service.get_user_imagelist(3,{'start':0,'limit':10})

#방의 이미지 정보 목록 확인
def test_get_room_imagelist(image_service):
    #1번 방의 이미지 정보 목록 확인
    room_image_info_list=get_room_imagelist(1,{'start':0,'limit':10})
    for image_info in room_image_info_list:
        image_info['created_at']=insert_datetime_timezone(image_info['created_at'])
    
    room_image_info_list.reverse()
    
    assert room_image_info_list==image_service.get_room_imagelist(1,{'start':0,'limit':10})

#기간에 따른 방의 이미지리스트 불러오기 확인
def test_get_room_imagelist_by_date(image_service):
    start_date=datetime.strftime(datetime.now(),"%Y-%m-%d")
    dates={
        'start_date':start_date,
        'end_date':start_date
    }
    pages={'start':0,'limit':10}
    room_image_info_list_by_date=get_room_imagelist_by_date(1,dates,pages)

    for image_info in room_image_info_list_by_date:
        image_info['created_at']=insert_datetime_timezone(image_info['created_at'])

    assert room_image_info_list_by_date==image_service.get_room_imagelist_by_date(1,dates,pages) 

#이미지의 방 업데이트 확인
def test_update_image_room(image_service):
    #2번 이미지의 방 목록 확인
    image_roomlist=[image_room_info['id'] for image_room_info in get_image_roomlist(2)]
    assert image_roomlist==[1,2]
    #2번 이미지의 방 목록 업데이트 확인 
    update_roomlist=[2]
    result=image_service.update_image_room(2,update_roomlist)
    assert result=={
                    'addlist':[],
                    'deletelist':[1],
                    'add_result':0,
                    'delete_result':1
                    }
    image_roomlist=[image_room_info['id'] for image_room_info in get_image_roomlist(2)]
    assert image_roomlist==[2]

    #4번 이미지의 방 목록 확인
    image_roomlist=[image_room_info['id'] for image_room_info in get_image_roomlist(4)]
    assert image_roomlist==[]
    #2번 이미지의 방 목록 업데이트 확인 
    update_roomlist=[1,2]
    result=image_service.update_image_room(4,update_roomlist)
    assert result=={
                    'addlist':[1,2],
                    'deletelist':[],
                    'add_result':2,
                    'delete_result':0
                    }
    image_roomlist=[image_room_info['id'] for image_room_info in get_image_roomlist(2)]
    assert image_roomlist==[2]

#방의 사진 삭제 확인
def test_delete_room_image(image_service):
    #2번 이미지의 방 정보 목록 및 1번 방의 이미지 정보 목록 확인
    image_room_info_list=get_image_roomlist(2)
    assert image_room_info_list==[
        {
            'id':1,
            'title':'testroom1',
            'host_user_id':1,
        },
        {
            'id':2,
            'title':'testroom2',
            'host_user_id':2,
        },
    ]
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
    #1번방의 2번 이미지 삭제 후 2번 이미지의 방 정보 목록 및 1번 방의 이미지 정보 목록 확인
    result=image_service.delete_room_image(1,2)
    assert result==1
    image_room_info_list=get_image_roomlist(2)
    assert image_room_info_list==[
        {
            'id':2,
            'title':'testroom2',
            'host_user_id':2,
        },
    ]
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
    #1번방의 2번 사진 중복 삭제 확인
    result=image_service.delete_room_image(1,2)
    assert result==0

#이미지를 삭제합니다.
def test_delete_image(image_service):
    #2번 유저의 이미지 목록 확인 및 1번 방의 이미지 목록을 확인
    user_image_info_list=get_user_imagelist(2,{'start':0,'limit':10})
    assert extract_arguments_from_data(user_image_info_list,image_args)==[
        {
            'id':2,
            'link':'testlink2',
            'user_id':2
        }
    ]
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
    image_roomlist=[image_room_info['id'] for image_room_info in get_image_roomlist(2)]
    assert image_roomlist==[1,2]
    #2번 이미지 삭제 후 2번 유저의 이미지 목록 확인 및 1번 방의 이미지 목록을 확인
    result=image_service.delete_image(2)
    assert result=={
        'delete_image':1,
        'delete_image_room':len(image_roomlist)
    }
    user_image_info_list=get_user_imagelist(2,{'start':0,'limit':10})
    assert user_image_info_list==[]
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
    image_roomlist=[image_room_info['id'] for image_room_info in get_image_roomlist(2)]
    assert image_roomlist==[]
    image_info=get_image_info(2)
    assert image_info==None
    #이미 삭제된 이미지의 중복 삭제 확인
    result=image_service.delete_image(2)
    assert result=={
        'delete_image':0,
        'delete_image_room':len(image_roomlist)
    }
    
#방에 속한 유저의 모든 이미지 제거
def test_delete_room_user_image(image_service):
    #2번 유저의 5번 이미지 생성 및 1번방에 업로드
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
    """),{
        'id':5,
        'link':'testlink5',
        'user_id':2
    })
    database.execute(text("""
        insert into images_room_list (
            image_id,
            room_id
        ) values (
            :image_id,
            :room_id
        )
    """),{'image_id':5,'room_id':1})
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
            'id':5,
            'link':'testlink5',
            'user_id':2,
            'user_name':'test2'
        }
    ]
    image_room_info_list=get_image_roomlist(2)
    assert image_room_info_list==[
        {
            'id':1,
            'title':'testroom1',
            'host_user_id':1,
        },
        {
            'id':2,
            'title':'testroom2',
            'host_user_id':2,
        },
    ]
    user_room_info_list=get_user_roomlist(2)
    assert user_room_info_list==[
        {
            'id':1,
            'title':'testroom1',
            'host_user_id':1,
        },
        {
            'id':2,
            'title':'testroom2',
            'host_user_id':2,
        }
    ]
    
    result=image_service.delete_room_user_image(1,2)
    assert result==2
    
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
        },
        {
            'id':5,
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
            'host_user_id':2,
        },
    ]
    image_room_info_list=get_image_roomlist(5)
    assert image_room_info_list==[]
    
    #1번 방에 속한 2번 유저의 모든 이미지 중복 삭제 확인
    result=image_service.delete_room_user_image(1,2)
    assert result==0
    result=image_service.delete_room_user_image(2,100)
    assert result==0
    result=image_service.delete_room_user_image(2,3)
    assert result==1
    result=image_service.delete_room_user_image(2,3)
    assert result==0
    result=image_service.delete_room_user_image(100,3)
    assert result==0

#해당 유저가 이미지가 속한 방들의 멤버 인지 확인
def test_is_user_image_room_member(image_service):
    is_user_image_room_member=image_service.is_user_image_room_member(3,4)
    assert is_user_image_room_member==True
    is_user_image_room_member=image_service.is_user_image_room_member(3,2)
    assert is_user_image_room_member==True
    
    is_user_image_room_member=image_service.is_user_image_room_member(1,2)
    assert is_user_image_room_member==True
    is_user_image_room_member=image_service.is_user_image_room_member(1,3)
    assert is_user_image_room_member==False

    row=database.execute(text("""
        update rooms_user_list
        set deleted=1
        where room_id=1
        and user_id=1
        and deleted=0
        """)).rowcount
    assert row==1
    is_user_image_room_member=image_service.is_user_image_room_member(1,2)
    assert is_user_image_room_member==False

#방의 이미지의 길이 불러오기 확인
def test_get_room_imagelist_len(image_service):
    room_imagelist=get_room_imagelist(2,{'start':0,'limit':10})
    assert len(room_imagelist)==2
    
    room_imagelist_len=image_service.get_room_imagelist_len(2)
    assert room_imagelist_len==2

#유저의 이미지의 길이 불러오기 확인
def test_get_user_imagelist_len(image_service):
    user_imagelist=get_user_imagelist(1,{'start':0,'limit':10})
    assert len(user_imagelist)==1

    user_imagelist_len=image_service.get_user_imagelist_len(1)
    assert user_imagelist_len==1

#유저의 전체 이미지 삭제 확인
def test_delete_user_imagelist(image_service):
    user_imagelist=get_user_imagelist(3,{'start':0,'limit':10})
    assert extract_arguments_from_data(user_imagelist,image_args)==[
        {
            'id':3,
            'link':'testlink3',
            'user_id':3,
        },
        {
            'id':4,
            'link':'testlink4',
            'user_id':3,
        }
    ]
    
    result=image_service.delete_user_imagelist(3)
    assert result==2
    user_imagelist=get_user_imagelist(3,{'start':0,'limit':10})
    assert extract_arguments_from_data(user_imagelist,image_args)==[]

'''
    유저 1,2,3 (친구 1-2,친구 2-1,3,친구 3-2)
    룸 1(유저 1,2, 이미지 1,2),2(유저 2,3 이미지 2,3)
    이미지 1(유저 1),2(유저 2),3,4(유저 3)
'''
