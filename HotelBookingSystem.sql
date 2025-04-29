-- MySQL dump 10.13  Distrib 5.7.24, for osx11.1 (x86_64)
--
-- Host: localhost    Database: HotelBookingSystem
-- ------------------------------------------------------
-- Server version	9.2.0

DROP DATABASE IF EXISTS `HotelBookingSystem`;
CREATE DATABASE `HotelBookingSystem`;
USE `HotelBookingSystem`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amenities` (
  `AmenityID` int NOT NULL AUTO_INCREMENT,
  `AmenityName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`AmenityID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES (1,'Swimming Pool'),(2,'Fitness Center'),(3,'Restaurant'),(4,'Bar/Lounge'),(5,'24-Hour Front Desk'),(6,'Air Conditioning'),(7,'Non-Smoking Rooms'),(8,'Meeting Rooms'),(9,'Laundry Service'),(10,'Concierge Service');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking` (
  `BookingID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `HotelID` int DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `NumberOfRoom` int DEFAULT NULL,
  `TotalPrice` decimal(10,2) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`BookingID`),
  KEY `FK_Booking_User` (`UserID`),
  KEY `FK_Booking_Hotel` (`HotelID`),
  CONSTRAINT `FK_Booking_Hotel` FOREIGN KEY (`HotelID`) REFERENCES `hotel` (`HotelID`),
  CONSTRAINT `FK_Booking_User` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,1,1,'2025-05-01','2025-05-05',1,250.00,'Confirmed'),(2,2,2,'2025-05-10','2025-05-12',2,241.00,'Confirmed'),(3,3,3,'2025-06-01','2025-06-03',1,350.75,'Pending'),(4,4,4,'2025-06-15','2025-06-20',1,901.00,'Confirmed'),(5,5,5,'2025-07-01','2025-07-07',2,1476.30,'Cancelled'),(6,6,6,'2025-07-10','2025-07-14',1,801.60,'Confirmed'),(7,7,7,'2025-08-01','2025-08-03',1,301.20,'Confirmed'),(8,8,8,'2025-08-15','2025-08-18',2,1202.40,'Pending'),(9,9,9,'2025-09-01','2025-09-04',1,900.30,'Confirmed'),(10,10,10,'2025-09-10','2025-09-11',1,190.80,'Confirmed'),(11,15,10,'2025-04-16','2025-04-18',1,200.00,'Confirmed'),(12,15,10,'2025-04-16','2025-04-18',1,200.00,'Confirmed'),(13,15,10,'2025-04-16','2025-04-18',1,200.00,'Confirmed');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `freebies`
--

DROP TABLE IF EXISTS `freebies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `freebies` (
  `FreebieID` int NOT NULL AUTO_INCREMENT,
  `FreebieName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`FreebieID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freebies`
--

LOCK TABLES `freebies` WRITE;
/*!40000 ALTER TABLE `freebies` DISABLE KEYS */;
INSERT INTO `freebies` VALUES (1,'Free Breakfast'),(2,'Complimentary Wi-Fi'),(3,'Airport Shuttle'),(4,'Welcome Drink'),(5,'Spa Discount'),(6,'City Tour'),(7,'Parking Included'),(8,'Late Check-out'),(9,'Early Check-in'),(10,'Room Upgrade');
/*!40000 ALTER TABLE `freebies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel`
--

DROP TABLE IF EXISTS `hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotel` (
  `HotelID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `reviews` text,
  `price` decimal(10,2) DEFAULT NULL,
  `ReviewID` int DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `room` int DEFAULT NULL,
  `isAvailable` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`HotelID`),
  KEY `FK_Hotel_Reviews` (`ReviewID`),
  CONSTRAINT `FK_Hotel_Reviews` FOREIGN KEY (`ReviewID`) REFERENCES `reviews` (`ReviewID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel`
--

LOCK TABLES `hotel` WRITE;
/*!40000 ALTER TABLE `hotel` DISABLE KEYS */;
INSERT INTO `hotel` VALUES (1,'Rishi Sunak Hotel','10 Downing St','London','4.8','Excellent stay!',250.00,NULL,'United Kingdom',10,1),(2,'Sherlock Holmes','221B Baker St','London','4.2','Comfortable and clean',120.50,NULL,'United Kingdom',22,1),(3,'Grand Hyatt','123 Park Ave','New York','4.9','Amazing service',350.75,NULL,'United States',6,1),(4,'Centara Grand Ladprao','1695 Phahonyothin Rd','Bangkok','4.5','Great location',180.20,NULL,'Thailand',12,1),(5,'Mandarin Orental','48 Oriental Ave','Bangkok','4.7','Beautiful views',210.90,NULL,'Thailand',15,1),(6,'The Shore','18 Kata Noi Rd','Phuket','4.6','Relaxing atmosphere',280.00,NULL,'Thailand',12,1),(7,'Lanna Thaphae','6 kotchasarn1','Chiang Mai','4.3','Rustic charm',150.60,NULL,'Thailand',22,1),(8,'Marina Bay Sands','10 Bayfront Ave','Singapore','4.4','Convenient location',200.40,NULL,'Singapore',24,1),(9,'Island Paradise','444 Coral Way','Bali','4.9','Perfect getaway',300.10,NULL,'Indonesia',5,1),(10,'Heritage House','555 Old Town','Kyoto','4.7','Traditional experience',190.80,NULL,'Japan',3,1),(20,'Keng Hotel','99 Phuttamonton','Nakhon Pathom','2.3','6',22.50,NULL,'Thailand',NULL,1),(22,'Grand Hyatt Tokyo','6-10-3 Roppongi','Tokyo','4.7','23',190.30,NULL,'Japan',NULL,1),(23,'Park Hyatt Bangkok','88 Wireless Road, Lumpini','Bangkok','4.5','16',220.40,NULL,'Thailand',NULL,1);
/*!40000 ALTER TABLE `hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel_amenities`
--

DROP TABLE IF EXISTS `hotel_amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotel_amenities` (
  `HotelID` int NOT NULL,
  `AmenityID` int NOT NULL,
  PRIMARY KEY (`HotelID`,`AmenityID`),
  KEY `FK_HotelAmenities_Amenities` (`AmenityID`),
  CONSTRAINT `FK_HotelAmenities_Amenities` FOREIGN KEY (`AmenityID`) REFERENCES `amenities` (`AmenityID`),
  CONSTRAINT `FK_HotelAmenities_Hotel` FOREIGN KEY (`HotelID`) REFERENCES `hotel` (`HotelID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel_amenities`
--

LOCK TABLES `hotel_amenities` WRITE;
/*!40000 ALTER TABLE `hotel_amenities` DISABLE KEYS */;
INSERT INTO `hotel_amenities` VALUES (1,1),(3,1),(5,1),(6,1),(9,1),(3,2),(1,3),(4,3),(8,3),(10,3),(2,4),(5,4),(4,5),(2,6),(7,6),(10,6),(6,7),(8,8),(7,9),(9,10);
/*!40000 ALTER TABLE `hotel_amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel_freebies`
--

DROP TABLE IF EXISTS `hotel_freebies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotel_freebies` (
  `HotelID` int NOT NULL,
  `FreebieID` int NOT NULL,
  PRIMARY KEY (`HotelID`,`FreebieID`),
  KEY `FK_HotelFreebies_Freebies` (`FreebieID`),
  CONSTRAINT `FK_HotelFreebies_Freebies` FOREIGN KEY (`FreebieID`) REFERENCES `freebies` (`FreebieID`),
  CONSTRAINT `FK_HotelFreebies_Hotel` FOREIGN KEY (`HotelID`) REFERENCES `hotel` (`HotelID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel_freebies`
--

LOCK TABLES `hotel_freebies` WRITE;
/*!40000 ALTER TABLE `hotel_freebies` DISABLE KEYS */;
INSERT INTO `hotel_freebies` VALUES (1,1),(3,1),(5,1),(9,1),(1,2),(2,2),(4,2),(5,2),(6,2),(7,2),(8,2),(9,2),(10,2),(3,3),(4,4),(6,5),(7,6),(2,7),(8,7),(10,8);
/*!40000 ALTER TABLE `hotel_freebies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `url1` varchar(255) DEFAULT NULL,
  `url2` varchar(255) DEFAULT NULL,
  `url3` varchar(255) DEFAULT NULL,
  `url4` varchar(255) DEFAULT NULL,
  `url5` varchar(255) DEFAULT NULL,
  `HotelID` int DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `HotelID` (`HotelID`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`HotelID`) REFERENCES `hotel` (`HotelID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10032155-e4fb6a5cf362cc3bff1e5eea01d0644b.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10032155-7a48915254bba9027cef9882e7185846.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10032155-515e2e5a7a6d1ee5028adacb602c00cd.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10032155-776ae1758c6eaa7861d9acaf18b59dd4.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10032155-b3d1328197d6c450f7450bf4c19414c0.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640',1),(2,'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/67715290-2048x1365-FIT_AND_TRIM-3c791eec9d58dcc632c2029485fa2a6d.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10038573-50cc0683b8abf7aaf51b11f1a6a09f5b.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10038573-512e92859b4abdd89943b210f9ef81bf.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10038573-29f986b07c2648aa3398ff6677e41f79.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10038573-6152683d61b992e74079a2e3034d82e0.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640',2),(3,'https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10017814-d2ae9c95b81c5feef5a2573f9c30531d.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10017814-f40533315d95348369312a6a50ff215e.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10017814-3b3733a914382b9fae54eaed8d9f6b78.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10017814-e4404edea766b24acbe44814efe232ad.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10017814-8250697ed3034fc3a40402b0d78e4910.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640',3),(5,'https://images.unsplash.com/photo-1741851374655-3911c1b0e95a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',NULL,NULL,NULL,NULL,12),(8,'https://images.unsplash.com/photo-1741851374655-3911c1b0e95a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',NULL,NULL,NULL,NULL,15),(9,'https://images.unsplash.com/photo-1741851374655-3911c1b0e95a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',NULL,NULL,NULL,NULL,16),(11,NULL,NULL,NULL,NULL,NULL,18),(12,'https://images.unsplash.com/photo-1741606552241-fbd67e574f7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8','https://images.unsplash.com/photo-1741606552241-fbd67e574f7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8','https://images.unsplash.com/photo-1741606552241-fbd67e574f7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8','https://images.unsplash.com/photo-1741606552241-fbd67e574f7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8','https://images.unsplash.com/photo-1741606552241-fbd67e574f7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',19),(13,'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20040200-82d1cf13bbf481ddf6509bdd642b84ae.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20040200-cb56252710f90858f6f9e09d4ce3b860.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20040200-e475b6c8abe663b3fb04ce93ce49d891.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20040200-10bcf6429782158e4d2060915a056e19.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20040200-64ce673b2a959de60d7af1e3ee27861f.jpeg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640',20),(15,'https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/1000000/10000/2200/2167/c9f54a06_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/1000000/10000/2200/2167/755f2eb0_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/1000000/10000/2200/2167/3267d447_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/1000000/10000/2200/2167/cd55e921_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/1000000/10000/2200/2167/a752fff4_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640',22),(16,'https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/18000000/17410000/17405100/17405012/284e354f_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/18000000/17410000/17405100/17405012/0f05f139_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/18000000/17410000/17405100/17405012/eab0a1c0_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/18000000/17410000/17405100/17405012/ba494c8c_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640','https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/18000000/17410000/17405100/17405012/c7ed6fc6_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-360,pr-true,q-80,w-640',23);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_log`
--

DROP TABLE IF EXISTS `login_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_log` (
  `LoginAttemptID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `LoginTime` datetime DEFAULT NULL,
  `LoginStatus` varchar(50) DEFAULT NULL,
  `IPAddress` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`LoginAttemptID`),
  KEY `FK_LoginLog_User` (`UserID`),
  CONSTRAINT `FK_LoginLog_User` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_log`
--

LOCK TABLES `login_log` WRITE;
/*!40000 ALTER TABLE `login_log` DISABLE KEYS */;
INSERT INTO `login_log` VALUES (1,1,'2025-04-12 21:17:03','Success','192.168.1.100'),(2,2,'2025-04-12 20:17:03','Failed','192.168.1.101'),(3,3,'2025-04-12 19:17:03','Success','192.168.1.102'),(4,4,'2025-04-12 18:17:03','Success','192.168.1.103'),(5,5,'2025-04-12 17:17:03','Failed','192.168.1.104'),(6,6,'2025-04-12 16:17:03','Success','192.168.1.105'),(7,7,'2025-04-12 15:17:03','Success','192.168.1.106'),(8,8,'2025-04-12 14:17:03','Failed','192.168.1.107'),(9,9,'2025-04-12 13:17:03','Success','192.168.1.108'),(10,10,'2025-04-12 12:17:03','Success','192.168.1.109'),(11,11,'2025-04-13 00:24:01','success','::1'),(12,NULL,'2025-04-13 00:26:06','user_not_found','::1'),(13,11,'2025-04-13 00:36:18','success','::1'),(14,11,'2025-04-13 00:41:28','success','::1'),(15,14,'2025-04-13 04:28:35','success','::1'),(16,11,'2025-04-13 04:38:52','success','::1'),(17,14,'2025-04-13 04:39:08','success','::1'),(18,11,'2025-04-13 04:43:15','success','::1'),(19,14,'2025-04-13 04:43:34','success','::1'),(20,11,'2025-04-13 04:54:28','success','::1'),(21,14,'2025-04-13 04:54:39','success','::1'),(22,11,'2025-04-13 04:55:02','success','::1'),(23,11,'2025-04-13 05:02:01','success','::1'),(24,11,'2025-04-13 05:09:22','success','::1'),(25,14,'2025-04-13 05:13:28','success','::1'),(26,11,'2025-04-13 05:13:57','success','::1'),(27,14,'2025-04-13 05:23:52','success','::1'),(28,11,'2025-04-13 05:37:07','success','::1'),(29,14,'2025-04-13 05:37:20','success','::1'),(30,11,'2025-04-13 05:42:13','success','::1'),(31,11,'2025-04-13 05:50:22','success','::1'),(32,14,'2025-04-13 05:51:32','success','::1'),(33,11,'2025-04-13 05:51:49','success','::1'),(34,11,'2025-04-13 05:59:55','success','::1'),(35,11,'2025-04-13 06:05:23','success','::1'),(36,11,'2025-04-13 06:06:10','success','::1'),(37,14,'2025-04-13 06:10:24','success','::1'),(38,11,'2025-04-13 06:13:46','success','::1'),(39,11,'2025-04-13 16:05:16','success','::1'),(40,11,'2025-04-13 16:14:58','success','::1'),(41,11,'2025-04-13 16:15:03','success','::1'),(42,11,'2025-04-13 16:15:12','success','::1'),(43,14,'2025-04-13 16:15:38','success','::1'),(44,11,'2025-04-13 16:15:45','success','::1'),(45,11,'2025-04-13 16:26:57','success','::1'),(46,11,'2025-04-13 16:27:42','success','::1'),(47,11,'2025-04-13 16:27:52','success','::1'),(48,11,'2025-04-13 16:40:07','success','::1'),(49,14,'2025-04-13 17:05:31','success','::1'),(50,11,'2025-04-13 17:05:38','success','::1'),(51,11,'2025-04-13 17:59:45','success','::1'),(52,11,'2025-04-13 18:27:36','success','::1'),(53,14,'2025-04-13 18:27:55','success','::1'),(54,11,'2025-04-13 18:55:15','success','::1'),(55,11,'2025-04-15 18:53:08','invalid_password','::1'),(56,11,'2025-04-15 18:53:29','invalid_password','::1'),(57,13,'2025-04-15 18:54:10','success','::1'),(58,11,'2025-04-15 18:54:30','invalid_password','::1'),(59,11,'2025-04-15 18:55:04','invalid_password','::1'),(60,11,'2025-04-15 18:55:12','invalid_password','::1'),(61,11,'2025-04-15 18:55:32','success','::1'),(62,15,'2025-04-16 18:16:54','success','::1'),(63,14,'2025-04-17 19:19:18','success','::1'),(64,15,'2025-04-17 19:20:12','success','::1'),(65,15,'2025-04-22 14:21:22','invalid_password','::1'),(66,15,'2025-04-22 14:21:27','success','::1'),(67,14,'2025-04-22 14:22:20','success','::1'),(68,15,'2025-04-24 12:16:04','success','::1');
/*!40000 ALTER TABLE `login_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentmethods`
--

DROP TABLE IF EXISTS `paymentmethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymentmethods` (
  `PaymentMethodID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `HolderName` varchar(255) NOT NULL,
  `CardNumber` varchar(20) DEFAULT NULL,
  `ExpirationDate` date DEFAULT NULL,
  `BillingAddress` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PaymentMethodID`),
  KEY `FK_PaymentMethods_User` (`UserID`),
  CONSTRAINT `FK_PaymentMethods_User` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentmethods`
--

LOCK TABLES `paymentmethods` WRITE;
/*!40000 ALTER TABLE `paymentmethods` DISABLE KEYS */;
INSERT INTO `paymentmethods` VALUES (1,1,'Steve Jobs','1234567890123456','2026-01-31','123 Main St'),(2,2,'Bill Gates','2222333344445555','2026-06-30','456 Oak Ave'),(3,3,'React Native','9876543210987654','2027-05-31','789 Pine Ln'),(4,4,'Type Script','4444555566667777','2026-08-31','101 Elm Rd'),(5,5,'Java Script','1111222233334444','2028-12-31','222 Willow Dr'),(6,6,'Ben Jamin','6666777788889999','2027-03-31','333 Maple Ct'),(7,7,'Kyle Walker','5555666677778888','2025-11-30','444 Birch Pl'),(8,8,'Loro Piana','8888999900001111','2027-09-30','555 Cedar Blvd'),(9,9,'Louis Vuitton','9999000011112222','2029-03-31','666 Spruce Way'),(10,10,'Pual Smith','1010101010101010','2027-12-31','777 Redwood Ln'),(25,15,'Kritchanat Kul','4222 4320 0065 4334','2031-01-01','258 Salaya'),(26,15,'Kritchanat Kul','3763 1936 0622 0133','2027-02-01','258 Salaya');
/*!40000 ALTER TABLE `paymentmethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `PaymentID` int NOT NULL AUTO_INCREMENT,
  `BookingID` int DEFAULT NULL,
  `PaymentDate` date DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  `PaymentMethod` varchar(50) DEFAULT NULL,
  `TransactionID` varchar(255) DEFAULT NULL,
  `PaymentGateway` varchar(255) DEFAULT NULL,
  `Currency` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`PaymentID`),
  KEY `FK_Payments_Booking` (`BookingID`),
  CONSTRAINT `FK_Payments_Booking` FOREIGN KEY (`BookingID`) REFERENCES `booking` (`BookingID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,'2025-04-30',250.00,'Credit Card','TXN12345','Stripe','USD'),(2,2,'2025-05-09',241.00,'PayPal','PYPL67890','PayPal','USD'),(3,3,'2025-05-31',350.75,'Credit Card','TXN11223','Visa','USD'),(4,4,'2025-06-14',901.00,'Bank Transfer','BT98765','Local Bank','THB'),(5,5,'2025-06-30',1476.30,'Credit Card','TXN44556','MasterCard','THB'),(6,6,'2025-07-09',801.60,'PayPal','PYPL22334','PayPal','SGD'),(7,7,'2025-07-31',301.20,'Credit Card','TXN77889','Amex','USD'),(8,8,'2025-08-14',1202.40,'Bank Transfer','BT33445','Local Bank','SGD'),(9,9,'2025-08-31',900.30,'Credit Card','TXN99001','Visa','JPY'),(10,10,'2025-09-09',190.80,'PayPal','PYPL55667','PayPal','JPY');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `ReviewID` int NOT NULL AUTO_INCREMENT,
  `HotelID` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `Rating` int DEFAULT NULL,
  `ReviewText` text,
  `ReviewDate` date DEFAULT NULL,
  PRIMARY KEY (`ReviewID`),
  KEY `FK_Reviews_Hotel` (`HotelID`),
  KEY `FK_Reviews_User` (`UserID`),
  CONSTRAINT `FK_Reviews_Hotel` FOREIGN KEY (`HotelID`) REFERENCES `hotel` (`HotelID`),
  CONSTRAINT `FK_Reviews_User` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,1,5,'Fantastic hotel, highly recommended.','2025-04-01'),(2,2,4,4,'Good value for money.','2025-04-02'),(3,3,2,5,'Exceptional service and amenities.','2025-04-03'),(4,4,5,4,'Convenient location for exploring the city.','2025-04-04'),(5,5,3,5,'The river view was stunning.','2025-04-05'),(6,6,8,4,'Enjoyed the beach access.','2025-04-06'),(7,7,6,3,'A bit outdated but still cozy.','2025-04-07'),(8,8,9,4,'Easy access to public transport.','2025-04-08'),(9,9,7,5,'An unforgettable island experience.','2025-04-09'),(10,10,10,4,'Loved the traditional Japanese style.','2025-04-10');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `UserType` enum('Guest','Admin','Employee') DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `PasswordHash` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Steve Jobs','Guest','guest1@example.com','hashed_password_1','123-456-7890','1990-01-15','123 Main St'),(2,'Bill Gates','Admin','admin1@example.com','hashed_password_admin','987-654-3210','1985-05-20','456 Oak Ave'),(3,'React Native','Employee','employee1@example.com','hashed_password_emp1','111-222-3333','1992-11-01','789 Pine Ln'),(4,'Type Script','Guest','guest2@example.com','hashed_password_2','444-555-6666','1988-07-25','101 Elm Rd'),(5,'Java Script','Guest','guest3@example.com','hashed_password_3','777-888-9999','1995-03-10','222 Willow Dr'),(6,'Ben Jamin','Admin','admin2@example.com','hashed_password_admin2','222-333-4444','1980-12-05','333 Maple Ct'),(7,'Kyle Walker','Employee','employee2@example.com','hashed_password_emp2','555-666-7777','1998-09-30','444 Birch Pl'),(8,'Loro Piana','Guest','guest4@example.com','hashed_password_4','888-999-0000','1993-04-18','555 Cedar Blvd'),(9,'Louis Vuitton','Guest','guest5@example.com','hashed_password_5','333-444-5555','1987-02-28','666 Spruce Way'),(10,'Pual Smith','Employee','employee3@example.com','hashed_password_emp3','666-777-8888','1999-06-12','777 Redwood Ln'),(11,'Pakkapol Boonluck','Admin','keng@gmail.com','keng53966','095-572-7125','2005-06-01','999 Phuttamonton'),(12,'Alan Shearer','Admin','admin@example.com','hashedpasswordadmin','999-999-9999','2000-01-09','St. James Park'),(13,'David Beckham','Admin','adminn@example.com','admin1234','011-111-1111','2003-07-10','Old Trafford'),(14,'James Bond','Guest','user@gmail.com','user1234','077-007-0077','2007-07-07','85 Albert'),(15,'Krist Kul','Admin','champ@gmail.com','champ1234','779-858-2257','2004-04-26','509 Whitechapel');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-29 18:50:26
