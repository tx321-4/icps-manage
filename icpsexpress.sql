/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 50617
 Source Host           : localhost:3306
 Source Schema         : icpsexpress

 Target Server Type    : MySQL
 Target Server Version : 50617
 File Encoding         : 65001

 Date: 13/07/2021 16:32:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accoicp
-- ----------------------------
DROP TABLE IF EXISTS `accoicp`;
CREATE TABLE `accoicp`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `acco_tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系方式',
  `acco_t_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话所属人员',
  `acco_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '电子邮件地址',
  `acco_e_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱所属人员',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `subjectId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `subjectId`(`subjectId`) USING BTREE,
  CONSTRAINT `accoicp_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for city
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstletter` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '首字母',
  `cityname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '城市名',
  `subjectCount` int(11) NOT NULL DEFAULT 0 COMMENT '资质个数',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `cityname`(`cityname`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of city
-- ----------------------------
INSERT INTO `city` VALUES (1, 'H', '杭州', 0, '2021-07-01 11:29:48', '2021-07-01 11:29:48');
INSERT INTO `city` VALUES (2, 'S', '深圳', 0, '2021-07-01 11:29:57', '2021-07-01 11:29:57');
INSERT INTO `city` VALUES (3, 'S', '上海', 0, '2021-07-01 11:30:06', '2021-07-01 11:30:06');
INSERT INTO `city` VALUES (4, 'W', '武汉', 0, '2021-07-01 11:30:17', '2021-07-01 11:30:17');
INSERT INTO `city` VALUES (5, 'B', '北京', 1, '2021-07-01 11:30:37', '2021-07-02 10:45:27');

-- ----------------------------
-- Table structure for email
-- ----------------------------
DROP TABLE IF EXISTS `email`;
CREATE TABLE `email`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮箱号码',
  `email_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮箱所属人员',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email_num`(`email_num`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of email
-- ----------------------------
INSERT INTO `email` VALUES (2, '104334gayx@xx.com', '大师', '2021-07-13 16:03:21', '2021-07-13 16:03:21');
INSERT INTO `email` VALUES (3, '5432111188@xxx.com', '大明', '2021-07-13 16:19:11', '2021-07-13 16:19:11');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rolename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `count` int(11) NOT NULL DEFAULT 0 COMMENT '角色总数',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`rolename`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '超级管理员', 1, '2021-04-29 11:06:09', '2021-04-29 16:56:38');
INSERT INTO `role` VALUES (2, '管理员', 1, '2021-04-29 11:06:09', '2021-04-29 17:00:21');
INSERT INTO `role` VALUES (3, '浏览员', 1, '2021-07-13 15:53:30', '2021-07-13 15:53:34');

-- ----------------------------
-- Table structure for subject
-- ----------------------------
DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `icp_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '备案号',
  `subject_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主办单位或主办人全称',
  `subject_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主办单位证件号码',
  `subject_residence` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主办单位证件住所',
  `subject_area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主办单位所属区域',
  `subject_addr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主办单位通信地址',
  `subject_name2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '投资人或主管单位',
  `subjectman` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '负责人姓名',
  `subjectman_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '负责人证件号码',
  `subjectman_tel1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系方式1',
  `subjectman_tel2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '联系方式2',
  `subjectman_tel3` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '应急联系电话',
  `subjectman_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '电子邮件地址',
  `note_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注信息',
  `websiteCount` int(11) NOT NULL DEFAULT 0 COMMENT '网站个数',
  `subject_state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '备案状态',
  `subject_stateinfo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '备案状态说明',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `cityId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `icp_num`(`icp_num`) USING BTREE,
  INDEX `cityId`(`cityId`) USING BTREE,
  CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of subject
-- ----------------------------
INSERT INTO `subject` VALUES (3, '210xxxxxx', 'xx字节跳xxxx字节跳xxxx字节跳xxxx字节跳xxxx字节跳xxxx节跳xxxx', '582023848503081xxxxx92929', '北京', '北京', '北京', '字节跳xxxx', 'Boss', '42390000000091918', '13700001111', '13488884444', '1678888cccc', '104334gayx@xx.com', '备注', 1, '进行中', '说明说明说明说明说明说明说明说明说明说明说明说明', '2021-07-01 13:55:23', '2021-07-13 16:16:26', 5);

-- ----------------------------
-- Table structure for tel
-- ----------------------------
DROP TABLE IF EXISTS `tel`;
CREATE TABLE `tel`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '电话号码',
  `tel_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '电话所属人员',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `tel_num`(`tel_num`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tel
-- ----------------------------
INSERT INTO `tel` VALUES (3, '13700001111', '张三', '2021-07-13 16:02:06', '2021-07-13 16:02:06');
INSERT INTO `tel` VALUES (4, '1678888cccc', '小月', '2021-07-13 16:02:18', '2021-07-13 16:02:18');
INSERT INTO `tel` VALUES (5, '13488884444', '大师', '2021-07-13 16:02:29', '2021-07-13 16:02:29');
INSERT INTO `tel` VALUES (6, '13588884444', '大明', '2021-07-13 16:18:37', '2021-07-13 16:18:37');
INSERT INTO `tel` VALUES (7, '16844443233', '小明', '2021-07-13 16:18:45', '2021-07-13 16:18:45');
INSERT INTO `tel` VALUES (8, '15799998844', '小惠', '2021-07-13 16:18:58', '2021-07-13 16:18:58');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `roleId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  INDEX `roleId`(`roleId`) USING BTREE,
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '81dc9bdb52d04dc20036dbd8313ed055', '2021-04-29 16:56:38', '2021-04-29 16:56:38', 1);
INSERT INTO `user` VALUES (2, 'editer', '81dc9bdb52d04dc20036dbd8313ed055', '2021-04-29 16:59:40', '2021-04-29 16:59:40', 2);
INSERT INTO `user` VALUES (3, 'visiter', '81dc9bdb52d04dc20036dbd8313ed055', '2021-04-29 17:00:21', '2021-04-29 17:00:21', 3);

-- ----------------------------
-- Table structure for website
-- ----------------------------
DROP TABLE IF EXISTS `website`;
CREATE TABLE `website`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `website_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网站编号',
  `website_num2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网站备案号',
  `website_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网站名称',
  `website_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网站URL',
  `website_web` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网站域名',
  `website_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网站内容',
  `websiteman` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '负责人姓名',
  `websiteman_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '证件号码',
  `website_tel1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系方式1',
  `website_tel2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '联系方式2',
  `website_tel3` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '应急联系电话',
  `website_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '负责人电子邮箱',
  `note_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注信息',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `subjectId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `website_num`(`website_num`) USING BTREE,
  INDEX `subjectId`(`subjectId`) USING BTREE,
  CONSTRAINT `website_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of website
-- ----------------------------
INSERT INTO `website` VALUES (1, '123456', '2342342342', '头xxx', 'www.xxxxx.com,www.xxxxx.com,www.xxxxx.com', 'www.xxxxx.com,www.xxxxx.com,www.xxxxx.com', '官网', '张三', '2342342842xxxdfsd', '13588884444', '16844443233', '15799998844', '5432111188@xxx.com', 'd5', '2021-07-01 18:02:16', '2021-07-13 16:17:45', 3);

SET FOREIGN_KEY_CHECKS = 1;
