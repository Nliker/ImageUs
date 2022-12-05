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

class post_room_request(BaseModel):
    title: str
    userlist: Optional[List[int]]=[]
    
class post_room_user_request(BaseModel):
    invite_userlist: Optional[List[int]] = []
    
class post_room_response(BaseModel):
    room_info: room
    success: int

class post_room_image_response(BaseModel):
    image_info: image
    success: int

class get_room_imagelist_response(BaseModel):
    imagelist: Optional[List[image]] = []

class get_room_userlist_response(BaseModel):
    userlist: Optional[List[user]] = []

    
room_app=APIRouter()

def room_router(app,services):
    room_service=services.room_service
    image_service=services.image_service
    user_service=services.user_service

    error=er()
    
    app.include_router(room_app,prefix='/room',tags=['room'])

    @room_app.post("",status_code=200,
                   response_model=post_room_response,
                   responses={
                        200:{
                                "description":"성공"
                            }
                    }
                  )
    async def post_room(req: post_room_request,current_user_id: int = Depends(verify_token)):
        room_userlist=req.dict()['userlist']
        current_user_id=current_user_id
            
        new_room={
                'title':req.dict()['title'],
                'user_id':current_user_id
        }
            
        new_room_id=room_service.create_room(new_room)
        room_info=room_service.get_room_info(new_room_id)

        room_userlist.append(current_user_id)

        #존재하지 않는 유저는 배제합니다.
        real_room_userlist=[]
        for user_id in room_userlist:
            if user_service.get_user_info(user_id):
                real_room_userlist.append(user_id)
            
        result=room_service.create_room_users(new_room_id,real_room_userlist)

        return {
                    'room_info':room_info,
                    'success':result
                }
        
    @room_app.post("/{room_id}/image",
                   status_code=200,
                   response_model=post_room_image_response,
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
    async def post_room_image(room_id: int,image: Optional[UploadFile] = None,current_user_id: int = Depends(verify_token)):
        current_user_id=current_user_id
            
        if 'image' == None or image.filename=='':
            error.file_missing_error().get_raise()

        new_image={
                'image':image,
                'user_id':current_user_id
        }
        
        result=image_service.upload_room_image(room_id,new_image)

        if 'message' not in result:
            new_image_id=result['new_image_id']
            image_info=image_service.get_image_info(new_image_id)
            return {
                        'image_info':image_info,
                        'success':result['result']
                    }
        else:
            return {'message':result['message']}
        
    @room_app.delete("/{room_id}/image/{delete_room_image_id}",
                    status_code=200,
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
    async def delete_room_image(room_id: int,delete_room_image_id: int,current_user_id: int = Depends(verify_token)):
        current_user_id=current_user_id
        delete_room_image_id=delete_room_image_id
        if not image_service.get_image_info(delete_room_image_id):
            error.image_existance_error().get_raise()
            
        if not image_service.is_user_image(current_user_id,delete_room_image_id):
            error.authorizaion_error().get_raise()

        delete_room_image_id=delete_room_image_id
        result=image_service.delete_room_image(room_id,delete_room_image_id)
            
        return f"{result}장 삭제 완료"

    @room_app.get("/{room_id}/imagelist",
                  status_code=200,
                  response_model=get_room_imagelist_response,
                  responses={
                        200:{
                                "description":"성공"
                            },
                        error.room_existance_error().status_code:{
                            "description":error.detail
                        },
                        error.authorizaion_error().status_code:{
                            "description":error.detail
                        }
                    }
                )        
    async def get_room_imagelist(room_id: int,current_user_id: int = Depends(verify_token)):
        current_user_id=current_user_id
        if not room_service.get_room_info(room_id):
            error.room_existance_error().get_raise()
            
        if not room_service.is_room_user(room_id,current_user_id):
            error.authorizaion_error().get_raise()
            
        imagelist=image_service.get_room_imagelist(room_id)
                
        return {'imagelist':imagelist}
    
    @room_app.get("/{room_id}/userlist",
                  status_code=200,
                  response_model=get_room_userlist_response,
                  responses={
                        200:{
                                "description":"성공"
                            },
                        error.room_existance_error().status_code:{
                            "description":error.detail
                        },
                        error.authorizaion_error().status_code:{
                            "description":error.detail
                        }
                    }
                )        
    async def get_room_userlist(room_id: int,current_user_id: int = Depends(verify_token)):
        if not room_service.get_room_info(room_id):
            error.room_existance_error().get_raise()
            
        if not room_service.is_room_user(room_id,current_user_id):
            error.authorizaion_error().get_raise()
            
        room_user_info_list=room_service.get_room_userlist(room_id)

        return {'userlist':room_user_info_list}

    
    @room_app.post("/{room_id}/user",
                   status_code=200,
                   response_class=PlainTextResponse,
                   responses={
                        200:{
                                "description":"성공"
                            },
                        error.room_existance_error().status_code:{
                            "description":error.detail
                        },
                        error.room_user_error().status_code:{
                            "description":error.detail
                        }
                    }
                )
    async def post_room_user(room_id: int,req: post_room_user_request,current_user_id: int = Depends(verify_token)):
        if not room_service.get_room_info(room_id):
            error.room_existance_error().get_raise()
            
        if not room_service.is_room_user(room_id,current_user_id): 
            error.room_user_error().get_raise()
            
        #실제 존재 유저이면 초대 가능 유저로 선정
        invite_userlist=req.dict()['invite_userlist']
        exist_invite_userlist=[]
        for user_id in invite_userlist:
            if user_service.get_user_info(user_id):
                exist_invite_userlist.append(user_id)

        result=room_service.create_room_users(room_id,exist_invite_userlist)

        return f'{result}명 초대 성공'

    @room_app.delete("/{room_id}/user/{delete_room_user_id}",
                     status_code=200,
                     response_class=PlainTextResponse,
                     responses={
                        200:{
                                "description":"성공"
                            },
                        error.room_existance_error().status_code:{
                            "description":error.detail
                        },
                        error.authorizaion_error().status_code:{
                            "description":error.detail
                        },
                        error.user_existance_error().status_code:{
                            "description":error.detail
                        }
                    }
                )
    async def delete_room_user(room_id: int,delete_room_user_id: int,current_user_id: int = Depends(verify_token)):
        current_user_id=current_user_id
        if not room_service.get_room_info(room_id):
            error.room_existance_error().get_raise()
        #방장이 아니라면
        if current_user_id!= room_service.get_room_info(room_id)['host_user_id']:
            error.authorizaion_error().get_raise()
            
        if not user_service.get_user_info(delete_room_user_id):
            error.user_existance_error().get_raise()
            
        delete_room_user_id=delete_room_user_id
        result=room_service.delete_room_user(room_id,delete_room_user_id)
        delete_image_result=image_service.delete_room_user_image(room_id,delete_room_user_id)

        return f'{result}명 강퇴 및 {delete_image_result}장 관련 사진 삭제 성공'