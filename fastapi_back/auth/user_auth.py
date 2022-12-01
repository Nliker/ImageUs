import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
from fastapi import Header
from config import Settings
import jwt
from custom_exception import error as er

def verify_token(Authorization: str | None=Header(default=None),settings=Settings(),error=er()):
    access_token=Authorization
    if access_token is not None:
        try:
            payload=jwt.decode(access_token,settings.JWT_SECRET_KEY,"HS256")
        except:
            print("asdasd")
            error.verify_token_error().get_raise()
        if 'user_id' not in payload and type(payload['user_id']) !=type(1):
            print("good")
            error.verify_token_error().get_raise()
    else:
        error.token_existance_error().get_raise()
    
    return payload['user_id']