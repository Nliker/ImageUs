import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
import json
from app import create_app
import pytest
from sqlalchemy import create_engine,text
import config
import shutil
import bcrypt
import jwt

database=database=create_engine(config.test_config['DB_URL'],encoding='utf-8',max_overflow=0)

parent_path=os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
projects_dir=os.path.dirname(os.path.abspath(parent_path))
image_dir=f"{projects_dir}/image_back/{config.test_config['IMAGE_PATH']}"

@pytest.fixture()
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
    return jwt.encode({'user_id':user_id},config.test_config['JWT_SECRET_KEY'],'HS256')

#새로운 유저 생성 
def test_sign_up(api):
    #새로운 유저 생성 확인
    new_user={
        'name':'test4',
        'email':'testuser4@naver.com',
        'password':'test_password',
        'profile':'testuser4'
    }
    resp=api.post('/sign-up',
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
    resp=api.post('/login',
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

#권한이 없는 유저 검사
def test_unauthorize_login(api):
    #비밀번호가 다른 유저의 권한 검사
    credential={
        'email':'test1@naver.com',
        'password':'wrong_password'

    }
    
    resp=api.post('/login',
        data=json.dumps(credential),
        content_type='application/json')
    
    assert resp.status_code==401
    #존재하지 않는 이메일의 유저 검사
    credential={
        'email':'wrongemail',
        'password':'test_password'

    }
    
    resp=api.post('/login',
        data=json.dumps(credential),
        content_type='application/json')
    
    assert resp.status_code==404

#유저의 정보 불러오기
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
    assert resp.status_code==401

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
    
    assert resp.status_code==401
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
    assert resp.status_code==401
    
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

    assert resp.status_code==401

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

    assert resp.status_code==401
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


# def test_get_user_roomlist(api):
    
# def test_delete_user_room(api):


# def test_post_room(api):

# def test_post_room_image(api):
    
# def test_delete_room_image(api):
    
# def test_get_room_imagelist(api):

# def test_get_room_userlist(api):

# def test_room_user(api):

# def test_post_room_user(api):


# def test_post_image(api):

# def test_delete_image(api):
    
# def test_get_image(api):
    
# def test_get_image_roomlist(api):

# def test_post_image_roomlist(api):
    



'''
    유저 1,2,3 (친구 1-2,친구 2-1,3,친구 3-2)
    룸 1(유저 1,2, 이미지 1,2),2(유저 2,3 이미지 2,3)
    이미지 1(유저 1),2(유저 2),3,4(유저 3)
'''
