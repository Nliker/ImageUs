import requests
import json

class ImageService:
    def __init__(self,image_dao,config):
        self.config=config
        self.image_dao=image_dao

    '''
    insert_image(user_id,link)
    
    '''
    
    # image server의 이미지 파일 구조 
    # 1>  profile_images>image.pngs
    #     images>image.pngs
    # 이미지 서버에 요청시 이미 쿠키에 유저정보가 있음.
    
    def upload_image(self,image,user_id):
        files=image
        
        upload={'image':files}
        
        params = {
            "user_id": user_id,
        }
        res = requests.post(f"{self.config['IMAGE_URL']}", data=json.dumps(params),files=upload)
        link=res.text
        new_image_id=self.image_dao.create_image(user_id,link)
        return new_image_id
    
    def upload_room_image(self,room_id,image,user_id):
        files=image
        upload={'image':files}
        params = {
            "user_id": user_id,
        }
        res = requests.post(f"{self.config['IMAGE_URL']}", data=json.dumps(params),files=upload)
        link=res.text
        new_image_id=self.image_dao.insert_image(user_id,link)
        result=self.image_dao.insert_room_image(room_id,new_image_id)

        return result
    
    def is_user_image(self,user_id,image_id):
        image_info=self.image_dao.get_image_info(image_id)
        if image_info['user_id']==user_id:
            return True
        else:
            return False
        
    def get_image_roomlist(self,image_id):
        image_roomlist=self.image_dao.get_image_roomlist(image_id)

        return image_roomlist
        
    def get_image_info(self,image_id):
        image_info=self.image_dao.get_image_info(image_id)
        return image_info
        
    def get_user_imagelist(self,user_id):
        image_info_list=self.image_dao.get_user_imagelist(user_id)
        
        return image_info_list

    def get_room_imagelist(self,room_id):
        image_list=self.image_dao.get_room_imagelist(room_id)
        image_info_list=[]
        for image_id in image_list:
            image_info=self.image_dao.get_image_info(image_id)
            image_info_list.append(image_info)

        return image_info_list

        pre[1,4,9]
        after[1,4,11,14]
        =>[1,4,9,11,14]
    
    def update_image_room(self,image_id,roomlist):
        image_roomlist=self.image_dao.get_image_roomlist(image_id)

        self.image_dao.update_image_room()
    def delete_image(self,delete_image_id):
        