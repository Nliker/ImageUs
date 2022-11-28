from flask import request,jsonify,make_response
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from auth import login_required,g

from flask_restx import Resource,Namespace

from tool import ParserModule,ApiModel

image_namespace=Namespace('image',description='이미지의 정보를 생성,호출,수정,삭제 합니다.')

def image_router(api,services):
    image_service=services.image_service
    room_service=services.room_service
    
    api.add_namespace(image_namespace,'')
    
    #새로운 사진을 게시합니다.
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
    
    post_image_parser=ParserModule(['Authorization','image']).get_parser()

    delete_image_parser=ParserModule(['Authorization']).get_parser()
    delete_image_model=ApiModel(['delete_image_id']).get_model(image_namespace,"delete_image_model")
    @image_namespace.route("")
    class image(Resource):
        @image_namespace.expect(post_image_parser,validate=False)
        @login_required
        def post(self):
            current_user_id=g.user_id
            if 'image' not in request.files or request.files['image'].filename=='':
                return make_response('file is missing',404)

            image=request.files['image']
            new_image={
                'image':image,
                'user_id':current_user_id
            }
            result=image_service.upload_image(new_image)
            if 'message' in result:
                return make_response(result['message'],result['status_code'])

            new_image_id=result['new_image_id']

            image_info=image_service.get_image_info(new_image_id)

            return make_response(jsonify({'image_info':image_info}),200)
    #id가 image_id인 사진을 삭제합니다.
    #input
    # {
    #     'delete_image_id':<int>
    # }
    #output
    # 1장 삭제 및 2개의 관련 방 권한 삭제 완료
        @image_namespace.expect(delete_image_parser,delete_image_model,vlidate=False)
        @login_required
        def delete(self):
            delete_image_id=request.json['delete_image_id']
            
            if not image_service.get_image_info(delete_image_id):
                return make_response('해당 이미지는 존재하지 않습니다.',404)

            current_user_id=g.user_id
            
            if not image_service.is_user_image(current_user_id,delete_image_id):
                return make_response('사진에 대한 권한이 없습니다.',401)
            
            delete_image_result,delete_image_room_result=image_service.delete_image(delete_image_id)
            
            return make_response(f'{delete_image_result}장 삭제 및 {delete_image_room_result}개의 관련 방 권한 삭제 완료',200)

    #id가 image_id 인 사진의 정보를 불러옵니다.
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
    get_image_parser=ParserModule(['Authorization']).get_parser()
    @image_namespace.route("/<int:image_id>")
    class image(Resource):
        @image_namespace.expect(get_image_parser,validate=False)
        @login_required
        def get(self,image_id):
            if not image_service.get_image_info(image_id):
                return make_response('해당 이미지는 존재하지 않습니다.',404)
            
            current_user_id=g.user_id
            
            if not image_service.is_user_image_room_member(current_user_id,image_id):
                return make_response('사진에 대한 권한이 없습니다.',401)
            
            image_info=image_service.get_image_info(image_id)

            return make_response(jsonify({'image_info':image_info}),200)
    
    #id가 image_id 인 사진의 방 리스트를 불러옵니다.
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
    
    get_image_roomlist_parser=ParserModule(['Authorization']).get_parser()

    post_image_roomlist_parser=ParserModule(['Authorization']).get_parser()
    post_image_roomlist_model=ApiModel(['updaet_roomlist']).get_model(image_namespace,"post_image_roomlist_model")
    @image_namespace.route("/<int:image_id>/roomlist")
    class image_roomlist(Resource):
        @image_namespace.expect(get_image_roomlist_parser,validate=False)
        @login_required
        def get(self,image_id):
            if not image_service.get_image_info(image_id):
                return make_response('해당 이미지는 존재하지 않습니다.',404)

            current_user_id=g.user_id
            
            if not image_service.is_user_image(current_user_id,image_id):
                return make_response('사진에 대한 권한이 없습니다.',401)
            
            image_roomlist=image_service.get_image_roomlist(image_id)
            return make_response(jsonify({'roomlist':image_roomlist}),200)
        
    #id가 image_id 인 사진의 방 리스트를 수정합니다.
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
        @login_required
        def post(self,image_id):
            if not image_service.get_image_info(image_id):
                return make_response('해당 이미지는 존재하지 않습니다.',404)

            current_user_id=g.user_id
            
            if not image_service.is_user_image(current_user_id,image_id):
                return make_response('사진에 대한 권한이 없습니다.',401)
            
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