import jwt
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from PIL import Image
from io import BytesIO

parent_path=os.path.dirname(os.path.abspath(os.path.dirname(__file__)))

class ImageService:
    def __init__(self,image_dao,config):
        self.image_dao=image_dao
        self.config=config
    
    def authorize_upload_token(self,upload_token,user_id):
        try:
            payload=jwt.decode(upload_token,self.config['IMAGE_UPLOAD_KEY'],'HS256')
        except:
            return False
        #로그인 된 유저와 저장하려는 유저의 공간이 다를 경우
        if 'user_id' in payload and payload['user_id']==user_id:
            return True
        else: 
            return False

    def save_profile_picture(self,user_id,image):
        image_filename=image.filename

        image=Image.open(BytesIO(image.read()))
    
        image_save_dir=f"{parent_path}/{self.config['IMAGE_PATH']}/{user_id}"

        is_user_dir_exists=os.path.isdir(f"{image_save_dir}")

        if not is_user_dir_exists:
            os.makedirs(image_save_dir)

        image_path_and_name=f"{image_save_dir}/{image_filename}"
        
        image_dir_and_name,image_ext=os.path.splitext(image_path_and_name)

        uniq=1

        output_path=image_path_and_name
        while os.path.exists(output_path):
            output_path=f"{image_dir_and_name}({uniq}){image_ext}"
            uniq+=1

        print(output_path)
        image.save(output_path)
        image_link=f"{user_id}/{output_path.split('/')[-1]}"
        return image_link

    def decode_access_code(self,access_token):
        try:
            payload=jwt.decode(access_token,self.config['JWT_SECRET_KEY'],'HS256')
            if 'user_id' in payload:
                return payload['user_id']
            else:
                return False
        except:
            return False

    def is_user_image_room_member(self,user_id,image_id):
        image_info=self.image_dao.get_image_info_by_id(image_id)
        if image_info['user_id']==user_id:
            return True

        image_room_userlist=self.image_dao.image_room_userlist(image_id)
        for room_userlist in image_room_userlist:
            if room_userlist['user_id']==user_id:
                return True
        return False

    def is_public_image(self,image_id):
        image_info=self.image_dao.get_image_info_by_id(image_id)
        if image_info['public']==1:
            return True
        else:
            return False

    def get_image_path(self,user_id,image_filename):
        file_path=f"{parent_path}/{self.config['IMAGE_PATH']}/{user_id}/{image_filename}"
        if os.path.isfile(file_path):
            return file_path
        else:
            return None
        
    def get_image_info(self,user_id,image_link):
        image_info=self.image_dao.get_image_info(user_id,image_link)
        return image_info

    def get_image_link(self,user_id,image_filename):
        image_link=f"{user_id}/{image_filename}"
        return image_link