-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 09, 2024 lúc 10:48 AM
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

--
-- Đang đổ dữ liệu cho bảng `chat_in_group`
--

INSERT INTO `chat_in_group` (`chat_id`, `from_user`, `group_chat_id`, `content`, `date_created`) VALUES
(1, 13, 2, 'Chào mọi người nhaaa', '2024-11-09 09:00:52');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chat_in_message`
--

CREATE TABLE `chat_in_message` (
  `chat_id` int(11) NOT NULL,
  `messages_id` int(11) DEFAULT NULL,
  `from_user` int(11) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `is_recall` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chat_in_message`
--

INSERT INTO `chat_in_message` (`chat_id`, `messages_id`, `from_user`, `content`, `date_created`, `is_read`, `is_recall`) VALUES
(8, 1, 7, 'thanh123', '2024-10-24 16:40:34', 0, 0),
(14, 1, 7, '15', '2024-10-24 16:55:25', 0, 0),
(16, 1, 7, 'em ơi', '2024-10-24 16:55:44', 0, 0),
(17, 1, 7, 'em à', '2024-10-24 16:58:59', 0, 0),
(18, 1, 7, 'em ơi', '2024-10-24 16:59:18', 0, 0),
(19, 2, 7, 'Xin chàooo', '2024-10-25 07:36:40', 0, 0),
(20, 2, 7, 'Mày muốn gì', '2024-10-24 17:00:20', 0, 0),
(21, 1, 7, 'Elmmmm ơiiiiiii', '2024-10-24 17:00:34', 0, 1),
(22, 2, 7, 'Xin chèo nhé', '2024-10-24 17:59:03', 0, 0),
(24, 1, 7, 'a', '2024-10-25 06:29:59', 0, 0),
(25, 2, 7, 'ádđ', '2024-10-25 06:30:12', 0, 0),
(26, 1, 7, 'alooo', '2024-10-25 06:38:42', 0, 0),
(27, 2, 5, 'chàooooo', '2024-10-25 07:38:51', 0, 0),
(28, 2, 7, 'ádsad', '2024-10-29 06:38:22', 0, 0),
(29, 2, 7, 'Chúng ta là lũ quỷ', '2024-11-02 15:17:59', 0, 0),
(30, 1, 7, 'hehe', '2024-11-08 13:19:20', 0, 0),
(31, 2, 7, '4', '2024-11-08 14:58:07', 0, 0),
(32, 2, 7, '1', '2024-11-08 15:01:10', 0, 0),
(33, 1, 7, 'hello', '2024-11-08 15:34:08', 0, 1),
(39, 18, 7, '15', '2024-11-08 16:04:21', 1, 0),
(43, 21, 7, 'chàoooo', '2024-11-08 16:35:51', 0, 0),
(44, 1, 7, 'Chào bạn', '2024-11-08 16:38:03', 0, 0),
(45, 21, 7, 'Hé lu nhaaaa', '2024-11-08 16:44:06', 0, 0),
(46, 1, 7, 'hehe', '2024-11-09 06:53:06', 0, 0),
(47, 21, 7, 'chàoooooo', '2024-11-09 06:54:17', 0, 0);

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
-- Cấu trúc bảng cho bảng `gender_type`
--

CREATE TABLE `gender_type` (
  `gender_id` int(1) NOT NULL,
  `gender_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `gender_type`
--

INSERT INTO `gender_type` (`gender_id`, `gender_name`) VALUES
(0, 'Không cung cấp'),
(1, 'Nam'),
(2, 'Nữ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `group_chats`
--

CREATE TABLE `group_chats` (
  `group_chat_id` int(11) NOT NULL,
  `group_chat_name` varchar(255) DEFAULT NULL,
  `cover_photo` varchar(255) DEFAULT NULL,
  `main_topic` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `group_chats`
--

INSERT INTO `group_chats` (`group_chat_id`, `group_chat_name`, `cover_photo`, `main_topic`) VALUES
(1, NULL, NULL, 1),
(2, 'Anh em cây khế', NULL, 1),
(3, NULL, NULL, 1),
(4, 'Trùm sài gòn', NULL, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `history_search`
--

CREATE TABLE `history_search` (
  `history_id` int(11) NOT NULL,
  `from_user` int(11) DEFAULT NULL,
  `other_user` int(11) DEFAULT NULL,
  `date_search` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `history_search`
--

INSERT INTO `history_search` (`history_id`, `from_user`, `other_user`, `date_search`) VALUES
(16, 7, 12, '2024-11-07 14:33:52'),
(17, 7, 2, '2024-11-07 14:16:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `main_topic`
--

CREATE TABLE `main_topic` (
  `topic_id` int(11) NOT NULL,
  `topic_name` varchar(255) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `main_topic`
--

INSERT INTO `main_topic` (`topic_id`, `topic_name`, `color`) VALUES
(1, 'Mặc định', '#4586d6'),
(2, 'Tình yêu', '#F0C5D5'),
(3, 'Cây cối', '#8FD9C4');

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

--
-- Đang đổ dữ liệu cho bảng `messages`
--

INSERT INTO `messages` (`messages_id`, `user_1`, `user_2`, `main_topic`) VALUES
(1, 7, 2, 1),
(2, 7, 5, 1),
(18, 7, 12, 1),
(21, 7, 8, 1);

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

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`post_id`, `content`, `privacy_id`, `group_id`, `created_by_user_id`, `date_created`, `date_updated`) VALUES
(3, 'xin chào', 1, NULL, 7, '2024-11-06 02:18:37', '2024-11-06 02:18:37'),
(4, 'Húle', 1, NULL, 7, '2024-11-06 02:18:37', '2024-11-06 02:18:37');

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
  `type_id` int(11) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `post_notifications`
--

INSERT INTO `post_notifications` (`post_notification_id`, `post_id`, `from_user_id`, `type_id`, `date_created`, `is_read`) VALUES
(2, 3, 2, 3, '2024-11-06 02:22:58', 0),
(3, 4, 2, 2, '2024-11-06 02:22:58', 0),
(4, 4, 2, 4, '2024-11-06 02:22:58', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `privacy_settings`
--

CREATE TABLE `privacy_settings` (
  `privacy_id` int(11) NOT NULL,
  `privacy_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `privacy_settings`
--

INSERT INTO `privacy_settings` (`privacy_id`, `privacy_name`) VALUES
(1, 'Công khai'),
(2, 'Bạn bè'),
(3, 'Riêng tư');

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
  `messages_group_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `relationship`
--

CREATE TABLE `relationship` (
  `relationship_id` int(11) NOT NULL,
  `type_relationship` int(1) DEFAULT 1,
  `from_user_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `relationship`
--

INSERT INTO `relationship` (`relationship_id`, `type_relationship`, `from_user_id`, `to_user_id`, `date_created`) VALUES
(1, 2, 2, 7, '2024-10-16 13:37:15'),
(5, 2, 7, 5, '2024-10-24 06:55:34'),
(6, 2, 12, 7, '2024-11-06 07:48:50'),
(7, 2, 8, 7, '2024-11-06 08:06:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `request_notifications`
--

CREATE TABLE `request_notifications` (
  `notification_id` int(11) NOT NULL,
  `from_user_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `is_accept` tinyint(1) NOT NULL DEFAULT 0,
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
  `type_id` int(11) NOT NULL,
  `type_name` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `type_post_notifications`
--

INSERT INTO `type_post_notifications` (`type_id`, `type_name`, `content`) VALUES
(1, 'newpost', 'đã đăng một bài viết mới'),
(2, 'sharepost', 'đã chia sẻ một bài viết của bạn'),
(3, 'reactpost', 'đã thả cloud vào một bài viết của bạn'),
(4, 'comment', 'đã bình luận vào một bài viết của bạn'),
(5, 'likecomment', 'đã thả cloud cho một comment của bạn'),
(6, 'commentOnComment', 'đã trả lời bình luận của bạn');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `type_relationship`
--

CREATE TABLE `type_relationship` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `type_relationship`
--

INSERT INTO `type_relationship` (`type_id`, `type_name`) VALUES
(1, 'Người theo dõi'),
(2, 'Bạn bè');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender_id` int(1) DEFAULT 0,
  `bio` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `profile_picture` int(11) DEFAULT NULL,
  `cover_photo` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_online` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `gender_id`, `bio`, `location`, `profile_picture`, `cover_photo`, `email`, `password`, `date_created`, `date_updated`, `is_online`) VALUES
(2, 'Châu', 'Ngọc Quyên', 2, 'Tui là con mèo kêu meo meo', 'TP. Hồ Chí Minh', NULL, NULL, 'chauquyen1235@gmail.com', '123', '2024-10-16 13:31:25', '2024-10-24 10:01:29', 0),
(4, 'Nguyễn', 'Tâm', 0, 'Tui là cọng bún riêu', 'TP. Hồ Chí Minh', NULL, NULL, 'tamnguyen@gmail.com', '123', '2024-10-16 13:33:36', '2024-10-16 13:33:36', 0),
(5, 'Phạm', 'Danh', 0, 'Tui là cục cứt bò', 'TP. Hồ Chí Minh', NULL, NULL, 'danhpham123@gmail.com', '123', '2024-10-16 13:33:36', '2024-10-16 13:33:36', 0),
(6, 'thanh', 'Tung', 0, NULL, NULL, NULL, NULL, '123@gmail.com', 'AQAAAAIAAYagAAAAEJCi0V/pa0DV2BwPE2U2WLHe5Gbixjn0mtBOaRnhxjQ538N0pT5UOBlYnbsd7Jzl5w==', '2024-10-18 13:15:01', '2024-10-18 13:15:01', 0),
(7, 'Lâm', 'Dũng', 0, NULL, NULL, NULL, NULL, '15@gmail.com', 'AQAAAAIAAYagAAAAEOYjiubhy6sR49wGjul/RSJOElGbL+T1BHdWMr6O2ATWaJcZLKnm49DaFKrkKPvoKA==', '2024-10-18 13:18:33', '2024-10-18 13:18:33', 0),
(8, 'Lý', 'Tỏi', 0, NULL, NULL, NULL, NULL, 'toi@gmail.com', 'AQAAAAIAAYagAAAAEDjGeJtVt0ntEjKjsQMeQTpbaV/jNB0TwtC475t230xEhg85bW1MseevGlq/D+gNNQ==', '2024-10-18 13:32:41', '2024-10-18 13:32:41', 0),
(10, 'Tùng', 'Heo', 0, NULL, NULL, NULL, NULL, 'thanhtung@gmail.com', 'AQAAAAIAAYagAAAAEBIqogwoDD07RFh7d5XB0iO3XQfOiT4WLcH5jCQz53Ai5sqU2ebdhqaiWWRCChMEgg==', '2024-10-23 12:22:52', '2024-10-23 12:22:52', 0),
(12, 'Lý', 'Phát', 0, NULL, NULL, NULL, NULL, 'thanhphat9523@gmail.com', 'AQAAAAIAAYagAAAAENdJI7tGR/5QBSoCakofqb73ExGowB6S2NmoMd4WLB3h2OJ5SvCqhWCRoQ4wsVxR+Q==', '2024-11-04 06:00:34', '2024-11-04 06:00:34', 0),
(13, 'Long', 'Phát', NULL, NULL, NULL, NULL, NULL, 'thanhphat123@gmail.com', 'AQAAAAIAAYagAAAAENqVbI4WH5g9u/mt3XDcrdP10Q8apblxmlnq5g0Ln9JpCha0+9c84X7VEsY/0Fv0+w==', '2024-11-07 06:54:14', '2024-11-07 06:54:14', 0);

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

--
-- Đang đổ dữ liệu cho bảng `user_in_group_chat`
--

INSERT INTO `user_in_group_chat` (`user_id`, `group_chat_id`) VALUES
(2, 2),
(7, 1),
(7, 2),
(13, 1),
(13, 2);

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
-- Chỉ mục cho bảng `gender_type`
--
ALTER TABLE `gender_type`
  ADD PRIMARY KEY (`gender_id`);

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
  ADD KEY `read_message_ibfk_2` (`messages_group_id`);

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
  ADD KEY `fk_cover` (`cover_photo`),
  ADD KEY `fk_gender` (`gender_id`);

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
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `chat_in_message`
--
ALTER TABLE `chat_in_message`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `group_chats`
--
ALTER TABLE `group_chats`
  MODIFY `group_chat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `history_search`
--
ALTER TABLE `history_search`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `main_topic`
--
ALTER TABLE `main_topic`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `media`
--
ALTER TABLE `media`
  MODIFY `media_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `messages_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `post_notifications`
--
ALTER TABLE `post_notifications`
  MODIFY `post_notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `privacy_settings`
--
ALTER TABLE `privacy_settings`
  MODIFY `privacy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `relationship`
--
ALTER TABLE `relationship`
  MODIFY `relationship_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `request_notifications`
--
ALTER TABLE `request_notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `type_media`
--
ALTER TABLE `type_media`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `type_relationship`
--
ALTER TABLE `type_relationship`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
  ADD CONSTRAINT `read_message_ibfk_2` FOREIGN KEY (`messages_group_id`) REFERENCES `group_chats` (`group_chat_id`);

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
  ADD CONSTRAINT `fk_gender` FOREIGN KEY (`gender_id`) REFERENCES `gender_type` (`gender_id`),
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
