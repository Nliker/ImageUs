import pytest
import sys,os
import bcrypt
import jwt
from PIL import Image
from io import BytesIO
import shutil

sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
import config

from model import ImageDao
from service import ImageService
from sqlalchemy import create_engine,text

database=create_engine(config.test_config['DB_URL'],encoding='utf-8',max_overflow=0)

parent_path=os.path.dirname(os.path.abspath(os.path.dirname(__file__)))

image_dir=f"{parent_path}/{config.test_config['IMAGE_PATH']}"

@pytest.fixture
def image_service():
    return ImageService(ImageDao(database),config.test_config)

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
    

def test_authorize_upload_token(image_service):
    user_id=2
    payload={
        'user_id':user_id,
    }
    fake_payload={
        'user':user_id
    }
    upload_token=jwt.encode(payload,config.test_config['IMAGE_UPLOAD_KEY'],'HS256')

    authorized=image_service.authorize_upload_token(upload_token,2)
    assert authorized==True
    
    authorized=image_service.authorize_upload_token(upload_token,1)
    assert authorized==False

    upload_token=jwt.encode(fake_payload,config.test_config['IMAGE_UPLOAD_KEY'],'HS256')
    authorized=image_service.authorize_upload_token(upload_token,2)
    assert authorized==False

def test_save_profile_picture(image_service):
    filename='sample_image.JPG'
    test_image_path=f"{parent_path}/{config.test_config['TEST_IMAGE_PATH']}/{filename}"

    with open(test_image_path, 'rb') as f:
        byte_image = f.read()
    class image:
        file=None
        filename=None
        def __init__(self,file,filename):
            self.file=file
            self.filename=filename

    request_image=image(BytesIO(byte_image),filename)

    user_id=2
    
    is_dir_exists=os.path.isdir(f"{image_dir}/{user_id}")
    assert is_dir_exists==False

    image_link=image_service.save_profile_picture(user_id,request_image)
    assert image_link==f"{config.test_config['IMAGE_DOWNLOAD_URL']}{config.test_config['IMAGE_PATH']}/{user_id}/{filename}"

    is_dir_exists=os.path.isdir(f"{image_dir}/{user_id}")
    assert is_dir_exists==True

    is_file_exists=os.path.isfile(f"{image_dir}/{user_id}/{filename}")
    assert is_file_exists==True

    image_link=image_service.save_profile_picture(user_id,request_image)
    filename='sample_image(1).JPG'
    assert image_link==f"{config.test_config['IMAGE_DOWNLOAD_URL']}{config.test_config['IMAGE_PATH']}/{user_id}/{filename}"
    is_dir_exists=os.path.isdir(f"{image_dir}/{user_id}")
    assert is_dir_exists==True

    is_file_exists=os.path.isfile(f"{image_dir}/{user_id}/{filename}")
    assert is_file_exists==True
    
def test_decode_access_code(image_service):
    payload={
        'user_id':2
    }
    access_token=jwt.encode(payload,config.test_config['JWT_SECRET_KEY'],'HS256')
    user_id= image_service.decode_access_code(access_token)
    assert user_id==2
    payload={
        'user':2
    }
    access_token=jwt.encode(payload,config.test_config['JWT_SECRET_KEY'],'HS256')
    user_id= image_service.decode_access_code(access_token)
    assert user_id==False
    payload={
        'user_id':2
    }   
    access_token=jwt.encode(payload,'wrong_jwt_key','HS256')
    user_id= image_service.decode_access_code(access_token)
    assert user_id==False

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

def test_is_public_image(image_service):
    is_public=image_service.is_public_image(1)
    assert is_public==False
    is_public=image_service.is_public_image(2)
    assert is_public==False
    is_public=image_service.is_public_image(3)
    assert is_public==False
    
    row=database.execute(text("""
        update images
        set public=1
        where id=1
        and public=0
    """)).rowcount
    assert row==1
    is_public=image_service.is_public_image(1)
    assert is_public==True
    is_public=image_service.is_public_image(2)
    assert is_public==False
    is_public=image_service.is_public_image(3)
    assert is_public==False

    row=database.execute(text("""
        update images
        set public=1
        where id=2
        and public=0
    """)).rowcount
    assert row==1
    is_public=image_service.is_public_image(1)
    assert is_public==True
    is_public=image_service.is_public_image(2)
    assert is_public==True
    is_public=image_service.is_public_image(3)
    assert is_public==False

def test_get_image_path(image_service):
    image_filename='sample_image.JPG'
    image_path=image_service.get_image_path(1,image_filename)
    assert image_path==f"{image_dir}/1/{image_filename}"

    image_filename='sample_image(1).JPG'
    image_path=image_service.get_image_path(1,image_filename)
    assert image_path==None
    
    image_filename='sample_image.JPG'
    image_path=image_service.get_image_path(2,image_filename)
    assert image_path==None

'''
    유저 1,2,3 (친구 1-2,친구 2-1,3,친구 3-2)
    룸 1(유저 1,2, 이미지 1,2),2(유저 2,3 이미지 2,3)
    이미지 1(유저 1 공용),2(유저 2),3,4(유저 3)
'''