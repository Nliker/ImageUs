# ImageUs

&nbsp;

## 목차

<br/>

- [서비스 소개](#01-서비스-소개)
- [기능](#02-기능)
- [Domain](#03-domain)
- [Structural diagram](#04-structural-diagram)
- [Stacks](#05-stacks)
- [Contributors](#06-contributors)

<br/>
<br/>

> ## 01 서비스 소개

<br/>

Mybox 서비스 같은 경우는 사람들에게 사진을 공유할 때 사진마다 사람들을 초대하여 공유하는 번거로움이 있습니다.

ImageUs에서는 사진을 공유하고 싶은 그룹을 만들고 여행 사진이나 추억이 남는 이미지를 편리하게 공유 및 삭제를 할 수 있는 서비스를 만들고자 했습니다.

또한, 자신이 간직하고 싶은 이미지를 개인 클라우드 저장소에 저장할 수 있어 로컬에 다운하거나 볼 수 있습니다.

<br/>
<br/>

> ## 02 기능

<br />

**소셜로그인**

- 기본 로그인외에 카카오톡과 네이버 계정으로 로그인 할 수 있습니다.

<br/>

**개인 이미지 저장소**

- 사진을 업로드 할 수 있는 개인 저장소가 있어 클라우드에 저장하고 필요시에 다운받을 수 있습니다.

<br/>

**그룹 이미지 저장소**

- 이미지를 공유할 수 있는 그룹저장소를 만들어 그룹에 속한 사람들끼리 이미지를 다운하고 볼 수 있습니다.

- 그룹에서 업로드 된 이미지들을 날짜별로 필터링해서 볼 수 있고 실시간으로 업로드 된 이미지도 확인할 수 있습니다.

<br/>

**유저 검색 기능**

- 자신의 친구목록에 유저를 추가하기 위해 검색기능을 이용할 수 있습니다.

<br/>
<br/>

> ## 03 Domain

<br/>

### 아래 주소로 접속하셔서 시연하실 수 있습니다!

<br/>

기본 주소: &nbsp;&nbsp;&nbsp;[ImageUs](https://codakcodak.site)

로그인된 계정 주소: &nbsp;&nbsp;&nbsp;[계정1](https://codakcodak.site/login?email=test1@test.com&password=testuser1),&nbsp;&nbsp;[계정2](https://codakcodak.site/login?email=test2@test.com&password=testuser2)

<br/>
<br/>

> ## 04 Structural diagram

<br/>

&nbsp; <img width="500px" height="500px" src="https://user-images.githubusercontent.com/77044696/224471759-d882ee10-86c9-49aa-a9fc-f78ffa31c173.png" />

<br/>
<br/>

> ## 05 Stacks

<br/>

|    역할    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            스택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :--------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 프론트엔드 | ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=white) ![Swr](https://img.shields.io/badge/SWR-white?style=flat&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iMTIxcHgiIHZpZXdCb3g9IjAgMCA1MTIgMTIxIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4KICAgIDx0aXRsZT5TV1I8L3RpdGxlPgogICAgPGc+CiAgICAgICAgPHBhdGggZD0iTTAsNjQuNDU2NTU5OSBDMC4xMjM1MTM4MDIsOTUuNTExNDU4OCAyNS40MDg1NTM2LDEyMC45Mzc2NTcgNTYuNDgxMDk3MywxMjAuOTM3NjU3IEM4Ny42NTA2ODc1LDEyMC44OTg4MzkgMTEyLjkxMjc4OSw5NS42NDU1NTk1IDExMi45NjIxOTUsNjQuNDc0MjA0OCBMMTEyLjk2MjE5NSw1Ni40NjM0NTI1IEMxMTMuMDUzOTQ4LDM4LjUzNDU0MTggMTMyLjUyMTQ4NywyNy40Mjg4ODY1IDE0OC4wMDMwNiwzNi40NzUzOTAzIEMxNTAuMzgzMzQ4LDM3Ljg2NTgwMjggMTUyLjQ5ODk2MywzOS42NjkxMDQzIDE1NC4yNTEwOTQsNDEuODAwNTk5NiBMMTkwLjc3NTg5LDQxLjgwMDU5OTYgQzE4NC4xMDI2MTYsMTcuMTU0MzAyNyAxNjEuNzUxOTExLDAuMDI5OTk2MjA5MSAxMzYuMjE4MDc5LDAgQzEwNS4wNDY3MjQsMC4wNDk0MDU1MjA5IDc5Ljc5MzQ0NTIsMjUuMzExNTA3IDc5Ljc1NDYyNjYsNTYuNDgxMDk3MyBMNzkuNzU0NjI2Niw2NC40NTY1NTk5IEM3OS43MzUyMTczLDc3LjMwNzI4ODggNjkuMzEyNDE2OSw4Ny43MTI0NDQ0IDU2LjQ2MzQ1MjUsODcuNzEyNDQ0NCBDNDMuNjI2ODM5NCw4Ny42OTMwMzUxIDMzLjIyNjk3NzMsNzcuMjkzMTczIDMzLjIwNzU2OCw2NC40NTY1NTk5IEMzMy4yMDc1NjgsNjAuNzgyOTA2NiAzMC4yMjkxMjA5LDU3LjgwNDQ1OTUgMjYuNTU1NDY3NSw1Ny44MDQ0NTk1IEw2LjYzNDQ1NTY2LDU3LjgwNDQ1OTUgQzIuOTY2MDk1NzQsNTcuODE1MDQ2NCAwLDYwLjc4OTk2NDUgMCw2NC40NTY1NTk5IFogTTIxNi4xMzE1MDksMTIwLjkzNzY1NyBDMTkwLjYyNTkwOSwxMjAuODQyMzc1IDE2OC4zMjI4NDUsMTAzLjczMDQyIDE2MS42MjY2MzMsNzkuMTE5NDEyOCBMMTk4LjA5ODQ5NCw3OS4xMTk0MTI4IEMyMDkuMzI1ODk5LDkzLjAyODgzMTQgMjMxLjM5OTU4LDg5LjU2ODY4MDQgMjM3LjgzMTEyLDcyLjg5MDc4ODIgQzIzOC44NjY4NzEsNzAuMjA1MjQ1MiAyMzkuMzk0NDUyLDY3LjM1MjA3NjQgMjM5LjM4NzM5NCw2NC40NzQyMDQ4IEwyMzkuMzg3Mzk0LDU2LjQ2MzQ1MjUgQzIzOS40MzUwMzUsMjUuMjkzODYyMiAyNjQuNjk3MTM2LDAuMDM4ODE4NjIzNiAyOTUuODY4NDkxLDAgQzMyNi42MjM0MjgsMCAzNTEuNjk2NzMsMjQuNzAyNzYwNSAzNTIuMzMxOTQzLDU1LjI4MTI0ODkgTDM1Mi41MDgzOTIsNjQuNDU2NTU5OSBDMzUyLjYwMDE0NSw4Mi4zODcyMzUxIDM3Mi4wNjc2ODQsOTMuNDkxMTI1OSAzODcuNTQ5MjU3LDg0LjQ0NjM4NjYgQzM4OS45Mjk1NDUsODMuMDU1OTc0MSAzOTIuMDQ1MTYsODEuMjUwOTA4MSAzOTMuNzk3MjkxLDc5LjExOTQxMjggTDQzMC4zMjIwODcsNzkuMTE5NDEyOCBDNDIzLjY1NzYzNSwxMDMuNzY3NDc0IDQwMS4zMTM5ODgsMTIwLjkwMDYwMyAzNzUuNzgxOTIxLDEyMC45Mzc2NTcgQzM0NC43MDkzNzcsMTIwLjkzNzY1NyAzMTkuNDI0MzM3LDk1LjQ5MzgxNCAzMTkuMzAwODI0LDY0LjQ3NDIwNDggTDMxOS4xMjQzNzUsNTYuMTgxMTM1MiBMMzE5LjEyNDM3NSw1NS44MjgyMzg2IEMzMTguNzUyMDY5LDQzLjI0OTI0MDEgMzA4LjQ1Mjc4MywzMy4yMzkzMjg3IDI5NS44Njg0OTEsMzMuMjI1MjEyOCBDMjgzLjAzMTg3OCwzMy4yNDQ2MjIxIDI3Mi42MzIwMTYsNDMuNjQ2MjQ4OCAyNzIuNjEyNjA2LDU2LjQ4MTA5NzMgTDI3Mi42MTI2MDYsNjQuNDU2NTU5OSBDMjcyLjU3Mzc4OCw5NS42MzQ5NzI2IDI0Ny4zMDgxNTcsMTIwLjg5ODgzOSAyMTYuMTMxNTA5LDEyMC45Mzc2NTcgWiBNNDM3LjQ4NTg4OCw0MS44MTgyNDQ1IEM0NDguNzEzMjkyLDI3LjkxMDU5MDMgNDcwLjc4Njk3MywzMS4zNzA3NDEzIDQ3Ny4yMTg1MTMsNDguMDQ4NjMzNiBDNDc4LjI1NjAyOSw1MC43Mzk0NyA0NzguNzgzNjEsNTMuNTk3OTMyMiA0NzguNzc0Nzg3LDU2LjQ4MTA5NzMgQzQ3OC43NzQ3ODcsNjAuMTU2NTE1MSA0ODEuNzUzMjM0LDYzLjEzMzE5NzggNDg1LjQyNjg4OCw2My4xMzMxOTc4IEw1MDUuMzY1NTQ0LDYzLjEzMzE5NzggQzUwOS4wMzIxNCw2My4xMjQzNzU0IDUxMiw2MC4xNDk0NTcyIDUxMiw1Ni40ODEwOTczIEM1MTEuOTYxMTgxLDI1LjMwNDQ0OTEgNDg2LjY5NTU1MSwwLjAzODgxODYyMzYgNDU1LjUxODkwMywwIEM0MjkuOTc5Nzc3LDAuMDMxNzYwNjkyIDQwNy42MjU1NDQsMTcuMTY0ODg5NSA0MDAuOTYxMDkyLDQxLjgxODI0NDUgTDQzNy40ODU4ODgsNDEuODE4MjQ0NSBaIiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPgo=) ![Emotion](https://img.shields.io/badge/Emotion-C43BAD?style=flat) |
|   백엔드   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 <img src="https://img.shields.io/badge/Flask-white?style=for-the-badge&logo=Flask&logoColor=black"> <img src="https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=Pytest&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/Elastic-005571?style=for-the-badge&logo=Elastic&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|    배포    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"> <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=NGINX&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

<br/>
<br/>

> ## 06 Contributors

<br/>

|                                                                    이름                                                                    |   포지션   | 담당                                     |
| :----------------------------------------------------------------------------------------------------------------------------------------: | :--------: | ---------------------------------------- |
| 권강훈<br /><img width="100px" src="https://avatars.githubusercontent.com/u/72805356?v=4" /><br />[@kanghunK](https://github.com/kanghunK) | 프론트엔드 | 렌더링 페이지 구현 및 레이아웃 css 작성  |
|   서정현<br /><img width="100px" src="https://avatars.githubusercontent.com/u/77044696?v=4" /><br />[@Nliker](https://github.com/Nliker)   |   백엔드   | 기능 관련 api 구현, db 작성, 서비스 배포 |

<br/>
