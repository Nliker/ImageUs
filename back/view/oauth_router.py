from flask import request,redirect,make_response,redirect,jsonify
import sys,os
sys.path.append((os.path.dirname(os.path.abspath(os.path.dirname(__file__)))))
from flask_restx import Resource,Namespace
import requests
from tool import ParserModule,ApiModel,ApiError
            
oauth_namespace=Namespace('oauth-login',description='유저의 소셜로그인을 다룹니다.')

class Oauth:
    default_headers={
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache",
        }

    corperation={'kakao':{
            "auth_url":"https://kauth.kakao.com/oauth/token",
            "profile_url":"https://kapi.kakao.com/v2/user/me"

        },
        'naver':{
            "auth_url":"https://nid.naver.com/oauth2.0/token",
            "profile_url":"https://openapi.naver.com/v1/nid/me"
    }}

    def __init__(self):
        pass
            
    def get_access_token(self,coperation,code,rest_api_key,secret_key,redirect_url):
        print(code)
        return requests.post(
        url=self.corperation.get(coperation)['auth_url'],
        headers=self.default_headers
            ,
        data={
                    "grant_type": "authorization_code",
                    "client_id": rest_api_key,
                    "client_secret": secret_key,
                    "redirect_uri": redirect_url,
                    "code": code
                },
        ).json()
            
    def get_user_info(self,coperation,access_token):
        return requests.get(
        url=self.corperation.get(coperation)['profile_url'],
        headers={
            **self.default_headers,
            "Authorization":f"Bearer {access_token}"
            },
        data={}
        ).json()

def oauth_router(api,services,config):
    api.add_namespace(oauth_namespace,'')
    user_service=services.user_service
    
    oauth=Oauth()
    
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
    
    oauth_login_callback_parser=api_parser_module.get_parser(['code','coperation'])
    @oauth_namespace.route("/callback")
    @oauth_namespace.expect(oauth_login_callback_parser,validate=False)
    class oauth_signup(Resource):
        def get(self):
            code=request.args['code']
            coperation=request.args['coperation']

            if coperation=="kakao":
                token=oauth.get_access_token(coperation,code,config['KAKAO_REST_API_KEY'],config['KAKAO_SECRET_KEY'],config['KAKAO_REDIRECT_URI'])
                print(token)
                access_token=token['access_token']

                res=oauth.get_user_info(coperation,access_token)
                kakao_account_info=res['kakao_account']
                oauth_user_info={
                    'name':kakao_account_info['profile']['nickname'],
                    'email':kakao_account_info['email'],
                    'password':str(res['id'])
                }
            if coperation=="naver":
                token=oauth.get_access_token(coperation,code,config['NAVER_REST_API_KEY'],config['NAVER_SECRET_KEY'],config['NAVER_REDIRECT_URI'])
                print(token)
                access_token=token['access_token']

                res=oauth.get_user_info(coperation,access_token)
                naver_account_info=res['response']
                oauth_user_info={
                    'name':naver_account_info['name'],
                    'email':naver_account_info['email'],
                    'password':naver_account_info['id']
                }

            if user_service.is_email_exists(oauth_user_info['email'],type=coperation):
                user_info=user_service.get_user_id_and_password(email=oauth_user_info['email'],type=coperation)
                    
                access_token=user_service.generate_access_token(user_info['id'])

                return make_response(jsonify({'access_token':access_token,'user_id':user_info['id']}))
            else:
                new_user={
                    **oauth_user_info,
                    'profile':f"{coperation} 유저 입니다."
                }
                print(new_user)
                new_user_id=user_service.create_new_user(new_user,type=coperation)
    
                access_token=user_service.generate_access_token(new_user_id)
                
                return make_response(jsonify({'access_token':access_token,'user_id':new_user_id}))