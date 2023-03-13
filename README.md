# ImageUs


&nbsp; <img width="250px" height="250px" src="https://user-images.githubusercontent.com/77044696/224473232-d614b965-d2c1-4dd1-bade-9c3e3207dc6a.png" />

>## Table of Contents

- [Introduction](#Introduction)
- [Domain](#Domain)
- [Structural diagram](#Structural-diagram)
- [Stacks](#Stacks)
- [Contributors](#Contributors)
- [Demo](#Demo)

<br/>

>## Introduction

<br/>

*   Background

    *   Mybox 서비스 같은 경우는 사람들에게 사진을 공유할   때 사진마다 사람들을 초대하여 공유하는 번거로움이 있습니다.이에 ImageUs에서는 공유하고 싶은 그룹을 만들고 편리하게 여행 사진이나 추억이 남는 이미지에 대한 그룹의 공유 및 삭제를 할 수 있습니다.

<br/>

*   Service

    *   사진을 업로드 할 수 있는 자신만의 공간
    *   원하는 사진을 편리하게 공유 할 수 있는 친구들과의 그룹 공간
    *   친구추가를 위한 유저 검색
    *   간편한 가입 절차를 위한 소셜로그인
    *   그룹 공간에서의 실시간 이미지 업데이트
    *   그룹 공간에서의 날짜별 이미지 필터링

<br/>

>## Domain

<br/>

## &nbsp;:mag_right:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ImageUs](https://codakcodak.site)

<br/>

#### 다음은 테스트 아이디입니다.원하시는 아이디로 접속하셔서 사용해보세요!

|유저|아이디|비밀번호|
|-------|------|----------|
|user1|<span style="color:yellow">test1@test.com</span>|<span style="color:yellow">testuser1</span>|
|user2|<span style="color:green">test2@test.com</span>|<span style="color:green">testuser2</span>|
|user3|<span style="color:blue">test3@test.com</span>|<span style="color:blue">testuser3</span>|

<br/>

>## Structural diagram

<br/>

&nbsp; <img width="500px" height="500px" src="https://user-images.githubusercontent.com/77044696/224471759-d882ee10-86c9-49aa-a9fc-f78ffa31c173.png" />

<br/>

>## Stacks

<br/>

|역할|스택|
|:---|:---:|
|프론트엔드|![React](https://img.shields.io/badge/react-ffffff?style=for-the-badge&logo=react) ![Swr](https://img.shields.io/badge/swr-ffffff?style=for-the-badge&logo={data:image/svg+xml;base64,PCEtLSBSZXBsYWNlIHRoZSBjb250ZW50cyBvZiB0aGlzIGVkaXRvciB3aXRoIHlvdXIgU1ZHIGNvZGUgLS0+Cgo8c3ZnIHZpZXdCb3g9IjAgMCAyOTEgNjkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTAgMzYuNTNjLjA3IDE3LjYgMTQuNCAzMi4wMSAzMi4wMSAzMi4wMWEzMi4wNSAzMi4wNSAwIDAgMCAzMi4wMS0zMlYzMmExMy4yIDEzLjIgMCAwIDEgMjMuNC04LjMxaDIwLjdBMzIuMDcgMzIuMDcgMCAwIDAgNzcuMiAwYTMyLjA1IDMyLjA1IDAgMCAwLTMyIDMyLjAxdjQuNTJBMTMuMiAxMy4yIDAgMCAxIDMyIDQ5LjcxYTEzLjIgMTMuMiAwIDAgMS0xMy4xOC0xMy4xOCAzLjc3IDMuNzcgMCAwIDAtMy43Ny0zLjc3SDMuNzZBMy43NyAzLjc3IDAgMCAwIDAgMzYuNTN6bTEyMi40OSAzMi4wMWEzMi4xNCAzMi4xNCAwIDAgMS0zMC44OS0yMy43aDIwLjY3YTEzLjE2IDEzLjE2IDAgMCAwIDIzLjQtOC4zVjMyYTMyLjA1IDMyLjA1IDAgMCAxIDMyLjAxLTMyYzE3LjQzIDAgMzEuNjQgMTQgMzIgMzEuMzNsLjEgNS4yYTEzLjIgMTMuMiAwIDAgMCAyMy40IDguMzFoMjAuN2EzMi4wNyAzMi4wNyAwIDAgMS0zMC45MSAyMy43Yy0xNy42MSAwLTMxLjk0LTE0LjQyLTMyLjAxLTMybC0uMS00Ljd2LS4yYTEzLjIgMTMuMiAwIDAgMC0xMy4xOC0xMi44MSAxMy4yIDEzLjIgMCAwIDAtMTMuMTggMTMuMTh2NC41MmEzMi4wNSAzMi4wNSAwIDAgMS0zMi4wMSAzMi4wMXpNMjQ3Ljk0IDIzLjdhMTMuMTYgMTMuMTYgMCAwIDEgMjMuNCA4LjMxIDMuNzcgMy43NyAwIDAgMCAzLjc3IDMuNzdoMTEuM2EzLjc3IDMuNzcgMCAwIDAgMy43Ni0zLjc3QTMyLjA1IDMyLjA1IDAgMCAwIDI1OC4xNiAwYTMyLjA3IDMyLjA3IDAgMCAwLTMwLjkyIDIzLjdoMjAuN3oiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8L3N2Zz4=}) ![Emotion](https://img.shields.io/badge/Emotion-f26b00?style=for-the-badge)|
|백엔드|<img src="https://img.shields.io/badge/Flask-white?style=for-the-badge&logo=Flask&logoColor=black"> <img src="https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=Pytest&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/Elastic-005571?style=for-the-badge&logo=Elastic&logoColor=white">|
|배포|<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"> <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=NGINX&logoColor=white">|

<br/>

>## Contributors

<br/>

| 권강훈 | 서정현 |
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="160px" src="https://avatars.githubusercontent.com/u/72805356?v=4" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/77044696?v=4" /> |
| [@kanghunK](https://github.com/kanghunK) | [@Nliker](https://github.com/Nliker) |
| 프론트엔드 | 백엔드 |

<br/>

>## Demo

<br/>

<iframe width="1222" height="670" src="https://www.youtube.com/embed/aBYgPk-7lw0" title="ImageUs 데모영상" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>