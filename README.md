# insta_cloud
개인의 이미지를 저장하고 공유 할 수 있는 서비스입니다.

기능
### 1. 유저 회원가입
### 2. 친구
### 3. 사진 업로드
### 4. 방 생성
### 5. 선택적 사진 공유
### 6. 앨범 단위(추후 완성)

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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
)

2. friends
CREATE TABLE `friends` (
  `user_id` int NOT NULL,
  `friend_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`user_id`,`friend_id`),
  CONSTRAINT `friends_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `friends_friend_id_fkey` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`),
)

3. images
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(300) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `images_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)

4. rooms
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(300) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

5. rooms_user_list
CREATE TABLE `rooms_user_list` (
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`room_id`,`user_id`),
  CONSTRAINT `rooms_user_list_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`),
  CONSTRAINT `rooms_user_list_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
)


6. images_room_list
CREATE TABLE `images_room_list` (
  `image_id` int NOT NULL,
  `room_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`,`room_id`),
  CONSTRAINT `images_room_list_image_id_fkey` FOREIGN KEY (`images_id`) REFERENCES `images` (`id`),
  CONSTRAINT `images_room_list_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`)
)

7. albums
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
)