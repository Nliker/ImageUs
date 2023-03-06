# insta_cloud
개인의 이미지를 저장하고 공유 할 수 있는 서비스입니다.

#지식
### 1.left join 시 왼쪽의 필터링을 먼저 해도 결국엔 무시된다.
### 2.join 으로 나운 결과물은 자동으로 오름차순 정렬된다.

기능
### 1. 유저 회원가입
### 2. 친구
### 3. 사진 업로드
### 4. 방 생성
### 5. 선택적 사진 공유
### 6. 앨범 단위(추후 완성)
### 7. 방장이 방을 나갈시에 방장 바꾸기
### 8. 친구 검색 서버 구축
### 9. 이미지 서버 구축

추가기능
### 0.이미지 삭제 시 14일 유효기간 기능
### 1.유저삭제
### 2.유저 프로파일 이미지 업로드
### 3.이미지 서버 구축
### 4.소셜로그인
### 5.이메일 인증

## ERD
## database 
### insta_cloud
## table

1. users
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `profile` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `type` varchar(255) NOT NULL DEFAULT 'image_us',
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) 


2. users_friend_list
CREATE TABLE `users_friend_list` (
  `user_id` int NOT NULL,
  `friend_user_id` int NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`friend_user_id`)
)

3. images
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(300) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `public` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
)

4. rooms
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(300) NOT NULL,
  `host_user_id` int NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) 

5. rooms_user_list
CREATE TABLE `rooms_user_list` (
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`room_id`,`user_id`),
  KEY `user_id` (`user_id`)
)


6. images_room_list
CREATE TABLE `images_room_list` (
  `image_id` int NOT NULL,
  `room_id` int NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`image_id`,`room_id`),
  KEY `room_id` (`room_id`)
)

7. email_auth
CREATE TABLE `email_auth` (
  `email` varchar(255) NOT NULL,
  `auth_password` varchar(4) NOT NULL,
  `activated` int NOT NULL DEFAULT '0',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`email`)
)

8. rooms_user_history
CREATE TABLE `rooms_user_history` (
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `last_unread_row` int NOT NULL DEFAULT '0',
  `read_start_row` int NOT NULL DEFAULT '-1',
  `marker_row` int NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`room_id`,`user_id`)
) 

9.users_refresh_token_auth
CREATE TABLE `users_token_auth` (
  `user_id` int NOT NULL,
  `refresh_token_secret_key` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
)