import requests
import jwt


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
    } or None
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
        
        upload={'image':(files.filename,files.read())}
        
        payload={
            'user_id':new_image['user_id'],
        }
        
        image_upload_token=jwt.encode(payload,self.config['IMAGE_UPLOAD_KEY'],'HS256')

        res = requests.post(f"{self.config['IMAGE_UPLOAD_URL']}{new_image['user_id']}",
                files=upload,
                headers = {'Authorization':image_upload_token})
    
        if res.status_code==200:
            new_image={
                'link':res.text,
                'user_id':new_image['user_id']
            }
            
            new_image_id=self.image_dao.insert_image(new_image)
            return {'new_image_id':new_image_id}
        else:
            return {'message':res.text,
                    'status_code':res.status_code}

    
    def upload_room_image(self,room_id,new_image):
        files=new_image['image']
        
        upload={'image':(files.filename,files.read())}

        payload={
            'user_id':new_image['user_id'],
        }
        
        image_upload_token=jwt.encode(payload,self.config['IMAGE_UPLOAD_KEY'],'HS256')

        res = requests.post(f"{self.config['IMAGE_UPLOAD_URL']}{new_image['user_id']}",
                files=upload,
                headers = {'Authorization':image_upload_token})
        if res.status_code==200:
            new_image={
                'link':res.text,
                'user_id':new_image['user_id']
            }
            
            new_image_id=self.image_dao.insert_image(new_image)
            result=self.image_dao.insert_room_image(room_id,new_image_id)

            return {'new_image_id':new_image_id,
                    'result':result}
        else:
            return {'message':res.text,
                    'status_code':res.status_code}
                
    
    def is_user_image(self,user_id,image_id):
        image_info=self.image_dao.get_image_info(image_id)
        if image_info['user_id']==user_id:
            return True
        else:
            return False
        
    def get_image_roomlist(self,image_id):
        image_room_info_list=self.image_dao.get_image_roomlist(image_id)

        return image_room_info_list
        
    def get_image_info(self,image_id):
        image_info=self.image_dao.get_image_info(image_id)
        return image_info
        
    def get_user_imagelist(self,user_id,pages):
        image_info_list=self.image_dao.get_user_imagelist(user_id,pages)
        
        return image_info_list

    def get_room_imagelist(self,room_id,pages):
        image_info_list=self.image_dao.get_room_imagelist(room_id,pages)

        return image_info_list

    def update_image_room(self,image_id,update_roomlist):
        image_roomlist=set([image_room_info['id'] for image_room_info in self.image_dao.get_image_roomlist(image_id)])
        update_roomlist=set(update_roomlist)

        update_list=sorted(image_roomlist.union(update_roomlist))

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
        image_delete_result=self.image_dao.delete_image(delete_image_id)
        image_room_delete_result=self.image_dao.delete_image_room(delete_image_id)        
        return {'delete_image':image_delete_result,
                'delete_image_room':image_room_delete_result}
    
    def delete_room_user_image(self,room_id,user_id):
        result=self.image_dao.delete_room_user_image(room_id,user_id)

        return result
    
    def is_user_image_room_member(self,user_id,image_id):
        image_info=self.image_dao.get_image_info(image_id)
        if image_info['user_id']==user_id:
            return True

        image_room_userlist=self.image_dao.image_room_userlist(image_id)
        for room_userlist in image_room_userlist:
            if room_userlist['user_id']==user_id:
                return True
        return False

    def get_room_imagelist_len(self,room_id):
        imagelist_len=self.image_dao.get_room_imagelist_len(room_id)
        return imagelist_len