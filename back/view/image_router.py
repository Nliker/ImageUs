from flask import request,jsonify
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from auth import login_required,g

def image_router(app,services):
    image_service=services.image_service
    room_service=services.room_service
    
    #새로운 사진을 게시합니다.
    #input
    #output
    # {
    #     'id':<int>,
    #     'link':<str>,
    #     'user_id':<int>
    # }
    @app.route("/image",methods=["POST"])
    @login_required
    def image():
        current_user_id=g.user_id
        if 'image' not in request.files or request.files['image'].filename=='':
            return 'file is missing',404

        image=request.files['image']
        new_image={
            'image':image,
            'user_id':current_user_id
        }
        new_image_id=image_service.upload_image(new_image)

        image_info=image_service.get_image_info(new_image_id)

        return jsonify(image_info),200
    
    #id가 image_id인 사진을 삭제합니다.
    #input
    # {
    #     'delete_image_id':<int>
    # }
    #output
    @app.route("/image",methods=["DETETE"])
    @login_required
    def image(image_id):
        delete_image_id=request.json['delete_image_id']
        
        if not image_service.get_image_info(delete_image_id):
            return '해당 이미지는 존재하지 않습니다.',400

        current_user_id=g.user_id
        
        if image_service.is_user_image(current_user_id,image_id):
            return '사진에 대한 권한이 없습니다.',400        
        
        result=image_service.delete_image(delete_image_id)
        
        return f'{result}장 삭제 완료',200

    #id가 image_id 인 사진의 정보를 불러옵니다.
    #input
    #output
    # {
    #     'id':<int>,
    #     'link':<str>,
    #     'user_id':<int>
    # }
    @app.route("/image/<int:image_id>",methods=["GET"])
    @login_required
    def image(image_id):
        if not image_service.get_image_info(image_id):
            return '해당 이미지는 존재하지 않습니다.',400
        
        current_user_id=g.user_id
        
        if image_service.is_user_image(current_user_id,image_id):
            return '사진에 대한 권한이 없습니다.',400  
        
        image_info=image_service.get_image_info(image_id)

        return jsonify(image_info),200
    
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
    @app.route("/image/<int:image_id>/roomlist",methods=["GET"])
    @login_required
    def image_roomlist(image_id):
        if not image_service.get_image_info(image_id):
            return '해당 이미지는 존재하지 않습니다.',400

        current_user_id=g.user_id
        
        if image_service.is_user_image(current_user_id,image_id):
            return '사진에 대한 권한이 없습니다.',400 
        
        image_roomlist=image_service.get_image_roomlist(image_id)
        return jsonify({'roomlist':image_roomlist}),200
        
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
    @app.route("/image/<int:image_id>/roomlist",methods=["POST"])
    @login_required
    def image_roomlist(image_id):
        if not image_service.get_image_info(image_id):
            return '해당 이미지는 존재하지 않습니다.',400

        current_user_id=g.user_id
        
        if image_service.is_user_image(current_user_id,image_id):
            return '사진에 대한 권한이 없습니다.',400
        
        update_roomlist=request.json['update_roomlist']
        exist_roomlist=[]
        #실제로 존재하는 방만 추출
        for room_id in update_roomlist:
            if room_service.get_room_info(room_id):
                exist_roomlist.append(room_id)
        
        result=image_service.update_image_room(image_id,exist_roomlist)
        image_room_info_list=image_service.get_image_roomlist(image_id)

        return jsonify({'result':result,
                        'roomlist':image_room_info_list}),200