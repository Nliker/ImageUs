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
import bcrypt

database=create_engine(config.test_config['DB_URL'],encoding='utf-8',max_overflow=0)

parent_path=os.path.dirname(os.path.abspath(os.path.dirname(__file__)))

image_dir=f"{parent_path}/{config.test_config['IMAGE_PATH']}"

filename='sample_image.JPG'

@pytest.fixture()
def api():
    app=create_app(test_config=config.test_config)
    app.config['TEST']=True
    api=app.test_client()

    return api

def get_image_link(user_id,image_filename):
    image_link=f"{config.test_config['IMAGE_DOWNLOAD_URL']}{user_id}/{image_filename}"
    return image_link

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
        'link':get_image_link(1,filename),
        'user_id':1
    }]
    new_images_room_list=[{
        'image_id':1,
        'room_id':1
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

def test_post_upload(api):
    filename='sample_image.JPG'
    test_image_path=f"{parent_path}/{config.test_config['TEST_IMAGE_PATH']}/{filename}"

    with open(test_image_path, 'rb') as f:
        image=f.read()
    image=image

    payload={
        'user_id':2,
        }

    upload_token=jwt.encode(payload,config.test_config['IMAGE_UPLOAD_KEY'],'HS256')
    resp=api.post('/upload/2',
            headers={
                'Authorization':upload_token
            },
            data={'image':(BytesIO(image),filename)},
            content_type='multipart/form-data')

    assert resp.status_code==200
    image_url=f"{config.test_config['IMAGE_DOWNLOAD_URL']}{config.test_config['IMAGE_PATH']}/2/{filename}"
    assert resp.text==image_url

    #기존의 업로드 된 사진의 크기와 저장된 사진의 크기가 같은지 확인
    image_link=f"{image_dir}/2/{filename}"
    assert os.path.isfile(image_link)
    im=Image.open(image_link)    
    assert im.size==Image.open(BytesIO(image)).size

def test_post_unauthorize_upload(api):
    filename='sample_image.JPG'
    test_image_path=f"{parent_path}/{config.test_config['TEST_IMAGE_PATH']}/{filename}"

    with open(test_image_path, 'rb') as f:
        image=f.read()
    image=image

    payload={
        'user_id':1,
        }
        
    upload_token=jwt.encode(payload,config.test_config['IMAGE_UPLOAD_KEY'],'HS256')
    resp=api.post('/upload/1',
            headers={
                'wrong_headers':upload_token
            },
            data={'image':(BytesIO(image),filename)},
            content_type='multipart/form-data')
        
    assert resp.status_code==401
    assert resp.text=='업로드 토큰이 없습니다.'
        
    resp=api.post('/upload/1',
            headers={
                'Authorization':upload_token
            },
            data={'wrong_key':(BytesIO(image),filename)},
            content_type='multipart/form-data')
        
    assert resp.status_code==404
    assert resp.text=='File is missing'
        
    resp=api.post('/upload/1',
            headers={
                'Authorization':upload_token
            },
            data={'wrong_image':(BytesIO(image),None)},
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
            data={'image':(BytesIO(image),filename)},
            content_type='multipart/form-data')
        
    assert resp.status_code==401
    assert resp.text=='업로드 할 수 있는 권한이 없습니다.'
    
def test_get_image_download(api):
    #1번 유저가 자신의 사진인 1번 사진을 다운
    user_id=1
    payload={
        'user_id':user_id
    }
    access_token=jwt.encode(payload,config.test_config['JWT_SECRET_KEY'],'HS256')
    filename='sample_image.JPG'
    resp=api.get(f'/image-download/1/{filename}',
        headers={'Authorization':access_token})    

    assert resp.status_code==200
    
    #2번 유저가 1번 사진이 속한 1번 방의 사진을 다운
    user_id=2
    payload={
        'user_id':2
    }
    access_token=jwt.encode(payload,config.test_config['JWT_SECRET_KEY'],'HS256')
    filename='sample_image.JPG'
    resp=api.get(f'/image-download/1/{filename}',
        headers={'Authorization':access_token})    
    assert resp.status_code==200
    
    #공용으로 변경 후 다운 확인
    row=database.execute(text("""
        update images
        set public=1
        where id=1
        and deleted=0
        """)).rowcount
    assert row==1
    resp=api.get(f'/image-download/1/{filename}')  
    assert resp.status_code==200

def test_get_unauthorize_image_download(api):
    #잘못된 내용의 토큰을 가져올 시
    user_id=1
    payload={
        'user':user_id
    }
    access_token=jwt.encode(payload,config.test_config['JWT_SECRET_KEY'],'HS256')
    filename='sample_image.JPG'
    resp=api.get(f'/image-download/1/{filename}',
        headers={'Authorization':access_token})    

    assert resp.status_code==401
    assert resp.text=='접근이 잘못 되었습니다.'

    #1번 유저가 존재하지 않는 사진을 다운
    user_id=1
    payload={
        'user_id':user_id
    }
    access_token=jwt.encode(payload,config.test_config['JWT_SECRET_KEY'],'HS256')
    filename='wrong_image.JPG'
    resp=api.get(f'/image-download/1/{filename}',
        headers={'Authorization':access_token})    

    assert resp.status_code==404
    assert resp.text=='저장된 사진이 없습니다.'
    
    #3번 유저가 속하지 않은 (1번 사진이 속한 )1번 방의 사진을 다운
    user_id=3
    payload={
        'user_id':user_id
    }
    access_token=jwt.encode(payload,config.test_config['JWT_SECRET_KEY'],'HS256')
    filename='sample_image.JPG'
    resp=api.get(f'/image-download/1/{filename}',
        headers={'Authorization':access_token})    

    assert resp.status_code==401
    assert resp.text=='사진에 대한 권한이 없습니다.'
    
    #공용이 아닌 사진 다운
    filename='sample_image.JPG'
    resp=api.get(f'/image-download/1/{filename}')  
    assert resp.status_code==401
    assert resp.text=='공용 권한이 없는 사진으로 다운로드가 불가합니다.'

'''
    유저 1,2,3
    룸 1(유저 1,2, 이미지 1,2),2(유저 2,3 이미지 2,3)
    이미지 1(유저 1 공용),2(유저 2),3,4(유저 3)
'''
