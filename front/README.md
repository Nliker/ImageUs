<h1>Frontend</h1>

<h4 align="left">

- [Requirements](#requirements)
- [Installation](#installation)
- [주요 기능](#주요-기능)
- [디렉토리 구조](#디렉토리-구조)

</h4>

<br><br>

> ## Requirements

<br>

- [Node.js](https://nodejs.org)

<br><br>

> ## Installation

<br>

#### 레포지토리 클론

<br>

```bash
$ git clone https://github.com/kanghunK/ImageUs.git
```

<br>

#### 패키지 설치 및 개발 모드 실행

<br>

```bash
# ImageUs/front 경로 접속
$ cd ImageUs/front

# 패키지 설치
$ npm install

# webpack dev server 실행
$ npm run dev

# 이후 http://localhost:3090 접속
```

<br>

---

<br>

> ## 주요 기능

<br>

- #### &nbsp;&nbsp; 개인 저장소에 이미지 파일 저장 기능

- #### &nbsp;&nbsp; 이미지를 공유할 그룹(방)을 생성 기능

- #### &nbsp;&nbsp; 업로드한 이미지를 시간별로 조회 기능

- #### &nbsp;&nbsp; 선택한 이미지 다운로드 기능

<br>

> ## 디렉토리 구조

<br>

```bash
📦front
 ┣ 📂assets                : 이미지 관련 폴더
 ┃   ┗ 📂image
 ┣ 📂components            : 공통적으로 쓰이는 컴포넌트 폴더
 ┃   ┣ 📂Modal
 ┃   ┃   ┣ 📂AlertBoxModal
 ┃   ┃   ┣ 📂CreateRoomModal
 ┃   ┃   ┣ 📂DetailPictureModal
 ┃   ┃   ┣ 📂InviteMemberModal
 ┃   ┃   ┣ 📂ModalLayout
 ┃   ┃   ┗ 📂UploadModal
 ┃   ┣ 📂NavigationBar
 ┃   ┣ 📂SideBar
 ┃   ┃   ┣ 📂ChannelList
 ┃   ┃   ┣ 📂CollapseListBox
 ┃   ┃   ┗ 📂MemberList
 ┃   ┗ 📂UserFormBox
 ┣ 📂hooks
 ┃    ┣ 📜throttle.ts
 ┃    ┣ 📜useInput.ts
 ┃    ┗ 📜useIntersect.ts
 ┣ 📂layouts
 ┃   ┣ 📂App                : 라우팅 관련 폴더
 ┃   ┃   ┣ 📜index.tsx
 ┃   ┃   ┣ 📜PrivateRoute.tsx
 ┃   ┃   ┗ 📜PublicRoute.tsx
 ┃   ┗ 📂AppLayout
 ┣ 📂pages                  : 페이지 컴포넌트 폴더
 ┃   ┣ 📂ImageRoom
 ┃   ┃   ┗ 📂Components
 ┃   ┃     ┣ 📂ContentSection
 ┃   ┃     ┣ 📂ImageContent
 ┃   ┃     ┗ 📂ImageContentList
 ┃   ┣ 📂LogIn
 ┃   ┣ 📂MainPage
 ┃   ┣ 📂MyPage
 ┃   ┃   ┗ 📂Components
 ┃   ┃       ┣ 📂MyPictures
 ┃   ┃       ┗ 📂MyProfile
 ┃   ┣ 📂PeopleManagement
 ┃   ┃   ┗ 📂Components
 ┃   ┃       ┣ 📂FriendList
 ┃   ┃       ┗ 📂SearchBox
 ┃   ┣ 📂SignUp
 ┃   ┗ 📂SocialLogInAuth
 ┣ 📂styles                : 공통으로 사용되는 UI 컴포넌트
 ┃   ┣ 📂ActiveButton
 ┃   ┣ 📂Button
 ┃   ┗ 📂Spinner
 ┣ 📂typings               : 타입 폴더
 ┃   ┣ 📜client.ts
 ┃   ┗ 📜db.ts
 ┣ 📂utils                 : swr fetcher 파일 폴더
 ┃   ┣ 📜getToken.ts
 ┃   ┣ 📜imageFetcher.ts
 ┃   ┣ 📜logInFetcher.ts
 ┃   ┣ 📜roomDataFetcher.ts
 ┃   ┣ 📜searchFetcher.ts
 ┃   ┗ 📜userDataFetcher.ts
 ┣ 📜.eslintrc
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜client.tsx            : 개발, 배포 모드에 따라 app.js를 index.html에 보여줌
 ┣ 📜index.html            : 모든 페이지가 렌더링되며 보여질 html 파일
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.eslint.json
 ┣ 📜tsconfig.json
 ┗ 📜webpack.config.ts


```
