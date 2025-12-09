-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: torado
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_accounts`
--

DROP TABLE IF EXISTS `tbl_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `account_number` varchar(20) DEFAULT NULL,
  `card_number` varchar(30) DEFAULT NULL,
  `balance` decimal(15,2) DEFAULT '0.00',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_number` (`account_number`),
  UNIQUE KEY `card_number` (`card_number`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tbl_accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_accounts`
--

LOCK TABLES `tbl_accounts` WRITE;
/*!40000 ALTER TABLE `tbl_accounts` DISABLE KEYS */;
INSERT INTO `tbl_accounts` VALUES (1,1,'5000003','374244455500003',2000.00,'active',1,1,'2025-12-09 04:19:45','2025-12-09 04:19:45'),(2,1,'5000004','374244455500004',2000.00,'active',1,1,'2025-12-09 04:36:05','2025-12-09 04:36:05'),(4,3,'5000005','374244455500005',2000.00,'active',1,1,'2025-12-09 04:36:41','2025-12-09 04:39:32');
/*!40000 ALTER TABLE `tbl_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_admins`
--

DROP TABLE IF EXISTS `tbl_admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','admin','manager','support_staff','content_manager') DEFAULT 'admin',
  `status` enum('approved','pending','rejected') DEFAULT 'pending',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_admins`
--

LOCK TABLES `tbl_admins` WRITE;
/*!40000 ALTER TABLE `tbl_admins` DISABLE KEYS */;
INSERT INTO `tbl_admins` VALUES (1,'Smit','admin@gmail.com','$2b$10$UcHy9b.Ngd0QxDRQwHqRvefFrsaZLE8PigTtlXr.z1WHvS9FZYBaS','admin','rejected',1,2,'2025-12-09 05:34:03','2025-12-09 06:00:33'),(2,'Smit','smit@gmail.com','$2b$10$WxpGeBJJzhi0Uacrt2bvmetPA32nATZxvew0YoRvx6esS2Cnc9dCq','superadmin','approved',1,1,'2025-12-09 05:34:54','2025-12-09 05:34:54'),(3,'raj','raj@gmail.com','$2b$10$1eUWpAh9RNy54Veq/CRK..wAvAP525ZOn4Qwm3Nk86rpuo7k3o/cG','support_staff','rejected',1,2,'2025-12-09 05:43:52','2025-12-09 06:00:30');
/*!40000 ALTER TABLE `tbl_admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_contact_info`
--

DROP TABLE IF EXISTS `tbl_contact_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_contact_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `phone` json DEFAULT NULL,
  `email` json DEFAULT NULL,
  `service_hours` varchar(150) DEFAULT NULL,
  `banking_phone` varchar(50) DEFAULT NULL,
  `mortgage_phone` varchar(50) DEFAULT NULL,
  `credit_card_phone` varchar(50) DEFAULT NULL,
  `personal_loan_phone` varchar(50) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_contact_info`
--

LOCK TABLES `tbl_contact_info` WRITE;
/*!40000 ALTER TABLE `tbl_contact_info` DISABLE KEYS */;
INSERT INTO `tbl_contact_info` VALUES (1,'782 North Kierland Blvd, Scottsdale, USA','[\"+1 (878)-753-9922\", \"+1 (878)-753-9933\"]','[\"hello@torado.com\", \"support@torado.com\"]','Monday - Friday, 9:00am - 6:00pm','+1 (878)-753-9922','+1 (878)-753-9933','+1 (878)-753-9944','+1 (878)-753-9955','active',2,2,'2025-12-09 08:35:38','2025-12-09 09:13:02');
/*!40000 ALTER TABLE `tbl_contact_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_contact_messages`
--

DROP TABLE IF EXISTS `tbl_contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `subject` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `agreed_terms` tinyint(1) DEFAULT '0',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_contact_user` (`user_id`),
  CONSTRAINT `fk_contact_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_contact_messages`
--

LOCK TABLES `tbl_contact_messages` WRITE;
/*!40000 ALTER TABLE `tbl_contact_messages` DISABLE KEYS */;
INSERT INTO `tbl_contact_messages` VALUES (1,3,'raj','raj@gmail.com','9988776655','Need Support','This is a test message.',1,'active',NULL,NULL,'2025-12-09 09:40:42','2025-12-09 09:40:42');
/*!40000 ALTER TABLE `tbl_contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_faq_categories`
--

DROP TABLE IF EXISTS `tbl_faq_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_faq_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_faq_categories`
--

LOCK TABLES `tbl_faq_categories` WRITE;
/*!40000 ALTER TABLE `tbl_faq_categories` DISABLE KEYS */;
INSERT INTO `tbl_faq_categories` VALUES (1,'Card Replacement','active',2,NULL,'2025-12-09 07:06:53','2025-12-09 07:06:53'),(2,'Accounr Services','active',2,2,'2025-12-09 07:08:17','2025-12-09 07:12:42');
/*!40000 ALTER TABLE `tbl_faq_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_faqs`
--

DROP TABLE IF EXISTS `tbl_faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_faqs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `tbl_faqs_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `tbl_faq_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_faqs`
--

LOCK TABLES `tbl_faqs` WRITE;
/*!40000 ALTER TABLE `tbl_faqs` DISABLE KEYS */;
INSERT INTO `tbl_faqs` VALUES (1,1,'What is the best credit card for me?','Credit cards offer a convenient and widely accepted method of payment for goods and services, both online and in physical stores. Credit cards also offer various benefits and rewards programs, such as cashback.','active',2,NULL,'2025-12-09 07:21:45','2025-12-09 07:21:45'),(2,1,'How do I apply for a credit card?','Credit cards offer a convenient and widely accepted method of payment for goods and services, both online and in physical stores. Credit cards also offer various benefits and rewards programs, such as cashback.','active',2,NULL,'2025-12-09 07:22:48','2025-12-09 07:22:48'),(3,2,'What are the eligibility requirements for a credit card?','Credit cards offer a convenient and widely accepted method of payment for goods and services, both online and in physical stores. Credit cards also offer various benefits and rewards programs, such as cashback.','active',2,2,'2025-12-09 07:23:01','2025-12-09 07:30:46'),(4,2,'How does a credit card work?','Credit cards offer a convenient and widely accepted method of payment for goods and services, both online and in physical stores. Credit cards also offer various benefits and rewards programs, such as cashback.','active',2,2,'2025-12-09 07:23:09','2025-12-09 07:30:56'),(5,2,'How can I build or improve my credit with a credit card?','Credit cards offer a convenient and widely accepted method of payment for goods and services, both online and in physical stores. Credit cards also offer various benefits and rewards programs, such as cashback.','active',2,2,'2025-12-09 07:23:18','2025-12-09 07:29:38');
/*!40000 ALTER TABLE `tbl_faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_management_team`
--

DROP TABLE IF EXISTS `tbl_management_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_management_team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_management_team`
--

LOCK TABLES `tbl_management_team` WRITE;
/*!40000 ALTER TABLE `tbl_management_team` DISABLE KEYS */;
INSERT INTO `tbl_management_team` VALUES (1,'\nChristopher Propst','Chief Executive Officer','http://localhost:5000/uploads/team/1765256810386.webp',NULL,'active',NULL,2,'2025-12-09 05:06:50','2025-12-09 08:14:01'),(2,'Robert Hartsfield','Chairman','http://localhost:5000/uploads/team/1765262658222.webp',NULL,'active',2,2,'2025-12-09 06:44:18','2025-12-09 08:14:37'),(3,'Evita Vernon','Director','http://localhost:5000/uploads/team/1765262779630.webp',NULL,'active',2,2,'2025-12-09 06:46:19','2025-12-09 06:46:19'),(4,'Willium Alfanso','Director','http://localhost:5000/uploads/team/1765262795790.webp',NULL,'active',2,2,'2025-12-09 06:46:35','2025-12-09 06:46:35'),(6,'Michael Ovellete','CEO','http://localhost:5000/uploads/team/1765263342920.webp',NULL,'active',2,2,'2025-12-09 06:55:42','2025-12-09 06:55:42');
/*!40000 ALTER TABLE `tbl_management_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pages`
--

DROP TABLE IF EXISTS `tbl_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_pages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` longtext NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pages`
--

LOCK TABLES `tbl_pages` WRITE;
/*!40000 ALTER TABLE `tbl_pages` DISABLE KEYS */;
INSERT INTO `tbl_pages` VALUES (1,'privacy-policy','Privacy Policy','Legal Disclaimer:\nWe may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, subscribe to the newsletter, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, company name. We will collect personal identification information from Users only if they voluntarily consent such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.\n\nCredit Reporting Terms of Service\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, quod. Ratione ex delectus quis tenetur odio non alias numquam official ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, laborum.\n\nMauris ut in vestibulum hasellus ultrices fusce nibh justo, venenatis, amet. Lectus quam in lobortis.\nConsectetur phasellus ultrices fusce nibh justo, venenatis, amet. Lectus quam in lobortis justo venenatis amet.\nLectus quam there are two thing is very important in Consectetur phasellus ultrices fusce nibh justo, venenatis, amet in lobortis.\nWeb Development very creative to do something , mauris ut in vestibulum. Consectetur phasellus ultrices fusce nibh justo, venenatis, amet to all design.\n\nOwnership of Site Agreement to Terms of Use\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, facilis saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.\n\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eveniet quas dignissimos doloribus ea pariatur corrupti rerum deserunt, ipsum, ipsa eos veniam aspernatur fuga, optio soluta? Libero neque reiciendis cupiditate dolores nam. Earum eius similique sapiente. Iure, sit non. At fuga ipsam veniam.\n\nProvision of Services\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eveniet quas dignissimos doloribus ea pariatur corrupti rerum deserunt, ipsum, ipsa eos veniam aspernatur fuga, optio soluta? Libero neque reiciendis cupiditate dolores nam. Earum eius similique sapiente. Iure, sit non. At fuga ipsam veniam.\n\nLorem ipsum dolor, sit amet.\nAmet consectetur adipisicing elit. Officia, odit!\nAquaerat ipsa quis possimus.\nLorem, ipsum dolor sit amet consectetur adipi.\nConsectetur adipisicing elit. Voluptatibus, dignissimos.\nHighly professional administration.\n\nLimitation of Liability\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, facilis saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.\n\nAccounts, Passwords and Security\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, facilis saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.\n\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eveniet quas dignissimos doloribus ea pariatur corrupti ullam autem magni quod sint tempore saepe ullam autem magni.','active',2,2,'2025-12-09 07:55:08','2025-12-09 07:55:08'),(2,'terms-and-conditions','Terms & Conditions','Legal Disclaimer:\nWe may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, subscribe to the newsletter, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, company name. We will collect personal identification information from Users only if they voluntarily consent such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.\n\nCredit Reporting Terms of Service\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, quod. Ratione ex delectus quis tenetur odio non alias numquam official ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, laborum.\n\nMauris ut in vestibulum hasellus ultrices fusce nibh justo, venenatis, amet. Lectus quam in lobortis.\nConsectetur phasellus ultrices fusce nibh justo, venenatis, amet. Lectus quam in lobortis justo venenatis amet.\nLectus quam there are two thing is very important in Consectetur phasellus ultrices fusce nibh justo, venenatis, amet in lobortis.\nWeb Development very creative to do something , mauris ut in vestibulum. Consectetur phasellus ultrices fusce nibh justo, venenatis, amet to all design.\n\nOwnership of Site Agreement to Terms of Use\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, facilis saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.\n\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eveniet quas dignissimos doloribus ea pariatur corrupti rerum deserunt, ipsum, ipsa eos veniam aspernatur fuga, optio soluta? Libero neque reiciendis cupiditate dolores nam. Earum eius similique sapiente. Iure, sit non. At fuga ipsam veniam.\n\nProvision of Services\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eveniet quas dignissimos doloribus ea pariatur corrupti rerum deserunt, ipsum, ipsa eos veniam aspernatur fuga, optio soluta? Libero neque reiciendis cupiditate dolores nam. Earum eius similique sapiente. Iure, sit non. At fuga ipsam veniam.\n\nLorem ipsum dolor, sit amet.\nAmet consectetur adipisicing elit. Officia, odit!\nAquaerat ipsa quis possimus.\nLorem, ipsum dolor sit amet consectetur adipi.\nConsectetur adipisicing elit. Voluptatibus, dignissimos.\nHighly professional administration.\n\nLimitation of Liability\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, facilis saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.\n\nAccounts, Passwords and Security\nLorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, facilis saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.\n\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eveniet quas dignissimos doloribus ea pariatur corrupti ullam autem magni quod sint tempore saepe ullam autem magni.','active',2,2,'2025-12-09 07:56:25','2025-12-09 07:56:25');
/*!40000 ALTER TABLE `tbl_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_service_categories`
--

DROP TABLE IF EXISTS `tbl_service_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_service_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_service_categories`
--

LOCK TABLES `tbl_service_categories` WRITE;
/*!40000 ALTER TABLE `tbl_service_categories` DISABLE KEYS */;
INSERT INTO `tbl_service_categories` VALUES (1,'Investment Advisory','investment-advisory','active',2,NULL,'2025-12-09 10:36:51','2025-12-09 10:36:51'),(2,'Financial Products and Structuring','financial-products-and-structuring','active',2,NULL,'2025-12-09 10:37:30','2025-12-09 10:37:30'),(3,'Risk Management and Compliance','risk-management-and-compliance','active',2,NULL,'2025-12-09 10:37:44','2025-12-09 10:37:44'),(4,'Green Project Financing','green-project-financing','active',2,NULL,'2025-12-09 10:37:51','2025-12-09 10:37:51'),(5,'Corporate Sustainability Services','corporate-sustainability-services','active',2,2,'2025-12-09 10:37:57','2025-12-09 10:47:55');
/*!40000 ALTER TABLE `tbl_service_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `login_id` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `ssn` varchar(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `login_id` (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,'smit123','$2b$10$7J1dx/BaSbSzHj6FcY.A6uqfGTcnsG0U4GfSvXTWOyE3P8jjUp8cm','123-45-6789','1999-02-05','active',1,1,'2025-12-08 17:12:34','2025-12-08 17:12:34'),(3,'smit12','$2b$10$BMrLwQt0cdkMf9MM/eYCSeMPRWD15GlCecLy8lhbFChnrTyv42ULi','123456789','1999-05-21','active',1,1,'2025-12-09 04:39:32','2025-12-09 04:48:41');
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'torado'
--

--
-- Dumping routines for database 'torado'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_account` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_account`(
    IN p_user_id INT,
    IN p_account_number VARCHAR(20),
    IN p_card_number VARCHAR(30),
    IN p_balance DECIMAL(15,2),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_accounts (
        user_id,
        account_number,
        card_number,
        balance,
        status,
        created_by,
        updated_by
    )
    VALUES (
        p_user_id,
        p_account_number,
        p_card_number,
        p_balance,
        'active',
        p_created_by,
        p_created_by
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_admin`(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(150),
    IN p_password VARCHAR(255),
    IN p_role VARCHAR(50),
    IN p_status VARCHAR(20),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_admins (
        name,
        email,
        password,
        role,
        status,
        created_by,
        updated_by
    )
    VALUES (
        p_name,
        p_email,
        p_password,
        p_role,
        p_status,
        p_created_by,
        p_created_by
    );

    SELECT LAST_INSERT_ID() AS admin_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_contact_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_contact_info`(
    IN p_address VARCHAR(255),
    IN p_phone JSON,
    IN p_email JSON,
    IN p_service_hours VARCHAR(150),
    IN p_banking_phone VARCHAR(50),
    IN p_mortgage_phone VARCHAR(50),
    IN p_credit_card_phone VARCHAR(50),
    IN p_personal_loan_phone VARCHAR(50),
    IN p_status ENUM('active','inactive'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_contact_info (
        address,
        phone,
        email,
        service_hours,
        banking_phone,
        mortgage_phone,
        credit_card_phone,
        personal_loan_phone,
        status,
        created_by,
        updated_by
    ) VALUES (
        p_address,
        p_phone,
        p_email,
        p_service_hours,
        p_banking_phone,
        p_mortgage_phone,
        p_credit_card_phone,
        p_personal_loan_phone,
        p_status,
        p_created_by,
        p_created_by
    );

    SELECT LAST_INSERT_ID() AS inserted_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_contact_message` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_contact_message`(
    IN p_user_id INT,
    IN p_name VARCHAR(150),
    IN p_email VARCHAR(150),
    IN p_phone VARCHAR(50),
    IN p_subject VARCHAR(200),
    IN p_message TEXT,
    IN p_agreed_terms TINYINT(1),
    IN p_status ENUM('active','inactive'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_contact_messages (
        user_id,
        name,
        email,
        phone,
        subject,
        message,
        agreed_terms,
        status,
        created_by,
        updated_by
    ) VALUES (
        p_user_id,
        p_name,
        p_email,
        p_phone,
        p_subject,
        p_message,
        p_agreed_terms,
        p_status,
        p_created_by,
        p_created_by
    );

    SELECT LAST_INSERT_ID() AS inserted_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_faq` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_faq`(
    IN p_category_id INT,
    IN p_question VARCHAR(255),
    IN p_answer TEXT,
    IN p_status ENUM('active','inactive'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_faqs (
        category_id, question, answer, status, created_by
    ) VALUES (
        p_category_id, p_question, p_answer, p_status, p_created_by
    );

    SELECT LAST_INSERT_ID() AS inserted_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_faq_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_faq_category`(
    IN p_name VARCHAR(100),
    IN p_status ENUM('active','inactive'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_faq_categories (
        name,
        status,
        created_by
    ) VALUES (
        p_name,
        p_status,
        p_created_by
    );

    SELECT LAST_INSERT_ID() AS inserted_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_management_team` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_management_team`(
    IN p_name VARCHAR(100),
    IN p_position VARCHAR(100),
    IN p_image VARCHAR(255),
    IN p_description TEXT,
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_management_team (
        name,
        position,
        image,
        description,
        status,
        created_by,
        updated_by
    )
    VALUES (
        p_name,
        p_position,
        p_image,
        p_description,
        'active',
        p_created_by,
        p_created_by
    );

    SELECT LAST_INSERT_ID() AS id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_page` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_page`(
    IN p_slug VARCHAR(100),
    IN p_title VARCHAR(200),
    IN p_content LONGTEXT,
    IN p_status ENUM('active','inactive'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_pages (
        slug,
        title,
        content,
        status,
        created_by,
        updated_by
    ) VALUES (
        p_slug,
        p_title,
        p_content,
        p_status,
        p_created_by,
        p_created_by
    );

    SELECT LAST_INSERT_ID() AS inserted_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_service_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_service_category`(
    IN p_name VARCHAR(200),
    IN p_slug VARCHAR(200),
    IN p_status ENUM('active','inactive'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_service_categories (
        name,
        slug,
        status,
        created_by
    ) VALUES (
        p_name,
        p_slug,
        p_status,
        p_created_by
    );

    SELECT LAST_INSERT_ID() AS inserted_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_user`(
    IN p_login_id VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_ssn VARCHAR(20),
    IN p_dob DATE,
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_users (
        login_id,
        password,
        ssn,
        dob,
        created_by,
        updated_by
    )
    VALUES (
        p_login_id,
        p_password,
        p_ssn,
        p_dob,
        p_created_by,
        p_created_by
    );

    -- return new user_id
    SELECT LAST_INSERT_ID() AS user_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_admin_login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_admin_login`(
    IN p_email VARCHAR(150)
)
BEGIN
    SELECT 
        admin_id,
        name,
        email,
        password,
        role,
        status,
        created_at,
        updated_at
    FROM tbl_admins
    WHERE email = p_email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_approve_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_approve_admin`(
    IN p_admin_id INT,
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_admins 
    SET 
        status = 'approved',
        updated_by = p_updated_by,
        updated_at = NOW()
    WHERE admin_id = p_admin_id;

    SELECT ROW_COUNT() AS affected;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_admin`(
    IN p_admin_id INT
)
BEGIN
    DELETE FROM tbl_admins 
    WHERE admin_id = p_admin_id;

    SELECT ROW_COUNT() AS affected;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_contact_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_contact_info`(
    IN p_id INT,
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_contact_info
    SET 
        status = 'inactive',
        updated_by = p_updated_by,
        updated_at = NOW()
    WHERE id = p_id;

    SELECT ROW_COUNT() AS affected_rows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_faq` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_faq`(
    IN p_id INT
)
BEGIN
    DELETE FROM tbl_faqs WHERE id = p_id;
    SELECT ROW_COUNT() AS affected_rows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_faq_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_faq_category`(
    IN p_id INT
)
BEGIN
    DELETE FROM tbl_faq_categories WHERE id = p_id;

    SELECT ROW_COUNT() AS affected_rows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_management_member` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_management_member`(
    IN p_id INT
)
BEGIN
    DELETE FROM tbl_management_team
    WHERE id = p_id;

    SELECT ROW_COUNT() AS affected;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_service_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_service_category`(
    IN p_id INT
)
BEGIN
    DELETE FROM tbl_service_categories
    WHERE id = p_id;

    SELECT ROW_COUNT() AS affected_rows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_admins` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_admins`()
BEGIN
    SELECT 
        admin_id,
        name,
        email,
        role,
        status,
        created_by,
        created_at
    FROM tbl_admins
    ORDER BY admin_id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_faqs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_faqs`()
BEGIN
    SELECT 
        f.id,
        f.category_id,
        c.name AS category_name,
        f.question,
        f.answer,
        f.status,
        f.created_at,
        f.updated_at
    FROM tbl_faqs f
    JOIN tbl_faq_categories c ON c.id = f.category_id
    WHERE f.status = 'active'
    ORDER BY f.id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_faq_categories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_faq_categories`()
BEGIN
    SELECT 
        id,
        name,
        status,
        created_by,
        updated_by,
        created_at,
        updated_at
    FROM tbl_faq_categories
    ORDER BY id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_service_categories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_service_categories`()
BEGIN
    SELECT 
        id,
        name,
        slug,
        status,
        created_at
    FROM tbl_service_categories
    WHERE status = 'active'
    ORDER BY id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_contact_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_contact_info`()
BEGIN
    SELECT 
        id,
        address,
        phone,
        email,
        service_hours,
        banking_phone,
        mortgage_phone,
        credit_card_phone,
        personal_loan_phone,
        status,
        created_at,
        updated_at
    FROM tbl_contact_info
    WHERE status = 'active'
    ORDER BY id DESC
    LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_contact_messages` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_contact_messages`()
BEGIN
    SELECT 
        cm.id,
        cm.user_id,
        u.login_id AS user_login_id,   -- show login_id only
        cm.name AS guest_name,
        cm.email AS guest_email,
        cm.phone,
        cm.subject,
        cm.message,
        cm.agreed_terms,
        cm.status,
        cm.created_at
    FROM tbl_contact_messages cm
    LEFT JOIN tbl_users u ON u.user_id = cm.user_id
    ORDER BY cm.id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_faqs_by_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_faqs_by_category`(
    IN p_category_id INT
)
BEGIN
    SELECT 
        f.id,
        f.category_id,
        c.name AS category_name,
        f.question,
        f.answer,
        f.status,
        f.created_at,
        f.updated_at
    FROM tbl_faqs f
    JOIN tbl_faq_categories c ON c.id = f.category_id
    WHERE f.category_id = p_category_id
      AND f.status = 'active'
    ORDER BY f.id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_management_team` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_management_team`(
    IN p_status VARCHAR(10)
)
BEGIN
    IF p_status = 'all' THEN
        SELECT * FROM tbl_management_team ORDER BY id DESC;
    ELSE
        SELECT * FROM tbl_management_team
        WHERE status = p_status
        ORDER BY id DESC;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_page_by_slug` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_page_by_slug`(
    IN p_slug VARCHAR(100)
)
BEGIN
    SELECT 
        id,
        slug,
        title,
        content,
        status,
        created_at,
        updated_at
    FROM tbl_pages
    WHERE slug = p_slug AND status = 'active'
    LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_pending_admins` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_pending_admins`()
BEGIN
    SELECT 
        admin_id,
        name,
        email,
        role,
        status,
        created_by,
        created_at
    FROM tbl_admins
    WHERE status = 'pending'
    ORDER BY admin_id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_service_category_by_slug` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_service_category_by_slug`(
    IN p_slug VARCHAR(200)
)
BEGIN
    SELECT 
        id,
        name,
        slug,
        status,
        created_at
    FROM tbl_service_categories
    WHERE slug = p_slug
    LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_reject_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_reject_admin`(
    IN p_admin_id INT,
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_admins 
    SET 
        status = 'rejected',
        updated_by = p_updated_by,
        updated_at = NOW()
    WHERE admin_id = p_admin_id;

    SELECT ROW_COUNT() AS affected;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_contact_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_contact_info`(
    IN p_id INT,
    IN p_address VARCHAR(255),
    IN p_phone JSON,
    IN p_email JSON,
    IN p_service_hours VARCHAR(150),
    IN p_banking_phone VARCHAR(50),
    IN p_mortgage_phone VARCHAR(50),
    IN p_credit_card_phone VARCHAR(50),
    IN p_personal_loan_phone VARCHAR(50),
    IN p_status ENUM('active','inactive'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_contact_info
    SET 
        address = p_address,
        phone = p_phone,
        email = p_email,
        service_hours = p_service_hours,
        banking_phone = p_banking_phone,
        mortgage_phone = p_mortgage_phone,
        credit_card_phone = p_credit_card_phone,
        personal_loan_phone = p_personal_loan_phone,
        status = p_status,
        updated_by = p_updated_by,
        updated_at = NOW()
    WHERE id = p_id;

    SELECT ROW_COUNT() AS affected_rows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_faq` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_faq`(
    IN p_id INT,
    IN p_category_id INT,
    IN p_question VARCHAR(255),
    IN p_answer TEXT,
    IN p_status ENUM('active', 'inactive'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_faqs
    SET 
        category_id = p_category_id,
        question = p_question,
        answer = p_answer,
        status = p_status,
        updated_by = p_updated_by,
        updated_at = NOW()
    WHERE id = p_id;

    SELECT ROW_COUNT() AS affected_rows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_faq_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_faq_category`(
    IN p_id INT,
    IN p_name VARCHAR(100),
    IN p_status ENUM('active','inactive'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_faq_categories
    SET 
        name = p_name,
        status = p_status,
        updated_by = p_updated_by,
        updated_at = NOW()
    WHERE id = p_id;

    SELECT ROW_COUNT() AS affected_rows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_management_status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_management_status`(
    IN p_id INT,
    IN p_status ENUM('active','inactive'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_management_team
    SET 
        status = p_status,
        updated_by = p_updated_by,
        updated_at = NOW()
    WHERE id = p_id;

    SELECT ROW_COUNT() AS affected_rows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_management_team` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_management_team`(
    IN p_id INT,
    IN p_name VARCHAR(100),
    IN p_position VARCHAR(100),
    IN p_image VARCHAR(255),
    IN p_description TEXT,
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_management_team
    SET
        name = p_name,
        position = p_position,
        image = p_image,
        description = p_description,
        updated_by = p_updated_by,
        updated_at = NOW()
    WHERE id = p_id;

    SELECT ROW_COUNT() AS affected;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_service_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_service_category`(
    IN p_id INT,
    IN p_name VARCHAR(200),
    IN p_slug VARCHAR(200),
    IN p_status ENUM('active','inactive'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_service_categories
    SET 
        name = p_name,
        slug = p_slug,
        status = p_status,
        updated_by = p_updated_by,
        updated_at = NOW()
    WHERE id = p_id;

    SELECT ROW_COUNT() AS affected_rows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-09 16:26:20
