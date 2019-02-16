/*
Navicat MySQL Data Transfer

Source Server         : localhost_3308
Source Server Version : 50505
Source Host           : localhost:3308
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-02-16 13:37:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `friendship_apply`
-- ----------------------------
DROP TABLE IF EXISTS `friendship_apply`;
CREATE TABLE `friendship_apply` (
  `apply_id` char(32) NOT NULL COMMENT '申请id',
  `originator_id` char(32) NOT NULL COMMENT '发起人id',
  `originated_at` char(32) NOT NULL COMMENT '发起时间',
  `target_id` char(32) NOT NULL COMMENT '被申请人id',
  `apply_status` tinyint(4) DEFAULT NULL COMMENT '申请处理结果 0-失败 1-成功 2-待处理',
  `apply_handle_at` char(32) DEFAULT NULL COMMENT '申请处理时间',
  PRIMARY KEY (`apply_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of friendship_apply
-- ----------------------------
INSERT INTO `friendship_apply` VALUES ('1bf83eba83cc4d5c9d3032855cbc2c48', '7145bcf38af4489eb4c8eed0fdd9950e', '1548549830191', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1', '1548549879551');
INSERT INTO `friendship_apply` VALUES ('f1e1611b1969452e84c85c259fceaa99', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1548235198270', '7145bcf38af4489eb4c8eed0fdd9950e', '1', '1548235315041');

-- ----------------------------
-- Table structure for `user_friendship_relation`
-- ----------------------------
DROP TABLE IF EXISTS `user_friendship_relation`;
CREATE TABLE `user_friendship_relation` (
  `relation_id` char(32) NOT NULL COMMENT '好友关系id',
  `userId` char(32) NOT NULL COMMENT '用户id',
  `friend_id` char(32) NOT NULL COMMENT '好友id',
  `apply_id` char(32) NOT NULL COMMENT '申请记录id',
  `create_relation_at` char(32) NOT NULL COMMENT '好友关系创建时间',
  `final_chat_record` varchar(255) DEFAULT NULL COMMENT '最后一条聊天记录',
  PRIMARY KEY (`relation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_friendship_relation
-- ----------------------------
INSERT INTO `user_friendship_relation` VALUES ('196c1ec08d9f448a95ae1bf9880eb34e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '7145bcf38af4489eb4c8eed0fdd9950e', '1bf83eba83cc4d5c9d3032855cbc2c48', '1548549878758', null);
INSERT INTO `user_friendship_relation` VALUES ('8e2f77e729074e8b9221b2777cc0efe0', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1bf83eba83cc4d5c9d3032855cbc2c48', '1548549878758', null);
INSERT INTO `user_friendship_relation` VALUES ('ced22ed413644368ade4a3fa94408f73', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', 'f1e1611b1969452e84c85c259fceaa99', '1548235315007', null);
INSERT INTO `user_friendship_relation` VALUES ('e1e78dcbce3940c3ba441c4578886cf4', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '7145bcf38af4489eb4c8eed0fdd9950e', 'd8d5fa2fe47842b5b50504f165855ad1', '1548234981473', null);

-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `userId` char(32) NOT NULL COMMENT '用户id（主键）',
  `username` varchar(64) DEFAULT NULL COMMENT '用户名称',
  `password` varchar(255) DEFAULT NULL COMMENT '用户密码',
  `register_at` char(32) NOT NULL COMMENT '注册时间',
  `final_chat_record` varchar(255) DEFAULT NULL COMMENT '最后一条聊天记录',
  `socket_id` char(64) DEFAULT NULL COMMENT 'socket连接id',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('2d8158b6-f9c4-4900-8bd8-1d47ae7e', 'xiaoxiaowang', 'a9b74e5603fda5fbc0fe012b259f4762', '1548122662205', null, 'rQIwgZqRq_MGZ0JkAAAA');
INSERT INTO `user_info` VALUES ('5e8f5672-e5c3-4d2e-91a8-72dbaeb1', 'ziwenlin', '9170925097a95a17c7c5f544bc14dfbd', '1548122643957', null, 'MrjetzYMFn6HILmdAAAC');
INSERT INTO `user_info` VALUES ('6bf7c9e3c7b447379b8ea7d9f8c2dca4', 'zhangyaxian', '7a786c1c59799c1d27f6ddb108c76113', '1548290655006', null, null);
INSERT INTO `user_info` VALUES ('7145bcf38af4489eb4c8eed0fdd9950e', 'shenzongzhou', '9170925097a95a17c7c5f544bc14dfbd', '1548124585326', null, 'UdYS8KjmYKgvPIotAAAD');
INSERT INTO `user_info` VALUES ('e3d0367c25934d73b522becfb8a76eff', 'liuhangyu', 'f8c16d7fa5dda0ea739254b0cfc635c0', '1548290729640', null, 'YqtivDtweay-6eU6AAAB');

-- ----------------------------
-- Table structure for `user_information_record`
-- ----------------------------
DROP TABLE IF EXISTS `user_information_record`;
CREATE TABLE `user_information_record` (
  `information_record_id` char(32) NOT NULL COMMENT '聊天记录id',
  `information_content` varchar(255) NOT NULL COMMENT '消息内容',
  `sender_id` char(32) NOT NULL COMMENT '发送人id',
  `receiver_id` char(32) NOT NULL COMMENT '接受人id',
  `send_at` char(32) NOT NULL COMMENT '发送时间',
  `information_status` tinyint(4) NOT NULL COMMENT '消息状态 1 已发送（待查看） 2 已查看 3 用户不在线  400 发送失败',
  PRIMARY KEY (`information_record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_information_record
-- ----------------------------
INSERT INTO `user_information_record` VALUES ('03ca977cb67b4693abbfcd0c8f5aa116', '发送给沈宗周的测试信息', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '7145bcf38af4489eb4c8eed0fdd9950e', '1550293997989', '8');
INSERT INTO `user_information_record` VALUES ('066d75dba5c441d48efc85ad480904a0', '服务端打印socket', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550288007532', '1');
INSERT INTO `user_information_record` VALUES ('06e39f9899e94fe3b329377fba7bb61e', '测试焦点', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550211299799', '1');
INSERT INTO `user_information_record` VALUES ('08b12614c041417eb5ce6aafb9b60ec7', 'sdasd ', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550292229073', '1');
INSERT INTO `user_information_record` VALUES ('0f0e8d387c0d407da4f34a33ffcfe402', '大大', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550290321691', '1');
INSERT INTO `user_information_record` VALUES ('149fbfbef1ca4ae1991c5ec387a910f9', '发简历骄傲了', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550218429297', '1');
INSERT INTO `user_information_record` VALUES ('18596f40bd90478894421592e6cc44a2', '哈哈', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550201354642', '1');
INSERT INTO `user_information_record` VALUES ('1f67dd53f5d14a60975c6ec23eabc35b', '123', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550200862070', '1');
INSERT INTO `user_information_record` VALUES ('1fdd5b6e5218402bab65aa73378fa70f', '啊实打实', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550218526892', '1');
INSERT INTO `user_information_record` VALUES ('2191cb4c886845e8a4ece6a3cfbd5630', '焦点测试', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550212579539', '1');
INSERT INTO `user_information_record` VALUES ('24f8948ff66e458d80e06679577058f4', '123', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550218571104', '1');
INSERT INTO `user_information_record` VALUES ('25a30ebea1d240efb478ee9d9cd5707b', '测试接收', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '7145bcf38af4489eb4c8eed0fdd9950e', '1550239908239', '1');
INSERT INTO `user_information_record` VALUES ('2c25e0e6823f49eab3efc081e04b0c76', '大苏打实打实', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550218337222', '1');
INSERT INTO `user_information_record` VALUES ('2f900324ef554e3089d92c0593cd24fc', '回车测试\n', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550216835033', '1');
INSERT INTO `user_information_record` VALUES ('3366db2474e74dcea7914b42547ee8dd', '敖德萨大所多', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550292085339', '1');
INSERT INTO `user_information_record` VALUES ('398a7dd419d74d8ca7cee8d04054004c', '测试', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550287662088', '1');
INSERT INTO `user_information_record` VALUES ('3bc5ce483e2240f398bbd9c2a489340c', '发送给沈宗周的测试信息', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '7145bcf38af4489eb4c8eed0fdd9950e', '1550239888473', '8');
INSERT INTO `user_information_record` VALUES ('3f26d4aeec874a5a92c819be13f04cb0', '123', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550217863999', '8');
INSERT INTO `user_information_record` VALUES ('4262939fffa94def9b1e2b5d176325a9', '123', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550218208297', '1');
INSERT INTO `user_information_record` VALUES ('429d8fd89039425889a560b3e9de1c16', '测试发送消息', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550115010981', '1');
INSERT INTO `user_information_record` VALUES ('42eb8ed07ca84e43bb57a5ad1d74dbed', '硕大的', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550292098867', '1');
INSERT INTO `user_information_record` VALUES ('44180c0d1b86440aa9fc25d9a2869442', '测试接收', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550290192524', '1');
INSERT INTO `user_information_record` VALUES ('494fbdc2f5d346f3ae4b99829959c464', '132', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550290247801', '1');
INSERT INTO `user_information_record` VALUES ('4a3f182a5c564906aedd37e865215e0d', '123', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550200343775', '1');
INSERT INTO `user_information_record` VALUES ('4e6d14b1d06343a882cd76cde9307fb4', '发送', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550290099661', '1');
INSERT INTO `user_information_record` VALUES ('57383227c5024f6f9d693fbce24657f7', '嗨', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '7145bcf38af4489eb4c8eed0fdd9950e', '1550222994821', '1');
INSERT INTO `user_information_record` VALUES ('59321c6574334eb79e5fba02331cbd7b', '嗨', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550291540749', '1');
INSERT INTO `user_information_record` VALUES ('5e5f92017ad64d388226010826355f3a', '测试', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550218143613', '1');
INSERT INTO `user_information_record` VALUES ('5fc3d130dcbb4e1780e2eb4e5c3a5e6b', '大撒大撒', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550218624482', '1');
INSERT INTO `user_information_record` VALUES ('6634301c048a437189e66b79502c60c9', '测试', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550287668224', '1');
INSERT INTO `user_information_record` VALUES ('68b1c1bfad3f461d8c1ea540555dce9d', '测试', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550200894626', '1');
INSERT INTO `user_information_record` VALUES ('709ed9bc77384cfa98f9c24919035061', '不知道说什么好', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '7145bcf38af4489eb4c8eed0fdd9950e', '1550239897633', '1');
INSERT INTO `user_information_record` VALUES ('7453eae9cf34462fa0b75fa7e5b40373', '啊实打实', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550201315056', '1');
INSERT INTO `user_information_record` VALUES ('78ad0a6dec6e4f96ae26912a40ab246e', '嗨', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '7145bcf38af4489eb4c8eed0fdd9950e', '1550219958272', '1');
INSERT INTO `user_information_record` VALUES ('7d1c7f4cdd0443dc8d86a90d6b1485bc', 'abc', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550200651789', '1');
INSERT INTO `user_information_record` VALUES ('7f1cd8c77b79466195224b23e35d1560', '123', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550291748337', '1');
INSERT INTO `user_information_record` VALUES ('84127fce74a844f081b1f5489cb89d5f', '测试', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '7145bcf38af4489eb4c8eed0fdd9950e', '1550239893552', '1');
INSERT INTO `user_information_record` VALUES ('8882cf6afa3e474990f786a465857c7a', '测试', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550240582981', '1');
INSERT INTO `user_information_record` VALUES ('8caf680ef65d4ece8d4494387990fc93', '基多拉据了解大垃圾袋拉丝机垃圾垃圾袋垃圾的垃圾堆里', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550294078149', '1');
INSERT INTO `user_information_record` VALUES ('924444c63b5740c89d2c440dd9a43296', '发给ziwenlin', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550218908028', '1');
INSERT INTO `user_information_record` VALUES ('92ee84461fdf4a0eb153a3b062475868', '就打死了', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550218484728', '1');
INSERT INTO `user_information_record` VALUES ('9d425220f06341b8add13f93daace2ee', '嗨', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550291432598', '1');
INSERT INTO `user_information_record` VALUES ('9dad036989714f34896ffb2152640772', '测试接收', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550290041859', '1');
INSERT INTO `user_information_record` VALUES ('a14ff1f2122b4e53abef424e9866d173', '其味无穷', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550290275455', '1');
INSERT INTO `user_information_record` VALUES ('a299c54ef26a40d9a6d003de929fed4b', '测试发送消息', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550120187334', '1');
INSERT INTO `user_information_record` VALUES ('a3e9d8e2c3aa4056a91c20c07efe0a4b', '啊实打实', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550201310420', '1');
INSERT INTO `user_information_record` VALUES ('ac4df52077c24a06907e2d2f71565416', '嗨', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '7145bcf38af4489eb4c8eed0fdd9950e', '1550221652789', '1');
INSERT INTO `user_information_record` VALUES ('b4da57d9eda045c4990f37554b4580ba', '测试发送', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550200270631', '1');
INSERT INTO `user_information_record` VALUES ('b96db32dfce34fef8d502efc5cf16719', '再次回车测试\n', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550216942857', '1');
INSERT INTO `user_information_record` VALUES ('ba717798cd0d447e87c127141482939e', '阿打算', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550290409541', '1');
INSERT INTO `user_information_record` VALUES ('c05e3e06e4e1419c9690f147a02fda50', '789', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550200841407', '1');
INSERT INTO `user_information_record` VALUES ('c108148c3ac5464a999c35847443a142', '啊的萨德', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550292144314', '1');
INSERT INTO `user_information_record` VALUES ('c1a4ad5977c747fcb2e538e20839d9b0', '敖德萨\n', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550218275215', '1');
INSERT INTO `user_information_record` VALUES ('c5ed1c2cbe6344cab0037ace004278af', '测试发送+接收', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550199990835', '1');
INSERT INTO `user_information_record` VALUES ('c6f15e7f294e466f81c2db5753089561', '456', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550217900706', '1');
INSERT INTO `user_information_record` VALUES ('cb0eed68444e435c8a2b8b40c5341967', '发简历骄傲了', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550218392916', '1');
INSERT INTO `user_information_record` VALUES ('d37db445bb9d47d9911cdeb1e11d6db9', '嗨', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '7145bcf38af4489eb4c8eed0fdd9950e', '1550220140617', '1');
INSERT INTO `user_information_record` VALUES ('d4c3b462628d4f17ba741a967df2c38a', '嗨', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550291709921', '1');
INSERT INTO `user_information_record` VALUES ('d912cfd6bf1d40689d632f5b500751b5', '发送', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550289758493', '1');
INSERT INTO `user_information_record` VALUES ('dd58760d104240bd9e3463a824598105', '测试hello', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550200079296', '1');
INSERT INTO `user_information_record` VALUES ('de080e49ade5451e9f3843122f8096f3', '随便输入测试', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '7145bcf38af4489eb4c8eed0fdd9950e', '1550239902934', '1');
INSERT INTO `user_information_record` VALUES ('dfd6d9a0e5d44719b728d77cf7f74aaf', '123', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550218056722', '1');
INSERT INTO `user_information_record` VALUES ('e054ed719dae46cdad56a7c70d653f08', '123', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550136337284', '1');
INSERT INTO `user_information_record` VALUES ('e15aa0a989114f4591ef110fed8adff2', '打', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '7145bcf38af4489eb4c8eed0fdd9950e', '1550240673477', '1');
INSERT INTO `user_information_record` VALUES ('e1e1e50315b64b10a27b8d7a03f7f17a', '666', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550201361391', '1');
INSERT INTO `user_information_record` VALUES ('e9326ecf31174a8dbf75c20efce0e0c3', '啊大大', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550291954809', '1');
INSERT INTO `user_information_record` VALUES ('ea0c04407b894e0da65a353fc7ed20db', 'hah ', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '7145bcf38af4489eb4c8eed0fdd9950e', '1550293394658', '1');
INSERT INTO `user_information_record` VALUES ('efc0071f55204f24a132ee2e53ec7bb5', '啊的萨德发达', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550292169863', '1');
INSERT INTO `user_information_record` VALUES ('f08b7c6dd2f64e0fbd111d590ceca535', 'adsada ', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550292173041', '1');
INSERT INTO `user_information_record` VALUES ('f54631e5dc4f4da3b77a58bfa430f953', '发给xiaoxiaowang', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550218924665', '1');
INSERT INTO `user_information_record` VALUES ('f70db23360ce4dbf969973100287c0aa', '敖德萨', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550218217384', '1');
INSERT INTO `user_information_record` VALUES ('f9cde46e7d304f439451ed5f66f50ef3', '测试发送+接收', '7145bcf38af4489eb4c8eed0fdd9950e', '2d8158b6-f9c4-4900-8bd8-1d47ae7e', '1550200026449', '1');
INSERT INTO `user_information_record` VALUES ('fee493cceb624ef5b28b356cd9b13101', '123', '7145bcf38af4489eb4c8eed0fdd9950e', '5e8f5672-e5c3-4d2e-91a8-72dbaeb1', '1550291798835', '1');
