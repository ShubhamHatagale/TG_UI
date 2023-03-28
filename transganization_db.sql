-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2021 at 06:42 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `transganization_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `beliverconcepts`
--

CREATE TABLE `beliverconcepts` (
  `id` int(11) NOT NULL,
  `beliverse_group` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`beliverse_group`)),
  `tribe` varchar(255) NOT NULL,
  `face_of_tribe` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`face_of_tribe`)),
  `primary_customer_beliver` varchar(255) NOT NULL,
  `face_of_primary_customer_beliver` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `beliverconcepts`
--

INSERT INTO `beliverconcepts` (`id`, `beliverse_group`, `tribe`, `face_of_tribe`, `primary_customer_beliver`, `face_of_primary_customer_beliver`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, '[{\"beliverse_group\":\"beliver group\"}]', '<p>Tribe</p>', '[{\"face_of_tribe\":\"Face Tribe\"}]', '<p>Primary Customer</p>', '<p>Face of Primary Customer</p>', 1, 2, '2021-08-23 08:43:13', NULL, NULL, '0', '2021-08-23 08:43:13', '2021-08-23 08:43:13');

-- --------------------------------------------------------

--
-- Table structure for table `beliversconcept`
--

CREATE TABLE `beliversconcept` (
  `id` int(11) NOT NULL,
  `believer_group` varchar(255) NOT NULL,
  `customer_believer` varchar(255) NOT NULL,
  `Word_define_face` varchar(255) NOT NULL,
  `define_face_believer` varchar(255) NOT NULL,
  `primary_customer_believer` varchar(255) NOT NULL,
  `your_tribe` varchar(255) NOT NULL,
  `submit_flag` enum('0','1') NOT NULL DEFAULT '0',
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `beliversconcept`
--

INSERT INTO `beliversconcept` (`id`, `believer_group`, `customer_believer`, `Word_define_face`, `define_face_believer`, `primary_customer_believer`, `your_tribe`, `submit_flag`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, '', '<p>Customer Beliver</p>', '', '<p>Face of Beliver</p>', '<p>primary Customer</p>', '<p>Your Tribe</p>', '1', 1, 2, '2021-06-18 07:35:07', NULL, NULL, '0', '2021-06-18 07:35:07', '2021-06-18 07:35:07');

-- --------------------------------------------------------

--
-- Table structure for table `buisenessmod`
--

CREATE TABLE `buisenessmod` (
  `id` int(11) NOT NULL,
  `common_pointers` varchar(255) NOT NULL,
  `self_talk` varchar(255) NOT NULL,
  `cite_examples` varchar(255) NOT NULL,
  `precise_talk` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `submit_flag` enum('0','1') NOT NULL DEFAULT '0',
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buisenessmod`
--

INSERT INTO `buisenessmod` (`id`, `common_pointers`, `self_talk`, `cite_examples`, `precise_talk`, `email_id`, `submit_flag`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, '<p>ttt</p>', '<p>cc</p>', '', '<p>dddd</p>', 1, '0', 1, '2021-08-16 17:48:51', 1, '2021-08-17 06:41:32', '0', '2021-08-09 17:48:51', '2021-08-17 06:41:32');

-- --------------------------------------------------------

--
-- Table structure for table `busiplayground`
--

CREATE TABLE `busiplayground` (
  `id` int(11) NOT NULL,
  `basisofplayground` varchar(255) NOT NULL,
  `defineplayground` varchar(255) NOT NULL,
  `Finalizationtext` varchar(255) NOT NULL,
  `Finalizationddl` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `busiplayground`
--

INSERT INTO `busiplayground` (`id`, `basisofplayground`, `defineplayground`, `Finalizationtext`, `Finalizationddl`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, '<p>Naishtya Statement 1</p>', '<p>Time Period and No of Vilakshan</p>', 'We are into Customer Intimacy (CI) Model', 'We will be Price Focused', 1, 2, '2021-08-17 13:17:13', 2, '2021-08-17 13:17:33', '0', '2021-08-17 13:17:13', '2021-08-17 13:17:33');

-- --------------------------------------------------------

--
-- Table structure for table `cmmt1`
--

CREATE TABLE `cmmt1` (
  `id` int(11) NOT NULL,
  `question_mind_journy` varchar(255) NOT NULL,
  `question_mind_of` varchar(255) NOT NULL,
  `who_give_answer` varchar(255) NOT NULL,
  `possible_answer` varchar(255) NOT NULL,
  `choice_made` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cmmt2`
--

CREATE TABLE `cmmt2` (
  `id` int(11) NOT NULL,
  `question_mind_journy` varchar(255) NOT NULL,
  `question_mind_of` varchar(255) NOT NULL,
  `who_give_answer` varchar(255) NOT NULL,
  `possible_answer` varchar(255) NOT NULL,
  `choice_made` varchar(255) NOT NULL,
  `point_to_be_considered` varchar(255) DEFAULT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cmmt2`
--

INSERT INTO `cmmt2` (`id`, `question_mind_journy`, `question_mind_of`, `who_give_answer`, `possible_answer`, `choice_made`, `point_to_be_considered`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Journy', 'Mind', 'Who give', 'Possible', 'Choice', 'Undefined', 1, 2, '2021-06-24 04:19:53', NULL, '2021-08-20 12:30:23', '0', '2021-06-24 04:19:53', '2021-08-20 12:30:23'),
(2, 'Journy', 'Mind', 'Who give', 'Possible', 'Choice', 'Current Process Improvment', 1, 2, '2021-06-24 08:09:35', NULL, '2021-08-20 12:30:23', '0', '2021-06-24 08:09:35', '2021-08-20 12:30:23'),
(3, 'Journy124', 'Mind12343', 'Who give', 'Possible', 'Choice', 'Undefined', 1, 2, '2021-06-24 09:28:03', NULL, '2021-08-20 12:33:42', '0', '2021-06-24 09:28:03', '2021-08-20 12:33:42'),
(8, 'Ravi', 'Madas', 'Who giveas', 'Possibleasa', 'Choice1', 'Innovation', 1, 2, '2021-08-20 12:47:56', NULL, '2021-08-20 12:49:06', '0', '2021-08-20 12:47:56', '2021-08-20 12:49:06');

-- --------------------------------------------------------

--
-- Table structure for table `cmmt2ddl`
--

CREATE TABLE `cmmt2ddl` (
  `id` int(11) NOT NULL,
  `point_to_be_considered` varchar(255) NOT NULL,
  `cmmtab_id` int(11) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cmmt3`
--

CREATE TABLE `cmmt3` (
  `id` int(11) NOT NULL,
  `brief_building_blocks` varchar(255) NOT NULL,
  `ownership` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `expected_closure_date` date NOT NULL,
  `weeks` varchar(255) NOT NULL,
  `days` varchar(255) NOT NULL,
  `cmmid` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cmmt3`
--

INSERT INTO `cmmt3` (`id`, `brief_building_blocks`, `ownership`, `start_date`, `expected_closure_date`, `weeks`, `days`, `cmmid`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(8, '<p><strong>BUILDING</strong>​<br></p>', ' BUILDING', '0000-00-00', '0000-00-00', '2', '15', 1, 2, '2021-07-02 07:02:41', NULL, '2021-08-21 11:36:13', '0', '2021-07-02 07:02:41', '2021-08-21 11:36:13'),
(9, '<p><strong>BUILDING</strong>​<br></p>', ' BUILDING', '0000-00-00', '0000-00-00', '2', '15', 1, 2, '2021-07-02 07:17:07', NULL, '2021-08-21 11:36:13', '0', '2021-07-02 07:17:07', '2021-08-21 11:36:13'),
(10, '<p>Brief Yes</p>', ' owner', '2021-07-09', '2021-07-30', '3', '21', 2, 2, '2021-07-02 07:18:33', NULL, NULL, '0', '2021-07-02 07:18:33', '2021-07-02 07:18:33'),
(11, '<p>jbrjbjf</p>', ' jhg', '2021-08-12', '2021-08-27', '2', '15', 2, 2, '2021-08-11 06:53:30', NULL, NULL, '0', '2021-08-11 06:53:30', '2021-08-11 06:53:30'),
(12, '<p><strong>BUILDING</strong>​<br></p>', ' BUILDING', '0000-00-00', '0000-00-00', '2', '15', 1, 2, '2021-08-21 11:36:08', NULL, '2021-08-21 11:36:13', '0', '2021-08-21 11:36:08', '2021-08-21 11:36:13'),
(13, '<p><strong>BLOCKS</strong>​</p>', ' BLOCKS', '2021-08-01', '2021-08-18', '2', '17', 2, 2, '2021-08-21 11:36:44', NULL, NULL, '0', '2021-08-21 11:36:44', '2021-08-21 11:36:44'),
(14, '<p><strong>BRIEF<span>&nbsp;</span></strong><br></p>', ' BRIEF ', '2021-08-03', '2021-08-17', '2', '14', 8, 2, '2021-08-21 11:37:07', NULL, NULL, '0', '2021-08-21 11:37:07', '2021-08-21 11:37:07'),
(15, '<p><br><br>​<strong>BUILDING<span>&nbsp;</span></strong><br><br>​<br></p>', ' BUILDING ', '2021-08-03', '2021-08-19', '2', '16', 1, 2, '2021-08-21 12:35:18', NULL, NULL, '0', '2021-08-21 12:35:18', '2021-08-21 12:35:18'),
(16, '<div>amplioso_sprint<br></div>', ' amplioso_sprint', '2021-08-17', '2021-08-10', '1', '-7', 1, 2, '2021-08-21 12:43:35', NULL, NULL, '0', '2021-08-21 12:43:35', '2021-08-21 12:43:35');

-- --------------------------------------------------------

--
-- Table structure for table `competionsheet`
--

CREATE TABLE `competionsheet` (
  `id` int(11) NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `competionsheet`
--

INSERT INTO `competionsheet` (`id`, `features`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, '[{\"featues\":\"Feature1\",\"noofpossiblity\":\"2\",\"possiblity\":\"1\",\"choicemade\":\"1\",\"competition\":\"CompetitionA\",\"value\":\"8\"},{\"featues\":\"Feature2\",\"noofpossiblity\":\"3\",\"possiblity\":\"1\",\"choicemade\":\"1\",\"competition\":\"CompetitionB\",\"value\":\"7\"},{\"featues\":\"Feature3\",\"noofpossiblity\":\"3\",\"possiblity\":\"1\",\"choicemade\":\"1\",\"competition\":\"CompetitionC\",\"value\":\"9\"},{\"featues\":\"Feature4\",\"noofpossiblity\":\"2\",\"possiblity\":\"1\",\"choicemade\":\"1\",\"competition\":\"CompetitionD\",\"value\":\"8\"}]', 2, '2021-08-06 10:24:33', NULL, NULL, '0', '2021-08-06 10:24:33', '2021-08-06 10:24:33'),
(2, '[{\"competition\":\"Type Here\"},{\"competition\":\"CompetitionA\"},{\"competition\":\"CompetitionB\"}]', 2, '2021-08-10 07:00:17', NULL, NULL, '0', '2021-08-10 07:00:17', '2021-08-10 07:00:17'),
(3, '[{\"competition\":\"Type here\"},{\"competition\":\"CompetitionA\"}]', 2, '2021-08-10 07:10:25', NULL, NULL, '0', '2021-08-10 07:10:25', '2021-08-10 07:10:25'),
(4, '[{\"competition\":\"Typehere\",\"value0\":\"9\",\"value1\":\"8\",\"value2\":\"7\",\"value3\":\"4\",\"value4\":\"4\",\"value5\":\"5\"},{\"competition\":\"Competition A\",\"value0\":\"8\",\"value1\":\"7\",\"value2\":\"9\",\"value3\":\"6\",\"value4\":\"6\",\"value5\":\"5\"},{\"competition\":\"Competition B\",\"value0\":\"8\",\"value1\":\"7\",\"value2\":\"9\",\"value3\":\"5\",\"value4\":\"6\",\"value5\":\"4\"},{\"01\":\"competition\",\"02\":\"value1\",\"03\":\"value2\",\"04\":\"value3\",\"05\":\"value4\",\"competition\":\"Competition C\",\"value0\":\"7\",\"value1\":\"6\",\"value2\":\"6\",\"value3\":\"4\",\"value4\":\"3\",\"value5\":\"8\"}]', 2, '2021-08-10 07:12:51', NULL, '2021-08-23 12:17:26', '0', '2021-08-10 07:12:51', '2021-08-23 12:17:26');

-- --------------------------------------------------------

--
-- Table structure for table `customertab1`
--

CREATE TABLE `customertab1` (
  `id` int(11) NOT NULL,
  `question_mind_journy` varchar(255) NOT NULL,
  `question_mind_of` varchar(255) NOT NULL,
  `who_give_answer` varchar(255) NOT NULL,
  `possible_answer` varchar(255) NOT NULL,
  `choice_made` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customertab1`
--

INSERT INTO `customertab1` (`id`, `question_mind_journy`, `question_mind_of`, `who_give_answer`, `possible_answer`, `choice_made`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Journy', 'Mind', 'Who give', 'Possible', 'Choice', 1, 2, '2021-06-24 04:19:53', NULL, NULL, '0', '2021-06-24 04:19:53', '2021-06-24 04:19:53'),
(2, 'Journy', 'Mind', 'Who give', 'Possible', 'Choice', 1, 2, '2021-06-24 08:09:35', NULL, '2021-08-20 12:24:16', '0', '2021-06-24 08:09:35', '2021-08-20 12:24:16'),
(3, 'Journy124', 'Mind12343', 'Who give', 'Possible', 'Choice', 1, 2, '2021-06-24 09:28:03', NULL, '2021-08-20 12:32:07', '1', '2021-06-24 09:28:03', '2021-08-20 12:32:07'),
(4, 'Journy', 'Mind', 'Who give', 'Possible', 'Choice', 1, 2, '2021-06-24 09:38:13', NULL, NULL, '0', '2021-06-24 09:38:13', '2021-08-20 04:40:46'),
(5, 'Journy', 'Mind', 'Who give', 'Possible', 'Choice', 1, 2, '2021-06-24 09:52:29', NULL, NULL, '0', '2021-06-24 09:52:29', '2021-08-20 04:27:21'),
(6, 'Journy', 'Mind', 'Who give', 'Possible', 'Choice123', 1, 2, '2021-08-12 05:21:10', NULL, '2021-08-20 04:26:48', '1', '2021-08-12 05:21:10', '2021-08-20 04:26:57'),
(7, 'Journy', 'Mind', 'Who give', 'Possible12', 'Choice1', 1, 2, '2021-08-12 05:21:25', NULL, '2021-08-20 04:18:08', '1', '2021-08-12 05:21:25', '2021-08-20 04:18:39'),
(8, 'Ravi', 'Madas', 'Who giveas', 'Possibleasa', 'Choice1', 1, 2, '2021-08-20 12:47:55', NULL, NULL, '0', '2021-08-20 12:47:56', '2021-08-20 12:47:56');

-- --------------------------------------------------------

--
-- Table structure for table `dashboard`
--

CREATE TABLE `dashboard` (
  `id` int(11) NOT NULL,
  `perspective` varchar(255) NOT NULL,
  `report_name` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `daily` int(11) NOT NULL,
  `weekly` int(11) NOT NULL,
  `monthly` int(11) NOT NULL,
  `quaterly` int(11) NOT NULL,
  `half_yearly` int(11) NOT NULL,
  `yearly` int(11) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dashboard`
--

INSERT INTO `dashboard` (`id`, `perspective`, `report_name`, `area`, `daily`, `weekly`, `monthly`, `quaterly`, `half_yearly`, `yearly`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Quantitative', 'ABC', 'CRM', 1, 0, 1, 0, 1, 0, 1, 2, '2021-08-23 10:33:52', NULL, NULL, '0', '2021-08-23 10:33:52', '2021-08-23 10:33:52');

-- --------------------------------------------------------

--
-- Table structure for table `discovery`
--

CREATE TABLE `discovery` (
  `id` int(11) NOT NULL,
  `common_pointers` varchar(255) NOT NULL,
  `self_talk` varchar(255) NOT NULL,
  `cite_examples` varchar(255) NOT NULL,
  `precise_talk` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `submit_flag` enum('0','1') NOT NULL DEFAULT '0',
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `discovery`
--

INSERT INTO `discovery` (`id`, `common_pointers`, `self_talk`, `cite_examples`, `precise_talk`, `email_id`, `submit_flag`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, '<p>Common Pointer</p>', '<p>Self Talk</p>', '<p>Cite Example</p>', '<p>Precise Talk</p>', 1, '0', 2, '2021-08-16 14:28:40', NULL, '2021-08-23 11:15:09', '0', '2021-08-16 14:28:40', '2021-08-23 11:15:09');

-- --------------------------------------------------------

--
-- Table structure for table `drishti`
--

CREATE TABLE `drishti` (
  `id` int(11) NOT NULL,
  `drishti_parameter` varchar(255) NOT NULL,
  `year_1` varchar(255) NOT NULL,
  `year_2` varchar(255) NOT NULL,
  `year_3` varchar(255) NOT NULL,
  `year_4` varchar(255) NOT NULL,
  `year_5` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `drishti`
--

INSERT INTO `drishti` (`id`, `drishti_parameter`, `year_1`, `year_2`, `year_3`, `year_4`, `year_5`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Vilakshan Parameter', 'FY 2021-22', 'FY 2022-23', 'FY 2023-24', 'FY 2024-25', 'FY 2025-28', 1, 2, '2021-08-13 05:58:15', NULL, '2021-08-21 04:12:56', '0', '2021-08-13 05:58:15', '2021-08-21 04:12:56'),
(2, 'Vilakshan Map', 'FY 2021-22', 'FY 2022-23', 'FY 2023-24', 'FY 2024-25', 'FY 2025-26', 1, 2, '2021-08-20 04:30:54', NULL, '2021-08-21 05:42:38', '0', '2021-08-20 04:30:54', '2021-08-21 05:42:38');

-- --------------------------------------------------------

--
-- Table structure for table `facebelivers`
--

CREATE TABLE `facebelivers` (
  `id` int(11) NOT NULL,
  `Word_define_face` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `facebelivers`
--

INSERT INTO `facebelivers` (`id`, `Word_define_face`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Face Beliver', 1, 2, '2021-06-18 07:36:02', NULL, NULL, '0', '2021-06-18 07:36:02', '2021-06-18 07:36:02');

-- --------------------------------------------------------

--
-- Table structure for table `goal_drillerraw`
--

CREATE TABLE `goal_drillerraw` (
  `id` int(11) NOT NULL,
  `business_unit` varchar(255) NOT NULL,
  `insteelObjective` varchar(255) NOT NULL,
  `FY` varchar(255) NOT NULL,
  `goalDescription` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `division` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `exptMngmt` varchar(255) DEFAULT NULL,
  `Weightages` varchar(255) DEFAULT NULL,
  `fy_target` varchar(255) DEFAULT NULL,
  `fy_actuals` varchar(255) DEFAULT NULL,
  `achievement_till_date` varchar(255) DEFAULT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `goal_drillerraw`
--

INSERT INTO `goal_drillerraw` (`id`, `business_unit`, `insteelObjective`, `FY`, `goalDescription`, `department`, `division`, `role`, `name`, `exptMngmt`, `Weightages`, `fy_target`, `fy_actuals`, `achievement_till_date`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Unit', 'Insteel ', '2021', 'Goal 1', 'CRM', 'Drill', 'Dep', 'Shri', 'Target', 'Weight', '2000', '1800', '20/12/2021', 1, 2, '2021-08-17 13:14:32', NULL, NULL, '0', '2021-08-17 13:14:32', '2021-08-17 13:14:32');

-- --------------------------------------------------------

--
-- Table structure for table `groupbeliver`
--

CREATE TABLE `groupbeliver` (
  `id` int(11) NOT NULL,
  `believer_group` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groupbeliver`
--

INSERT INTO `groupbeliver` (`id`, `believer_group`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Group Beliver', 1, 2, '2021-06-18 07:10:26', NULL, NULL, '0', '2021-06-18 07:10:26', '2021-06-18 07:10:26');

-- --------------------------------------------------------

--
-- Table structure for table `naisthya`
--

CREATE TABLE `naisthya` (
  `id` int(11) NOT NULL,
  `naisthya_statement` varchar(255) NOT NULL,
  `time_period` varchar(255) NOT NULL,
  `believer_group` varchar(255) NOT NULL,
  `impact_point` varchar(255) NOT NULL,
  `prayaan_statement` varchar(255) NOT NULL,
  `date_of_lunch` varchar(255) NOT NULL,
  `list_of_activities` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `naisthya`
--

INSERT INTO `naisthya` (`id`, `naisthya_statement`, `time_period`, `believer_group`, `impact_point`, `prayaan_statement`, `date_of_lunch`, `list_of_activities`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, '<p>Naishtya</p>', '<p>Time Period and No_of Vilakshan Units</p>', '<p>Believer Group</p>', '<p>Impact_Point</p>', '<p>Prayaan Statement</p>', '<p>Date of Launch of Prayaan</p>', '<p>List of activities which we will never do</p>', 1, 2, '2021-08-13 06:46:21', 2, '2021-08-16 06:05:36', '0', '2021-08-13 06:46:21', '2021-08-16 06:05:36');

-- --------------------------------------------------------

--
-- Table structure for table `non_negotiable`
--

CREATE TABLE `non_negotiable` (
  `id` int(11) NOT NULL,
  `gross_margin` varchar(255) DEFAULT NULL,
  `opportunity_size` varchar(255) DEFAULT NULL,
  `unit_pricing` varchar(255) DEFAULT NULL,
  `unit_margin` varchar(255) DEFAULT NULL,
  `time_to_breakeven` varchar(255) DEFAULT NULL,
  `fixed_cost_investment` varchar(255) DEFAULT NULL,
  `credit_terms` varchar(255) DEFAULT NULL,
  `npv` varchar(255) DEFAULT NULL,
  `end_prod_quality` varchar(255) DEFAULT NULL,
  `supplier_quality_standard` varchar(255) DEFAULT NULL,
  `customer_service` varchar(255) DEFAULT NULL,
  `channels` varchar(255) DEFAULT NULL,
  `lead_time` varchar(255) DEFAULT NULL,
  `fixed_cost_investment2` varchar(255) DEFAULT NULL,
  `through_put` varchar(255) DEFAULT NULL,
  `pricing` varchar(255) DEFAULT NULL,
  `prod_dev_life_cycle` varchar(255) DEFAULT NULL,
  `brand_parameter` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `non_negotiable`
--

INSERT INTO `non_negotiable` (`id`, `gross_margin`, `opportunity_size`, `unit_pricing`, `unit_margin`, `time_to_breakeven`, `fixed_cost_investment`, `credit_terms`, `npv`, `end_prod_quality`, `supplier_quality_standard`, `customer_service`, `channels`, `lead_time`, `fixed_cost_investment2`, `through_put`, `pricing`, `prod_dev_life_cycle`, `brand_parameter`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Margin', 'Opportunity ', 'Unit ', 'Margin', 'Breakeven', 'Cost ', 'Terms', 'NPV', 'product ', 'Quality ', 'Service', 'Channel', 'time', 'fixed', 'Through ', 'Price', 'development ', 'Parameters', '1', '2', '2021-08-17 09:42:56', NULL, NULL, '0', '2021-08-17 09:42:56', '2021-08-17 09:42:56');

-- --------------------------------------------------------

--
-- Table structure for table `prayaan`
--

CREATE TABLE `prayaan` (
  `id` int(11) NOT NULL,
  `prayaan_category` varchar(255) NOT NULL,
  `prayaan_steps` varchar(255) NOT NULL,
  `executer` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `start_date` varchar(255) NOT NULL,
  `completion_date` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prayaan`
--

INSERT INTO `prayaan` (`id`, `prayaan_category`, `prayaan_steps`, `executer`, `owner`, `start_date`, `completion_date`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Prayaan Category', 'Prayaan Steps', 'Executor', 'Owner', 'Start Date', '22/12/2019', 1, 1, '2021-08-13 06:45:09', NULL, '2021-08-21 04:52:35', '0', '2021-08-13 06:45:09', '2021-08-21 04:52:35'),
(8, 'Prayaan ', 'Prayaan Step 2', 'Executor 1', 'Owner 1', '22/06/2021', '31/06/2021', 1, 1, '2021-08-16 06:05:36', NULL, '2021-08-21 05:46:48', '0', '2021-08-16 06:05:36', '2021-08-21 05:46:48'),
(9, 'PrayaanData', 'step3', 'Prayaan', 'PrayaanOwner', '20', '28/12/2021', 1, 1, '2021-08-18 12:33:47', NULL, '2021-08-21 04:22:01', '1', '2021-08-18 12:33:47', '2021-08-21 04:33:53');

-- --------------------------------------------------------

--
-- Table structure for table `process`
--

CREATE TABLE `process` (
  `id` int(11) NOT NULL,
  `sr_no` varchar(255) NOT NULL,
  `step_decription` varchar(255) NOT NULL,
  `trasaction_time` varchar(255) NOT NULL,
  `resource_allocated` varchar(255) NOT NULL,
  `resource_name` varchar(255) NOT NULL,
  `parent_process_id` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `process`
--

INSERT INTO `process` (`id`, `sr_no`, `step_decription`, `trasaction_time`, `resource_allocated`, `resource_name`, `parent_process_id`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, '1', 'Step1', '10', '20', '202', '1', 1, 2, '2021-08-16 07:44:51', NULL, '2021-08-20 12:52:47', '0', '2021-08-16 07:44:51', '2021-08-20 12:52:47'),
(2, '1', 'step1', '30', 'CRM', 'Bike', '2', 1, 2, '2021-08-16 07:45:53', NULL, NULL, '0', '2021-08-16 07:45:53', '2021-08-16 07:45:53'),
(3, '2', 'step2', '20', 'CMS', 'Car', '1', 1, 2, '2021-08-16 08:13:05', NULL, '2021-08-20 04:59:17', '0', '2021-08-16 08:13:05', '2021-08-20 04:59:17'),
(4, '3', 'Step3', '20', 'CEDE', 'ASDE', '1', 1, 2, '2021-08-16 08:21:21', NULL, '2021-08-21 09:39:42', '0', '2021-08-16 08:21:21', '2021-08-21 09:39:42'),
(5, '2', 'Step2', '50', 'ELE', 'FGHFG', '2', 1, 2, '2021-08-16 08:30:44', NULL, '2021-08-20 04:59:28', '0', '2021-08-16 08:30:44', '2021-08-20 04:59:28'),
(6, '3', 'Step3', '70', 'EDE', 'FREE', '2', 1, 2, '2021-08-16 08:36:06', NULL, NULL, '0', '2021-08-16 08:36:06', '2021-08-16 08:36:06');

-- --------------------------------------------------------

--
-- Table structure for table `rebirth`
--

CREATE TABLE `rebirth` (
  `id` int(11) NOT NULL,
  `email_id` int(11) NOT NULL,
  `Search` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`Search`)),
  `Manan` varchar(255) NOT NULL,
  `Sadhana` varchar(255) NOT NULL,
  `Spiritual` varchar(255) NOT NULL,
  `submit_flag` enum('0','1') NOT NULL DEFAULT '0',
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rebirth`
--

INSERT INTO `rebirth` (`id`, `email_id`, `Search`, `Manan`, `Sadhana`, `Spiritual`, `submit_flag`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 1, '[{\"firstName\":\"Common \"},{\"firstName\":\"Common Words that you can see \"}]', '<h2><strong>Manan</strong></h2><p><br></p>', '<h2><strong>Sadhana<span>&nbsp;</span></strong></h2><p><br></p>', '<h2><strong>Spiritual<span>&nbsp;</span></strong></h2><p><br></p>', '0', 1, '2021-08-23 11:08:49', 2, '2021-08-26 04:30:58', '0', '2021-08-23 11:08:49', '2021-08-26 04:30:58');

-- --------------------------------------------------------

--
-- Table structure for table `reflection`
--

CREATE TABLE `reflection` (
  `id` int(11) NOT NULL,
  `child_hood` varchar(255) NOT NULL,
  `post_education` varchar(255) NOT NULL,
  `post_marriage` varchar(255) NOT NULL,
  `submit_flag` enum('0','1') NOT NULL DEFAULT '0',
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reflection`
--

INSERT INTO `reflection` (`id`, `child_hood`, `post_education`, `post_marriage`, `submit_flag`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, '<p><span style=\"background-color: rgb(241, 241, 241);\">​Child hood is&nbsp; the best life hh<span style=\"color: rgb(0, 0, 0);\">&nbsp;hdhfgh</span></span></p>', '<p>Post Education</p>', '<p>Post Marriage</p>', '0', 1, 2, '2021-06-18 08:58:35', 1, '2021-08-21 10:51:07', '0', '2021-06-18 08:58:35', '2021-08-21 10:51:07');

-- --------------------------------------------------------

--
-- Table structure for table `reflectioncommon`
--

CREATE TABLE `reflectioncommon` (
  `id` int(11) NOT NULL,
  `email_id` int(11) NOT NULL,
  `common_word` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shulk_lakshya`
--

CREATE TABLE `shulk_lakshya` (
  `id` int(11) NOT NULL,
  `revenue_1` int(11) DEFAULT NULL,
  `cost_of_goods_sold_1` int(11) DEFAULT NULL,
  `gross_profit_1` int(11) DEFAULT NULL,
  `overhead_expenses_1` int(11) DEFAULT NULL,
  `ebidta_1` int(11) DEFAULT NULL,
  `interest_1` int(11) DEFAULT NULL,
  `ebdt_1` int(11) DEFAULT NULL,
  `depreciation_1` int(11) DEFAULT NULL,
  `earning_before_tax_1` int(11) DEFAULT NULL,
  `tax_amount_1` int(11) DEFAULT NULL,
  `profit_after_tax_1` int(11) DEFAULT NULL,
  `revenue_2` int(11) DEFAULT NULL,
  `cost_of_goods_sold_2` int(11) DEFAULT NULL,
  `gross_profit_2` int(11) DEFAULT NULL,
  `overhead_expenses_2` int(11) DEFAULT NULL,
  `ebidta_2` int(11) DEFAULT NULL,
  `interest_2` int(11) DEFAULT NULL,
  `ebdt_2` int(11) DEFAULT NULL,
  `depreciation_2` int(11) DEFAULT NULL,
  `earning_before_tax_2` int(11) DEFAULT NULL,
  `tax_amount_2` int(11) DEFAULT NULL,
  `profit_after_tax_2` int(11) DEFAULT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shulk_lakshya`
--

INSERT INTO `shulk_lakshya` (`id`, `revenue_1`, `cost_of_goods_sold_1`, `gross_profit_1`, `overhead_expenses_1`, `ebidta_1`, `interest_1`, `ebdt_1`, `depreciation_1`, `earning_before_tax_1`, `tax_amount_1`, `profit_after_tax_1`, `revenue_2`, `cost_of_goods_sold_2`, `gross_profit_2`, `overhead_expenses_2`, `ebidta_2`, `interest_2`, `ebdt_2`, `depreciation_2`, `earning_before_tax_2`, `tax_amount_2`, `profit_after_tax_2`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 10000, 100, 10000, 100, 10000, 100, 10000, 100, 10000, 100, 10000, 50000, 500, 500, 100, 400, 100, 300, 100, 200, 100, 100, 1, 2, '2021-08-14 11:44:40', 2, '2021-08-16 09:56:30', '0', '2021-08-14 11:44:40', '2021-08-16 09:56:30');

-- --------------------------------------------------------

--
-- Table structure for table `validate`
--

CREATE TABLE `validate` (
  `id` int(11) NOT NULL,
  `question1` varchar(255) NOT NULL,
  `question2` varchar(255) NOT NULL,
  `question3` varchar(255) NOT NULL,
  `question4` varchar(255) NOT NULL,
  `question5` varchar(255) NOT NULL,
  `question6` varchar(255) NOT NULL,
  `question7` varchar(255) NOT NULL,
  `question8` varchar(255) NOT NULL,
  `question9` varchar(255) NOT NULL,
  `question10` varchar(255) NOT NULL,
  `question11` varchar(255) NOT NULL,
  `question12` varchar(255) NOT NULL,
  `question13` varchar(255) NOT NULL,
  `question14` varchar(255) NOT NULL,
  `question15` varchar(255) NOT NULL,
  `submit_flag` enum('0','1') NOT NULL DEFAULT '0',
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `validate`
--

INSERT INTO `validate` (`id`, `question1`, `question2`, `question3`, `question4`, `question5`, `question6`, `question7`, `question8`, `question9`, `question10`, `question11`, `question12`, `question13`, `question14`, `question15`, `submit_flag`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', '1', 2, '2021-06-18 07:07:44', NULL, NULL, '0', '2021-06-18 07:07:46', '2021-06-18 07:07:46'),
(2, 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', '0', 2, '2021-07-02 05:57:07', NULL, NULL, '0', '2021-07-02 05:57:07', '2021-07-02 05:57:07'),
(3, 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', '0', 2, '2021-07-02 07:10:18', NULL, NULL, '0', '2021-07-02 07:10:18', '2021-07-02 07:10:18'),
(4, 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', '0', 2, '2021-08-03 11:52:17', NULL, NULL, '0', '2021-08-03 11:52:17', '2021-08-03 11:52:17'),
(5, 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', 'Not Sure', '0', 2, '2021-08-11 13:05:06', NULL, NULL, '0', '2021-08-11 13:05:06', '2021-08-11 13:05:06');

-- --------------------------------------------------------

--
-- Table structure for table `valueproposition`
--

CREATE TABLE `valueproposition` (
  `id` int(11) NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `possible_combination` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `valueproposition`
--

INSERT INTO `valueproposition` (`id`, `features`, `possible_combination`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, '[{\"featues\":\"Feature1\",\"noofpossiblity\":\"2\",\"possiblity\":\"1\",\"choicemade\":\"1\"},{\"featues\":\"Feature2\",\"noofpossiblity\":\"3\",\"possiblity\":\"1\",\"choicemade\":\"1\"},{\"featues\":\"Feature3\",\"noofpossiblity\":\"2\",\"possiblity\":\"1\",\"choicemade\":\"1\"},{\"featues\":\"xyz\",\"noofpossiblity\":\"2\",\"possiblity\":\"3\",\"choicemade\":\"1\"}]', '13', 2, '2021-08-05 09:19:52', NULL, '2021-08-23 12:17:32', '0', '2021-08-05 09:19:52', '2021-08-23 12:17:32');

-- --------------------------------------------------------

--
-- Table structure for table `vilakshan`
--

CREATE TABLE `vilakshan` (
  `id` int(11) NOT NULL,
  `parameter` varchar(255) NOT NULL,
  `non_finacial` int(11) NOT NULL,
  `objective` int(11) NOT NULL,
  `measurable` int(11) NOT NULL,
  `volume_growth` int(11) NOT NULL,
  `value_growth` int(11) NOT NULL,
  `near_far` int(11) NOT NULL,
  `operational_excellence` varchar(255) NOT NULL,
  `customer_intimacy` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vilakshan`
--

INSERT INTO `vilakshan` (`id`, `parameter`, `non_finacial`, `objective`, `measurable`, `volume_growth`, `value_growth`, `near_far`, `operational_excellence`, `customer_intimacy`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Parameter1', 1, 0, 1, 0, 1, 0, 'excellent', 'intimaci', 1, 2, '2021-08-12 06:23:15', NULL, '2021-08-20 04:32:09', '1', '2021-08-12 06:23:15', '2021-08-21 05:41:58'),
(2, 'List', 0, 1, 0, 1, 0, 1, 'EXCELLENCE', 'CUSTOMER ', 1, 2, '2021-08-20 04:32:45', NULL, NULL, '0', '2021-08-20 04:32:45', '2021-08-20 04:32:50'),
(3, 'Paramenters', 1, 0, 1, 0, 1, 0, 'EXCELLENCE', 'CUSTOMER ', 1, 2, '2021-08-21 04:25:25', NULL, NULL, '0', '2021-08-21 04:25:25', '2021-08-21 04:25:34');

-- --------------------------------------------------------

--
-- Table structure for table `vilakshanmap`
--

CREATE TABLE `vilakshanmap` (
  `id` int(11) NOT NULL,
  `vilakshan_journey` varchar(255) NOT NULL,
  `vilakshan_form` varchar(255) NOT NULL,
  `vccs` varchar(255) NOT NULL,
  `parent_process_name` varchar(255) NOT NULL,
  `parent_process_input` varchar(255) NOT NULL,
  `parent_process_output` varchar(255) NOT NULL,
  `parent_process_owner` varchar(255) DEFAULT NULL,
  `strategic_support_process` varchar(255) DEFAULT NULL,
  `strategic_support_input` varchar(255) DEFAULT NULL,
  `strategic_support_output` varchar(255) DEFAULT NULL,
  `soul_connection` varchar(255) DEFAULT NULL,
  `email_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vilakshanmap`
--

INSERT INTO `vilakshanmap` (`id`, `vilakshan_journey`, `vilakshan_form`, `vccs`, `parent_process_name`, `parent_process_input`, `parent_process_output`, `parent_process_owner`, `strategic_support_process`, `strategic_support_input`, `strategic_support_output`, `soul_connection`, `email_id`, `created_by`, `created_on`, `updated_by`, `updated_on`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Vilakshan', 'vilakshanForm', 'VCCS', 'ABC', 'ABCIN', 'ABCOUT', 'abc', 'abc', 'abc', 'abcdef', 'abcde', 1, 2, '2021-08-16 07:43:26', NULL, '2021-08-21 06:29:57', '0', '2021-08-16 07:43:26', '2021-08-21 06:29:57'),
(2, 'XYZ', 'XYZ', 'XYZ', 'XYZ', 'XYZ', 'XYZ', 'XYZ', 'XYZ', 'XYZ', 'XYZ', 'XYZ', 1, 2, '2021-08-16 07:44:23', NULL, '2021-08-21 08:12:19', '0', '2021-08-16 07:44:23', '2021-08-21 08:12:19'),
(3, 'ASD', 'ASD', 'ASD', 'ASD', 'ASD', 'ASD', 'ADS', 'ASD', 'ASD', 'ASD', 'ASD', 1, 2, '2021-08-21 06:31:46', NULL, NULL, '1', '2021-08-21 06:31:46', '2021-08-21 06:32:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beliverconcepts`
--
ALTER TABLE `beliverconcepts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `beliversconcept`
--
ALTER TABLE `beliversconcept`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `buisenessmod`
--
ALTER TABLE `buisenessmod`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `busiplayground`
--
ALTER TABLE `busiplayground`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cmmt1`
--
ALTER TABLE `cmmt1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cmmt2`
--
ALTER TABLE `cmmt2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cmmt2ddl`
--
ALTER TABLE `cmmt2ddl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cmmt3`
--
ALTER TABLE `cmmt3`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `competionsheet`
--
ALTER TABLE `competionsheet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customertab1`
--
ALTER TABLE `customertab1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dashboard`
--
ALTER TABLE `dashboard`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discovery`
--
ALTER TABLE `discovery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drishti`
--
ALTER TABLE `drishti`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `facebelivers`
--
ALTER TABLE `facebelivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goal_drillerraw`
--
ALTER TABLE `goal_drillerraw`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groupbeliver`
--
ALTER TABLE `groupbeliver`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `naisthya`
--
ALTER TABLE `naisthya`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `non_negotiable`
--
ALTER TABLE `non_negotiable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prayaan`
--
ALTER TABLE `prayaan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `process`
--
ALTER TABLE `process`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rebirth`
--
ALTER TABLE `rebirth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reflection`
--
ALTER TABLE `reflection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reflectioncommon`
--
ALTER TABLE `reflectioncommon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shulk_lakshya`
--
ALTER TABLE `shulk_lakshya`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `validate`
--
ALTER TABLE `validate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `valueproposition`
--
ALTER TABLE `valueproposition`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vilakshan`
--
ALTER TABLE `vilakshan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vilakshanmap`
--
ALTER TABLE `vilakshanmap`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `beliverconcepts`
--
ALTER TABLE `beliverconcepts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `beliversconcept`
--
ALTER TABLE `beliversconcept`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `buisenessmod`
--
ALTER TABLE `buisenessmod`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `busiplayground`
--
ALTER TABLE `busiplayground`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cmmt1`
--
ALTER TABLE `cmmt1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cmmt2`
--
ALTER TABLE `cmmt2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cmmt2ddl`
--
ALTER TABLE `cmmt2ddl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cmmt3`
--
ALTER TABLE `cmmt3`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `competionsheet`
--
ALTER TABLE `competionsheet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customertab1`
--
ALTER TABLE `customertab1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `dashboard`
--
ALTER TABLE `dashboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `discovery`
--
ALTER TABLE `discovery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `drishti`
--
ALTER TABLE `drishti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `facebelivers`
--
ALTER TABLE `facebelivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `goal_drillerraw`
--
ALTER TABLE `goal_drillerraw`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `groupbeliver`
--
ALTER TABLE `groupbeliver`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `naisthya`
--
ALTER TABLE `naisthya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `non_negotiable`
--
ALTER TABLE `non_negotiable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `prayaan`
--
ALTER TABLE `prayaan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `process`
--
ALTER TABLE `process`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `rebirth`
--
ALTER TABLE `rebirth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reflection`
--
ALTER TABLE `reflection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reflectioncommon`
--
ALTER TABLE `reflectioncommon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shulk_lakshya`
--
ALTER TABLE `shulk_lakshya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `validate`
--
ALTER TABLE `validate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `valueproposition`
--
ALTER TABLE `valueproposition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vilakshan`
--
ALTER TABLE `vilakshan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vilakshanmap`
--
ALTER TABLE `vilakshanmap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
