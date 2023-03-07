from flask import request,jsonify,make_response
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from auth import login_required,g

from flask_restx import Resource,Namespace

from tool import ParserModule,ApiModel,ApiError

image_namespace=Namespace('backapi/image',description='이미지의 정보를 생성,호출,수정,삭제 합니다.')

def image_router(api,services):
    image_service=services.image_service
    room_service=services.room_service
    
    api.add_namespace(image_namespace,'')
    api_error=ApiError(image_namespace)
    api_model=ApiModel(image_namespace)
    api_parser_model=ParserModule()

    #input
    # {
    #     'files':{
    #         'image':binary
    #     }
    # }
    #output
    # {
    #     'image_info':
    #     {
    #         'id':<int>,
    #         'link':<str>,
    #         'user_id':<int>
    #     }
    #     'success':1
    # }
    
    post_image_parser=api_parser_model.get_parser(['Authorization','image'])
    post_image_response_model=api_model.get_model("post_image_response_model",['image_info','success'])
    
    delete_image_parser=api_parser_model.get_parser(['Authorization'])
    delete_image_model=api_model.get_model("delete_image_model",['delete_image_id'])
    # delete_image_response_model=api_model.get_model("delete_image_response_model",['delete_image_id'])
    @image_namespace.route("")
    class image(Resource):
        @image_namespace.expect(post_image_parser,validate=False)
        @image_namespace.response(200,'저장된 이미지의 정보를 반환합니다.',post_image_response_model)
        @image_namespace.response(api_error.file_missing_error()['status_code'],
                                 '파일이 존재하지 않습니다.',
                                 api_error.file_missing_error_model())
        @login_required
        def post(self):
            '''
            사진을 생성합니다.
            '''
            current_user_id=g.user_id
            if 'image' not in request.files or request.files['image'].filename=='':
                return make_response(jsonify({'message':api_error.file_missing_error()['message']})
                                     ,api_error.file_missing_error()['status_code'])

            image=request.files['image']
            new_image={
                'image':image,
                'user_id':current_user_id
            }
            result=image_service.upload_image(new_image)
            if 'message' in result:
                return make_response(jsonify({'message':result['message']}),result['status_code'])

            new_image_id=result['new_image_id']

            image_info=image_service.get_image_info(new_image_id)

            return make_response(jsonify({'image_info':image_info}),200)

    #input
    # {
    #     'delete_image_id':<int>
    # }
    #output
    # 1장 삭제 및 2개의 관련 방 권한 삭제 완료
        @image_namespace.expect(delete_image_parser,delete_image_model,vlidate=False)
        @image_namespace.response(200,'이미지 삭제에 성공하였습니다.')
        @image_namespace.response(api_error.image_existance_error()['status_code'],
                                  '이미지가 존재하지 않습니다.',
                                  api_error.image_existance_error_model())
        @image_namespace.response(api_error.authorizaion_error()['status_code'],'사진에 대한 권한이 없습니다.',api_error.authorizaion_error_model())
        @login_required
        def delete(self):
            '''
            id가 image_id인 사진을 삭제합니다.
            '''
            delete_image_id=request.json['delete_image_id']
            
            if not image_service.get_image_info(delete_image_id):
                return make_response(jsonify({'message':api_error.image_existance_error()['message']})
                                     ,api_error.image_existance_error()['status_code'])

            current_user_id=g.user_id
            
            if not image_service.is_user_image(current_user_id,delete_image_id):
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            result=image_service.delete_image(delete_image_id)
            
            return make_response(f"{result['delete_image']}장 삭제 및 {result['delete_image_room']}개의 관련 방 권한 삭제 완료",200)

    #input
    #output
    # {
    #     'image_info':
    #         {
    #             'id':<int>,
    #             'link':<str>,
    #             'user_id':<int>
    #         }
    # }
    get_image_parser=api_parser_model.get_parser(['Authorization'])
    get_image_response_model=api_model.get_model("get_image_response_model",['image_info'])
    @image_namespace.route("/<int:image_id>")
    class image(Resource):
        @image_namespace.expect(get_image_parser,validate=False)
        @image_namespace.response(200,'사진의 정보를 불러옵니다.',get_image_response_model)
        @image_namespace.response(api_error.image_existance_error()['status_code'],
                                  '이미지가 존재하지 않습니다.',
                                  api_error.image_existance_error_model())
        @image_namespace.response(api_error.authorizaion_error()['status_code'],'사진에 대한 권한이 없습니다.',api_error.authorizaion_error_model())
        @login_required
        def get(self,image_id):
            '''
            id가 image_id 인 사진의 정보를 불러옵니다.
            '''
            if not image_service.get_image_info(image_id):
                return make_response(jsonify({'message':api_error.image_existance_error()['message']})
                                     ,api_error.image_existance_error()['status_code'])
            
            current_user_id=g.user_id
            
            if not image_service.is_user_image_room_member(current_user_id,image_id):
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            image_info=image_service.get_image_info(image_id)

            return make_response(jsonify({'image_info':image_info}),200)
    
    #input
    #output
    # {
    #     'roomlist':[
    #         {
    #             'id':<int>,
    #             'title':<str>,
    #             'host_user_id':<int>
    #         },
    #         {
    #             'id':<int>,
    #             'title':<str>,
    #             'host_user_id':<int>
    #         }
    #     ]
    # }
    
    get_image_roomlist_parser=api_parser_model.get_parser(['Authorization'])
    get_image_roomlist_response_model=api_model.get_model("get_image_roomlist_response_model",['room_info_list'])
    
    post_image_roomlist_parser=api_parser_model.get_parser(['Authorization'])
    post_image_roomlist_model=api_model.get_model("post_image_roomlist_model",['update_roomlist'])
    post_image_roomlist_response_model=api_model.get_model("post_image_roomlist_response_model",['update_image_room_result','room_info_list'])
    @image_namespace.route("/<int:image_id>/roomlist")
    class image_roomlist(Resource):
        @image_namespace.expect(get_image_roomlist_parser,validate=False)
        @image_namespace.response(200,'방의 정보 목록을 불러옵니다.',get_image_roomlist_response_model)
        @image_namespace.response(api_error.image_existance_error()['status_code'],
                                  '이미지가 존재하지 않습니다.',
                                  api_error.image_existance_error_model())
        @image_namespace.response(api_error.authorizaion_error()['status_code'],'사진에 대한 권한이 없습니다.',api_error.authorizaion_error_model())
        @login_required
        def get(self,image_id):
            '''
            id가 image_id 인 사진의 방 정보 목록을 불러옵니다.
            '''

            if not image_service.get_image_info(image_id):
                return make_response(jsonify({'message':api_error.image_existance_error()['message']})
                                     ,api_error.image_existance_error()['status_code'])

            current_user_id=g.user_id
            
            if not image_service.is_user_image(current_user_id,image_id):
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            image_roomlist=image_service.get_image_roomlist(image_id)
            return make_response(jsonify({'roomlist':image_roomlist}),200)
        
    #input
    # {
    #     'update_roomlist':[1,2,3,4]
    # }
    #output
    # {
    #     'result':
    #         {
    #             'addlist':addlist,
    #             'deletelist':deletelist,
    #             'add_result':add_result,
    #             'delete_result':delete_result
    #         },
    #     'roomlist':[
    #         {
    #             'id':1,
    #             'title':'testroom1',
    #             'host_user_id':1
    #         },
    #         {
    #             'id':2,
    #             'title':'testroom2',
    #             'host_user_id':2
    #         }
    #     ]
    # }
        @image_namespace.expect(post_image_roomlist_parser,post_image_roomlist_model,validate=False)
        @image_namespace.response(200,'업데이트한 사진의 방 결과와 방의 정보 목록을 불러옵니다.',post_image_roomlist_response_model)
        @image_namespace.response(api_error.image_existance_error()['status_code'],
                                  '이미지가 존재하지 않습니다.',
                                  api_error.image_existance_error_model())
        @image_namespace.response(api_error.authorizaion_error()['status_code'],'사진에 대한 권한이 없습니다.',api_error.authorizaion_error_model())
        @login_required
        def post(self,image_id):
            '''
            id가 image_id 인 사진의 방 목록을 수정합니다.
            '''
            if not image_service.get_image_info(image_id):
                return make_response(jsonify({'message':api_error.image_existance_error()['message']})
                                     ,api_error.image_existance_error()['status_code'])

            current_user_id=g.user_id
            
            if not image_service.is_user_image(current_user_id,image_id):
                return make_response(jsonify({'message':api_error.authorizaion_error()['message']}),
                                     api_error.authorizaion_error()['status_code'])
            
            update_roomlist=request.json['update_roomlist']
            exist_roomlist=[]
            #실제로 존재하는 방만 추출
            for room_id in update_roomlist:
                if room_service.get_room_info(room_id):
                    exist_roomlist.append(room_id)
            
            result=image_service.update_image_room(image_id,exist_roomlist)
            image_room_info_list=image_service.get_image_roomlist(image_id)

            return make_response(jsonify({'result':result,
                            'roomlist':image_room_info_list}),200)