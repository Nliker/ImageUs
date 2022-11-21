from sqlalchemy import text,create_engine
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
from app import create_app
import pytest
import config
import shutil
from PIL import Image
from io import BytesIO
import jwt
import json
import bcrypt

database=create_engine(config.test_config['DB_URL'],encoding='utf-8',max_overflow=0)

parent_path=os.path.dirname(os.path.abspath(os.path.dirname(__file__)))

image_dir=f"{parent_path}/{config.test_config['IMAGE_PATH']}"

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
    print("샘플 폴더 생성")
    if not os.path.isdir(f"{image_dir}"):
        os.makedirs(f"{image_dir}")
        os.makedirs(f"{image_dir}/1")
        
    
    filename='sample_image.JPG'
    test_image_path=f"{parent_path}/{config.test_config['TEST_IMAGE_PATH']}/{filename}"

    with open(test_image_path, 'rb') as f:
        byte_image = f.read()
    image=Image.open(BytesIO(byte_image))
    image.filename=filename
    image.save(f"{image_dir}/1/{filename}")
    
    print("샘플 폴더 생성 완료")
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
    print("샘플 폴더 삭제")
    if os.path.isdir(f"{image_dir}"):
        shutil.rmtree(f"{image_dir}")
    print("샘플 폴더 삭제 완료")
    print("======================")
    
'''
    유저 1,2,3
    룸 1(유저 1,2, 이미지 1,2),2(유저 2,3 이미지 2,3)
    이미지 1(유저 1 공용),2(유저 2),3,4(유저 3)
'''

def test_post_unauthorize_upload(api):
    filename='sample_image.JPG'
    test_image_path=f"{parent_path}/{config.test_config['TEST_IMAGE_PATH']}/{filename}"

    with open(test_image_path, 'rb') as f:
        image=f.read()

    class byte_image:
        image=None
        def __init__(self,image):
            self.image=image
    image=image

    payload={
        'user_id':1,
        }
        
    upload_token=jwt.encode(payload,config.test_config['IMAGE_UPLOAD_KEY'],'HS256')
    resp=api.post('/upload/1',
            headers={
                'wrong_headers':upload_token
            },
            data={'image':(image,filename)},
            content_type='multipart/form-data')
        
    assert resp.status_code==401
    assert resp.text=='업로드 토큰이 없습니다.'
        
    resp=api.post('/upload/1',
            headers={
                'Authorization':upload_token
            },
            data={'wrong_key':(image,filename)},
            content_type='multipart/form-data')
        
    assert resp.status_code==404
    assert resp.text=='File is missing'
        
    resp=api.post('/upload/1',
            headers={
                'Authorization':upload_token
            },
            data={'wrong_image':(image,None)},
            content_type='multipart/form-data')
        
    assert resp.status_code==404
    assert resp.text=='File is missing'

    payload={
            'worng_key':1,
        }
        
    upload_token=jwt.encode(payload,config.test_config['IMAGE_UPLOAD_KEY'],'HS256')

    resp=api.post('/upload/1',
            headers={
                'Authorization':upload_token
            },
            data={'image':(image,filename)},
            content_type='multipart/form-data')
        
    assert resp.status_code==401
    assert resp.text=='업로드 할 수 있는 권한이 없습니다.'
    
# def test_post_upload(api):
    
    
# def test_get_image_download(api):
