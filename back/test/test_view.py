import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
import json
from app import create_app
import pytest
from sqlalchemy import create_engine,text
import config
import shutil
import bcrypt
from io import BytesIO

database=create_engine(config.test_config['DB_URL'],encoding='utf-8',max_overflow=0)

parent_path=os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
projects_dir=os.path.dirname(os.path.abspath(parent_path))
image_dir=f"{projects_dir}/image_back/{config.test_config['IMAGE_PATH']}"
test_image_dir=f"{parent_path}/{config.test_config['TEST_IMAGE_PATH']}"
save_image_dir=f"{config.test_config['IMAGE_DOWNLOAD_URL']}"

@pytest.fixture(scope='session')
def api():
    app=create_app(test_config=config.test_config)
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
    print("이미지 폴더 초기화")
    if os.path.isdir(f"{image_dir}"):
        shutil.rmtree(f"{image_dir}")
    print("이미지 폴더 초기화 완료")
    print("======================")

#새로운 유저 생성 
def test_sign_up(api):
    #새로운 유저 생성 확인
    new_user={
        'name':'test4',
        'email':'testuser4@naver.com',
        'password':'test_password',
        'profile':'testuser4'
    }
    resp=api.post('/user/sign-up',
            data=json.dumps(new_user),
            content_type='application/json')
    assert resp.status_code==200

    resp_json=json.loads(resp.data.decode('utf-8'))
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
def test_login(api):
    #정상적인 유저의 권한 확인
    credential={
        'email':'test1@naver.com',
        'password':'test_password'
    }
    resp=api.post('/user/login',
        data=json.dumps(credential),
        content_type='application/json')

    assert resp.status_code==200
    resp_json=json.loads(resp.data.decode('utf-8'))
    assert 'access_token' in resp_json
    access_token=resp_json['access_token']

    try:
        payload=jwt.decode(access_token,config.test_config['JWT_SECRET_KEY'],'HS256')
        assert 'user_id' in payload and payload['user_id']==1
    except:
        assert False

# #권한이 없는 유저 검사
def test_unauthorize_login(api):
    #비밀번호가 다른 유저의 권한 검사
    credential={
        'email':'test1@naver.com',
        'password':'wrong_password'

    }
    
    resp=api.post('/user/login',
        data=json.dumps(credential),
        content_type='application/json')
    
    assert resp.status_code==401
    #존재하지 않는 이메일의 유저 검사
    credential={
        'email':'wrongemail',
        'password':'test_password'

    }
    
    resp=api.post('/user/login',
        data=json.dumps(credential),
        content_type='application/json')
    
    assert resp.status_code==404

# #유저의 정보 불러오기
def test_get_user(api): 
    #존재하는 유저 정보 확인
    user_id=1
    resp=api.get(f"/user/{user_id}")
    assert resp.status_code==200
    resp_json=json.loads(resp.data.decode('utf-8'))
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
    resp=api.get(f"/user/{user_id}")
    assert resp.status_code==404

#유저의 이미지 목록 불러오기
def test_get_user_imagelist(api):
    #1번 유저의 이미지 목록 확인
    user_id=1
    access_token=generate_access_token(user_id)
    resp=api.get(f"/user/{user_id}/imagelist",
            headers={'Authorization':access_token})
    assert resp.status_code==200
    resp_json=json.loads(resp.data.decode('utf-8'))

    
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
    resp=api.get(f"/user/{user_id}/imagelist",
            headers={'Authorization':access_token})
    assert resp.status_code==200
    resp_json=json.loads(resp.data.decode('utf-8'))

    
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
    resp=api.get(f"/user/{user_id}/imagelist",
            headers={'Authorization':access_token})
    assert resp.status_code==403

#친구 생성
def test_post_user_friend(api):
    #1번 유저가 3번 유저를 친구 추가 확인
    user_id=1
    access_token=generate_access_token(user_id)
    friend={'friend_user_id':3}
    resp=api.post(f"/user/{user_id}/friend",
            data=json.dumps(friend),
            headers={'Authorization':access_token},
            content_type='application/json')
    
    assert resp.status_code==200
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(user_id)]
    assert user_friendlist==[2,3]
    #1번 유저가 이미 친구인 유저를 친구 추가 확인
    friend={'friend_user_id':2}
    resp=api.post(f"/user/{user_id}/friend",
            data=json.dumps(friend),
            headers={'Authorization':access_token},
            content_type='application/json')
    
    assert resp.status_code==402
    #1번 유저가 존재하지 않은 유저에게 친구 추가 확인
    friend={'friend_user_id':100}
    resp=api.post(f"/user/{user_id}/friend",
            data=json.dumps(friend),
            headers={'Authorization':access_token},
            content_type='application/json')
    
    assert resp.status_code==404
    #로그인한 유저와 신청하는 유저가 다를 경우 확인
    access_token=generate_access_token(3)
    friend={'friend_user_id':1}
    resp=api.post(f"/user/{user_id}/friend",
            data=json.dumps(friend),
            headers={'Authorization':access_token},
            content_type='application/json')
    assert resp.status_code==403
    
#유저의 친구 목록 가져오기
def test_get_user_friendlist(api):
    #1번 유저의 친구 목록 정보 확인
    user_id=1
    access_token=generate_access_token(user_id)
    resp=api.get(f"/user/{user_id}/friendlist",
            headers={'Authorization':access_token})

    assert resp.status_code==200
    resp_json=json.loads(resp.data.decode('utf-8'))
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
    resp=api.get(f"/user/{user_id}/friendlist",
            headers={'Authorization':access_token})

    assert resp.status_code==200
    resp_json=json.loads(resp.data.decode('utf-8'))
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
    resp=api.get(f"/user/{user_id}/friendlist",
            headers={'Authorization':access_token})

    assert resp.status_code==403

#유저의 친구 삭제
def test_delete_user_friend(api):
    #1번 유저의 친구 2번 유저를 친구 삭제 확인
    user_id=1
    access_token=generate_access_token(user_id)
    delete_frined={
        'delete_friend_user_id':2
    }
    resp=api.delete(f"user/{user_id}/friend",
            data=json.dumps(delete_frined),
            headers={'Authorization':access_token},
            content_type='application/json')

    assert resp.status_code==200
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(user_id)]
    assert user_friendlist==[]
    user_friendlist=[user_friend_info['id'] for user_friend_info in get_user_friendlist(2)]
    assert user_friendlist==[3]
    #로그인한 유저와 삭제 하려는 유저가 다를 때
    user_id=3
    access_token=generate_access_token(1)
    delete_frined={
        'delete_friend_user_id':2
    }
    resp=api.delete(f"user/{user_id}/friend",
            data=json.dumps(delete_frined),
            headers={'Authorization':access_token},
            content_type='application/json')

    assert resp.status_code==403
    #존재하지 않는 유저를 삭제하려 할때
    user_id=1
    access_token=generate_access_token(user_id)
    delete_frined={
        'delete_friend_user_id':100
    }
    resp=api.delete(f"user/{user_id}/friend",
            data=json.dumps(delete_frined),
            headers={'Authorization':access_token},
            content_type='application/json')
    
    assert resp.status_code==404

#유저의 방 목록 불러오기
def test_get_user_roomlist(api):
    #1번 유저의 방 목록 확인
    user_id=1
    access_token=generate_access_token(user_id)
    resp=api.get(f"/user/{user_id}/roomlist",
                headers={'Authorization':access_token})
    assert resp.status_code==200    
    resp_json=json.loads(resp.data.decode('utf-8'))
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
    resp=api.get(f"/user/{user_id}/roomlist",
                headers={'Authorization':access_token})
    assert resp.status_code==403

#유저가 방을 나가기
def test_delete_user_room(api):
    #1번 유저가 1번 방을 나감을 확인
    delete_user_room={
        'delete_user_room_id':1
    }
    user_id=1
    access_token=generate_access_token(1)
    resp=api.delete(f"/user/{user_id}/room",
        data=json.dumps(delete_user_room),
        headers={'Authorization':access_token},
        content_type='application/json')
    assert resp.status_code==200
    
    user_roomlist=[user_room_info['id'] for user_room_info in get_user_roomlist(user_id)]
    assert user_roomlist==[]

    user_id=1
    access_token=generate_access_token(3)
    resp=api.delete(f"/user/{user_id}/room",
        data=json.dumps(delete_user_room),
        headers={'Authorization':access_token},
        content_type='application/json')
    assert resp.status_code==403

def test_post_room(api):
    user_id=1
    access_token=generate_access_token(user_id)
    new_room={
        'userlist':[1,2,3],
        'title':'testroom3'
    }
    resp=api.post(f"/room",
        data=json.dumps(new_room),
        headers={'Authorization':access_token},
        content_type='application/json')
    assert resp.status_code==200
    resp_json=json.loads(resp.data.decode('utf-8'))
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
def test_post_room_image(api):
    #1번유저가 1번 반에서 사진을 업로드
    filename="sample_image.JPG"
    test_file_path=f"{test_image_dir}/{filename}"
    with open(test_file_path,'rb') as f:
        image=f.read()
    image=image
    
    user_id=1
    access_token=generate_access_token(user_id)
    room_id=1
    
    resp=api.post(f"/room/{room_id}/image",
            data={'image':(BytesIO(image),filename)},
            headers={'Authorization':access_token},
            content_type='multipart/form-data')
    
    assert resp.status_code==200
    
    resp_json=json.loads(resp.data.decode('utf-8'))
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
def test_delete_room_image(api):
    #2번 사진의 주인인 2번 유저가 2번 사진을 1번방에서 삭제 합니다.
    delete_image={
        'delete_room_image_id':2
    }
    
    user_id=2
    access_token=generate_access_token(user_id)
    room_id=1

    resp=api.delete(f"/room/{room_id}/image",
        data=json.dumps(delete_image),
        headers={'Authorization':access_token},
        content_type='application/json')
    
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
    delete_image={
        'delete_room_image_id':1
    }
    resp=api.delete(f"/room/{room_id}/image",
        data=json.dumps(delete_image),
        headers={'Authorization':access_token},
        content_type='application/json')
    
    assert resp.status_code==403

#방의 이미지 정보 목록을 불러옵니다.
def test_get_room_imagelist(api):
    #1번 유저가 자신의 방인 1번 방의 사진 정보 목록을 확인
    user_id=1
    access_token=generate_access_token(user_id)
    room_id=1
    resp=api.get(f"/room/{room_id}/imagelist",
            headers={'Authorization':access_token})
    assert resp.status_code==200
    
    resp_json=json.loads(resp.data.decode('utf-8'))
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
    resp=api.get(f"/room/{room_id}/imagelist",
            headers={'Authorization':access_token})
    assert resp.status_code==403

#방의 유저 정보 목록을 불러 옵니다.
def test_get_room_userlist(api):
    #방에 속한 유저인 1번 유저가 1번 방의 유저 목록 정보를 확인
    user_id=1
    access_token=generate_access_token(user_id)
    room_id=1
    resp=api.get(f"/room/{room_id}/userlist",
            headers={'Authorization':access_token})
    assert resp.status_code==200
    resp_json=json.loads(resp.data.decode('utf-8'))
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
    resp=api.get(f"/room/{room_id}/userlist",
            headers={'Authorization':access_token})
    assert resp.status_code==403

#방의 유저를 초대
def test_delete_room_user(api):
    #1번방의 방장이 2번 유저를 강퇴 확인
    user_id=1
    access_token=generate_access_token(user_id)
    room_id=1
    delete_room_user={
        'delete_room_user_id':2
    }
    resp=api.delete(f"/room/{room_id}/user",
            data=json.dumps(delete_room_user),
            headers={'Authorization':access_token},
            content_type='application/json')
    assert resp.status_code==200
    
    #방장이 아닌 2번 유저가 다른 유저를 강퇴 확인
    access_token=generate_access_token(3)
    delete_room_user={
        'delete_room_user_id':2
    }
    room_id=2
    resp=api.delete(f"/room/{room_id}/user",
            data=json.dumps(delete_room_user),
            headers={'Authorization':access_token},
            content_type='application/json')
    assert resp.status_code==403

#방의 유저를 초대
def test_post_room_user(api):
    #새로운 유저를 생성합니다.
    resp=api.post(f"/user/sign-up",
            data=json.dumps(
                {
                    'name':'test4',
                    'email':'test4@naver.com',
                    'profile':'testuser4',
                    'password':'test_password'

                }),
            content_type='application/json')
        
    assert resp.status_code==200
    resp_json=json.loads(resp.data.decode('utf-8'))
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
    resp=api.post(f"/room/{room_id}/user",
                  data=json.dumps(invite_user),
                  headers={'Authorization':access_token},
                  content_type='application/json')
    
    assert resp.status_code==200
    room_userlist=[room_user_info['id'] for room_user_info in get_room_userlist(room_id)]
    assert room_userlist==[1,2,3,4]
    
    #2번방에 속하지 않은 유저 1번이 1번과 4번 유저를 방으로 초대 확인
    room_id=2
    invite_user={
        'invite_userlist':[1,4]
    }
    resp=api.post(f"/room/{room_id}/user",
                  data=json.dumps(invite_user),
                  headers={'Authrization':access_token},
                  content_type='application/json')
    
    assert resp.status_code==401

#사진 업로드
def test_post_image(api):
    #1번 유저가 사진 업로드
    filename="sample_image.JPG"
    test_file_path=f"{test_image_dir}/{filename}"
    with open(test_file_path,'rb') as f:
        image=f.read()
    image=image

    user_id=1
    access_token=generate_access_token(user_id)
    resp=api.post(f"/image",
            data={'image':(BytesIO(image),filename)},
            headers={'Authorization':access_token},
            content_type='multipart/form-data')
    
    assert resp.status_code==200
    
    must_be_image_link=f"{save_image_dir}{user_id}/{filename}"

    resp_json=json.loads(resp.data.decode('utf-8'))
    assert resp_json=={
        'image_info':{
            'id':5,
            'link':must_be_image_link,
            'user_id':user_id
        }
    }
    image_info=get_image_info(5)
    assert image_info=={
        'id':5,
        'link':must_be_image_link,
        'user_id':user_id
    }
    
    resp=api.post(f"/image",
            data={'image':(BytesIO(image),None)},
            headers={'Authorization':access_token},
            content_type='multipart/form-data')
    assert resp.status_code==404

#사진 삭제 =>image삭제,images_room_list 삭제,
def test_delete_image(api):
    #2번 유저가 자신의 사진인 2번사진을 삭제 확인
    user_id=2
    access_token=generate_access_token(user_id)
    delete_image={
        'delete_image_id':2
    }

    resp=api.delete(f"/image",
            data=json.dumps(delete_image),
            headers={'Authorization':access_token},
            content_type='application/json')
    
    assert resp.status_code==200
    
    image_roomlist=[image_room_info['id'] for image_room_info in get_image_roomlist(2)]
    assert image_roomlist==[]
    #자신의 사진이 아닌 사진을 삭제 확인
    delete_image={
        'delete_image_id':1
    }
    
    resp=api.delete(f"/image",
            data=json.dumps(delete_image),
            headers={'Authorization':access_token},
            content_type='application/json')
    
    assert resp.status_code==403
    #존재하지 않는 사진에 대해 삭제 확인
    delete_image={
        'delete_image_id':100
    }
    
    resp=api.delete(f"/image",
            data=json.dumps(delete_image),
            headers={'Authorization':access_token},
            content_type='application/json')
    
    assert resp.status_code==404
    
def test_get_image(api):
    user_id=1
    access_token=generate_access_token(user_id)
    image_id=1
    resp=api.get(f"/image/{image_id}",
            headers={'Authorization':access_token})
    assert resp.status_code==200
    
    resp_json=json.loads(resp.data.decode('utf-8'))
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
    resp=api.get(f"/image/{image_id}",
            headers={'Authorization':access_token})
    assert resp.status_code==403
    #존재하지 않는 사진을 불러옵니다.
    access_token=generate_access_token(3)
    image_id=100
    resp=api.get(f"/image/{image_id}",
            headers={'Authorization':access_token})
    assert resp.status_code==404

#사진의 방 권한 목록을 불러옵니다.
def test_get_image_roomlist(api):
    #사진의 주인인 2번 유저가 사진의 방 권한 확인
    user_id=2
    access_token=generate_access_token(user_id)
    image_id=2
    resp=api.get(f"/image/{image_id}/roomlist",
            headers={'Authorization':access_token})
    assert resp.status_code==200
    
    resp_json=json.loads(resp.data.decode('utf-8'))
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
    resp=api.get(f"/image/{image_id}/roomlist",
                headers={'Authorization':access_token})
    assert resp.status_code==403
    #존재하지 않는 사진에 대한 방 권한 확인
    image_id=100
    access_token=generate_access_token(3)
    resp=api.get(f"/image/{image_id}/roomlist",
                headers={'Authorization':access_token})
    assert resp.status_code==404

#사진의 방 권한 목록 업데이트
def test_post_image_roomlist(api):
    #사진의 주인인 2번 유저가 2번 사진의 방 권한 목록을 업데이트합니다.
    user_id=2
    access_token=generate_access_token(user_id)
    image_id=2
    update_roomlist={'update_roomlist':[1]}

    resp=api.post(f"/image/{image_id}/roomlist",
                data=json.dumps(update_roomlist),
                headers={'Authorization':access_token},
                content_type='application/json')
    assert resp.status_code==200
    image_roomlist=[image_room_info['id'] for image_room_info in get_image_roomlist(image_id)]
    assert image_roomlist==[1]
    #사진의 주인이 아닌 3번 유저가 사진의 방 권한 목록을 업데이트 확인
    access_token=generate_access_token(3)
    resp=api.post(f"/image/{image_id}/roomlist",
                data=json.dumps(update_roomlist),
                headers={'Authorization':access_token},
                content_type='application/json')
    assert resp.status_code==403
    #존재하지 않는 사진에 대한 사진의 방 권한 목록 확인
    image_id=100
    resp=api.post(f"/image/{image_id}/roomlist",
                data=json.dumps(update_roomlist),
                headers={'Authorization':access_token},
                content_type='application/json')
    assert resp.status_code==404




'''
    유저 1,2,3 (친구 1-2,친구 2-1,3,친구 3-2)
    룸 1(유저 1,2, 이미지 1,2),2(유저 2,3 이미지 2,3)
    이미지 1(유저 1),2(유저 2),3,4(유저 3)
'''
