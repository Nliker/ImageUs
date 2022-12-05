import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
from auth import verify_token
from custom_exception import error as er
from pydantic import BaseModel
from fastapi import Depends,APIRouter
from typing import Optional
from fastapi.responses import PlainTextResponse
from typing import List,Optional

class post_sign_up_request(BaseModel):
    name: str
    email: str
    password: str
    profile: Optional[str] = "this is profile"

class post_login_request(BaseModel):
    email: str
    password: str

class post_user_friend_request(BaseModel):
    friend_user_id: int

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

class room_with_userlist(room):
    userlist: Optional[List[user]] = []

class post_sign_up_response(BaseModel):
    user_info: user

class get_user_response(BaseModel):
    user_info: user

class post_login_response(BaseModel):
    access_token: str

class get_user_imagelist_response(BaseModel):
    imagelist: Optional[List[image]]=[]

class get_user_friendlist_reponse(BaseModel):
    friendlist: Optional[List[user]]=[]

class get_user_roomlist_response(BaseModel):
    roomlist: Optional[List[room_with_userlist]]=[]

user_app=APIRouter()

def user_router(app,services):
    user_service=services.user_service
    image_service=services.image_service
    room_service=services.room_service
    
    error=er()
    
    app.include_router(user_app,prefix='/user',tags=['user'])
    
    @user_app.post("/sign-up",status_code=200,
                   response_model=post_sign_up_response,
                   responses={
                        200:{
                                "description":"성공"
                            },
                        error.email_existance_sign_up_error().status_code:{
                                "description":error.detail
                            }
                        }
                   )
    async def post_sign_up(req: post_sign_up_request):
        new_user=req.dict()
        
        if user_service.is_email_exists(new_user['email']):
            error.email_existance_sign_up_error().get_raise()
            
        new_user_id=user_service.create_new_user(new_user)
        user_info=user_service.get_user_info(new_user_id)
        
        return {'user_info':user_info}
    
    @user_app.get("/{user_id}/",status_code=200,
                  response_model=get_user_response,
                  responses={
                        200:{
                                "description":"성공"
                            },
                        error.user_existance_error().status_code:{
                                "description":error.detail
                            }
                    }
                  )
    async def get_user(user_id: int,current_user_id: int = Depends(verify_token)):
        user_info=user_service.get_user_info(user_id)
        if user_info:
            return {'user_info':user_info}
        else:
            error.user_existance_error().get_raise()
        
    
    
    @user_app.post("/login",status_code=200,
                    response_model=post_login_response,
                    responses={
                        200:{
                                "description":"성공"
                            },
                        error.email_existance_login_error().status_code:
                            {
                                "description":error.detail
                            },
                        error.credential_error().status_code:
                            {
                                "description":error.detail
                            }
                    }
                  )
    async def post_login(req:post_login_request):
        credential=req.dict()

        if not user_service.is_email_exists(credential['email']):
            error.email_existance_login_error().get_raise()
            
        authorized=user_service.login(credential)
        if authorized:
            user_credential=user_service.get_user_id_and_password(credential['email'])
            access_token=user_service.generate_access_token(user_credential['id'])
            return {'access_token':access_token}
        
        else:
            error.credential_error().get_raise()
    
    @user_app.get("/{user_id}/imagelist",status_code=200,
                    response_model=get_user_imagelist_response,
                    responses={
                        200:{
                                "description":"성공"
                            },
                        error.authorizaion_error().status_code:
                            {
                                "description":error.detail
                            }
                    }
                  )
    async def get_user_imagelist(user_id: int,current_user_id: int=Depends(verify_token)):
        current_user_id=current_user_id
            
        #current_usre_id와 user_id를 따로 받으면 추후 누가 조회 했는지 알 수 있음
        if current_user_id != user_id:
            error.authorizaion_error().get_raise()
            
        image_list=image_service.get_user_imagelist(current_user_id)

        return {'imagelist':image_list}
    
    @user_app.get("/{user_id}/friendlist",status_code=200,
                    response_model=get_user_friendlist_reponse,
                    responses={
                        200:{
                                "description":"성공"
                            },
                        error.authorizaion_error().status_code:
                            {
                                "description":error.detail
                            }
                        }
                  )
    async def get_user_friendlist(user_id: int,current_user_id: int=Depends(verify_token)):
        current_user_id=current_user_id
            
        if current_user_id != user_id:
            error.authorizaion_error().get_raise()
            
        user_friend_info_list=user_service.get_user_friendlist(current_user_id)
        return {'friendlist':user_friend_info_list}


    @user_app.delete("/{user_id}/friend/{delete_friend_user_id}",status_code=200,response_class=PlainTextResponse,
                    responses={
                        200:{
                                "description":"성공"
                            },
                        error.authorizaion_error().status_code:
                            {
                                "description":error.detail
                            },
                        error.user_existance_error().status_code:
                            {
                                "description":error.detail
                            }
                    }
                  )
    async def delete_user_friend(user_id: int,delete_friend_user_id: int,current_user_id: int=Depends(verify_token)):
        current_user_id=current_user_id

        if current_user_id != user_id:
            error.authorizaion_error().get_raise()
            
        delete_friend_user_id=delete_friend_user_id

        if not user_service.get_user_info(delete_friend_user_id):
            error.user_existance_error().get_raise()
                
        result=user_service.delete_user_friend(current_user_id,delete_friend_user_id)
        return f"{result}명 삭제 성공"
    
    @user_app.post("/{user_id}/friend",status_code=200,response_class=PlainTextResponse,
                   responses={
                        200:{
                                "description":"성공"
                            },
                        error.authorizaion_error().status_code:
                            {
                                "description":error.detail
                            },
                        error.user_existance_error().status_code:
                            {
                                "description":error.detail
                            },
                        error.friend_existance_error().status_code:
                            {
                                "description":error.detail
                            }
                    }
                  )
    async def post_user_friend(user_id: int,req: post_user_friend_request,current_user_id: int=Depends(verify_token)):
        current_user_id=current_user_id
        friend_user_id=req.dict()['friend_user_id']
            
        if current_user_id != user_id:
            error.authorizaion_error().get_raise()
            
        if not user_service.get_user_info(friend_user_id):
            error.user_existance_error().get_raise()
            
        if user_service.is_user_friend(current_user_id,friend_user_id):
            error.friend_existance_error().get_raise()
            
        result=user_service.create_user_friend(current_user_id,friend_user_id)

        return f"{result}명 친구 생성 성공"
    
    @user_app.get("/{user_id}/roomlist",status_code=200,
                    response_model=get_user_roomlist_response,
                    responses={
                        200:{
                                "description":"성공"
                            },
                        error.authorizaion_error().status_code:
                            {
                                "description":error.detail
                            }
                    }
                  )
    async def get_user_roomlist(user_id: int,current_user_id: int=Depends(verify_token)):
        current_user_id=current_user_id
            
        if current_user_id != user_id:
            error.authorizaion_error().get_raise()
            
        room_info_list=room_service.get_user_roomlist(current_user_id)

        for room_info in room_info_list:
            room_id=room_info['id']
            user_info_list=room_service.get_room_userlist(room_id)
            room_info['userlist']=user_info_list
            
        return {'roomlist':room_info_list}

    @user_app.delete("/{user_id}/room/{delete_user_room_id}",status_code=200,response_class=PlainTextResponse,
                     responses={
                        200:{
                                "description":"성공"
                            },
                        error.authorizaion_error().status_code:
                            {
                                "description":error.detail
                            }
                    }
                  )
    async def delete_user_room(user_id: int,delete_user_room_id: int,current_user_id: int=Depends(verify_token)):
        current_user_id=current_user_id
            
        if current_user_id != user_id:
            error.authorizaion_error().get_raise()
            
        delete_user_room_id=delete_user_room_id

        result=room_service.delete_user_room(current_user_id,delete_user_room_id)

        return f"{result}개 방 삭제 성공"
    
            
    