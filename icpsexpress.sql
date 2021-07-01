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

 Date: 01/07/2021 18:03:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
INSERT INTO `city` VALUES (5, 'B', '北京', 1, '2021-07-01 11:30:37', '2021-07-01 13:55:23');

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '超级管理员', 1, '2021-04-29 11:06:09', '2021-04-29 16:56:38');
INSERT INTO `role` VALUES (2, '管理员', 2, '2021-04-29 11:06:09', '2021-04-29 17:00:21');

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
INSERT INTO `subject` VALUES (2, '10xxxxxxx111', 'xx字节跳xxxx字节跳xxxx字节跳xxxx字节跳xxxx字节跳xxxx节跳xxxx', '582023848503081xxxxx92929', '北京', '北京', '北京', '字节跳xxxx', 'Boss', '4239sssxxxxx919181', '13700001111', '13488884444', '1678888cccc', '193729@xx.com', '备注', 0, '已完成', '说明说明说明说明说明说明说明说明说明说明说明说明', '2021-07-01 13:55:23', '2021-07-01 16:21:20', 5);
INSERT INTO `subject` VALUES (3, '210xxxxxx', 'xx字节跳xxxx字节跳xxxx字节跳xxxx字节跳xxxx字节跳xxxx节跳xxxx', '582023848503081xxxxx92929', '北京', '北京', '北京', '字节跳xxxx', 'Boss', '4239sssxxxxx919181', '13700001111', '13488884444', '1678888cccc', '193729@xx.com', '备注', 1, '进行中', '说明说明说明说明说明说明说明说明说明说明说明说明', '2021-07-01 13:55:23', '2021-07-01 18:02:16', 5);

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
INSERT INTO `user` VALUES (2, 'admin2', '81dc9bdb52d04dc20036dbd8313ed055', '2021-04-29 16:59:40', '2021-04-29 16:59:40', 2);
INSERT INTO `user` VALUES (3, 'a', 'c81e728d9d4c2f636f067f89cc14862c', '2021-04-29 17:00:21', '2021-04-29 17:00:21', 2);

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of website
-- ----------------------------
INSERT INTO `website` VALUES (1, '123456', '2342342342', '头xxx', 'www.xxxxx.com', 'www.xxxxx.com', '官网', '张三', '2342342842xxxdfsdf', '13588884444', '16844443233', '15799998844', '1212@xxx.com', 'd', '2021-07-01 18:02:16', '2021-07-01 18:02:16', 3);

SET FOREIGN_KEY_CHECKS = 1;
