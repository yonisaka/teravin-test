/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.19-MariaDB : Database - teravin
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`teravin` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `teravin`;

/*Table structure for table `alamat` */

DROP TABLE IF EXISTS `alamat`;

CREATE TABLE `alamat` (
  `id_employee` bigint(20) DEFAULT NULL,
  `alamat` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `alamat` */

insert  into `alamat`(`id_employee`,`alamat`) values 
(21070001,'Yogyakarta'),
(21070002,'Jakarta'),
(21070002,'Bandung'),
(21070003,'Solo'),
(21070004,'Bali'),
(21070005,'Surabaya'),
(21070006,'Klaten');

/*Table structure for table `employee` */

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `employee` */

insert  into `employee`(`id`,`name`,`email`,`mobile`,`birth_date`,`created_at`,`updated_at`) values 
(21070001,'Yoni Saka Samudra','admin-sidikaama@lpdb.id','1111','2021-07-15',NULL,NULL),
(21070002,'User tes','tes@gmail.com','081299213123','2020-07-02',NULL,NULL),
(21070003,'User tes 2','tes2@gmail.com','1231221323','2021-07-03',NULL,NULL),
(21070004,'lacrose','lacrose@gmail.com','123123123','2021-07-08',NULL,NULL),
(21070005,'claire','claire@gmail.com','21213213213','2021-07-09',NULL,NULL),
(21070006,'luna','luna@gmail.com','31231231','2021-07-08',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
