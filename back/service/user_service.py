import bcrypt
from datetime import datetime, timedelta
import jwt
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random


class UserService:
    def __init__(self,user_dao,config):
        self.config=config
        self.user_dao=user_dao
    update_list=['profile','name']
    '''
    userdao
    get_user_id_and_password(email)->{id,password}
    insert_user(new_user)->new_user_id
    get_user_info(user_id)->{id,name,email,profile}
    insert_user_friend(user_id,friend_user_id)->0 or 1
    get_user_friend(user_id,friend_user_id)->'id':<int>,'friend_user_info':<int> or None
    get_user_frinedlist(user_id)->[
        {
            'id':<int>,
            'name':<str>,
            'email':<str>,
            'profile':<str>
        },
        {
            'id':<int>,
            'name':<str>,
            'email':<str>,
            'profile':<str>
        }
    ]
    delete_user_friend(user_id,delete_friend_user_id)->0 or 1
    '''
    
    def get_email_auth_info(self,email):
        email_auth_info=self.user_dao.get_email_auth_info(email)
        return email_auth_info    
    
    def generate_auth_password(self):
        numberlist=random.sample([0,1, 2, 3, 4, 5,6,7,8,9],4)
        auth_password=""
        for number in numberlist:
            auth_password+=str(number)
        return auth_password
    
    def initiate_email_auth(self,email,auth_password):
        result=self.user_dao.update_email_auth(email,auth_password)
        print(result)
        return result
    
    def create_new_email_auth(self,email,auth_password):
        result=self.user_dao.insert_email_auth(email,auth_password)
        return result

    def send_email_auth_password(self,email,auth_password):
        
        sender=self.config['GOOGLE_MAIL_USER']
        password=self.config['GOOGLE_MAIL_PASSWORD']
        receiver=email

        smtp=smtplib.SMTP('smtp.gmail.com',587)
        smtp.ehlo()
        smtp.starttls()
        smtp.login(sender,password)

        msg = MIMEMultipart('alternative')
        
        try:
            text=f"Hi,This is message for your email authentification of sign-up from ImageUs"
            html='''
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1">

                <title>Email_Authentification</title>

                <!-- 합쳐지고 최소화된 최신 CSS -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
            </head>
            <body>
                <div class="panel panel-info">
                    <div class="panel-heading">
                    <h3 class="panel-title">AUTH-PASSWORD</h3>
                    </div>
                    <div class="panel-body">
                    %s
                    </div>
                </div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
                <script src="js/bootstrap.min.js"></script>
            </body>
            </html>
            ''' % (auth_password)
            msg['Subject']='test_email_send'
            msg['From']=sender
            msg['To']=receiver

            part1 = MIMEText(text, 'plain')
            part2 = MIMEText(html, 'html')

            msg.attach(part1)
            msg.attach(part2)

            smtp.sendmail(sender,receiver,msg.as_string())
        except Exception as e:
            print('error',e)
            return 0
        finally:
            if smtp is not None:
                smtp.quit()
            return 1
            
    
    def authorize_email_auth(self,email,auth_password):
        email_auth_info=self.get_email_auth_info(email)
        
        if email_auth_info['auth_password']!=auth_password:
            return False
    
        return True

    def is_email_auth_expired(self,email):
        email_auth_time_diff=self.user_dao.get_email_auth_time_diff(email)
        print(email_auth_time_diff)
        if email_auth_time_diff > self.config['AUTH_EMAIL_EXPIRE_TIME']:
            return True
        return False

    def activate_email_auth(self,email):
        result=self.user_dao.update_email_auth_activate(email)
        print(result)
        return result
        
    
    def is_email_exists(self,email,type="image_us"):
        user=self.user_dao.get_user_id_and_password(email,type)
        #유저가 없다면 False,있으면 True
        if user:
            return True
        else:
            return False
        
    def create_new_user(self,new_user,type="image_us"):
        password=new_user['password']
        new_user['hashed_password']=bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
        new_user['type']=type
        new_user_id=self.user_dao.insert_user(new_user)
        return new_user_id

    def get_user_info(self,user_id):
        user=self.user_dao.get_user_info(user_id)

        return user

    def login(self,credential,type="image_us"):
        user_credential=self.user_dao.get_user_id_and_password(credential['email'],type)
        authorized=bcrypt.checkpw(credential['password'].encode('utf-8'),user_credential['hashed_password'].encode('utf-8')) if user_credential else None

        return authorized
    
    def generate_access_token(self,user_id):
        jwt_expire_time= timedelta(seconds=self.config['JWT_EXPIRE_TIME'])
        payload={
            'user_id':user_id,
            'exp':datetime.utcnow()+jwt_expire_time,
            'iat':datetime.utcnow()
        }
        access_token=jwt.encode(payload,self.config['JWT_SECRET_KEY'],'HS256')

        return access_token
    
    def get_user_id_and_password(self,email,type="image_us"):
        user_credential=self.user_dao.get_user_id_and_password(email,type)

        return user_credential

    def is_user_friend(self,user_id,friend_user_id):
        result=self.user_dao.get_user_friend(user_id,friend_user_id) and self.user_dao.get_user_friend(friend_user_id,user_id) 
        
        if result:
            return True
        else:
            return False
    
    def create_user_friend(self,user_id,friend_user_id):
        result=self.user_dao.insert_user_friend(user_id,friend_user_id)

        return result
        
    def get_user_friendlist(self,user_id):
        user_friend_info_list=self.user_dao.get_user_friendlist(user_id)

        return user_friend_info_list
        
    def delete_user_friend(self,user_id,delete_friend_user_id):
        result=self.user_dao.delete_user_friend(user_id,delete_friend_user_id)
        return result
    
    def update_user_info(self,user_id,update_user):
        result=0
        for attr, value in update_user.items():
            if attr in self.update_list:
                result+=self.user_dao.update_user(user_id,attr,value)
    
        return result
    
    def get_user_room_history_row_info(self,user_id,room_id):
        user_room_history_row_info=self.user_dao.get_user_room_history_row_info(user_id,room_id)

        return user_room_history_row_info
        
    def create_user_room_history_row(self,user_id,room_id):
        result=self.user_dao.insert_user_room_history_row(user_id,room_id)

        return result

    def update_user_room_history_row_info(self,user_id,room_id,update_row):
        result=self.user_dao.update_user_room_history_row_info(user_id,room_id,update_row)

        return result
    
    def delete_user(self,delete_user_id):
        result=self.user_dao.delete_user(delete_user_id)
        print(result)
        return result
                    
