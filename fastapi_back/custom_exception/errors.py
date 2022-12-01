from fastapi import HTTPException

class STATUSCODE:
    HTTP_200 = 200
    HTTP_201 = 201
    HTTP_400 = 400
    HTTP_401 = 401
    HTTP_402 = 402
    HTTP_403 = 403
    HTTP_404 = 404
    HTTP_405 = 405

    
class error(Exception):
    def __init__(self,detail="에러입니다.",status_code=STATUSCODE.HTTP_400):
        self.detail=detail
        self.status_code=status_code

    
    def token_existance_error(self):
        self.detail="토큰이 존재하지 않습니다."
        self.status_code=STATUSCODE.HTTP_404
        
        return self
    
    def verify_token_error(self):
        self.detail="토큰 인증 과정에서 문제가 생겼습니다."
        self.status_code=STATUSCODE.HTTP_401

        return self
        
    def email_existance_sign_up_error(self):
        self.detail="이메일이 이미 존재합니다."
        self.status_code=STATUSCODE.HTTP_402

        return self
    
    def email_existance_login_error(self):
        self.detail="이미일이 존재하지 않습니다."
        self.status_code=STATUSCODE.HTTP_404

        return self
    
    def user_existance_error(self):
        self.detail="유저가 존재하지 않습니다."
        self.status_code=STATUSCODE.HTTP_404
    
    def credential_error(self):
        self.detail="비밀번호가 일치하지 않습니다."
        self.status_code=STATUSCODE.HTTP_401

        return self
    
    def authorizaion_error(self):
        self.detail="권한을 가지고 있지 않습니다."
        self.status_code=STATUSCODE.HTTP_403

        return self
    
    def friend_existance_error(self):
        self.detail="이미 친구로 등록된 유저입니다."
        self.status_code=STATUSCODE.HTTP_402

        return self
    
    def file_missing_error(self):
        self.detail="파일이 존재하지 않습니다."
        self.status_code=STATUSCODE.HTTP_404
    
    def image_existance_error(self):
        self.detail="이미지가 존재하지 않습니다."
        self.status_code=STATUSCODE.HTTP_404

        return self
    
    def room_existance_error(self):
        self.detail="방이 존재하지 않습니다."
        self.status_code=STATUSCODE.HTTP_404

        return self
    
    def room_user_error(self):
        self.detail="방의 유저가 아니기 떄문에 권한을 가지고 있지 않습니다."
        self.status_code=STATUSCODE.HTTP_403
        
        return self
    
    def get_raise(self):
        raise HTTPException(detail=self.detail,status_code=self.status_code)
        