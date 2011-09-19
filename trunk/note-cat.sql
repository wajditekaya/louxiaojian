-- phpMyAdmin SQL Dump
-- version 2.11.7
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2011 年 09 月 19 日 02:20
-- 服务器版本: 5.0.45
-- PHP 版本: 5.2.0RC4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `notes`
--

-- --------------------------------------------------------

--
-- 表的结构 `note_cat`
--

CREATE TABLE IF NOT EXISTS `note_cat` (
  `cat_id` int(11) NOT NULL auto_increment,
  `cat_name` varchar(1000) character set gbk NOT NULL,
  `cat_slug` varchar(1000) character set gbk NOT NULL,
  PRIMARY KEY  (`cat_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- 导出表中的数据 `note_cat`
--

INSERT INTO `note_cat` (`cat_id`, `cat_name`, `cat_slug`) VALUES
(1, 'CSS', 'css'),
(2, 'CSS3', 'css3'),
(3, '性能', 'performance'),
(4, '前端', 'front_end'),
(5, 'HTML5', 'html5'),
(6, 'JavaScript', 'javascript');
