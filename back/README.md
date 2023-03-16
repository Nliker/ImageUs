# BackServer

>## Table of Contents

- [Settings](#Settings)
- [Installation](#Installation)
- [Erd](#Erd)
- [Reference](#Reference)
- [Memory monitoring](#Memory-monitoring)

<br/>

>## Settings

<br/>

* config.py
    * back>config.py

        ```python
        db={
            "user":"codakcodak",
            "password":"test_mysql",
            "hos  t":"db",
            "port":3306,
            "database":"imageus_back"
        }

        elastic_db={
            'host':["http://127.0.0.1:9200"],
            'index':"image_us"
        }

        JWT_SECRET_KEY="secretkey"

        JWT_REFRESH_TOKEN_NUM=10
        JWT_ACCESS_TOKEN_EXPIRE_TIME=60*30
        JWT_REFRESH_TOKEN_EXPIRE_TIME=60*60*24*14

        DB_URL=f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"

        IMAGE_UPLOAD_URL="http://127.0.0.1:5001/imageapi/upload/"
        IMAGE_DOWNLOAD_URL="http://127.0.0.1:5001/imageapi/image-download/"

        IMAGE_UPLOAD_KEY="secretimagekey"

        ELASTIC_URL=elastic_db['host']
        ELASTIC_INDEX=f"{elastic_db['index']}"
        ELASTIC_MAX_SIZE=20

        GOOGLE_MAIL_USER=메일인증 유저값
        GOOGLE_MAIL_PASSWORD=메일인증 유저 패스워드값

        AUTH_EMAIL_EXPIRE_TIME=180

        GOOD_IP_LIST=[]
        GOOD_IP_RANGE=[]
        MYSQL_TIMEZONE=9

        POOL_SIZE=10
        MAX_OVERFLOW=10
        POOL_RECYCLE=500

        KAKAO_SECRET_KEY=카카오 비밀키
        KAKAO_REST_API_KEY=카카오 RESTAPI 키

        NAVER_SECRET_KEY=네이버 비밀키
        NAVER_REST_API_KEY=네이버 RESTAPI 키

        KAKAO_REDIRECT_URI=카카오의 리다이렉트 URL
        NAVER_REDIRECT_URI=네이버의 리다이렉트 URL

        PUBLIC=True
        MODE='dev'     
        ```

    * image_back>config.py

```python
db={
    "user":"codakcodak",
    "password":"test_mysql",
    "host":"db",
    "port":3306,
    "database":"imageus_back"
}
JWT_SECRET_KEY="secretkey"

DB_URL=f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"


IMAGE_PATH="images"

IMAGE_DOWNLOAD_URL="http://127.0.0.1:5001/imageapi/image-download/"

IMAGE_UPLOAD_KEY="secretimagekey"

IMAGE_SIZE_LIMIT=5

POOL_SIZE=10

MAX_OVERFLOW=10

IMAGE_EXTENTIONS=['HEIF' , 'heif' , 'JPEG','jpeg' ,'JPG','jpg', 
                  'GIF','gif', 'PDF', 'pdf','PNG','png']

```

* Elastic search 7.10.2

* Mysql 8.0.30(arm)

* Python 3.10.4

<br/>

>## Installation

<br/>

```
#프로젝트 경로 입장
cd cloudy

#Image_Us의 mysql database 생성(db이름은 imageus_back,비밀번호는 test_mysql입니다.)
mysql -u root -p < ./mysql/mysql-init-files/imageus_back.sql

#Image_Us의 elasticsearch index 생성(index이름은 image_us입니다.)
Bash ./elasticsearch_config/init_index.sh

#필요한 python의 패키지 설치
pip install -r ./back/requirements.txt
Pip install -r ./image_back/requirements.txt

#back-server 시작
Cd cloudy/back
gunicorn app:create_app

#image-servcer 시작
Cd cloudy/image_back
gunicorn app:create_app
```

<br/>

>## Erd

<br/>

&nbsp; <img width="500px" height="500px" src="https://user-images.githubusercontent.com/77044696/224538033-1fa4c70c-c16e-434f-b166-fc666fa32282.png" />

<br/>

>## Reference

## &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Swagger_일반서버api](https://codakcodak.site/backapi/api-docs)

## &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Swagger_이미지서버api](https://codakcodak.site/imageapi/api-docs)

<br/>

>## Memory monitoring

```
#모니터링 파일 경로 입장
cd Cloudy/back/managements

#파일 실행시 -i는 밀리초 단위로 간격,-t는 초단위로 모니터링 시간,-l은 기존의 저장된 np파일을 그래프로 보여주는 인자들입니다.
python memory_monitor.py -i=1000 -t=3600

#-i=100,-t=60일때 100ms단위로 그래프로 계속 표현되고 60s 동안의 데이터가 memory_history폴더에 저장됩니다.
```

*-i,-t는 -l과 같이 사용할 수 없습니다.

@참고자료(https://velog.io/@tjwjdgus83/ImageUs-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EB%AA%A8%EB%8B%88%ED%84%B0%EB%A7%81)

<br/>