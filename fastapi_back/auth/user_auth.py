import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
from fastapi import Header
from config import dev_settings
import jwt
from typing import Union
from custom_exception import error as er

error=er()

async def verify_token(access_token: Union  [str, None]=Header(default=None)):
    if access_token is not None:
        try:
            payload=jwt.decode(access_token,dev_settings.JWT_SECRET_KEY,"HS256")
        except:
            error.verify_token_error().get_raise()
        if 'user_id' not in payload and type(payload['user_id']) !=type(1):
            print("good")
            error.verify_token_error().get_raise()
    else:
        error.token_existance_error().get_raise()
    
    return payload['user_id']