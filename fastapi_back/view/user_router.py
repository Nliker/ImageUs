import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
from auth import verify_token
from custom_exception import error as er
from pydantic import BaseModel
from typing import Optional

class sign_up_body(BaseModel):
    name: str
    email: str
    password: str
    profile: Optional[str] = "this is profile"
 
def user_router(app,services):
    user_service=services.user_service
    image_service=services.image_service
    room_service=services.room_service
    
    
    error=er()
    
    
    @app.post("/user/sign-up",status_code=200,)
    async def sign_up(sign_up_data: sign_up_body):
        new_user=sign_up_data.dict()

        if user_service.is_email_exists(new_user['email']):
            error.email_existance_sign_up_error
            
        new_user_id=user_service.create_new_user(new_user)
        user_info=user_service.get_user_info(new_user_id)
            
        return {'user_info':user_info}