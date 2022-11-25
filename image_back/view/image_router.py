from flask import request,jsonify,send_file,make_response
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
from werkzeug.datastructures import FileStorage
from flask_restx import Resource,Namespace,reqparse
from werkzeug.datastructures import CombinedMultiDict
from validator import UploadForm

namespace=Namespace('',description='이미지를 다운 및 업로드합니다.')

def image_router(image_api,services):
    image_service=services.image_service

    parser=reqparse.RequestParser()
    parser.add_argument('Authorization',type=str,
                            location='headers',
                            help='access_token',
                            required=False)
    parser.add_argument('image',type=FileStorage,
                            location='files',
                            help='imagefile',
                            required=False)

    image_api.add_namespace(namespace,'')

    @namespace.route("/upload/<int:user_id>")
    class upload(Resource):
        @image_api.doc(parser=parser)
        def post(self,user_id):
            """files의 image에 담긴 이미지를 업로드 합니다."""

            if 'Authorization' not in request.headers:
                return make_response('업로드 토큰이 없습니다.',401)

            upload_token=request.headers['Authorization']
            
            authorized=image_service.authorize_upload_token(upload_token,user_id)

            if not authorized:
                return make_response('업로드 할 수 있는 권한이 없습니다.',401)
                
            upload_form = UploadForm(CombinedMultiDict((request.files, request.args)),meta={"csrf": False})

            if not upload_form.validate():
                # return make_response('file is missing',404)
                message={}
                for fieldName, errorMessages in upload_form.errors.items():
                    message[fieldName]=errorMessages
                        
                return make_response(message,404)
            
            image=request.files['image']
        
            image_link=image_service.save_profile_picture(user_id,image)
            
            return make_response(image_link,200)

    parser=reqparse.RequestParser()
    parser.add_argument('Authorization',type=str,
                            location='headers',
                            help='access_token',
                            required=False)

    @namespace.route("/image-download/<int:user_id>/<string:image_filename>",methods=["GET"])
    class image_download(Resource):
        @image_api.doc(parser=parser)
        def get(self,user_id,image_filename):
            """user_id의 image_filename인 사진을 다운합니다."""
            access_token=request.headers['Authorization'] if 'Authorization' in request.headers else None

            image_path=image_service.get_image_path(user_id,image_filename)

            if not image_path:
                return make_response('저장된 사진이 없습니다.',404)
                
            image_link=image_service.get_image_link(user_id,image_filename)
            #만약 토큰이 있을 경우 이미지에 대한 권한 확인

            image_info=image_service.get_image_info(user_id,image_link)
            if not image_info:
                return make_response('사진이 존재하지 않습니다.',404)
            
            image_id=image_info['id']
            
            if access_token:
                user_id=image_service.decode_access_code(access_token)
                if user_id:
                    is_user_image_room_member=image_service.is_user_image_room_member(user_id,image_id)

                    if is_user_image_room_member:
                        return make_response(send_file(image_path),200)
                    else:
                        return make_response('사진에 대한 권한이 없습니다.',401)
                else:
                    return make_response('접근이 잘못 되었습니다.',401)
            else:       
                if not image_service.is_public_image(image_id):
                    return make_response('공용 권한이 없는 사진으로 다운로드가 불가합니다.',401)
                return make_response(send_file(image_path),200)
        
        
        



        
    