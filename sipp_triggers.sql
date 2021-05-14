/*
SQLyog Professional v12.5.1 (64 bit)
MySQL - 10.3.28-MariaDB : Database - sipp2
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/* Trigger structure for table `perkara_akta_cerai` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `akta_cerai_to_nisa` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `akta_cerai_to_nisa` AFTER UPDATE ON `perkara_akta_cerai` FOR EACH ROW 
BEGIN
	IF (NEW.nomor_akta_cerai is not null) THEN
		INSERT INTO notif_nisa.notif(perkara_id, tentang, `status`) VALUES(new.perkara_id, 'AKTA', 0);
	end if;
END */$$


DELIMITER ;

/* Trigger structure for table `perkara_putusan` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `bht_to_nisa` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `bht_to_nisa` AFTER UPDATE ON `perkara_putusan` FOR EACH ROW 
BEGIN
	IF OLD.tanggal_bht <> new.tanggal_bht THEN
		INSERT INTO notif_nisa.notif(perkara_id, tentang, `status`) VALUES(new.perkara_id, 'BHT', 0);
	end if;
END */$$


DELIMITER ;

/* Trigger structure for table `dirput_antrian` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `edok_putusan_to_pp` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `edok_putusan_to_pp` AFTER INSERT ON `dirput_antrian` FOR EACH ROW 
insert into notif_nisa.`notif` (perkara_id, tentang, status) values(new.perkara_id, 'EDOK', 0) */$$


DELIMITER ;

/* Trigger structure for table `perkara_mediasi` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `mediasi_to_nisa` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `mediasi_to_nisa` AFTER INSERT ON `perkara_mediasi` FOR EACH ROW 
BEGIN
	INSERT INTO notif_nisa.notif(perkara_id, tentang, `status`) VALUES(new.perkara_id, 'MEDIASI', 0);
END */$$


DELIMITER ;

/* Trigger structure for table `perkara` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `perkara_to_nisa` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `perkara_to_nisa` AFTER INSERT ON `perkara` FOR EACH ROW 
insert into notif_nisa.`notif` (perkara_id, tentang, `status`) values(new.perkara_id, 'Perkara Baru', 0) */$$


DELIMITER ;

/* Trigger structure for table `perkara` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `perkara_to_user` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `perkara_to_user` AFTER INSERT ON `perkara` FOR EACH ROW 
insert into notif_nisa.`users` (name, username, password, otoritas, table_reference, user_id, sipp_userid) values(new.nomor_perkara, new.nomor_perkara, 'e10adc3949ba59abbe56e057f20f883e', 'pihak', 'pihak', new.perkara_id, NULL) */$$


DELIMITER ;

/* Trigger structure for table `perkara_ikrar_talak` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `phs_ikrar_to_nisa` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `phs_ikrar_to_nisa` AFTER UPDATE ON `perkara_ikrar_talak` FOR EACH ROW 
BEGIN
	IF OLD.tgl_ikrar_talak <> new.tgl_ikrar_talak THEN
		INSERT INTO notif_nisa.notif(perkara_id, tentang, `status`) VALUES(new.perkara_id, 'PHS IKRAR', 0);
	end if;
END */$$


DELIMITER ;

/* Trigger structure for table `perkara_penetapan_hari_sidang` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `phs_to_nisa` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `phs_to_nisa` AFTER INSERT ON `perkara_penetapan_hari_sidang` FOR EACH ROW 
insert into notif_nisa.`notif` (perkara_id, tentang, `status`) values(new.perkara_id, 'PHS', 0) */$$


DELIMITER ;

/* Trigger structure for table `perkara_jurusita` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `pjs_to_nisa` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `pjs_to_nisa` AFTER INSERT ON `perkara_jurusita` FOR EACH ROW 
insert into notif_nisa.`notif` (perkara_id, tentang, `status`) values(new.perkara_id, 'PJS', 0) */$$


DELIMITER ;

/* Trigger structure for table `perkara_ikrar_talak` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `pmh_ikrar_to_nisa` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `pmh_ikrar_to_nisa` AFTER INSERT ON `perkara_ikrar_talak` FOR EACH ROW 
insert into notif_nisa.`notif` (perkara_id, tentang, status) values(new.perkara_id, 'PMH IKRAR', 0) */$$


DELIMITER ;

/* Trigger structure for table `perkara_penetapan` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `pmh_to_nisa` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `pmh_to_nisa` AFTER INSERT ON `perkara_penetapan` FOR EACH ROW 
insert into notif_nisa.`notif` (perkara_id, tentang, `status`) values(new.perkara_id, 'PMH', 0) */$$


DELIMITER ;

/* Trigger structure for table `perkara_panitera_pn` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `pp_to_nisa` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `pp_to_nisa` AFTER INSERT ON `perkara_panitera_pn` FOR EACH ROW 
insert into notif_nisa.`notif` (perkara_id, tentang, `status`) values(new.perkara_id, 'PPP', 0) */$$


DELIMITER ;

/* Trigger structure for table `perkara_putusan` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `putusan_to_nisa` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `putusan_to_nisa` AFTER INSERT ON `perkara_putusan` FOR EACH ROW 
insert into notif_nisa.`notif` (perkara_id, tentang, `status`) values(new.perkara_id, 'PUTUSAN', 0) */$$


DELIMITER ;

/* Trigger structure for table `perkara_jadwal_sidang` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `tundaan_to_pihak` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'apri'@'%' */ /*!50003 TRIGGER `tundaan_to_pihak` AFTER UPDATE ON `perkara_jadwal_sidang` FOR EACH ROW 
BEGIN
	IF OLD.ditunda <> new.ditunda THEN
		INSERT INTO notif_nisa.notif(perkara_id, tentang, `status`) VALUES(new.perkara_id, 'TUNDAAN', 0);
	end if;
END */$$


DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
