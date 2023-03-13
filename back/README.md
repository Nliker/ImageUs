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

* Elastic search 7.10.2

* Mysql 8.0.30(arm)

* Python 3.10.4

<br/>

>## Installation

<br/>

```
#프로젝트 경로 입장
cd cloudy

#Image_Us의 mysql database 생성(db이름은 imageus_back입니다.)
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

## &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ImageUs](https://velog.io/@tjwjdgus83/series/ImageUs)

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