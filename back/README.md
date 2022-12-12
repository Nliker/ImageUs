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
  `deleted` boolean not null DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
)

2. users_friend_list
CREATE TABLE `users_friend_list` (
  `user_id` int NOT NULL,
  `friend_user_id` int NOT NULL,
  `deleted` boolean not null DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`user_id`,`friend_id`)
)

3. images
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(300) NOT NULL,
  `user_id` int NOT NULL,
  `deleted` boolean not null DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id`)
)
=>유저의 이미지 조회시 인덱스 따로 필요

4. rooms
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(300) NOT NULL,
  `host_user_id` int NOT NULL,
  `deleted` boolean not null DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

5. rooms_user_list
CREATE TABLE `rooms_user_list` (
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `deleted` boolean not null DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`room_id`,`user_id`),
  INDEX `user_id` (`user_id`)
)
=>방의 유저 조회(pri가 room_id하나에도 적용되기 때문에 인덱스 추가 x)
=>유저의 방 조회시 인덱스 따로 필요


6. images_room_list
CREATE TABLE `images_room_list` (
  `image_id` int NOT NULL,
  `room_id` int NOT NULL,
  `deleted` boolean not null DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT, 
  `public` int not null default 0,
  CURRENT_TIMESTAMP,
  PRIMARY KEY(`image_id`,`room_id`),
  INDEX `room_id` (`room_id`)
)
=>이미지의 방 조회(pri가 image_id하나에도 적용되기 때문에 인덱스 추가 x)
=>방에서 이미지 조회시 인덱스 따로 필요

7. email_auth
CREATE TABLE `email_auth` (
  `email` varchar(255) NOT NULL,
  `auth_password` int NOT NULL,
  `activated` int NOT NULL default 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`email`)
)

<!-- 아래는 추후 완성 기능 -->
<!-- 7. albums
CREATE TABLE `albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(300) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `albums_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)

8. albums_image_list
CREATE TABLE `albums` (
  `album_id` int NOT NULL,
  `image_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`album_id`,`image_id`),
  CONSTRAINT `albums_album_id_fkey` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`),
  CONSTRAINT `albums_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`)
) -->