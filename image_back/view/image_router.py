from flask import request,jsonify,send_file
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))


def image_router(app,services):
    image_service=services.image_service
    
    @app.route("/upload/<int:user_id>",methods=["POST"])
    def upload(user_id):
        if 'Authorization' not in request.headers:
            return '업로드 토큰이 없습니다.',401

        upload_token=request.headers['Authorization']

        authorized=image_service.authorize_upload_token(upload_token,user_id)

        if not authorized:
            return '업로드 할 수 있는 권한이 없습니다.',401
        
        if 'image' not in request.files:
            return 'File is missing',404
        
        
        image=request.files['image']

        if image.filename=='':
            return 'File is missing',404
        
        image_link=image_service.save_profile_picture(user_id,image)
        
        return f"{image_link}",200

    @app.route("/image-download/<int:user_id>/<string:image_filename>",methods=["GET"])
    def image_download(user_id,image_filename):
        access_token=request.headers['access_token'] if 'access_token' in request.headers else None

        image_path=image_service.get_image_link_path(user_id,image_filename)
        if not image_path:
            return '저장된 사진이 없습니다.',404
            
        image_link=request.url
        #만약 토큰이 있을 경우 이미지에 대한 권한 확인
        
        image_info=image_service.get_image_info(user_id,image_link)
        if not image_info:
            return '사진이 존재하지 않습니다.',404
        
        if access_token:
            user_id=image_service.decode_access_code(access_token)
            if user_id:
                image_id=image_info['id']
                is_user_image_room_member=image_service.is_user_image_room_member(user_id,image_id)

                if is_user_image_room_member:
                    return send_file(image_path),200
                else:
                    return '사진에 대한 권한이 없습니다.',401
            else:
                return '접근이 잘못 되었습니다.',401

        if not image_service.is_public_image(image_id):
            return '공용 권한이 없는 사진으로 다운로드가 불가합니다.'
        return send_file(image_path),200
        
        
        



        
    