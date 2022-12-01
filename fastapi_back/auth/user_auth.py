import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))

from fastapi import Depends
from functools import wraps
from starlette.requests import Request
from config import Settings
import jwt

def verify_token(request: Request,settings: Settings):
    access_token=request.headers.get('Authorization')
    if access_token is not None:
        try:
            payload=jwt.decode(access_token,settings.JWT_SECRET_KEY_,'HS256')
        except:
            return '유효하지 않은 토큰입니다!',401
        if 'user_id' not in payload and type(payload['user_id']) !=type(1):
            return '필수정보가 없는 토큰입니다!',401
    else:
        return '토큰이 존재하지 않습니다.',401
    
    return payload['user_id']