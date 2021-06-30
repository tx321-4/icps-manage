-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2021-06-30 09:48:43
-- 服务器版本： 5.6.17
-- PHP Version: 7.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `icpsexpress`
--

-- --------------------------------------------------------

--
-- 表的结构 `city`
--

CREATE TABLE IF NOT EXISTS `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstletter` varchar(255) DEFAULT NULL COMMENT '首字母',
  `cityname` varchar(255) NOT NULL COMMENT '城市名',
  `subjectCount` int(11) NOT NULL DEFAULT '0' COMMENT '资质个数',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cityname` (`cityname`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- 转存表中的数据 `city`
--

INSERT INTO `city` (`id`, `firstletter`, `cityname`, `subjectCount`, `createdAt`, `updatedAt`) VALUES
(3, 'C', '常德', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'T', '天津', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'X', '西安', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'W', '乌鲁木齐', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'N', '南通', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'K', '昆明', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'H', '杭州', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'C', '重庆', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'C', '常州', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'N', '南京', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'S', '苏州', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'W', '无锡', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'S', '上海', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'X', '徐州', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'H', '合肥', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'Z', '郑州', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'S', '深圳', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'J', '济南', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rolename` varchar(255) NOT NULL COMMENT '角色名称',
  `count` int(11) NOT NULL DEFAULT '0' COMMENT '角色总数',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`rolename`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `role`
--

INSERT INTO `role` (`id`, `rolename`, `count`, `createdAt`, `updatedAt`) VALUES
(1, '超级管理员', 1, '2021-04-29 11:06:09', '2021-04-29 16:56:38'),
(2, '管理员', 2, '2021-04-29 11:06:09', '2021-04-29 17:00:21');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '姓名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `roleId` (`roleId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `createdAt`, `updatedAt`, `roleId`) VALUES
(1, 'admin', '81dc9bdb52d04dc20036dbd8313ed055', '2021-04-29 16:56:38', '2021-04-29 16:56:38', 1),
(2, 'admin2', '81dc9bdb52d04dc20036dbd8313ed055', '2021-04-29 16:59:40', '2021-04-29 16:59:40', 2),
(3, 'a', 'c81e728d9d4c2f636f067f89cc14862c', '2021-04-29 17:00:21', '2021-04-29 17:00:21', 2);

--
-- 限制导出的表
--

--
-- 限制表 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
