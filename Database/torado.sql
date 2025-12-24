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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_accounts`
--

LOCK TABLES `tbl_accounts` WRITE;
/*!40000 ALTER TABLE `tbl_accounts` DISABLE KEYS */;
INSERT INTO `tbl_accounts` VALUES (1,1,'5000003','374244455500003',2000.00,'active',1,1,'2025-12-09 04:19:45','2025-12-09 04:19:45'),(2,1,'5000004','374244455500004',2000.00,'active',1,1,'2025-12-09 04:36:05','2025-12-09 04:36:05'),(4,3,'5000005','374244455500005',2000.00,'active',1,1,'2025-12-09 04:36:41','2025-12-09 04:39:32'),(5,4,'5000006','374244455500006',2000.00,'active',1,1,'2025-12-15 05:17:43','2025-12-15 05:48:24'),(6,5,'5000007','374244455500007',2000.00,'active',1,1,'2025-12-15 05:17:54','2025-12-15 05:58:11'),(7,6,'5000008','374244455500008',2000.00,'active',1,1,'2025-12-15 05:18:04','2025-12-15 06:03:30'),(8,7,'5000009','374244455500009',2000.00,'active',1,1,'2025-12-15 06:06:00','2025-12-15 06:06:50');
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
-- Table structure for table `tbl_case_studies`
--

DROP TABLE IF EXISTS `tbl_case_studies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_case_studies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `client` varchar(255) DEFAULT NULL,
  `sector` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `overview` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_case_studies`
--

LOCK TABLES `tbl_case_studies` WRITE;
/*!40000 ALTER TABLE `tbl_case_studies` DISABLE KEYS */;
INSERT INTO `tbl_case_studies` VALUES (1,'Renewable Energy Initiative','renewable-energy-initiative','http://localhost:5000/uploads/case-studies/1765345243944.webp','SolarHope Initiative','Renewable Energy','Sub-Saharan Africa','SolarHope Initiative set out to provide reliable and affordable solar energy solutions to rural communities across Sub-Saharan Africa. This initiative aimed to reduce the region\'s dependency on fossil fuels, enhance the quality of life, and promote sustainable development by improving energy access.',NULL,2,NULL,'2025-12-10 05:40:43','2025-12-10 05:40:43'),(2,'Sustainable Urban Development','sustainable-urban-development','http://localhost:5000/uploads/case-studies/1765346198782.webp','SolarHope Initiative','Renewable Energy','Sub-Saharan Africa','SolarHope Initiative set out to provide reliable and affordable solar energy solutions to rural communities across Sub-Saharan Africa. This initiative aimed to reduce the region\'s dependency on fossil fuels, enhance the quality of life, and promote sustainable development by improving energy access.',NULL,2,NULL,'2025-12-10 05:56:38','2025-12-10 05:56:38'),(3,'Community-Based Conservation','community-based-conservation','http://localhost:5000/uploads/case-studies/1765346220539.webp','SolarHope Initiative','Renewable Energy','Sub-Saharan Africa','SolarHope Initiative set out to provide reliable and affordable solar energy solutions to rural communities across Sub-Saharan Africa. This initiative aimed to reduce the region\'s dependency on fossil fuels, enhance the quality of life, and promote sustainable development by improving energy access.',NULL,2,NULL,'2025-12-10 05:57:00','2025-12-10 05:57:00'),(5,'Sustainable Agriculture Initiative','sustainable-agriculture-initiative','http://localhost:5000/uploads/case-studies/1765348017445.webp','SolarHope Initiative','Renewable Energy','Sub-Saharan Africa','SolarHope Initiative set out to provide reliable and affordable solar energy solutions to rural communities across Sub-Saharan Africa. This initiative aimed to reduce the region\'s dependency on fossil fuels, enhance the quality of life, and promote sustainable development by improving energy access.','active',2,2,'2025-12-10 06:26:18','2025-12-10 06:26:57');
/*!40000 ALTER TABLE `tbl_case_studies` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_contact_messages`
--

LOCK TABLES `tbl_contact_messages` WRITE;
/*!40000 ALTER TABLE `tbl_contact_messages` DISABLE KEYS */;
INSERT INTO `tbl_contact_messages` VALUES (1,3,'raj','raj@gmail.com','9988776655','Need Support','This is a test message.',1,'active',NULL,NULL,'2025-12-09 09:40:42','2025-12-09 09:40:42'),(2,3,'James Salas','nokaliti@mailinator.com','+1 (324) 184-1458','Hic quo nihil minus ','Voluptatem ullamco d',1,'active',NULL,NULL,'2025-12-15 06:55:21','2025-12-15 06:55:21');
/*!40000 ALTER TABLE `tbl_contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_credit_card_categories`
--

DROP TABLE IF EXISTS `tbl_credit_card_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_credit_card_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `total_cards` int DEFAULT '0',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_credit_card_categories`
--

LOCK TABLES `tbl_credit_card_categories` WRITE;
/*!40000 ALTER TABLE `tbl_credit_card_categories` DISABLE KEYS */;
INSERT INTO `tbl_credit_card_categories` VALUES (1,'Travel','travel','http://localhost:5000/uploads/credit-card-category-icons/1766572802003.svg',0,'active',2,NULL,'2025-12-24 10:40:02','2025-12-24 10:40:02'),(2,'Rewards','rewards','http://localhost:5000/uploads/credit-card-category-icons/1766572886455.svg',0,'active',2,NULL,'2025-12-24 10:41:26','2025-12-24 10:41:26'),(3,'Cash Back','cash-back','http://localhost:5000/uploads/credit-card-category-icons/1766572937854.svg',0,'active',2,NULL,'2025-12-24 10:42:17','2025-12-24 10:42:17'),(4,'Business','business','http://localhost:5000/uploads/credit-card-category-icons/1766572988751.svg',0,'active',2,NULL,'2025-12-24 10:43:08','2025-12-24 10:43:08'),(5,'Student','student','http://localhost:5000/uploads/credit-card-icons/1766576934349.svg',0,'inactive',2,2,'2025-12-24 10:44:57','2025-12-24 11:54:09');
/*!40000 ALTER TABLE `tbl_credit_card_categories` ENABLE KEYS */;
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
-- Table structure for table `tbl_loan_applications`
--

DROP TABLE IF EXISTS `tbl_loan_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_loan_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `email` varchar(150) NOT NULL,
  `marital_status` enum('single','married','divorced','widowed') NOT NULL,
  `home_address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `profession` varchar(100) NOT NULL,
  `organization_name` varchar(150) DEFAULT NULL,
  `monthly_income` enum('0-20000','20001-40000','40001-60000','60001-80000','80001+') NOT NULL,
  `desired_amount` enum('50000','100000','200000','500000','1000000') NOT NULL,
  `loan_tenure_month` enum('6','12','24','36','48','60') NOT NULL,
  `existing_loan_tenure_month` enum('0','6','12','24','36','48','60') DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tbl_loan_applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_loan_applications`
--

LOCK TABLES `tbl_loan_applications` WRITE;
/*!40000 ALTER TABLE `tbl_loan_applications` DISABLE KEYS */;
INSERT INTO `tbl_loan_applications` VALUES (1,3,'Smit','1998-05-10','9876543210','smit@example.com','single','Some address','Ahmedabad','380001','Developer','ABC Pvt Ltd','40001-60000','200000','24','0',3,NULL,'2025-12-19 04:50:23','2025-12-19 04:50:23'),(2,3,'Elliott','1995-07-30','+1 (622) 942-9569','qiteq@mailinator.com','married','Pariatur Aut et imp','New York','Fugiat enim est inc','Eu reiciendis dolore','Le Simpson Inc','0-20000','200000','36','48',3,NULL,'2025-12-19 05:26:35','2025-12-19 05:26:35'),(3,3,'Lareina','1999-07-15','+1 (575) 805-9866','ryjuhen@mailinator.com','divorced','Reprehenderit solut','Pune','Recusandae Libero n','Tenetur at consequat','Joyce Holloway Associates','80001+','100000','12','12',3,NULL,'2025-12-19 05:32:19','2025-12-19 05:32:19'),(4,3,'Roary','1986-11-16','+1 (564) 943-9381','sina@mailinator.com','divorced','Quis expedita quo fa','Ahmedabad','Alias in voluptates ','Totam quod quisquam ','Mays and Poole Traders','20001-40000','100000','36','12',3,NULL,'2025-12-19 05:33:50','2025-12-19 05:33:50'),(5,3,'Chava','1980-01-01','+1 (821) 707-7323','qipyhobe@mailinator.com','married','Veritatis possimus ','Mumbai','Veniam culpa eius ','Exercitation in et c','Alvarez Cline Trading','60001-80000','100000','24','48',3,NULL,'2025-12-19 05:34:03','2025-12-19 05:34:03'),(6,3,'Cole','2015-01-13','+1 (553) 963-5328','wufynanuw@mailinator.com','married','Laborum culpa elit','Chennai','Et explicabo Dolore','Qui similique natus ','Berg Langley Trading','40001-60000','100000','6','60',3,NULL,'2025-12-19 05:41:10','2025-12-19 05:41:10'),(7,3,'Maya','2005-04-14','+1 (825) 337-3966','pihinami@mailinator.com','divorced','Sed soluta voluptate','Vadodara','Et veniam atque in ','Voluptatem quas cons','Lynch Pearson LLC','80001+','1000000','12','36',3,NULL,'2025-12-19 11:49:13','2025-12-19 11:49:13'),(8,3,'Hoyt','1977-10-09','+1 (338) 437-8908','lyxy@mailinator.com','divorced','Voluptatibus sit do','Ahmedabad','In sed saepe totam n','Soluta similique dol','Craig Gutierrez LLC','40001-60000','1000000','24','6',3,NULL,'2025-12-19 11:51:05','2025-12-19 11:51:05');
/*!40000 ALTER TABLE `tbl_loan_applications` ENABLE KEYS */;
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
-- Table structure for table `tbl_mortgage_applications`
--

DROP TABLE IF EXISTS `tbl_mortgage_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_mortgage_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `request_type` enum('mortgage_application') NOT NULL,
  `interested_purchase_home` tinyint(1) DEFAULT '0',
  `interested_move_mortgage` tinyint(1) DEFAULT '0',
  `interested_refinance` tinyint(1) DEFAULT '0',
  `full_name` varchar(150) NOT NULL,
  `date_of_birth` date NOT NULL,
  `ssn` varchar(20) NOT NULL,
  `marital_status` enum('single','married','divorced','widowed') NOT NULL,
  `home_address` text NOT NULL,
  `unit_optional` varchar(50) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `telephone_number` varchar(20) NOT NULL,
  `email` varchar(150) NOT NULL,
  `gross_annual_income` enum('0-20000','20001-40000','40001-60000','60001-80000','80001-100000','100000+') NOT NULL,
  `down_payment_amount` decimal(12,2) DEFAULT NULL,
  `terms_confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tbl_mortgage_applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_mortgage_applications`
--

LOCK TABLES `tbl_mortgage_applications` WRITE;
/*!40000 ALTER TABLE `tbl_mortgage_applications` DISABLE KEYS */;
INSERT INTO `tbl_mortgage_applications` VALUES (1,3,'mortgage_application',1,0,0,'John Doe','1995-06-15','123456789','single','123 Main Street',NULL,'Miami','Florida','33101','9876543210','john@mail.com','60001-80000',75000.00,1,'pending',3,NULL,'2025-12-19 09:15:58','2025-12-19 09:15:58'),(2,3,'mortgage_application',0,1,0,'Catherine Sykes','2019-08-29','Sequi fugiat rerum ','married','Nihil dolor aut id o',NULL,'Consequat Ex expedi','Et a sit laborum lo','Porro quo culpa sed ','+1 (527) 592-8445','liqytafo@mailinator.com','60001-80000',4.00,1,'pending',3,NULL,'2025-12-19 10:16:57','2025-12-19 10:16:57'),(3,3,'mortgage_application',0,1,0,'Catherine Sykes','2019-08-29','Sequi fugiat rerum ','married','Nihil dolor aut id o',NULL,'Consequat Ex expedi','Et a sit laborum lo','Porro quo culpa sed ','+1 (527) 592-8445','liqytafo@mailinator.com','60001-80000',4.00,1,'pending',3,NULL,'2025-12-19 10:16:57','2025-12-19 10:16:57'),(4,3,'mortgage_application',0,0,1,'Ali Patton','2013-06-15','Consectetur unde fug','single','Quisquam ea odio nob',NULL,'Sit excepteur quis e','Sint eius repudiand','Aut consequatur veni','+1 (283) 842-2505','cuxyqa@mailinator.com','60001-80000',87.00,1,'pending',3,NULL,'2025-12-19 10:18:17','2025-12-19 10:18:17'),(5,3,'mortgage_application',0,1,0,'Beatrice Joyner','2015-02-24','Quis dolor animi fu','single','Non velit quae autem',NULL,'Voluptatem dicta do','Voluptas sit nobis ','Excepteur saepe omni','+1 (684) 271-6423','xipazywuj@mailinator.com','40001-60000',97.00,1,'pending',3,NULL,'2025-12-19 10:25:04','2025-12-19 10:25:04'),(6,3,'mortgage_application',0,1,0,'Brenden Moreno','1999-12-12','A irure est magna si','married','Quia exercitation of',NULL,'Non magnam dolores t','Voluptatem voluptate','Nulla expedita ipsum','+1 (529) 883-5308','tepunymi@mailinator.com','60001-80000',51.00,1,'pending',3,NULL,'2025-12-19 10:26:14','2025-12-19 10:26:14'),(7,3,'mortgage_application',0,1,0,'Bevis Garner','2001-01-16','Aliquip corrupti el','single','Quo est veniam cons',NULL,'Unde vitae occaecat ','Fuga Veniam odio s','Adipisicing qui nemo','+1 (372) 652-2845','pokov@mailinator.com','60001-80000',83.00,1,'pending',3,NULL,'2025-12-19 10:34:21','2025-12-19 10:34:21'),(8,3,'mortgage_application',1,0,0,'Kristen Weber','1990-11-22','Eum reiciendis facer','single','Excepteur ad sint ul',NULL,'Cupiditate ab necess','Cupiditate repudiand','Doloribus sunt illo','+1 (802) 337-8977','tizycexoly@mailinator.com','40001-60000',31.00,1,'pending',3,NULL,'2025-12-19 11:48:57','2025-12-19 11:48:57'),(9,3,'mortgage_application',1,0,0,'Pearl Miranda','1997-05-20','Et similique obcaeca','married','Deserunt minus ea te',NULL,'Ea amet aut non est','Ducimus voluptatem','Cupidatat id laboris','+1 (321) 934-4499','zocojaqam@mailinator.com','40001-60000',17.00,1,'pending',3,NULL,'2025-12-19 11:51:38','2025-12-19 11:51:38'),(10,3,'mortgage_application',0,0,1,'Maite Kirby','1980-08-22','Quia corporis nulla ','married','Voluptas laudantium',NULL,'Animi occaecat volu','Excepteur consectetu','Quis tenetur non neq','+1 (526) 149-1654','zifava@mailinator.com','20001-40000',66.00,1,'pending',3,NULL,'2025-12-19 11:54:45','2025-12-19 11:54:45'),(11,3,'mortgage_application',0,0,1,'Eliana Santana','2014-11-27','Maiores excepturi re','married','Ducimus ea dolor no',NULL,'Quo sunt nemo error ','Harum vel nostrud ex','Ut explicabo Qui ar','+1 (453) 559-1438','woxa@mailinator.com','20001-40000',63.00,1,'pending',3,NULL,'2025-12-22 04:35:16','2025-12-22 04:35:16');
/*!40000 ALTER TABLE `tbl_mortgage_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_mortgage_rates`
--

DROP TABLE IF EXISTS `tbl_mortgage_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_mortgage_rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mortgage_type` varchar(100) NOT NULL,
  `rate` decimal(5,2) NOT NULL,
  `apr` decimal(5,3) NOT NULL,
  `point` decimal(6,3) NOT NULL,
  `monthly_payment` decimal(10,2) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'approved',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_mortgage_rates`
--

LOCK TABLES `tbl_mortgage_rates` WRITE;
/*!40000 ALTER TABLE `tbl_mortgage_rates` DISABLE KEYS */;
INSERT INTO `tbl_mortgage_rates` VALUES (1,'30-Year Fixed',2.50,2.692,0.301,500.00,'approved',2,2,'2025-12-22 08:02:28','2025-12-22 08:15:05'),(2,'15-Year Fixed',3.00,3.452,0.321,600.00,'approved',2,NULL,'2025-12-22 08:43:26','2025-12-22 08:43:26'),(3,'15-Year Fixed',3.00,6.020,6.102,1100.00,'approved',2,NULL,'2025-12-22 08:45:45','2025-12-22 08:45:45');
/*!40000 ALTER TABLE `tbl_mortgage_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_news`
--

DROP TABLE IF EXISTS `tbl_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `content` longtext NOT NULL,
  `published_date` date DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `comments_count` int DEFAULT '0',
  `author` varchar(150) DEFAULT 'Admin',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `tbl_news_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `tbl_news_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_news`
--

LOCK TABLES `tbl_news` WRITE;
/*!40000 ALTER TABLE `tbl_news` DISABLE KEYS */;
INSERT INTO `tbl_news` VALUES (1,'Maximizing the benefits of online banking for credit cards','maximizing-the-benefits-of-online-banking-for-credit-cards','A guide to online banking for credit cards and banking\n','In today\'s digital age, online banking has become an essential part of managing our financial lives. With the convenience and accessibility it offers, online banking is particularly valuable for credit card and banking activities. In this comprehensive guide, we will explore the ins and outs of online banking, specifically focusing on credit cards and traditional banking services. Whether you\'re a beginner or looking to enhance your online banking experience, this guide will provide valuable insights and tips to help you navigate the world of digital finance.even gravida believable.','2025-12-02','http://localhost:5000/uploads/news/1765362308401.webp',1,2,'Smit','active',2,NULL,'2025-12-10 10:25:08','2025-12-18 05:17:18'),(2,'The benefits of online banking for credit cards','the-benefits-of-online-banking-for-credit-cards','A guide to online banking for credit cards and banking\n','In today\'s digital age, online banking has become an essential part of managing our financial lives. With the convenience and accessibility it offers, online banking is particularly valuable for credit card and banking activities. In this comprehensive guide, we will explore the ins and outs of online banking, specifically focusing on credit cards and traditional banking services. Whether you\'re a beginner or looking to enhance your online banking experience, this guide will provide valuable insights and tips to help you navigate the world of digital finance.even gravida believable.','2025-12-02','http://localhost:5000/uploads/news/1765362326079.webp',1,0,'Smit','active',2,NULL,'2025-12-10 10:25:26','2025-12-10 10:25:26'),(3,'The benefits of online banking for credit cards','the-benefits-of-online-banking-for-credit-cards-1','A guide to online banking for credit cards and banking\n','In today\'s digital age, online banking has become an essential part of managing our financial lives. With the convenience and accessibility it offers, online banking is particularly valuable for credit card and banking activities. In this comprehensive guide, we will explore the ins and outs of online banking, specifically focusing on credit cards and traditional banking services. Whether you\'re a beginner or looking to enhance your online banking experience, this guide will provide valuable insights and tips to help you navigate the world of digital finance.even gravida believable.','2025-12-08','http://localhost:5000/uploads/news/1765362352183.webp',1,0,'Smit','active',2,NULL,'2025-12-10 10:25:52','2025-12-10 10:25:52');
/*!40000 ALTER TABLE `tbl_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_news_categories`
--

DROP TABLE IF EXISTS `tbl_news_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_news_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_news_categories`
--

LOCK TABLES `tbl_news_categories` WRITE;
/*!40000 ALTER TABLE `tbl_news_categories` DISABLE KEYS */;
INSERT INTO `tbl_news_categories` VALUES (1,'Banking','banking','active',2,NULL,'2025-12-10 07:28:30','2025-12-10 07:28:30'),(2,'Credit Card','credit-card','active',2,NULL,'2025-12-10 07:29:08','2025-12-10 07:29:08'),(3,'Mortgage','mortgage','active',2,NULL,'2025-12-10 07:29:21','2025-12-10 07:29:21'),(5,'Personal loan','personal-loan','active',2,2,'2025-12-10 07:50:00','2025-12-10 07:50:16');
/*!40000 ALTER TABLE `tbl_news_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_news_comments`
--

DROP TABLE IF EXISTS `tbl_news_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_news_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `news_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `comment` text NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'approved',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_news_comment` (`news_id`),
  CONSTRAINT `fk_news_comment` FOREIGN KEY (`news_id`) REFERENCES `tbl_news` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_news_comments`
--

LOCK TABLES `tbl_news_comments` WRITE;
/*!40000 ALTER TABLE `tbl_news_comments` DISABLE KEYS */;
INSERT INTO `tbl_news_comments` VALUES (1,1,'Smit','smit@gmail.com','9999999999','https://example.com','Testing comment','approved',4,NULL,'2025-12-18 05:21:33','2025-12-18 05:21:33'),(2,2,'Jenna Britt','lazobubada@mailinator.com','+1 (266) 481-8179','https://www.bokexefexori.tv','Ad amet eiusmod ali','approved',3,NULL,'2025-12-18 05:42:22','2025-12-18 05:42:22'),(3,2,'Mechelle Baxter','qurawipoc@mailinator.com','+1 (979) 933-1057','https://www.juzox.ws','Quod ut pariatur Do','approved',3,NULL,'2025-12-18 06:06:56','2025-12-18 06:06:56'),(4,1,'Christian Simon','zimycat@mailinator.com','+1 (566) 951-3376','https://www.wexowivecixybop.mobi','Mollitia consequatur','approved',3,NULL,'2025-12-18 11:52:59','2025-12-18 11:52:59');
/*!40000 ALTER TABLE `tbl_news_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_news_tags`
--

DROP TABLE IF EXISTS `tbl_news_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_news_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_news_tags`
--

LOCK TABLES `tbl_news_tags` WRITE;
/*!40000 ALTER TABLE `tbl_news_tags` DISABLE KEYS */;
INSERT INTO `tbl_news_tags` VALUES (1,'Banking','banking','active',2,NULL,'2025-12-10 08:06:03','2025-12-10 08:06:03'),(2,'Business','business','active',2,NULL,'2025-12-10 08:06:38','2025-12-10 08:06:38'),(3,'Personal loan','personal-loan','active',2,NULL,'2025-12-10 08:06:45','2025-12-10 08:06:45'),(5,'Credit card','credit-card','active',2,NULL,'2025-12-10 08:22:17','2025-12-10 08:22:17');
/*!40000 ALTER TABLE `tbl_news_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_news_tags_map`
--

DROP TABLE IF EXISTS `tbl_news_tags_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_news_tags_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `news_id` int NOT NULL,
  `tag_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `tbl_news_tags_map_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `tbl_news` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_news_tags_map_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tbl_news_tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_news_tags_map`
--

LOCK TABLES `tbl_news_tags_map` WRITE;
/*!40000 ALTER TABLE `tbl_news_tags_map` DISABLE KEYS */;
INSERT INTO `tbl_news_tags_map` VALUES (1,1,1,'2025-12-10 10:25:08'),(2,1,2,'2025-12-10 10:25:08'),(3,2,1,'2025-12-10 10:25:26'),(4,2,2,'2025-12-10 10:25:26'),(5,3,1,'2025-12-10 10:25:52'),(6,3,2,'2025-12-10 10:25:52');
/*!40000 ALTER TABLE `tbl_news_tags_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_open_accounts`
--

DROP TABLE IF EXISTS `tbl_open_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_open_accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `taxpayer_type` enum('ssn','itin') NOT NULL,
  `taxpayer_number` varchar(20) NOT NULL,
  `id_type` enum('business','passport','student') NOT NULL,
  `id_number` varchar(50) NOT NULL,
  `state_of_issue` varchar(100) NOT NULL,
  `id_expiration_date` date NOT NULL,
  `date_of_birth` date NOT NULL,
  `citizenship` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `home_address_1` text NOT NULL,
  `home_address_2` text,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `profession` varchar(100) NOT NULL,
  `terms_accepted` tinyint(1) DEFAULT '0',
  `status` enum('pending','approved','rejected') DEFAULT 'approved',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tbl_open_accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_open_accounts`
--

LOCK TABLES `tbl_open_accounts` WRITE;
/*!40000 ALTER TABLE `tbl_open_accounts` DISABLE KEYS */;
INSERT INTO `tbl_open_accounts` VALUES (1,3,'Smit',NULL,'Vaghasiya','ssn','123456789','passport','P123456','Florida','2030-12-31','1998-05-10','Indian','smit@example.com','9876543210','Ahmedabad,Gujrat',NULL,'Ahmedabad','Gujarat','380001','Developer',1,'approved',3,NULL,'2025-12-19 05:58:35','2025-12-19 05:58:35'),(2,3,'Smit',NULL,'Vaghasiya','ssn','123456789','passport','P123456','Florida','2030-12-31','1998-05-10','Indian','smit5@example.com','9876543210','Ahmedabad,Gujrat',NULL,'Ahmedabad','Gujarat','380001','Developer',1,'approved',3,NULL,'2025-12-19 06:27:49','2025-12-19 06:27:49'),(3,3,'Brenden','Phoebe Thornton','Valenzuela','ssn','419','business','500','Florida','2019-10-03','1992-03-16','Florida','bidat@mailinator.com','+1 (978) 372-8687','624 Rocky Milton Road','Consectetur velit s','Fort Lauderdale','Florida','88631','Excepteur ea archite',1,'approved',3,NULL,'2025-12-19 06:49:06','2025-12-19 06:49:06'),(4,3,'Callie','Stella Rocha','Sparks','ssn','134','student','505','New York','1972-07-06','1970-12-22','United States','bupa@mailinator.com','+1 (837) 244-8362','118 West Green Second Street','Sed consequat Tempo','Tampa','New York','24990','Quae non maiores eni',1,'approved',3,NULL,'2025-12-19 07:39:58','2025-12-19 07:39:58'),(5,3,'Mark','Erasmus Fuller','Mckinney','itin','338','student','540','Florida','1981-08-03','1971-03-06','United States','qygohu@mailinator.com','+1 (448) 643-1303','98 West First Lane','Nulla id quae dolor ','Miami','Texas','35169','Saepe rerum perspici',1,'approved',3,NULL,'2025-12-19 11:49:30','2025-12-19 11:49:30'),(6,3,'Fiona','Meghan Cantrell','Sanchez','ssn','724','passport','631','Illinois','1995-08-19','1997-02-20','Florida','lizijol@mailinator.com','+1 (161) 461-5302','583 Old Boulevard','Consequat Consectet','Fort Lauderdale','Florida','55718','Modi amet voluptate',1,'approved',3,NULL,'2025-12-19 11:50:49','2025-12-19 11:50:49'),(7,3,'Erich','Kaitlin Ballard','Barker','itin','144','business','798','Arizona','2022-07-18','1998-04-21','India','wymigyje@mailinator.com','+1 (183) 485-5554','17 North Hague Avenue','Sint natus ipsam in ','Fort Lauderdale','Texas','83751','Temporibus voluptati',1,'approved',3,NULL,'2025-12-22 04:27:22','2025-12-22 04:27:22');
/*!40000 ALTER TABLE `tbl_open_accounts` ENABLE KEYS */;
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
-- Table structure for table `tbl_services`
--

DROP TABLE IF EXISTS `tbl_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `tbl_services_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `tbl_service_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_services`
--

LOCK TABLES `tbl_services` WRITE;
/*!40000 ALTER TABLE `tbl_services` DISABLE KEYS */;
INSERT INTO `tbl_services` VALUES (1,1,'Investment Advisory','investment-advisory','We provide tailored investment strategies based on your unique financial objectives, risk tolerance, and sustainability preferences. Our advisors work closely with you to understand your needs and craft a personalized investment plan.','http://localhost:5000/uploads/services/1765341263688.webp','active',2,NULL,'2025-12-10 04:34:23','2025-12-10 04:34:23'),(2,1,'Financial Products and Structuring','financial-products-and-structuring','We provide tailored investment strategies based on your unique financial objectives, risk tolerance, and sustainability preferences. Our advisors work closely with you to understand your needs and craft a personalized investment plan.','http://localhost:5000/uploads/services/1765341280760.webp','active',2,NULL,'2025-12-10 04:34:40','2025-12-10 04:34:40'),(3,2,'Risk Management and Compliance','risk-management-and-compliance','We provide tailored investment strategies based on your unique financial objectives, risk tolerance, and sustainability preferences. Our advisors work closely with you to understand your needs and craft a personalized investment plan.','http://localhost:5000/uploads/services/1765341303980.webp','active',2,NULL,'2025-12-10 04:35:04','2025-12-10 04:35:04'),(6,2,'Green Project Financing','green-project-financing','We provide tailored investment strategies based on your unique financial objectives, risk tolerance, and sustainability preferences. Our advisors work closely with you to understand your needs and craft a personalized investment plan.','http://localhost:5000/uploads/services/1765344119212.webp','active',2,2,'2025-12-10 05:16:51','2025-12-10 05:21:59');
/*!40000 ALTER TABLE `tbl_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_subscribers`
--

DROP TABLE IF EXISTS `tbl_subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `status` enum('active','unsubscribed') DEFAULT 'active',
  `subscribed_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed_at` datetime DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_subscribers`
--

LOCK TABLES `tbl_subscribers` WRITE;
/*!40000 ALTER TABLE `tbl_subscribers` DISABLE KEYS */;
INSERT INTO `tbl_subscribers` VALUES (1,'smit@gmail.com','active','2025-12-16 14:04:05',NULL,'::1',NULL,4,'2025-12-16 08:34:05','2025-12-16 08:38:20'),(4,'cisowizy@mailinator.com','active','2025-12-16 14:25:14',NULL,'::1',3,NULL,'2025-12-16 08:55:14','2025-12-16 08:55:14'),(5,'peqonynewi@mailinator.com','active','2025-12-16 17:27:45',NULL,'::1',3,NULL,'2025-12-16 11:57:45','2025-12-16 11:57:45');
/*!40000 ALTER TABLE `tbl_subscribers` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,'smit123','$2b$10$7J1dx/BaSbSzHj6FcY.A6uqfGTcnsG0U4GfSvXTWOyE3P8jjUp8cm','123-45-6789','1999-02-05','active',1,1,'2025-12-08 17:12:34','2025-12-08 17:12:34'),(3,'smit12','$2b$10$LSVu33v.HRgYsxxkPIj8YOiBHVTcRoLSl4LeGRwO/Y6Y5Zqh0cB7q','123456789','1999-05-21','active',1,1,'2025-12-09 04:39:32','2025-12-15 11:48:21'),(4,'raj2','$2b$10$sRdqXg58z3nbuTHj4unC0esdJ9.mcg5jSRUighB77aI2yXUmT9nQi','123-45-6798','2014-06-24','active',NULL,NULL,'2025-12-15 05:48:24','2025-12-15 05:48:24'),(5,'yash15','$2b$10$c16QF9Ed/Q.ZXz12.70yhukKdNr6YCLSHuhrDzV5Zr8n5hU1JYuc6','123-45-4898','2013-01-29','active',NULL,NULL,'2025-12-15 05:58:11','2025-12-15 05:58:11'),(6,'raj25','$2b$10$7YhFVZyogQQ7zo8GQ/CTDeSOddsKChKRbW2UQBokitH9VeGKhtEYW','453-45-6789','2002-05-21','active',1,1,'2025-12-15 06:03:30','2025-12-15 06:03:30'),(7,'prince13','$2b$10$HMKgzxtl5ODgqqKPoR2ZlucRRPvlX1KLQeP5o5oTOhteYmMhFUEzO','486-48-7689','2011-11-24','active',NULL,NULL,'2025-12-15 06:06:50','2025-12-15 06:06:50');
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_credit_card_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_credit_card_category`(
    IN p_name VARCHAR(100),
    IN p_slug VARCHAR(120),
    IN p_icon VARCHAR(255),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_credit_card_categories (
        name,
        slug,
        icon,
        created_by
    )
    VALUES (
        p_name,
        p_slug,
        p_icon,
        p_created_by
    );
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_loan_application` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_loan_application`(
    IN p_user_id INT,
    IN p_first_name VARCHAR(100),
    IN p_date_of_birth DATE,
    IN p_telephone VARCHAR(20),
    IN p_email VARCHAR(150),
    IN p_marital_status ENUM('single','married','divorced','widowed'),
    IN p_home_address TEXT,
    IN p_city VARCHAR(100),
    IN p_postal_code VARCHAR(20),
    IN p_profession VARCHAR(100),
    IN p_organization_name VARCHAR(150),
    IN p_monthly_income ENUM('0-20000','20001-40000','40001-60000','60001-80000','80001+'),
    IN p_desired_amount ENUM('50000','100000','200000','500000','1000000'),
    IN p_loan_tenure_month ENUM('6','12','24','36','48','60'),
    IN p_existing_loan_tenure_month ENUM('0','6','12','24','36','48','60'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_loan_applications (
        user_id,
        first_name,
        date_of_birth,
        telephone,
        email,
        marital_status,
        home_address,
        city,
        postal_code,
        profession,
        organization_name,
        monthly_income,
        desired_amount,
        loan_tenure_month,
        existing_loan_tenure_month,
        created_by
    )
    VALUES (
        p_user_id,
        p_first_name,
        p_date_of_birth,
        p_telephone,
        p_email,
        p_marital_status,
        p_home_address,
        p_city,
        p_postal_code,
        p_profession,
        p_organization_name,
        p_monthly_income,
        p_desired_amount,
        p_loan_tenure_month,
        p_existing_loan_tenure_month,
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_mortgage_application` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_mortgage_application`(
    IN p_user_id INT,
    IN p_request_type ENUM('mortgage_application'),
    IN p_interested_purchase_home TINYINT(1),
    IN p_interested_move_mortgage TINYINT(1),
    IN p_interested_refinance TINYINT(1),
    IN p_full_name VARCHAR(150),
    IN p_date_of_birth DATE,
    IN p_ssn VARCHAR(20),
    IN p_marital_status ENUM('single','married','divorced','widowed'),
    IN p_home_address TEXT,
    IN p_unit_optional VARCHAR(50),
    IN p_city VARCHAR(100),
    IN p_province VARCHAR(100),
    IN p_postal_code VARCHAR(20),
    IN p_telephone_number VARCHAR(20),
    IN p_email VARCHAR(150),
    IN p_gross_annual_income ENUM(
        '0-20000',
        '20001-40000',
        '40001-60000',
        '60001-80000',
        '80001-100000',
        '100000+'
    ),
    IN p_down_payment_amount DECIMAL(12,2),
    IN p_terms_confirmed TINYINT(1),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_mortgage_applications (
        user_id,
        request_type,
        interested_purchase_home,
        interested_move_mortgage,
        interested_refinance,
        full_name,
        date_of_birth,
        ssn,
        marital_status,
        home_address,
        unit_optional,
        city,
        province,
        postal_code,
        telephone_number,
        email,
        gross_annual_income,
        down_payment_amount,
        terms_confirmed,
        created_by
    ) VALUES (
        p_user_id,
        p_request_type,
        p_interested_purchase_home,
        p_interested_move_mortgage,
        p_interested_refinance,
        p_full_name,
        p_date_of_birth,
        p_ssn,
        p_marital_status,
        p_home_address,
        p_unit_optional,
        p_city,
        p_province,
        p_postal_code,
        p_telephone_number,
        p_email,
        p_gross_annual_income,
        p_down_payment_amount,
        p_terms_confirmed,
        p_created_by
    );

    -- return inserted id
    SELECT LAST_INSERT_ID() AS inserted_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_mortgage_rate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_mortgage_rate`(
    IN p_mortgage_type VARCHAR(100),
    IN p_rate DECIMAL(5,2),
    IN p_apr DECIMAL(5,3),
    IN p_point DECIMAL(6,3),
    IN p_monthly_payment DECIMAL(10,2),
    IN p_status ENUM('pending','approved','rejected'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_mortgage_rates (
        mortgage_type,
        rate,
        apr,
        point,
        monthly_payment,
        status,
        created_by
    )
    VALUES (
        p_mortgage_type,
        p_rate,
        p_apr,
        p_point,
        p_monthly_payment,
        p_status,
        p_created_by
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_news_comment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_news_comment`(
    IN p_news_id INT,
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(150),
    IN p_phone VARCHAR(20),
    IN p_website VARCHAR(255),
    IN p_comment TEXT,
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_news_comments (
        news_id,
        name,
        email,
        phone,
        website,
        comment,
        created_by
    )
    VALUES (
        p_news_id,
        p_name,
        p_email,
        p_phone,
        p_website,
        p_comment,
        p_created_by
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_open_account` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_open_account`(
    IN p_user_id INT,
    IN p_first_name VARCHAR(100),
    IN p_middle_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_taxpayer_type ENUM('ssn','itin'),
    IN p_taxpayer_number VARCHAR(20),
    IN p_id_type ENUM('business','passport','student'),
    IN p_id_number VARCHAR(50),
    IN p_state_of_issue VARCHAR(100),
    IN p_id_expiration_date DATE,
    IN p_date_of_birth DATE,
    IN p_citizenship VARCHAR(100),
    IN p_email VARCHAR(150),
    IN p_phone_number VARCHAR(20),
    IN p_home_address_1 TEXT,
    IN p_home_address_2 TEXT,
    IN p_city VARCHAR(100),
    IN p_state VARCHAR(100),
    IN p_zip_code VARCHAR(20),
    IN p_profession VARCHAR(100),
    IN p_terms_accepted TINYINT,
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_open_accounts (
        user_id,
        first_name,
        middle_name,
        last_name,
        taxpayer_type,
        taxpayer_number,
        id_type,
        id_number,
        state_of_issue,
        id_expiration_date,
        date_of_birth,
        citizenship,
        email,
        phone_number,
        home_address_1,
        home_address_2,
        city,
        state,
        zip_code,
        profession,
        terms_accepted,
        created_by
    ) VALUES (
        p_user_id,
        p_first_name,
        p_middle_name,
        p_last_name,
        p_taxpayer_type,
        p_taxpayer_number,
        p_id_type,
        p_id_number,
        p_state_of_issue,
        p_id_expiration_date,
        p_date_of_birth,
        p_citizenship,
        p_email,
        p_phone_number,
        p_home_address_1,
        p_home_address_2,
        p_city,
        p_state,
        p_zip_code,
        p_profession,
        p_terms_accepted,
        p_created_by
    );

    SELECT LAST_INSERT_ID() AS inserted_id;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_service` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_service`(
    IN p_category_id INT,
    IN p_title VARCHAR(200),
    IN p_slug VARCHAR(200),
    IN p_short_description VARCHAR(500),
    IN p_thumbnail VARCHAR(255),
    IN p_status ENUM('active', 'inactive'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_services (
        category_id,
        title,
        slug,
        short_description,
        thumbnail,
        status,
        created_by
    ) VALUES (
        p_category_id,
        p_title,
        p_slug,
        p_short_description,
        p_thumbnail,
        p_status,
        p_created_by
    );

    SELECT LAST_INSERT_ID() AS new_service_id;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_add_subscriber` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_subscriber`(
    IN p_email VARCHAR(255),
    IN p_ip_address VARCHAR(45),
    IN p_created_by INT
)
BEGIN
    DECLARE v_id INT;

    -- check if email already exists
    SELECT id INTO v_id
    FROM tbl_subscribers
    WHERE email = p_email
    LIMIT 1;

    IF v_id IS NULL THEN
        -- new subscriber
        INSERT INTO tbl_subscribers (
            email,
            status,
            ip_address,
            created_by,
            created_at
        ) VALUES (
            p_email,
            'active',
            p_ip_address,
            p_created_by,
            NOW()
        );
    ELSE
        -- existing subscriber → re-activate
        UPDATE tbl_subscribers
        SET
            status = 'active',
            unsubscribed_at = NULL,
            ip_address = p_ip_address,
            updated_by = p_created_by,
            updated_at = NOW()
        WHERE id = v_id;
    END IF;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_case_study` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_case_study`(
    IN p_id INT
)
BEGIN
    DELETE FROM tbl_case_studies
    WHERE id = p_id;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_credit_card_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_credit_card_category`(
    IN p_id INT,
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_credit_card_categories
    SET
        status = 'inactive',
        updated_by = p_updated_by,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_id;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_mortgage_rate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_mortgage_rate`(
    IN p_id INT,
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_mortgage_rates
    SET
        status = 'rejected',
        updated_by = p_updated_by,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_news` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_news`(
    IN p_id INT
)
BEGIN
    DELETE FROM tbl_news 
    WHERE id = p_id;

    SELECT ROW_COUNT() AS affected_rows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_news_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_news_category`(
    IN p_id INT
)
BEGIN
    DELETE FROM tbl_news_categories
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_news_tag` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_news_tag`(
    IN p_id INT
)
BEGIN
    DELETE FROM tbl_news_tags
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_service` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_service`(
    IN p_id INT
)
BEGIN
    DELETE FROM tbl_services WHERE id = p_id;

    SELECT 
        'Service deleted successfully' AS message,
        p_id AS deleted_id,
        ROW_COUNT() AS affected_rows;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_loan_applications` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_loan_applications`()
BEGIN
    SELECT 
        la.id,
        la.user_id,
        la.first_name,
        la.date_of_birth,
        la.telephone,
        la.email,
        la.marital_status,
        la.home_address,
        la.city,
        la.postal_code,
        la.profession,
        la.organization_name,
        la.monthly_income,
        la.desired_amount,
        la.loan_tenure_month,
        la.existing_loan_tenure_month,
        la.created_at,
        la.updated_at
    FROM tbl_loan_applications la
    ORDER BY la.created_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_mortgage_rates` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_mortgage_rates`()
BEGIN
    SELECT
        id,
        mortgage_type,
        rate,
        apr,
        point,
        monthly_payment,
        status,
        created_at,
        updated_at,
        created_by,
        updated_by
    FROM tbl_mortgage_rates
    ORDER BY created_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_news` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_news`(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT *
    FROM tbl_news
    ORDER BY id DESC
    LIMIT p_offset, p_limit;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_all_open_accounts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_open_accounts`()
BEGIN
    SELECT
        oa.id,
        oa.user_id,
        oa.first_name,
        oa.middle_name,
        oa.last_name,
        oa.taxpayer_type,
        oa.taxpayer_number,
        oa.id_type,
        oa.id_number,
        oa.state_of_issue,
        oa.id_expiration_date,
        oa.date_of_birth,
        oa.citizenship,
        oa.email,
        oa.phone_number,
        oa.home_address_1,
        oa.home_address_2,
        oa.city,
        oa.state,
        oa.zip_code,
        oa.profession,
        oa.terms_accepted,
        oa.status,
        oa.created_at,
        oa.updated_at
    FROM tbl_open_accounts oa
    ORDER BY oa.created_at DESC;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_case_studies` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_case_studies`(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT *
    FROM tbl_case_studies
    ORDER BY id DESC
    LIMIT p_limit OFFSET p_offset;

    SELECT COUNT(*) AS total
    FROM tbl_case_studies;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_case_study_by_slug` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_case_study_by_slug`(
    IN p_slug VARCHAR(255)
)
BEGIN
    SELECT *
    FROM tbl_case_studies
    WHERE slug = p_slug
    LIMIT 1;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_credit_card_categories_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_credit_card_categories_admin`()
BEGIN
    SELECT
        id,
        name,
        slug,
        icon,
        total_cards,
        status,
        created_by,
        updated_by,
        created_at,
        updated_at
    FROM tbl_credit_card_categories
    ORDER BY created_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_credit_card_categories_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_credit_card_categories_user`()
BEGIN
    SELECT
        id,
        name,
        slug,
        icon,
        total_cards
    FROM tbl_credit_card_categories
    WHERE status = 'active'
    ORDER BY created_at DESC;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_mortgage_applications` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_mortgage_applications`()
BEGIN
    SELECT
        id,
        user_id,
        request_type,
        interested_purchase_home,
        interested_move_mortgage,
        interested_refinance,
        full_name,
        date_of_birth,
        ssn,
        marital_status,
        home_address,
        unit_optional,
        city,
        province,
        postal_code,
        telephone_number,
        email,
        gross_annual_income,
        down_payment_amount,
        terms_confirmed,
        status,
        created_at
    FROM tbl_mortgage_applications
    ORDER BY created_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_mortgage_rates` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_mortgage_rates`()
BEGIN
    SELECT
        id,
        mortgage_type,
        rate,
        apr,
        point,
        monthly_payment,
        status,
        created_at
    FROM tbl_mortgage_rates
    WHERE status = 'approved'
    ORDER BY created_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_news_by_slug` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_news_by_slug`(IN p_slug VARCHAR(255))
BEGIN
    SELECT 
        n.id,
        n.title,
        n.slug,
        n.short_description,
        n.content,
        DATE_FORMAT(n.published_date, '%Y-%m-%d') AS published_date,
        n.thumbnail,
        n.category_id,
        n.author,
        n.status,
        n.created_at,
        n.updated_at,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT('tag_id', t.id, 'tag_name', t.name)
            )
            FROM tbl_news_tags_map m
            JOIN tbl_news_tags t ON m.tag_id = t.id
            WHERE m.news_id = n.id
        ) AS tags
    FROM tbl_news n
    WHERE n.slug = p_slug
    LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_news_categories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_news_categories`()
BEGIN
    SELECT *
    FROM tbl_news_categories
    ORDER BY id DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_news_comments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_news_comments`(
    IN p_news_id INT
)
BEGIN
    SELECT
        id,
        news_id,
        name,
        website,
        comment,
        created_at
    FROM tbl_news_comments
    WHERE news_id = p_news_id
      AND status = 'approved'
    ORDER BY created_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_news_tags` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_news_tags`()
BEGIN
    SELECT *
    FROM tbl_news_tags
    ORDER BY id DESC;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_services` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_services`(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT COUNT(*) AS total FROM tbl_services;

    SELECT 
        s.id,
        s.category_id,
        c.name AS category_name,
        s.title,
        s.slug,
        s.short_description,
        s.thumbnail,
        s.status,
        s.created_by,
        s.updated_by,
        s.created_at,
        s.updated_at
    FROM tbl_services s
    LEFT JOIN tbl_service_categories c ON s.category_id = c.id
    ORDER BY s.id DESC
    LIMIT p_limit OFFSET p_offset;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_service_by_slug` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_service_by_slug`(
    IN p_slug VARCHAR(200)
)
BEGIN
    SELECT 
        s.id,
        s.category_id,
        c.name AS category_name,
        s.title,
        s.slug,
        s.short_description,
        s.thumbnail,
        s.status,
        s.created_by,
        s.updated_by,
        s.created_at,
        s.updated_at
    FROM tbl_services s
    LEFT JOIN tbl_service_categories c ON s.category_id = c.id
    WHERE s.slug = p_slug
    LIMIT 1;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_subscribers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_subscribers`(
    IN p_page INT,
    IN p_limit INT,
    IN p_search VARCHAR(255),
    IN p_status VARCHAR(20)
)
BEGIN
    DECLARE v_offset INT;
    SET v_offset = (p_page - 1) * p_limit;

    /* =========================
       TOTAL COUNT
    ========================== */
    SELECT COUNT(*) AS total
    FROM tbl_subscribers
    WHERE
        (p_search IS NULL OR email LIKE CONCAT('%', p_search, '%'))
        AND (p_status IS NULL OR status = p_status);

    /* =========================
       DATA LIST
    ========================== */
    SELECT
        id,
        email,
        status,
        ip_address,
        subscribed_at,
        unsubscribed_at,
        created_at,
        updated_at
    FROM tbl_subscribers
    WHERE
        (p_search IS NULL OR email LIKE CONCAT('%', p_search, '%'))
        AND (p_status IS NULL OR status = p_status)
    ORDER BY created_at DESC
    LIMIT p_limit OFFSET v_offset;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_case_study` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_case_study`(
    IN p_title VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_thumbnail VARCHAR(255),
    IN p_client VARCHAR(255),
    IN p_sector VARCHAR(255),
    IN p_location VARCHAR(255),
    IN p_overview TEXT,
    IN p_status ENUM('active','inactive'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_case_studies (
        title, slug, thumbnail, client, sector, location,
        overview, status, created_by
    )
    VALUES (
        p_title, p_slug, p_thumbnail, p_client, p_sector, p_location,
        p_overview, p_status, p_created_by
    );
     SELECT LAST_INSERT_ID() AS case_study_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_news` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_news`(
    IN p_title VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_short_description VARCHAR(500),
    IN p_content LONGTEXT,
    IN p_published_date DATE,
    IN p_thumbnail VARCHAR(255),
    IN p_category_id INT,
    IN p_author VARCHAR(150),
    IN p_status ENUM('active','inactive'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_news (
        title,
        slug,
        short_description,
        content,
        published_date,
        thumbnail,
        category_id,
        author,
        status,
        created_by
    )
    VALUES (
        p_title,
        p_slug,
        p_short_description,
        p_content,
        p_published_date,
        p_thumbnail,
        p_category_id,
        p_author,
        p_status,
        p_created_by
    );

    SELECT LAST_INSERT_ID() AS news_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_news_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_news_category`(
    IN p_name VARCHAR(150),
    IN p_slug VARCHAR(200),
    IN p_status ENUM('active','inactive'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_news_categories (name, slug, status, created_by)
    VALUES (p_name, p_slug, p_status, p_created_by);

    SELECT LAST_INSERT_ID() AS category_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_news_tag` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_news_tag`(
    IN p_name VARCHAR(150),
    IN p_slug VARCHAR(200),
    IN p_status ENUM('active','inactive'),
    IN p_created_by INT
)
BEGIN
    INSERT INTO tbl_news_tags (name, slug, status, created_by)
    VALUES (p_name, p_slug, p_status, p_created_by);

    -- return last inserted id
    SELECT LAST_INSERT_ID() AS tag_id;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_case_study` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_case_study`(
    IN p_id INT,
    IN p_title VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_thumbnail VARCHAR(255),
    IN p_client VARCHAR(255),
    IN p_sector VARCHAR(255),
    IN p_location VARCHAR(255),
    IN p_overview TEXT,
    IN p_status ENUM('active','inactive'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_case_studies
    SET 
        title = p_title,
        slug = p_slug,
        thumbnail = p_thumbnail,
        client = p_client,
        sector = p_sector,
        location = p_location,
        overview = p_overview,
        status = p_status,
        updated_by = p_updated_by
    WHERE id = p_id;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_credit_card_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_credit_card_category`(
    IN p_id INT,
    IN p_name VARCHAR(100),
    IN p_slug VARCHAR(120),
    IN p_icon VARCHAR(255),
    IN p_status ENUM('active','inactive'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_credit_card_categories
    SET
        name = p_name,
        slug = p_slug,
        icon = p_icon,
        status = p_status,
        updated_by = p_updated_by,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_id;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_mortgage_rate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_mortgage_rate`(
    IN p_id INT,
    IN p_mortgage_type VARCHAR(100),
    IN p_rate DECIMAL(5,2),
    IN p_apr DECIMAL(5,3),
    IN p_point DECIMAL(6,3),
    IN p_monthly_payment DECIMAL(10,2),
    IN p_status ENUM('pending','approved','rejected'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_mortgage_rates
    SET
        mortgage_type   = p_mortgage_type,
        rate            = p_rate,
        apr             = p_apr,
        point           = p_point,
        monthly_payment = p_monthly_payment,
        status          = p_status,
        updated_by      = p_updated_by,
        updated_at      = CURRENT_TIMESTAMP
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_news` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_news`(
    IN p_id INT,
    IN p_title VARCHAR(255),
    IN p_slug VARCHAR(255),
    IN p_short_description VARCHAR(500),
    IN p_content LONGTEXT,
    IN p_published_date DATE,
    IN p_thumbnail VARCHAR(255),
    IN p_category_id INT,
    IN p_author VARCHAR(150),
    IN p_status ENUM('active','inactive'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_news
    SET
        title = p_title,
        slug = p_slug,
        short_description = p_short_description,
        content = p_content,
        published_date = p_published_date,
        thumbnail = p_thumbnail,
        category_id = p_category_id,
        author = p_author,
        status = p_status,
        updated_by = p_updated_by,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_id;

    SELECT ROW_COUNT() AS affected_rows;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_news_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_news_category`(
    IN p_id INT,
    IN p_name VARCHAR(150),
    IN p_slug VARCHAR(200),
    IN p_status ENUM('active','inactive'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_news_categories
    SET 
        name = p_name,
        slug = p_slug,
        status = p_status,
        updated_by = p_updated_by
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_news_tag` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_news_tag`(
    IN p_id INT,
    IN p_name VARCHAR(150),
    IN p_slug VARCHAR(200),
    IN p_status ENUM('active','inactive'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_news_tags
    SET 
        name = p_name,
        slug = p_slug,
        status = p_status,
        updated_by = p_updated_by,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_service` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_service`(
    IN p_id INT,
    IN p_category_id INT,
    IN p_title VARCHAR(200),
    IN p_slug VARCHAR(200),
    IN p_short_description VARCHAR(500),
    IN p_thumbnail VARCHAR(255),
    IN p_status ENUM('active', 'inactive'),
    IN p_updated_by INT
)
BEGIN
    UPDATE tbl_services
    SET
        category_id = p_category_id,
        title = p_title,
        slug = p_slug,
        short_description = p_short_description,
        thumbnail = p_thumbnail,
        status = p_status,
        updated_by = p_updated_by
    WHERE id = p_id;

    SELECT 
        'Service updated successfully' AS message,
        p_id AS updated_id,
        p_updated_by AS updated_by_id;
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

-- Dump completed on 2025-12-24 17:36:56
