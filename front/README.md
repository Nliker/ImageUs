<h1 align="center">Frontend 소개</h1>

<h4 align="left">

- [Requirements](#Requirements)

- [Installation](#Installation)

- [화면 구성](#화면구성)

- [주요기능](#주요기능)

- [디렉토리 구조](#디렉토리구조)

</h4>

## ⚡ Requirements

- [npm 8.15.0](https://www.npmjs.com/package/npm/v/8.15.0)

## 🛠️ Installation

#### Clone the repository

```bash
$ git clone https://github.com/kanghunK/ImageUs.git
```

```
$ cd front
$ nvm use v16.17.0
$ npm install
$ npm run dev
```

---

> ## 화면 구성

> ## 주요 기능

### &nasp;&nasp;&nasp;⭐ 개인 저장소에 이미지 파일 저장 기능

### &nasp;&nasp;&nasp;⭐ 이미지를 공유할 그룹(방)을 생성 기능

### &nasp;&nasp;&nasp;⭐ 업로드한 이미지를 시간별로 조회 기능

### &nasp;&nasp;&nasp;⭐ 선택한 이미지 다운로드 기능

###

## 📦 디렉토리 구조

```bash
📦front
 ┣ 📂assets
 ┃ ┣ 📂image
 ┃ ┗ 📜main_background_img.png
 ┣ 📂components
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📂AlertBoxModal
 ┃ ┃ ┣ 📂CreateRoomModal
 ┃ ┃ ┣ 📂DetailPictureModal
 ┃ ┃ ┣ 📂InviteMemberModal
 ┃ ┃ ┣ 📂ModalLayout
 ┃ ┃ ┣ 📂UploadModal
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┃ ┣ 📂NavigationBar
 ┃ ┣ 📂SideBar
 ┃ ┃ ┣ 📂ChannelList
 ┃ ┃ ┣ 📂CollapseListBox
 ┃ ┃ ┣ 📂MemberList
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┃ ┗ 📂UserFormBox
 ┣ 📂hooks
 ┃ ┣ 📜throttle.ts
 ┃ ┣ 📜useInput.ts
 ┃ ┗ 📜useIntersect.ts
 ┣ 📂layouts
 ┃ ┣ 📂App
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜PrivateRoute.tsx
 ┃ ┃ ┗ 📜PublicRoute.tsx
 ┃ ┗ 📂AppLayout
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┣ 📂pages
 ┃ ┣ 📂ImageRoom
 ┃ ┃ ┣ 📂Components
 ┃ ┃ ┃ ┣ 📂ContentSection
 ┃ ┃ ┃ ┣ 📂ImageContent
 ┃ ┃ ┃ ┗ 📂ImageContentList
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┃ ┣ 📂LogIn
 ┃ ┣ 📂MainPage
 ┃ ┣ 📂MyPage
 ┃ ┃ ┣ 📂Components
 ┃ ┃ ┃ ┣ 📂MyPictures
 ┃ ┃ ┃ ┗ 📂MyProfile
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┃ ┣ 📂PeopleManagement
 ┃ ┃ ┣ 📂Components
 ┃ ┃ ┃ ┣ 📂FriendList
 ┃ ┃ ┃ ┗ 📂SearchBox
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.tsx
 ┃ ┣ 📂SignUp
 ┃ ┗ 📂SocialLogInAuth
 ┣ 📂styles
 ┃ ┣ 📂ActiveButton
 ┃ ┣ 📂Button
 ┃ ┗ 📂Spinner
 ┣ 📂typings
 ┃ ┣ 📜client.ts
 ┃ ┗ 📜db.ts
 ┣ 📂utils
 ┃ ┣ 📜getToken.ts
 ┃ ┣ 📜imageFetcher.ts
 ┃ ┣ 📜logInFetcher.ts
 ┃ ┣ 📜roomDataFetcher.ts
 ┃ ┣ 📜searchFetcher.ts
 ┃ ┗ 📜userDataFetcher.ts
 ┣ 📜.eslintrc
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜client.tsx
 ┣ 📜index.html
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.eslint.json
 ┣ 📜tsconfig.json
 ┗ 📜webpack.config.ts

```
