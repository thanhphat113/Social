-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 12, 2024 lúc 04:16 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `SocialMedia`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chat_in_group`
--

CREATE TABLE `chat_in_group` (
  `chat_id` int(11) NOT NULL,
  `from_user` int(11) NOT NULL,
  `group_chat_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chat_in_message`
--

CREATE TABLE `chat_in_message` (
  `chat_id` int(11) NOT NULL,
  `messages_id` int(11) DEFAULT NULL,
  `from_user` int(11) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `date_created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `child_of` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `group_chats`
--

CREATE TABLE `group_chats` (
  `group_chat_id` int(11) NOT NULL,
  `group_chat_name` varchar(255) NOT NULL,
  `cover_photo` varchar(255) DEFAULT NULL,
  `main_topic` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `history_search`
--

CREATE TABLE `history_search` (
  `history_id` int(11) NOT NULL,
  `other_user` int(11) DEFAULT NULL,
  `from_user` int(11) DEFAULT NULL,
  `date_search` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `main_topic`
--

CREATE TABLE `main_topic` (
  `topic_id` int(11) NOT NULL,
  `topic_name` varchar(255) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `media`
--

CREATE TABLE `media` (
  `media_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `src` varchar(255) NOT NULL,
  `media_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages`
--

CREATE TABLE `messages` (
  `messages_id` int(11) NOT NULL,
  `user_1` int(11) DEFAULT NULL,
  `user_2` int(11) DEFAULT NULL,
  `main_topic` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `privacy_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `created_by_user_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post_media`
--

CREATE TABLE `post_media` (
  `post_id` int(11) NOT NULL,
  `media_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post_notifications`
--

CREATE TABLE `post_notifications` (
  `post_notification_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `from_user_id` int(11) NOT NULL,
  `type_id` tinyint(1) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post_notification_to_user`
--

CREATE TABLE `post_notification_to_user` (
  `to_user_id` int(11) NOT NULL,
  `post_notification_id` int(11) NOT NULL,
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `privacy_settings`
--

CREATE TABLE `privacy_settings` (
  `privacy_id` int(11) NOT NULL,
  `privacy_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reacts_comment`
--

CREATE TABLE `reacts_comment` (
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reacts_post`
--

CREATE TABLE `reacts_post` (
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `read_message`
--

CREATE TABLE `read_message` (
  `messages_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `relationship`
--

CREATE TABLE `relationship` (
  `relationship_id` int(11) NOT NULL,
  `type_relationship` int(1) DEFAULT 0,
  `from_user_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `request_notifications`
--

CREATE TABLE `request_notifications` (
  `notification_id` int(11) NOT NULL,
  `from_user_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `share_posts`
--

CREATE TABLE `share_posts` (
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `date_share` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `type_media`
--

CREATE TABLE `type_media` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `type_post_notifications`
--

CREATE TABLE `type_post_notifications` (
  `type_id` tinyint(1) NOT NULL,
  `type_name` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `type_post_notifications`
--

INSERT INTO `type_post_notifications` (`type_id`, `type_name`, `content`) VALUES
(1, 'newpost', 'vừa tạo một bài viết mới'),
(2, 'sharepost', 'vừa chia sẻ bài viết của bạn'),
(3, 'reactpost', 'vừa thả cảm xúc vào bài viết của bạn');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `type_relationship`
--

CREATE TABLE `type_relationship` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `profile_picture` int(11) DEFAULT NULL,
  `cover_photo` int(11) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `bio`, `location`, `profile_picture`, `cover_photo`, `date_created`, `date_updated`) VALUES
(1, 'Ly', 'Phat', 'thanhphat9523@gmail.com', '123', NULL, 'HCM city', NULL, NULL, '2024-10-11 03:21:07', '2024-10-11 03:21:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_groups`
--

CREATE TABLE `user_groups` (
  `group_id` int(11) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `member_count` int(11) DEFAULT 0,
  `cover_photo` varchar(255) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by_user_id` int(11) NOT NULL,
  `privacy_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_in_group`
--

CREATE TABLE `user_in_group` (
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `date_in` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_in_group_chat`
--

CREATE TABLE `user_in_group_chat` (
  `user_id` int(11) NOT NULL,
  `group_chat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_media`
--

CREATE TABLE `user_media` (
  `user_id` int(11) NOT NULL,
  `media_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `__EFMigrationsHistory`
--

CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chat_in_group`
--
ALTER TABLE `chat_in_group`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `fk_chat_in_group_user_id` (`from_user`),
  ADD KEY `fk_chat_in_group_group_chat_id` (`group_chat_id`);

--
-- Chỉ mục cho bảng `chat_in_message`
--
ALTER TABLE `chat_in_message`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `from_user` (`from_user`),
  ADD KEY `messages_id` (`messages_id`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `fk_comments_user_id` (`user_id`),
  ADD KEY `fk_comments_post_id` (`post_id`),
  ADD KEY `fk_child_of` (`child_of`);

--
-- Chỉ mục cho bảng `group_chats`
--
ALTER TABLE `group_chats`
  ADD PRIMARY KEY (`group_chat_id`),
  ADD KEY `fk_topic_group` (`main_topic`);

--
-- Chỉ mục cho bảng `history_search`
--
ALTER TABLE `history_search`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `other_user` (`other_user`),
  ADD KEY `from_user` (`from_user`);

--
-- Chỉ mục cho bảng `main_topic`
--
ALTER TABLE `main_topic`
  ADD PRIMARY KEY (`topic_id`);

--
-- Chỉ mục cho bảng `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`media_id`),
  ADD KEY `fk_media_post_id` (`post_id`),
  ADD KEY `fk_type_media` (`media_type`);

--
-- Chỉ mục cho bảng `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`messages_id`),
  ADD KEY `user_1` (`user_1`),
  ADD KEY `user_2` (`user_2`),
  ADD KEY `fk_topic_main` (`main_topic`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `idx_created_by_user_id_posts` (`created_by_user_id`),
  ADD KEY `fk_posts_privacy_id` (`privacy_id`),
  ADD KEY `fk_posts_group_id` (`group_id`);

--
-- Chỉ mục cho bảng `post_media`
--
ALTER TABLE `post_media`
  ADD KEY `fk_post` (`post_id`),
  ADD KEY `fk_media` (`media_id`);

--
-- Chỉ mục cho bảng `post_notifications`
--
ALTER TABLE `post_notifications`
  ADD PRIMARY KEY (`post_notification_id`),
  ADD KEY `fk_post_notifications_post_id` (`post_id`),
  ADD KEY `fk_post_notifications_from_user_id` (`from_user_id`),
  ADD KEY `fk_post_notifications_type` (`type_id`);

--
-- Chỉ mục cho bảng `post_notification_to_user`
--
ALTER TABLE `post_notification_to_user`
  ADD PRIMARY KEY (`to_user_id`,`post_notification_id`),
  ADD KEY `fk_post_notification_to_user_post_notification_id` (`post_notification_id`);

--
-- Chỉ mục cho bảng `privacy_settings`
--
ALTER TABLE `privacy_settings`
  ADD PRIMARY KEY (`privacy_id`);

--
-- Chỉ mục cho bảng `reacts_comment`
--
ALTER TABLE `reacts_comment`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_reacts_comment_comment_id` (`comment_id`);

--
-- Chỉ mục cho bảng `reacts_post`
--
ALTER TABLE `reacts_post`
  ADD KEY `fk_reacts_post_user_id` (`user_id`),
  ADD KEY `fk_reacts_post_post_id` (`post_id`);

--
-- Chỉ mục cho bảng `read_message`
--
ALTER TABLE `read_message`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `messages_id` (`messages_id`);

--
-- Chỉ mục cho bảng `relationship`
--
ALTER TABLE `relationship`
  ADD PRIMARY KEY (`relationship_id`),
  ADD UNIQUE KEY `from_user_id` (`from_user_id`,`to_user_id`),
  ADD KEY `fk_relationship_to_user_id` (`to_user_id`),
  ADD KEY `fk_type_relationship` (`type_relationship`);

--
-- Chỉ mục cho bảng `request_notifications`
--
ALTER TABLE `request_notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `fk_request_notifications_from_user_id` (`from_user_id`),
  ADD KEY `fk_request_notifications_to_user_id` (`to_user_id`);

--
-- Chỉ mục cho bảng `share_posts`
--
ALTER TABLE `share_posts`
  ADD PRIMARY KEY (`user_id`,`post_id`),
  ADD KEY `fk_share_posts_post_id` (`post_id`);

--
-- Chỉ mục cho bảng `type_media`
--
ALTER TABLE `type_media`
  ADD PRIMARY KEY (`type_id`);

--
-- Chỉ mục cho bảng `type_post_notifications`
--
ALTER TABLE `type_post_notifications`
  ADD PRIMARY KEY (`type_id`);

--
-- Chỉ mục cho bảng `type_relationship`
--
ALTER TABLE `type_relationship`
  ADD PRIMARY KEY (`type_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`email`),
  ADD KEY `idx_username` (`email`),
  ADD KEY `fk_profile` (`profile_picture`),
  ADD KEY `fk_cover` (`cover_photo`);

--
-- Chỉ mục cho bảng `user_groups`
--
ALTER TABLE `user_groups`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `idx_created_by_user_id` (`created_by_user_id`),
  ADD KEY `fk_user_groups_privacy_id` (`privacy_id`);

--
-- Chỉ mục cho bảng `user_in_group`
--
ALTER TABLE `user_in_group`
  ADD PRIMARY KEY (`user_id`,`group_id`),
  ADD KEY `fk_user_in_group_group_id` (`group_id`);

--
-- Chỉ mục cho bảng `user_in_group_chat`
--
ALTER TABLE `user_in_group_chat`
  ADD PRIMARY KEY (`user_id`,`group_chat_id`),
  ADD KEY `fk_user_in_group_chat_group_chat_id` (`group_chat_id`);

--
-- Chỉ mục cho bảng `user_media`
--
ALTER TABLE `user_media`
  ADD PRIMARY KEY (`user_id`,`media_id`),
  ADD KEY `fk_user_media_media_id` (`media_id`);

--
-- Chỉ mục cho bảng `__EFMigrationsHistory`
--
ALTER TABLE `__EFMigrationsHistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chat_in_group`
--
ALTER TABLE `chat_in_group`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `chat_in_message`
--
ALTER TABLE `chat_in_message`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `group_chats`
--
ALTER TABLE `group_chats`
  MODIFY `group_chat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `history_search`
--
ALTER TABLE `history_search`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `main_topic`
--
ALTER TABLE `main_topic`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `media`
--
ALTER TABLE `media`
  MODIFY `media_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `messages_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `post_notifications`
--
ALTER TABLE `post_notifications`
  MODIFY `post_notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `privacy_settings`
--
ALTER TABLE `privacy_settings`
  MODIFY `privacy_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `relationship`
--
ALTER TABLE `relationship`
  MODIFY `relationship_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `request_notifications`
--
ALTER TABLE `request_notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `type_media`
--
ALTER TABLE `type_media`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `type_relationship`
--
ALTER TABLE `type_relationship`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `user_groups`
--
ALTER TABLE `user_groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chat_in_group`
--
ALTER TABLE `chat_in_group`
  ADD CONSTRAINT `fk_chat_in_group_group_chat_id` FOREIGN KEY (`group_chat_id`) REFERENCES `group_chats` (`group_chat_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_group_user` FOREIGN KEY (`from_user`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `chat_in_message`
--
ALTER TABLE `chat_in_message`
  ADD CONSTRAINT `chat_in_message_ibfk_1` FOREIGN KEY (`from_user`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `chat_in_message_ibfk_2` FOREIGN KEY (`messages_id`) REFERENCES `messages` (`messages_id`);

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_child_of` FOREIGN KEY (`child_of`) REFERENCES `comments` (`comment_id`),
  ADD CONSTRAINT `fk_comments_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comments_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `group_chats`
--
ALTER TABLE `group_chats`
  ADD CONSTRAINT `fk_topic_group` FOREIGN KEY (`main_topic`) REFERENCES `main_topic` (`topic_id`);

--
-- Các ràng buộc cho bảng `history_search`
--
ALTER TABLE `history_search`
  ADD CONSTRAINT `history_search_ibfk_1` FOREIGN KEY (`other_user`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `history_search_ibfk_2` FOREIGN KEY (`from_user`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `fk_media_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_type_media` FOREIGN KEY (`media_type`) REFERENCES `type_media` (`type_id`);

--
-- Các ràng buộc cho bảng `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_topic_main` FOREIGN KEY (`main_topic`) REFERENCES `main_topic` (`topic_id`),
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_1`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`user_2`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_created_by_user_id` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_posts_group_id` FOREIGN KEY (`group_id`) REFERENCES `user_groups` (`group_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_posts_privacy_id` FOREIGN KEY (`privacy_id`) REFERENCES `privacy_settings` (`privacy_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `post_media`
--
ALTER TABLE `post_media`
  ADD CONSTRAINT `fk_media` FOREIGN KEY (`media_id`) REFERENCES `media` (`media_id`),
  ADD CONSTRAINT `fk_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

--
-- Các ràng buộc cho bảng `post_notifications`
--
ALTER TABLE `post_notifications`
  ADD CONSTRAINT `fk_post_notifications_from_user_id` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_post_notifications_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_post_notifications_type` FOREIGN KEY (`type_id`) REFERENCES `type_post_notifications` (`type_id`);

--
-- Các ràng buộc cho bảng `post_notification_to_user`
--
ALTER TABLE `post_notification_to_user`
  ADD CONSTRAINT `fk_post_notification_to_user_post_notification_id` FOREIGN KEY (`post_notification_id`) REFERENCES `post_notifications` (`post_notification_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_post_notification_to_user_to_user_id` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `reacts_comment`
--
ALTER TABLE `reacts_comment`
  ADD CONSTRAINT `fk_reacts_comment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_cloud` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `reacts_post`
--
ALTER TABLE `reacts_post`
  ADD CONSTRAINT `fk_reacts_post_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reacts_post_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `read_message`
--
ALTER TABLE `read_message`
  ADD CONSTRAINT `read_message_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `read_message_ibfk_2` FOREIGN KEY (`messages_id`) REFERENCES `messages` (`messages_id`);

--
-- Các ràng buộc cho bảng `relationship`
--
ALTER TABLE `relationship`
  ADD CONSTRAINT `fk_relationship_from_user_id` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_relationship_to_user_id` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_type_relationship` FOREIGN KEY (`type_relationship`) REFERENCES `type_relationship` (`type_id`);

--
-- Các ràng buộc cho bảng `request_notifications`
--
ALTER TABLE `request_notifications`
  ADD CONSTRAINT `fk_request_notifications_from_user_id` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_request_notifications_to_user_id` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `share_posts`
--
ALTER TABLE `share_posts`
  ADD CONSTRAINT `fk_share_posts_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_share_posts_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_cover` FOREIGN KEY (`cover_photo`) REFERENCES `media` (`media_id`),
  ADD CONSTRAINT `fk_profile` FOREIGN KEY (`profile_picture`) REFERENCES `media` (`media_id`);

--
-- Các ràng buộc cho bảng `user_groups`
--
ALTER TABLE `user_groups`
  ADD CONSTRAINT `fk_user_groups_created_by_user_id` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_groups_privacy_id` FOREIGN KEY (`privacy_id`) REFERENCES `privacy_settings` (`privacy_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `user_in_group`
--
ALTER TABLE `user_in_group`
  ADD CONSTRAINT `fk_user_in_group_group_id` FOREIGN KEY (`group_id`) REFERENCES `user_groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_in_group_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `user_in_group_chat`
--
ALTER TABLE `user_in_group_chat`
  ADD CONSTRAINT `fk_user_in_group_chat_group_chat_id` FOREIGN KEY (`group_chat_id`) REFERENCES `group_chats` (`group_chat_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_in_group_chat_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `user_media`
--
ALTER TABLE `user_media`
  ADD CONSTRAINT `fk_user_media_media_id` FOREIGN KEY (`media_id`) REFERENCES `media` (`media_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_media_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
