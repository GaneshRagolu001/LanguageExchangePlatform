-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:4306
-- Generation Time: Apr 18, 2025 at 01:05 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `language_exchange`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `message`, `timestamp`) VALUES
(1, 5, 6, 'Hello, how are you?', '2025-04-12 12:00:00'),
(2, 5, 6, 'Hello, how are you?', '2025-04-12 12:00:23'),
(3, 6, 5, 'Hi iam fine, how are you?', '2025-04-12 12:01:20'),
(4, 5, 6, 'hi', '2025-04-12 12:06:29'),
(5, 5, 6, 'hi', '2025-04-16 20:13:21'),
(6, 5, 6, 'hi', '2025-04-16 20:28:09'),
(7, 5, 6, 'hello', '2025-04-16 20:28:15'),
(8, 10, 10, 'hi', '2025-04-16 20:35:28'),
(9, 13, 10, 'hi', '2025-04-16 20:36:09'),
(10, 13, 10, 'hi', '2025-04-16 20:36:09'),
(11, 13, 10, 'hi', '2025-04-16 20:36:09'),
(12, 13, 10, 'hi', '2025-04-16 20:37:10'),
(13, 13, 10, 'hello', '2025-04-16 20:41:45'),
(14, 10, 13, 'hi', '2025-04-16 22:12:05'),
(15, 13, 10, 'hello', '2025-04-16 22:12:43'),
(16, 10, 13, 'how are you', '2025-04-16 22:12:52'),
(17, 10, 13, 'hi hemanth', '2025-04-17 11:56:47'),
(18, 13, 10, 'hi ganesh', '2025-04-17 11:57:57'),
(19, 10, 11, 'hello abhishek', '2025-04-17 14:12:27'),
(20, 11, 10, 'hi ganesh', '2025-04-17 14:14:21'),
(21, 10, 11, 'how are you', '2025-04-17 14:18:24'),
(22, 11, 10, 'hi', '2025-04-17 14:20:18'),
(23, 10, 11, 'hello', '2025-04-17 14:20:23'),
(24, 10, 11, 'how to learn hindi', '2025-04-17 14:23:39'),
(25, 11, 10, 'its easy', '2025-04-17 14:30:23'),
(26, 10, 11, 'ohh nice', '2025-04-17 14:31:19'),
(27, 10, 11, 'hello', '2025-04-17 14:36:13'),
(28, 10, 11, 'super', '2025-04-17 14:36:58'),
(29, 11, 10, 'ok ok', '2025-04-17 14:38:41'),
(30, 10, 11, 'good', '2025-04-17 14:40:49'),
(31, 14, 10, 'hi ganesh', '2025-04-17 17:35:39'),
(32, 10, 14, 'hi adarsh', '2025-04-17 17:36:36'),
(33, 21, 11, 'hi abishek', '2025-04-17 20:10:00'),
(34, 11, 21, 'hi rahul', '2025-04-17 20:11:11'),
(35, 21, 14, 'hi adarsh', '2025-04-17 20:11:34');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `native_language` varchar(50) DEFAULT NULL,
  `learning_language` varchar(50) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `interests` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `connected_user_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`connected_user_ids`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `native_language`, `learning_language`, `bio`, `profile_picture`, `created_at`, `interests`, `location`, `connected_user_ids`) VALUES
(1, 'Liam', 'emma@example.com', NULL, 'English', 'telugu', 'Looking for a telugu language partner!', NULL, '2025-04-11 11:22:46', NULL, NULL, '[]'),
(2, 'Liam', 'liam@example.com', NULL, 'English', 'Japanese', 'Looking for a Japanese language partner!', NULL, '2025-04-11 14:41:49', NULL, NULL, '[]'),
(3, 'Aiko', 'aiko@example.com', NULL, 'Japanese', 'English', 'Let’s do weekly language calls!', NULL, '2025-04-11 15:16:42', NULL, NULL, '[]'),
(4, 'Lukas', 'lukas@example.com', NULL, 'German', 'English', 'Practicing English to study abroad.', NULL, '2025-04-11 15:16:54', NULL, NULL, '[]'),
(5, 'Ravi', 'ravi@example.com', NULL, 'Hindi', 'Japanese', 'Love anime and want to speak fluently!', NULL, '2025-04-11 15:17:02', NULL, NULL, '[]'),
(6, 'Yuki', 'yuki@example.com', NULL, 'Japanese', 'Hindi', 'Studying Indian culture and would love to talk with locals.', NULL, '2025-04-11 15:17:50', NULL, NULL, '[]'),
(7, 'johndoe', 'john@example.com', NULL, 'English', 'Spanish', '', 'https://example.com/uploads/profile123.jpg', '2025-04-13 05:34:46', NULL, NULL, '[]'),
(8, 'John Doe', 'johndoe123@example.com', '$2y$10$dq388CAe9ESR9/Avnu3QmuXs2HUeS1q9Lj9VEo5UbxRF5xY2r32Ce', NULL, NULL, NULL, NULL, '2025-04-13 06:17:28', NULL, NULL, '[]'),
(9, 'Alice Smith', 'alice.smith99@example.com', '$2y$10$gJ.7NOTNOmqtGrpCUxBcne4WDnYSyTY9.zRmEy6lDmMWXY3tyFzG2', NULL, NULL, NULL, NULL, '2025-04-13 17:14:53', NULL, NULL, '[]'),
(10, 'RAGOLU GANESH', 'ganeshragolu001@gmail.com', '$2y$10$zV0dG8aLJtah9rKYN7.x4.WzzbrgMO75fyUrPfQl2kQ9Dk02Vlrpm', 'Telugu', 'Hindi', 'iam ganesh', '/uploads/profile_pics/profile_6800ef13422e73.91989521.png', '2025-04-14 10:02:08', 'Cooking,Reading', 'Parvathipuram,AndhraPradesh', '[null,\"11\",\"14\",\"15\",\"13\"]'),
(11, 'abhishek', 'abhishek123@gmail.com', '$2y$10$6kkuHqNTJjvIDAUsnye0i.wM.Q44tfZe8cU7r7FUCkjcdCUrc4ZMy', 'Hindi', 'Telugu', 'iam abhishek', NULL, '2025-04-15 06:25:26', 'gaming,Reading', 'up,india', '[\"10\",\"21\"]'),
(12, 'jitendra', 'jiendra123@gmail.com', '$2y$10$TafqRO2/xgUrGDhLa8O.2uV83hX5f9L0JkP4EoK0xv8Bh3ia9fQbK', NULL, NULL, NULL, NULL, '2025-04-15 06:29:09', NULL, NULL, '[]'),
(13, 'hemanth', 'hemanth4848@gmail.com', '$2y$10$h9pXE4PL4DZYn3oUQ2Zlee5No4PBjfNKdzyan20RC7FPS0.mqMg1i', 'Hindi', 'Telugu', 'iam hemanth', NULL, '2025-04-15 08:13:10', 'Cooking,Reading', 'Parvathipuram,AndhraPradesh', '[\"10\"]'),
(14, 'adarsh', 'adarsh4848@gmail.com', '$2y$10$RZZxns1.o9AB0x2kfG984OSlYi9WGzheawutdJ6nkwQkrFXhC67cu', 'Hindi', 'Telugu', 'iam adarsh', NULL, '2025-04-16 16:50:08', 'Cooking,playing', 'vizainagaram,AndhraPradesh', '[\"10\",\"21\"]'),
(15, 'manohar', 'vantakumanu12@gmail.com', '$2y$10$RNb3muKD03Y9c3A2cGwuSO35ldIXFpz.iVXYC9kOLAd3FJCR/.uCy', 'Hindi', 'Telugu', 'iam manohar', NULL, '2025-04-16 18:00:59', 'sleeping,Reading', 'Srikakulam,AndhraPradesh', '[\"10\"]'),
(16, 'Johnwick', 'johnwick00@gmail.com', '$2y$10$RUSH.fT8a.t5fmoSSrHXmu08qnke.OvSFkoQDjk3uhjHK/i4vMq5W', NULL, NULL, NULL, NULL, '2025-04-17 14:11:28', NULL, NULL, NULL),
(17, 'John', 'john001@gmail.com', '$2y$10$JBisyTMTQLBpVTLb.HDlEe62X9z7Q0YMqRAWIjN1/9N1oPSJSJNXC', NULL, NULL, NULL, NULL, '2025-04-17 14:13:45', NULL, NULL, NULL),
(18, 'Lokesh', 'Lokesh01@gmail.com', '$2y$10$pcrApwZsBzVjk1qLRiC34eM0yqRATzUvjuW4PvMtHC7gOUnToKKdK', NULL, NULL, NULL, NULL, '2025-04-17 14:16:20', NULL, NULL, NULL),
(21, 'Rahul', 'Rahul01@gmail.com', '$2y$10$zD0QJUTKA.TycuopBxiix.r1TTYfx.sniNjO1mXNA85u3GDYU9/bS', 'Telugu', 'Hindi', 'iam rahul', NULL, '2025-04-17 14:36:17', 'Cooking,Reading', 'Parvathipuram,AndhraPradesh', '[\"11\",\"14\"]');

-- --------------------------------------------------------

--
-- Table structure for table `user_languages`
--

CREATE TABLE `user_languages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `language` varchar(100) NOT NULL,
  `proficiency_level` enum('Beginner','Intermediate','Advanced','Fluent','Native') NOT NULL,
  `learning` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_languages`
--
ALTER TABLE `user_languages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_languages`
--
ALTER TABLE `user_languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_languages`
--
ALTER TABLE `user_languages`
  ADD CONSTRAINT `user_languages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
