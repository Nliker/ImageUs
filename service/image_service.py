class ImageService:
    def __init__(self,image_dao,config):
        self.config=config
        self.image_dao=image_dao

    '''
    imagedao
    get_room_imagelist(room_id)
    save_image(image,filename,current_user_id)
    is_image_exists(image_id)
    get_image_info(image_id)
    get_user_imagelist(current_user_id)
    
    '''

    def 