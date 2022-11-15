import requests
import json

class ImageService:
    def __init__(self,image_dao,config):
        self.config=config
        self.image_dao=image_dao
        
    '''
    get_user_imagelist(user_id)->[
        {
            'id':123,
            'link':'http://...',
            'user_id':11
        },
        {
            'id',12,
            'link':'http://...',
            'user_id':11
        }
    ]
    insert_image(new_image)->new_image_id
    get_image_info(image_id)->{
        'id':<int>,
        'link':<str>,
        'user_id':<int>
    }
    delete_image(delete_image_id)->0 or 1
    get_image_roomlist(image_id)->[
        {
            'id':<int>,
            'title':<str>,
            'host_user_id':<int>
        },
        {
            'id':<int>,
            'title':<str>,
            'host_user_id':<int>
        }
    ]
    insert_room_image(room_id,new_image_id)->0 or 1
    delete_room_image(room_id,image_id)->0 or 1
    get_room_imagelist(room_id)->[
        {
            'id':<int>,
            'link':<str>,
            'user_id':<int>
        },
        {
            'id':<int>,
            'link':<str>,
            'user_id':<int>
        }
    ]
    '''
    
    # image server의 이미지 파일 구조 
    # 1>  profile_images>image.pngs
    #     images>image.pngs
    # 이미지 서버에 요청시 이미 쿠키에 유저정보가 있음.
    
    def upload_image(self,new_image):
        files=new_image['image']
        
        upload={'image':files}
        
        params = {
            "user_id":new_image['user_id'],
        }
        res = requests.post(f"{self.config['IMAGE_URL']}", data=json.dumps(params),files=upload)
        link=res.text
        new_image={
            'link':link,
            'user_id':new_image['user_id']
        }
        
        new_image_id=self.image_dao.insert_image(new_image)
        return new_image_id
    
    def upload_room_image(self,room_id,new_image):
        files=new_image['image']
        upload={'image':files}
        params = {
            "user_id": user_id,
        }
        res = requests.post(f"{self.config['IMAGE_URL']}", data=json.dumps(params),files=upload)
        link=res.text
        new_image={
            'link':link,
            'user_id':new_image['user_id']
        }
        
        new_image_id=self.image_dao.insert_image(new_image)
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
        image_info_list=self.image_dao.get_room_imagelist(room_id)

        return image_info_list

    def update_image_room(self,image_id,update_roomlist):
        image_roomlist=set([image_room_info['id'] for image_room_info in self.image_dao.get_image_roomlist(image_id)])
        update_roomlist=set(update_roomlist)
        
        update_list=sorted(set(image_roomlist+update_roomlist))

        deletelist=[]
        addlist=[]
        continuelist=[]
        
        for room_id in update_list:
            if (room_id in image_roomlist) and (room_id in update_roomlist):
                continuelist.append(room_id)
            if (room_id in image_roomlist) and (room_id not in update_roomlist):
                deletelist.append(room_id)
            if (room_id not in image_roomlist) and (room_id in update_roomlist):
                addlist.append(room_id)
                
        delete_result=0        
        for room_id in deletelist:
            delete_result+=self.image_dao.delete_room_image(room_id,image_id)

        add_result=0
        for room_id in addlist:
            add_result+=self.image_dao.insert_room_image(room_id,image_id)

        return {
                    'addlist':addlist,
                    'deletelist':deletelist,
                    'add_result':add_result,
                    'delete_result':delete_result
                }

            
    
    def delete_room_image(self,room_id,delete_room_image_id):
        result=self.image_dao.delete_room_image(room_id,delete_room_image_id)
        return result
    
    def delete_image(self,delete_image_id):
        result=self.image_dao.delete_image(delete_image_id)
        return result
