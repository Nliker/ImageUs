from flask import request,redirect
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
from flask_restx import Resource,Namespace

from tool import ParserModule,ApiModel,ApiError
            
oauth_namespace=Namespace('oauth-login',description='유저의 소셜로그인을 다룹니다.')

def oauth_router(api,services,config):
    api.add_namespace(oauth_namespace,'')
    api_error=ApiError(oauth_namespace)
    api_model=ApiModel(oauth_namespace)
    api_parser_module=ParserModule()
    
    @oauth_namespace.route("")
    class oauth_login(Resource):
        def get(self):
            coperation=request.args['coperation']
            
            if coperation=="kakao":
                print("kakao")
                oauth_login_url = f"https://kauth.{coperation}.com/oauth/authorize?client_id={config['KAKAO_REST_API_KEY']}&redirect_uri={config['KAKAO_REDIRECT_URI']}&response_type=code"

            if coperation=="naver":
                print("naver")
                oauth_login_url = f"https://nid.{coperation}.com/oauth2.0/authorize?client_id={config['NAVER_REST_API_KEY']}&redirect_uri={config['NAVER_REDIRECT_URI']}&response_type=code"

            return redirect(oauth_login_url)