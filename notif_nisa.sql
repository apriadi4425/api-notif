/*
SQLyog Professional v12.5.1 (64 bit)
MySQL - 10.3.28-MariaDB : Database - notif_nisa
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `notif` */

DROP TABLE IF EXISTS `notif`;

CREATE TABLE `notif` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `perkara_id` bigint(11) NOT NULL COMMENT 'dari database sipp tabel perkara',
  `tentang` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0 COMMENT 'jika pesan sudah terkirim true, jika belum false',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=228 DEFAULT CHARSET=latin1;

/*Data for the table `notif` */

/*Table structure for table `penerima_notif` */

DROP TABLE IF EXISTS `penerima_notif`;

CREATE TABLE `penerima_notif` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `tanggal` date DEFAULT NULL,
  `notif_id` int(5) DEFAULT NULL,
  `user_id` int(5) DEFAULT NULL,
  `token_notif` varchar(255) DEFAULT NULL,
  `tentang` varchar(255) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `screen` varchar(255) DEFAULT NULL,
  `dibaca` int(5) DEFAULT 0,
  `status` tinyint(1) DEFAULT 0 COMMENT 'jika sudah menerima maka true',
  PRIMARY KEY (`id`),
  KEY `notif_id` (`notif_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `penerima_notif_ibfk_1` FOREIGN KEY (`notif_id`) REFERENCES `notif` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `penerima_notif_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=494 DEFAULT CHARSET=latin1;

/*Data for the table `penerima_notif` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `otoritas` varchar(255) DEFAULT NULL,
  `table_reference` varchar(255) DEFAULT NULL,
  `user_id` int(5) DEFAULT NULL,
  `sipp_userid` int(5) DEFAULT NULL,
  `token_notif` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
