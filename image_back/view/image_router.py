from flask import request,jsonify,send_file
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))


def image_router(app,services):
    image_service=services.image_service
    
    @app.route("upload/<int:user_id>",methods=["POST"])
    def image(user_id):
        upload_token=request.headers['access_token']

        authorized=image_service.authorize_upload_token(upload_token,user_id)

        if not authorized:
            return '업로드 할 수 있는 권한이 없습니다.'
        
        if 'profile_pic' not in request.files:
            return 'File is missing',404
        
        
        image=request.files['image']

        if image.filename=='':
            return 'File is missing',404

        image_link=image_service.save_profile_picture(user_id,image)
        
        return f"{image_link}",200

    @app.route("album/<int:user_id>/<int:image_id>",methods=["GET"])
    def image(user_id,image_id):
        access_token=request.headers['access_token']

        image_path=f'./images/{user_id}/{image_id}'

        if access_token:
            user_id=image_service.decode_access_code(access_token)
            is_image_room_member=image_service.is_image_room_member(user_id,image_id):
            
            if is_image_room_member:
                return send_file(image_path),200
            else:
                return '사진에 대한 접근 권한이 없습니다.'
    
        if not image_service.is_public_image(user_id,image_id)
            return '공용 권한이 없는 사진으로 다운로드가 불가합니다.'
        
        return send_file(image_path),200
        
        
        



        
    