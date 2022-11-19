import jwt
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

class ImageService:
    def __init__(self,image_dao,config):
        self.image_dao=image_dao
        self.config=config
    
    def authorize_upload_token(self,upload_token,user_id):
        try:
            payload=jwt.decode(upload_token,self.config['IMAGE_UPLOAD_KEY'],'HS256')
        except:
            return False,401
        #로그인 된 유저와 저장하려는 유저의 공간이 다를 경우
        if 'user_id' in payload and payload['user_id']==user_id:
            return True
        else: 
            return False

    def save_profile_picture(self,user_id,image):
        image_filename=image.filename
        image_save_dir=f"{os.path.dirname(os.path.abspath(os.path.dirname(__file__)))}/{self.config['IMAGE_PATH']}/{user_id}"

        is_file_exists=os.path.isdir(f"{image_save_dir}/{image_filename}")

        if  is_file_exists:
            folder_list = os.listdir(f"{image_save_dir}")

            count=0
            for file_name in folder_list:
                if file_name==image_filename:
                    count+=1

            image_filename_list=image_filename.split(sep='.')
            image_filename=image_filename_list[0]+f"({count})"+image_filename_list[1]
        
        save_image_path_and_filename=f"{image_save_dir}/{image_filename}"
        image.save(save_image_path_and_filename)
        download_link=f"{self.config['IMAGE_DOWNLOAD_URL']}{self.config['IMAGE_PATH']}/{user_id}/{image_filename}"
        return image_filename

    def is_image_room_member(self,user_id,image_id):

    def is_public_image(user_id,image_id):
        
