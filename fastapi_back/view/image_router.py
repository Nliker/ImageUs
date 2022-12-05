import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
from auth import verify_token
from custom_exception import error as er
from pydantic import BaseModel
from fastapi import Depends,APIRouter,UploadFile
from typing import Optional
from fastapi.responses import PlainTextResponse
from typing import List,Optional

class user(BaseModel):
    id: int
    name: str
    email: str
    profile: str

class image(BaseModel):
    id: int
    link: str
    user_id: int

class room(BaseModel):
    id: int
    title: str
    host_user_id: int

class post_image_response(BaseModel):
    image_info: image
    success: int

class get_image_response(BaseModel):
    image_info: image

class update_image_room_result(BaseModel):
    addlist: Optional[List[int]] = []
    add_result: int
    deletelist: Optional[List[int]] = []
    delete_result: int
    
class get_image_roomlist_response(BaseModel):
    roomlist: Optional[List[room]] = []

class post_image_roomlist_response(BaseModel):
    result: update_image_room_result
    roomlist: Optional[List[room]] = []

class post_image_roomlist_request(BaseModel):
    update_roomlist: List[int] 

image_app=APIRouter()

def image_router(app,services):
    user_service=services.user_service
    image_service=services.image_service
    room_service=services.room_service

    app.include_router(image_app,prefix='/image',tags=['image'])

    error=er()
    
    @image_app.post("",status_code=200,
                    response_model=post_image_response,
                    responses={
                        200:{
                                "description":"성공"
                            },
                        error.file_missing_error().status_code:{
                            "description":error.detail
                        },
                        400:{
                            "description":"이미지서버 통신오류"
                        }
                    }
                  )
    async def post_image(image: Optional[UploadFile] = None,current_user_id: int = Depends(verify_token)):
        current_user_id=current_user_id
        if 'image' == None or image.filename=='':
            error.file_missing_error().get_raise()

        new_image={
                'image':image,
                'user_id':current_user_id
            }
        result=image_service.upload_image(new_image)
        if 'message' in result:
            return {'message':result['message']}

        new_image_id=result['new_image_id']

        image_info=image_service.get_image_info(new_image_id)

        return {'image_info':image_info,'success':1}
    
    @image_app.delete("/{delete_image_id}",status_code=200,
                    response_class=PlainTextResponse,
                    responses={
                        200:{
                                "description":"성공"
                            },
                        error.image_existance_error().status_code:{
                            "description":error.detail
                        },
                        error.authorizaion_error().status_code:{
                            "description":error.detail
                        }
                    }
                  )
    async def delete_image(delete_image_id: int,current_user_id: int = Depends(verify_token)):
        delete_image_id=delete_image_id
            
        if not image_service.get_image_info(delete_image_id):
            error.image_existance_error().get_raise()

        current_user_id=current_user_id
            
        if not image_service.is_user_image(current_user_id,delete_image_id):
            error.authorizaion_error().get_raise()
            
        delete_image_result,delete_image_room_result=image_service.delete_image(delete_image_id)
            
        return f'{delete_image_result}장 삭제 및 {delete_image_room_result}개의 관련 방 권한 삭제 완료'
    
    @image_app.get("/{image_id}",status_code=200,
                    response_model=get_image_response,
                    responses={
                        200:{
                                "description":"성공"
                            },
                        error.image_existance_error().status_code:{
                            "description":error.detail
                        },
                        error.authorizaion_error().status_code:{
                            "description":error.detail
                        }
                    }
                  )
    async def get_image(image_id: int,current_user_id: int = Depends(verify_token)):
        if not image_service.get_image_info(image_id):
            error.image_existance_error().get_raise()
        
            
        if not image_service.is_user_image_room_member(current_user_id,image_id):
            error.authorizaion_error().get_raise()
            
        image_info=image_service.get_image_info(image_id)

        return {'image_info':image_info}

    @image_app.get("/{image_id}/roomlist",
                   status_code=200,
                   response_model=get_image_roomlist_response,
                   responses={
                        200:{
                                "description":"성공"
                            },
                        error.image_existance_error().status_code:{
                            "description":error.detail
                        },
                        error.authorizaion_error().status_code:{
                            "description":error.detail
                        }
                    }
                  )
    async def get_image_roomlist(image_id: int,current_user_id: int = Depends(verify_token)):
        if not image_service.get_image_info(image_id):
            error.image_existance_error().get_raise()

        current_user_id=current_user_id
            
        if not image_service.is_user_image(current_user_id,image_id):
            error.authorizaion_error().get_raise()
            
        image_roomlist=image_service.get_image_roomlist(image_id)
        return {'roomlist':image_roomlist}
    
    @image_app.post("/{image_id}/roomlist",
                    status_code=200,
                    response_model=post_image_roomlist_response,
                    responses={
                        200:{
                                "description":"성공"
                            },
                        error.image_existance_error().status_code:{
                            "description":error.detail
                        },
                        error.authorizaion_error().status_code:{
                            "description":error.detail
                        }
                    }
                  )
    async def post_image_roomlist(image_id: int,req: post_image_roomlist_request,current_user_id: int = Depends(verify_token)):
        if not image_service.get_image_info(image_id):
            error.image_existance_error().get_raise()

        current_user_id=current_user_id
            
        if not image_service.is_user_image(current_user_id,image_id):
            error.authorizaion_error().get_raise()
            
        update_roomlist=req.dict()['update_roomlist']
        exist_roomlist=[]
        #실제로 존재하는 방만 추출
        for room_id in update_roomlist:
            if room_service.get_room_info(room_id):
                    exist_roomlist.append(room_id)
            
        result=image_service.update_image_room(image_id,exist_roomlist)
        image_room_info_list=image_service.get_image_roomlist(image_id)

        return {'result':result,
                        'roomlist':image_room_info_list}

                