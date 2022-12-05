import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
from app import create_app
import pytest
from sqlalchemy import create_engine,text
import shutil
import bcrypt
import jwt
from io import BytesIO

from fastapi.testclient import TestClient

from config import test_settings

settings= test_settings

database=create_engine(settings.DB_URL,encoding='utf-8',max_overflow=0)

parent_path=os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
projects_dir=os.path.dirname(os.path.abspath(parent_path))
image_dir=f"{projects_dir}/image_back/{settings.IMAGE_PATH}"
test_image_dir=f"{parent_path}/{settings.TEST_IMAGE_PATH}"
save_image_dir=f"{settings.IMAGE_DOWNLOAD_URL}"

@pytest.fixture(scope='session')
def client():
    app=create_app()
    client=TestClient(app)

    return client 

def setup_function():
    print("============setup_func============")
    print(settings)
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
    print("이미지 폴더 초기화")
    if os.path.isdir(f"{image_dir}"):
        shutil.rmtree(f"{image_dir}")
    print("이미지 폴더 초기화 완료")
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

def generate_access_token(user_id):
    return jwt.encode({'user_id':user_id},settings.JWT_SECRET_KEY,'HS256')

#새로운 유저 생성 
def test_sign_up(client):
    #새로운 유저 생성 확인
    new_user={
        'name':'test4',
        'email':'testuser4@naver.com',
        'password':'test_password',
        'profile':'testuser4'
    }
    resp=client.post('/user/sign-up',
            json=(new_user))
    
    assert resp.status_code==200

    resp_json=resp.json()
    assert resp_json=={
        'user_info':
        {
            'id':4,
            'name':new_user['name'],
            'email':new_user['email'],
            'profile':new_user['profile'],
        }
    }

#정상적인 유저의 권한 검사
def test_login(client):
    #정상적인 유저의 권한 확인
    credential={
        'email':'test1@naver.com',
        'password':'test_password'
    }
    resp=client.post('/user/login',
        json=(credential))

    assert resp.status_code==200
    resp_json=resp.json()
    assert 'access_token' in resp_json
    access_token=resp_json['access_token']

    try:
        payload=jwt.decode(access_token,settings.JWT_SECRET_KEY,'HS256')
        assert 'user_id' in payload and payload['user_id']==1
    except:
        assert False

# #권한이 없는 유저 검사
def test_unauthorize_login(client):
    #비밀번호가 다른 유저의 권한 검사
    credential={
        'email':'test1@naver.com',
        'password':'wrong_password'

    }
    
    resp=client.post('/user/login',
        json=(credential))
    
    assert resp.status_code==401
    #존재하지 않는 이메일의 유저 검사
    credential={
        'email':'wrongemail',
        'password':'test_password'

    }
    
    resp=client.post('/user/login',
        json=(credential))
    
    assert resp.status_code==404

# #유저의 정보 불러오기
def test_get_user(client): 
    #존재하는 유저 정보 확인
    user_id=1
    access_token=generate_access_token(user_id)
    resp=client.get(f"/user/{user_id}",
                    headers={'access-token':access_token})
    assert resp.status_code==200
    resp_json=resp.json()
    assert resp_json=={
        'user_info':
        {
            'id':1,
            'name':'test1',
            'email':'test1@naver.com',
            'profile':'testuser1'
        }
    }

    #존재하지 않는 유저 정보 확인
    user_id=100
    access_token=generate_access_token(user_id)
    resp=client.get(f"/user/{user_id}",
                    headers={'access-token':access_token})
    assert resp.status_code==404

#유저의 이미지 목록 불러오기
def test_get_user_imagelist(client):
    #1번 유저의 이미지 목록 확인
    user_id=1
    access_token=generate_access_token(user_id)
    resp=client.get(f"/user/{user_id}/imagelist",
            headers={'access-token':access_token})
    assert resp.status_code==200
    resp_json=resp.json()

    
    assert resp_json=={
        'imagelist':[
            {
                'id':1,
                'link':'testlink1',
                'user_id':1
            },
        ]
    }

    #2번 유저의 이미지 목록 확인
    user_id=2
    access_token=generate_access_token(user_id)
    resp=client.get(f"/user/{user_id}/imagelist",
            headers={'access-token':access_token})
    assert resp.status_code==200
    resp_json=resp.json()

    
    assert resp_json=={
        'imagelist':[
            {
                'id':2,
                'link':'testlink2',
                'user_id':2
            }
        ]
    }
    #로그인한 유저와 조회하는 이미지 목록의 유저가 다를 경우 확인
    user_id=1
    access_token=generate_access_token(3)
    resp=client.get(f"/user/{user_id}/imagelist",
            headers={'access-token':access_token})
    assert resp.status_code==403

#친구 생성
def test_post_user_friend(client):
    #1번 유저가 3번 유저를 친구 추가 확인
    user_id=1
    access_token=generate_access_token(user_id)
    friend={'friend_user_id':3}
    resp=client.post(f"/user/{user_id}/friend",
            json=(friend),
            headers={'access-token':access_token},)
    
    assert resp.status_code==200
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(user_id)]
    assert user_friendlist==[2,3]
    #1번 유저가 이미 친구인 유저를 친구 추가 확인
    friend={'friend_user_id':2}
    resp=client.post(f"/user/{user_id}/friend",
            json=(friend),
            headers={'access-token':access_token},)
    
    assert resp.status_code==402
    #1번 유저가 존재하지 않은 유저에게 친구 추가 확인
    friend={'friend_user_id':100}
    resp=client.post(f"/user/{user_id}/friend",
            json=(friend),
            headers={'access-token':access_token},)
    
    assert resp.status_code==404
    #로그인한 유저와 신청하는 유저가 다를 경우 확인
    access_token=generate_access_token(3)
    friend={'friend_user_id':1}
    resp=client.post(f"/user/{user_id}/friend",
            json=(friend),
            headers={'access-token':access_token},)
    assert resp.status_code==403
    
#유저의 친구 목록 가져오기
def test_get_user_friendlist(client):
    #1번 유저의 친구 목록 정보 확인
    user_id=1
    access_token=generate_access_token(user_id)
    resp=client.get(f"/user/{user_id}/friendlist",
            headers={'access-token':access_token})

    assert resp.status_code==200
    resp_json=resp.json()
    assert resp_json=={
        'friendlist':[
        {
            'id':2,
            'name':'test2',
            'email':'test2@naver.com',
            'profile':'testuser2',
        }
    ]
        }
    #2번 유저의 친구 목록 정보 확인
    user_id=2
    access_token=generate_access_token(user_id)
    resp=client.get(f"/user/{user_id}/friendlist",
            headers={'access-token':access_token})

    assert resp.status_code==200
    resp_json=resp.json()
    assert resp_json=={
        'friendlist':[
        {
            'id':1,
            'name':'test1',
            'email':'test1@naver.com',
            'profile':'testuser1',
        },
        {
            'id':3,
            'name':'test3',
            'email':'test3@naver.com',
            'profile':'testuser3',
        }
    ]}
    #로그인한 유저와 조회하려는 유저가 다른 경우 확인
    user_id=1
    access_token=generate_access_token(3)
    resp=client.get(f"/user/{user_id}/friendlist",
            headers={'access-token':access_token})

    assert resp.status_code==403

#유저의 친구 삭제
def test_delete_user_friend(client):
    #1번 유저의 친구 2번 유저를 친구 삭제 확인
    user_id=1
    access_token=generate_access_token(user_id)
    delete_friend_user_id=2
    resp=client.delete(f"user/{user_id}/friend/{delete_friend_user_id}",
            headers={'access-token':access_token},)

    assert resp.status_code==200
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(user_id)]
    assert user_friendlist==[]
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(2)]
    assert user_friendlist==[3]
    #로그인한 유저와 삭제 하려는 유저가 다를 때
    user_id=3
    access_token=generate_access_token(1)
    delete_friend_user_id=2
    resp=client.delete(f"user/{user_id}/friend/{delete_friend_user_id}",
            headers={'access-token':access_token},)

    assert resp.status_code==403
    #존재하지 않는 유저를 삭제하려 할때
    user_id=1
    access_token=generate_access_token(user_id)
    delete_friend_user_id=100
    resp=client.delete(f"user/{user_id}/friend/{delete_friend_user_id}",
            headers={'access-token':access_token})
    
    assert resp.status_code==404

#유저의 방 목록 불러오기
def test_get_user_roomlist(client):
    #1번 유저의 방 목록 확인
    user_id=1
    access_token=generate_access_token(user_id)
    resp=client.get(f"/user/{user_id}/roomlist",
                headers={'access-token':access_token})
    assert resp.status_code==200    
    resp_json=resp.json()

    assert resp_json=={
        'roomlist':[
            {
                'id':1,
                'title':'testroom1',
                'host_user_id':1,
                'userlist':[
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
                    }
                ]
            }
        ]
    }
    #로그인한 유저와 불러오려는 유저가 다른경우
    user_id=1
    access_token=generate_access_token(3)
    resp=client.get(f"/user/{user_id}/roomlist",
                headers={'access-token':access_token})
    assert resp.status_code==403

#유저가 방을 나가기
def test_delete_user_room(client):
    #1번 유저가 1번 방을 나감을 확인
    delete_user_room_id=1
    user_id=1
    access_token=generate_access_token(1)
    resp=client.delete(f"/user/{user_id}/room/{delete_user_room_id}",
        headers={'access-token':access_token})
    assert resp.status_code==200
    
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(user_id)]
    assert user_roomlist==[]

    user_id=1
    access_token=generate_access_token(3)
    resp=client.delete(f"/user/{user_id}/room/{delete_user_room_id}",
        headers={'access-token':access_token})
    assert resp.status_code==403

def test_post_room(client):
    user_id=1
    access_token=generate_access_token(user_id)
    new_room={
        'userlist':[1,2,3],
        'title':'testroom3'
    }
    resp=client.post(f"/room",
        json=(new_room),
        headers={'access-token':access_token})
    assert resp.status_code==200
    resp_json=resp.json()
    new_room_id=resp_json['room_info']['id']
    assert resp_json=={
        'room_info':{
            'id':new_room_id,
            'title':new_room['title'],
            'host_user_id':user_id
        },
        'success':3
    }
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(new_room_id)]
    assert room_userlist==[1,2,3]

#방에 사진 업로드
def test_post_room_image(client):
    #1번유저가 1번 반에서 사진을 업로드
    filename="sample_image.JPG"
    test_file_path=f"{test_image_dir}/{filename}"
    with open(test_file_path,'rb') as f:
        image=f.read()
    image=image
    
    user_id=1
    access_token=generate_access_token(user_id)
    room_id=1
    
    resp=client.post(f"/room/{room_id}/image",
            files={'image':(filename,BytesIO(image),"image/jpeg")},
            headers={'access-token':access_token})
    
    assert resp.status_code==200
    
    resp_json=resp.json()
    must_be_image_link=f"{save_image_dir}{user_id}/{filename}"
    assert resp_json=={
        'image_info':{
            'id':5,
            'user_id':user_id,
            'link':must_be_image_link
        },
        'success':1
    }
    
    new_image_id=resp_json['image_info']['id']
    image_info=get_image_info(new_image_id)
    assert image_info == {
        'id':new_image_id,
        'user_id':user_id,
        'link':must_be_image_link
    }
    
    room_image_info_list=[room_image_info['id'] for room_image_info in get_room_imagelist(room_id)]
    assert room_image_info_list==[1,2,new_image_id]

#방의 사진을 삭제합니다.
def test_delete_room_image(client):
    #2번 사진의 주인인 2번 유저가 2번 사진을 1번방에서 삭제 합니다.

    delete_room_image_id=2
    user_id=2
    access_token=generate_access_token(user_id)
    room_id=1

    resp=client.delete(f"/room/{room_id}/image/{delete_room_image_id}",
        headers={'access-token':access_token})
    
    assert resp.status_code==200
    room_image_info_list=get_room_imagelist(room_id)
    assert room_image_info_list==[
        {
        'id':1,
        'link':'testlink1',
        'user_id':1
        },
        {
            'id':2,
            'link':None,
            'user_id':None
        }
    ]
    #자신이 주인이 아닌 1번 이미지를 1번방에서 삭제합니다.
    delete_room_image_id=1
    resp=client.delete(f"/room/{room_id}/image/{delete_room_image_id}",
        headers={'access-token':access_token})
    
    assert resp.status_code==403

#방의 이미지 정보 목록을 불러옵니다.
def test_get_room_imagelist(client):
    #1번 유저가 자신의 방인 1번 방의 사진 정보 목록을 확인
    user_id=1
    access_token=generate_access_token(user_id)
    room_id=1
    resp=client.get(f"/room/{room_id}/imagelist",
            headers={'access-token':access_token})
    assert resp.status_code==200
    
    resp_json=resp.json()
    assert resp_json=={
        'imagelist':[
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
    }
    
    #방에 속하지 않은 3번 유저가 1번 방의 이미지 정보 목록을 불러옵니다.
    access_token=generate_access_token(3)
    resp=client.get(f"/room/{room_id}/imagelist",
            headers={'access-token':access_token})
    assert resp.status_code==403

#방의 유저 정보 목록을 불러 옵니다.
def test_get_room_userlist(client):
    #방에 속한 유저인 1번 유저가 1번 방의 유저 목록 정보를 확인
    user_id=1
    access_token=generate_access_token(user_id)
    room_id=1
    resp=client.get(f"/room/{room_id}/userlist",
            headers={'access-token':access_token})
    assert resp.status_code==200
    resp_json=resp.json()
    assert resp_json=={
        'userlist':[
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
            }
        ] 
    }
    #방에 속하지 않은 3번 유저가 방의 정보 목록을 확인
    access_token=generate_access_token(3)
    resp=client.get(f"/room/{room_id}/userlist",
            headers={'access-token':access_token})
    assert resp.status_code==403

#방의 유저를 초대
def test_delete_room_user(client):
    #1번방의 방장이 2번 유저를 강퇴 확인
    user_id=1
    access_token=generate_access_token(user_id)
    room_id=1

    delete_room_user_id=2
    resp=client.delete(f"/room/{room_id}/user/{delete_room_user_id}",
            headers={'access-token':access_token},)
    assert resp.status_code==200
    
    #방장이 아닌 2번 유저가 다른 유저를 강퇴 확인
    access_token=generate_access_token(3)

    delete_room_user_id=2
    room_id=2
    resp=client.delete(f"/room/{room_id}/user/{delete_room_user_id}",
            headers={'access-token':access_token},)
    assert resp.status_code==403

#방의 유저를 초대
def test_post_room_user(client):
    #새로운 유저를 생성합니다.
    resp=client.post(f"/user/sign-up",
            json=(
                {
                    'name':'test4',
                    'email':'test4@naver.com',
                    'profile':'testuser4',
                    'password':'test_password'

                }),)
        
    assert resp.status_code==200
    resp_json=resp.json()
    assert resp_json=={
        'user_info':
            {
                'id':4,
                'name':'test4',
                'email':'test4@naver.com',
                'profile':'testuser4'
            }
    }

    user_id=1
    access_token=generate_access_token(user_id)
    room_id=1
    invite_user={
        'invite_userlist':[3,4]
    }
    resp=client.post(f"/room/{room_id}/user",
                  json=(invite_user),
                  headers={'access-token':access_token},
    )
    
    assert resp.status_code==200
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(room_id)]
    assert room_userlist==[1,2,3,4]
    
    #2번방에 속하지 않은 유저 1번이 1번과 4번 유저를 방으로 초대 확인
    room_id=2
    invite_user={
        'invite_userlist':[1,4]
    }
    resp=client.post(f"/room/{room_id}/user",
                  json=(invite_user),
                  headers={'access-token':access_token},
    )

    assert resp.status_code==403

#사진 업로드
def test_post_image(client):
    #1번 유저가 사진 업로드
    filename="sample_image.JPG"
    test_file_path=f"{test_image_dir}/{filename}"
    with open(test_file_path,'rb') as f:
        image=f.read()
    image=image

    user_id=1
    access_token=generate_access_token(user_id)
    resp=client.post(f"/image",
            files={'image':(filename,BytesIO(image))},
            headers={'access-token':access_token})
    
    assert resp.status_code==200
    
    must_be_image_link=f"{save_image_dir}{user_id}/{filename}"

    resp_json=resp.json()
    assert resp_json=={
        'image_info':{
            'id':5,
            'link':must_be_image_link,
            'user_id':user_id
        },
        'success':1
    }
    image_info=get_image_info(5)
    assert image_info=={
        'id':5,
        'link':must_be_image_link,
        'user_id':user_id
    }
    
    resp=client.post(f"/image",
            files={'image':('',BytesIO(image))},
            headers={'access-token':access_token})
    assert resp.status_code==422

#사진 삭제 =>image삭제,images_room_list 삭제,
def test_delete_image(client):
    #2번 유저가 자신의 사진인 2번사진을 삭제 확인
    user_id=2
    access_token=generate_access_token(user_id)
    delete_image_id=2

    resp=client.delete(f"/image/{delete_image_id}",
            headers={'access-token':access_token},)
    assert resp.status_code==200
    
    image_roomlist=[image_room_info['id'] for image_room_info in get_image_roomlist(2)]
    assert image_roomlist==[]
    #자신의 사진이 아닌 사진을 삭제 확인
    delete_image_id=1
    
    resp=client.delete(f"/image/{delete_image_id}",
            headers={'access-token':access_token})
    
    assert resp.status_code==403
    #존재하지 않는 사진에 대해 삭제 확인
    delete_image_id=100
    
    resp=client.delete(f"/image/{delete_image_id}",
            headers={'access-token':access_token},)
    
    assert resp.status_code==404
    
def test_get_image(client):
    user_id=1
    access_token=generate_access_token(user_id)
    image_id=1
    resp=client.get(f"/image/{image_id}",
            headers={'access-token':access_token})
    assert resp.status_code==200
    
    resp_json=resp.json()
    assert resp_json=={
        'image_info':
            {
                'id':1,
                'link':'testlink1',
                'user_id':1
            }
    }
    #사진의 방에 속하지 않은 사람이 불러옵니다.
    access_token=generate_access_token(3)
    image_id=1
    resp=client.get(f"/image/{image_id}",
            headers={'access-token':access_token})
    assert resp.status_code==403
    #존재하지 않는 사진을 불러옵니다.
    access_token=generate_access_token(3)
    image_id=100
    resp=client.get(f"/image/{image_id}",
            headers={'access-token':access_token})
    assert resp.status_code==404

#사진의 방 권한 목록을 불러옵니다.
def test_get_image_roomlist(client):
    #사진의 주인인 2번 유저가 사진의 방 권한 확인
    user_id=2
    access_token=generate_access_token(user_id)
    image_id=2
    resp=client.get(f"/image/{image_id}/roomlist",
            headers={'access-token':access_token})
    assert resp.status_code==200
    
    resp_json=resp.json()
    assert resp_json=={
        'roomlist':[
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
    }
    #사진의 주인이 아닌 3번 유저가 사진의 방 권한 확인
    access_token=generate_access_token(3)
    resp=client.get(f"/image/{image_id}/roomlist",
                headers={'access-token':access_token})
    assert resp.status_code==403
    #존재하지 않는 사진에 대한 방 권한 확인
    image_id=100
    access_token=generate_access_token(3)
    resp=client.get(f"/image/{image_id}/roomlist",
                headers={'access-token':access_token})
    assert resp.status_code==404

#사진의 방 권한 목록 업데이트
def test_post_image_roomlist(client):
    #사진의 주인인 2번 유저가 2번 사진의 방 권한 목록을 업데이트합니다.
    user_id=2
    access_token=generate_access_token(user_id)
    image_id=2
    update_roomlist={'update_roomlist':[1]}

    resp=client.post(f"/image/{image_id}/roomlist",
                json=(update_roomlist),
                headers={'access-token':access_token},
)
    assert resp.status_code==200
    image_roomlist=[image_room_info['id'] for image_room_info in get_image_roomlist(image_id)]
    assert image_roomlist==[1]
    #사진의 주인이 아닌 3번 유저가 사진의 방 권한 목록을 업데이트 확인
    access_token=generate_access_token(3)
    resp=client.post(f"/image/{image_id}/roomlist",
                json=(update_roomlist),
                headers={'access-token':access_token},
)
    assert resp.status_code==403
    #존재하지 않는 사진에 대한 사진의 방 권한 목록 확인
    image_id=100
    resp=client.post(f"/image/{image_id}/roomlist",
                json=(update_roomlist),
                headers={'access-token':access_token},
)
    assert resp.status_code==404




'''
    유저 1,2,3 (친구 1-2,친구 2-1,3,친구 3-2)
    룸 1(유저 1,2, 이미지 1,2),2(유저 2,3 이미지 2,3)
    이미지 1(유저 1),2(유저 2),3,4(유저 3)
'''
