-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para gestaoedu
CREATE DATABASE IF NOT EXISTS `gestaoedu` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `gestaoedu`;

-- Copiando estrutura para tabela gestaoedu.calendarios
CREATE TABLE IF NOT EXISTS `calendarios` (
                                             `id` int(11) NOT NULL AUTO_INCREMENT,
                                             `ano` int(11) DEFAULT NULL,
                                             `semestre` int(11) DEFAULT NULL,
                                             `status` int(11) DEFAULT NULL,
                                             `inicio` date DEFAULT NULL,
                                             `fim` date DEFAULT NULL,
                                             `createdAt` datetime NOT NULL,
                                             `updatedAt` datetime NOT NULL,
                                             PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela gestaoedu.calendarios: ~0 rows (aproximadamente)
INSERT INTO `calendarios` (`id`, `ano`, `semestre`, `status`, `inicio`, `fim`, `createdAt`, `updatedAt`) VALUES
    (1, 2025, 1, 1, '2025-03-17', '2025-07-25', '2025-03-04 13:48:44', '2025-03-04 13:48:44');

-- Copiando estrutura para tabela gestaoedu.cursos
CREATE TABLE IF NOT EXISTS `cursos` (
                                        `id` int(11) NOT NULL AUTO_INCREMENT,
                                        `descricao` varchar(100) NOT NULL,
                                        `status` int(11) NOT NULL,
                                        `createdAt` datetime NOT NULL,
                                        `updatedAt` datetime NOT NULL,
                                        `professor_id` int(11) DEFAULT NULL,
                                        PRIMARY KEY (`id`),
                                        KEY `professor_id` (`professor_id`),
                                        CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela gestaoedu.cursos: ~2 rows (aproximadamente)
INSERT INTO `cursos` (`id`, `descricao`, `status`, `createdAt`, `updatedAt`, `professor_id`) VALUES
                                                                                                 (1, 'Análise e Desenvolvimento de Sistemas', 1, '2024-11-23 21:34:09', '2024-11-23 21:34:12', 7),
                                                                                                 (2, 'Técnico em Desenvolvimento de Sistemas', 1, '2024-11-23 21:34:30', '2024-11-23 21:34:30', 35);

-- Copiando estrutura para tabela gestaoedu.diarios
CREATE TABLE IF NOT EXISTS `diarios` (
                                         `id` int(11) NOT NULL AUTO_INCREMENT,
                                         `codigo` int(11) NOT NULL,
                                         `descricao` varchar(100) NOT NULL,
                                         `horario` varchar(100) DEFAULT NULL,
                                         `status` int(11) NOT NULL,
                                         `total` int(11) DEFAULT NULL,
                                         `ministrada` int(11) DEFAULT NULL,
                                         `createdAt` datetime NOT NULL,
                                         `updatedAt` datetime NOT NULL,
                                         `professor_id` int(11) DEFAULT NULL,
                                         `turma_id` int(11) DEFAULT NULL,
                                         PRIMARY KEY (`id`),
                                         KEY `professor_id` (`professor_id`),
                                         KEY `turma_id` (`turma_id`),
                                         CONSTRAINT `diarios_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                                         CONSTRAINT `diarios_ibfk_2` FOREIGN KEY (`turma_id`) REFERENCES `turmas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela gestaoedu.diarios: ~5 rows (aproximadamente)
INSERT INTO `diarios` (`id`, `codigo`, `descricao`, `horario`, `status`, `total`, `ministrada`, `createdAt`, `updatedAt`, `professor_id`, `turma_id`) VALUES
                                                                                                                                                          (1, 112094, 'SUP.06261 - Programação Web I', '2N23/3N34', 1, NULL, NULL, '2025-03-04 11:16:14', '2025-03-04 11:17:10', 7, 1),
                                                                                                                                                          (2, 112093, 'SUP.06259 - Programação II', '4N34/5N45', 1, NULL, NULL, '2025-03-04 11:17:48', '2025-03-04 11:17:48', 13, 1),
                                                                                                                                                          (3, 112092, 'SUP.06264 - Interação Humano-Computador', '2N45', 1, NULL, NULL, '2025-03-04 11:18:34', '2025-03-04 11:18:34', 32, 1),
                                                                                                                                                          (4, 112095, 'SUP.06263 - Sistemas Operacionais', '3N12/4N12', 1, NULL, NULL, '2025-03-04 11:19:33', '2025-03-04 11:19:33', 26, 1),
                                                                                                                                                          (5, 112090, 'SUP.06260 - Álgebra Linear', '5N12/6N12', 1, NULL, NULL, '2025-03-04 11:20:08', '2025-03-04 11:20:08', 35, 1);

-- Copiando estrutura para tabela gestaoedu.dias
CREATE TABLE IF NOT EXISTS `dias` (
                                      `id` int(11) NOT NULL AUTO_INCREMENT,
                                      `dia` int(11) DEFAULT NULL,
                                      `data` date DEFAULT NULL,
                                      `sabado` int(11) DEFAULT NULL,
                                      `createdAt` datetime NOT NULL,
                                      `updatedAt` datetime NOT NULL,
                                      `calendario_id` int(11) DEFAULT NULL,
                                      PRIMARY KEY (`id`),
                                      KEY `calendario_id` (`calendario_id`),
                                      CONSTRAINT `dias_ibfk_1` FOREIGN KEY (`calendario_id`) REFERENCES `calendarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela gestaoedu.dias: ~95 rows (aproximadamente)
INSERT INTO `dias` (`id`, `dia`, `data`, `sabado`, `createdAt`, `updatedAt`, `calendario_id`) VALUES
                                                                                                  (21, 0, '2025-03-17', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (22, 1, '2025-03-18', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (23, 1, '2025-03-25', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (24, 4, '2025-03-21', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (25, 2, '2025-03-19', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (26, 3, '2025-03-20', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (27, 0, '2025-03-24', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (28, 2, '2025-03-26', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (29, 3, '2025-03-27', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (30, 4, '2025-03-28', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (31, 0, '2025-03-31', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (32, 1, '2025-04-01', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (33, 2, '2025-04-02', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (34, 3, '2025-04-03', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (35, 4, '2025-04-04', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (36, 0, '2025-04-07', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (37, 1, '2025-04-08', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (38, 2, '2025-04-09', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (39, 3, '2025-04-10', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (40, 4, '2025-04-11', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (41, 0, '2025-04-14', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (42, 1, '2025-04-15', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (43, 2, '2025-04-16', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (44, 3, '2025-04-17', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (45, 4, '2025-04-18', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (46, 0, '2025-04-21', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (47, 1, '2025-04-22', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (48, 2, '2025-04-23', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (49, 3, '2025-04-24', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (50, 4, '2025-04-25', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (51, 0, '2025-04-28', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (52, 1, '2025-04-29', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (53, 2, '2025-04-30', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (54, 3, '2025-05-01', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (55, 4, '2025-05-02', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (56, 0, '2025-05-05', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (57, 1, '2025-05-06', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (58, 2, '2025-05-07', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (59, 3, '2025-05-08', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (60, 4, '2025-05-09', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (61, 0, '2025-05-12', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (62, 1, '2025-05-13', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (63, 2, '2025-05-14', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (64, 3, '2025-05-15', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (65, 4, '2025-05-16', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (66, 0, '2025-05-19', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (67, 1, '2025-05-20', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (68, 2, '2025-05-21', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (69, 3, '2025-05-22', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (70, 4, '2025-05-23', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (71, 0, '2025-05-26', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (72, 1, '2025-05-27', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (73, 2, '2025-05-28', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (74, 3, '2025-05-29', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (75, 4, '2025-05-30', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (76, 0, '2025-06-02', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (77, 1, '2025-06-03', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (78, 2, '2025-06-04', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (79, 3, '2025-06-05', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (80, 4, '2025-06-06', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (81, 0, '2025-06-09', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (82, 1, '2025-06-10', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (83, 2, '2025-06-11', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (84, 3, '2025-06-12', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (85, 4, '2025-06-13', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (86, 0, '2025-06-16', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (87, 1, '2025-06-17', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (88, 2, '2025-06-18', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (89, 3, '2025-06-19', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (90, 4, '2025-06-20', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (91, 0, '2025-06-23', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (92, 1, '2025-06-24', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (93, 2, '2025-06-25', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (94, 3, '2025-06-26', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (95, 4, '2025-06-27', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (96, 0, '2025-06-30', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (97, 1, '2025-07-01', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (98, 2, '2025-07-02', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (99, 3, '2025-07-03', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (100, 4, '2025-07-04', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (101, 0, '2025-07-07', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (102, 1, '2025-07-08', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (103, 2, '2025-07-09', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (104, 3, '2025-07-10', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (105, 4, '2025-07-11', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (106, 0, '2025-07-14', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (107, 1, '2025-07-15', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (108, 2, '2025-07-16', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (109, 3, '2025-07-17', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (110, 4, '2025-07-18', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (111, 0, '2025-07-21', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (112, 1, '2025-07-22', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (113, 2, '2025-07-23', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (114, 3, '2025-07-24', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1),
                                                                                                  (115, 4, '2025-07-25', 0, '2025-03-04 13:48:44', '2025-03-04 13:48:44', 1);

-- Copiando estrutura para tabela gestaoedu.horarios
CREATE TABLE IF NOT EXISTS `horarios` (
                                          `id` int(11) NOT NULL AUTO_INCREMENT,
                                          `turno` int(11) DEFAULT NULL,
                                          `sequencia` int(11) DEFAULT NULL,
                                          `status` int(11) DEFAULT NULL,
                                          `createdAt` datetime NOT NULL,
                                          `updatedAt` datetime NOT NULL,
                                          `diario_id` int(11) DEFAULT NULL,
                                          `dia_id` int(11) DEFAULT NULL,
                                          PRIMARY KEY (`id`),
                                          KEY `diario_id` (`diario_id`),
                                          KEY `dia_id` (`dia_id`),
                                          CONSTRAINT `horarios_ibfk_1` FOREIGN KEY (`diario_id`) REFERENCES `diarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
                                          CONSTRAINT `horarios_ibfk_2` FOREIGN KEY (`dia_id`) REFERENCES `dias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela gestaoedu.horarios: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela gestaoedu.permutas
CREATE TABLE IF NOT EXISTS `permutas` (
                                          `id` int(11) NOT NULL AUTO_INCREMENT,
                                          `data` date NOT NULL,
                                          `dia` varchar(20) NOT NULL,
                                          `horarios` varchar(20) NOT NULL,
                                          `justificativa` varchar(250) NOT NULL,
                                          `status` int(11) NOT NULL,
                                          `createdAt` datetime NOT NULL,
                                          `updatedAt` datetime NOT NULL,
                                          `diario_id` int(11) DEFAULT NULL,
                                          `substituto_id` int(11) DEFAULT NULL,
                                          PRIMARY KEY (`id`),
                                          KEY `diario_id` (`diario_id`),
                                          KEY `substituto_id` (`substituto_id`),
                                          CONSTRAINT `permutas_ibfk_1` FOREIGN KEY (`diario_id`) REFERENCES `diarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                                          CONSTRAINT `permutas_ibfk_2` FOREIGN KEY (`substituto_id`) REFERENCES `diarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela gestaoedu.permutas: ~0 rows (aproximadamente)
INSERT INTO `permutas` (`id`, `data`, `dia`, `horarios`, `justificativa`, `status`, `createdAt`, `updatedAt`, `diario_id`, `substituto_id`) VALUES
    (15, '2024-12-11', 'Quarta-feira', '4N23', 'Mais um teste de funcionamento', 0, '2024-12-09 01:51:08', '2024-12-09 01:51:08', 1, 2);

-- Copiando estrutura para tabela gestaoedu.professores
CREATE TABLE IF NOT EXISTS `professores` (
                                             `id` int(11) NOT NULL AUTO_INCREMENT,
                                             `nome` varchar(100) NOT NULL,
                                             `siape` varchar(20) NOT NULL,
                                             `email` varchar(100) NOT NULL,
                                             `createdAt` datetime NOT NULL,
                                             `updatedAt` datetime NOT NULL,
                                             PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela gestaoedu.professores: ~41 rows (aproximadamente)
INSERT INTO `professores` (`id`, `nome`, `siape`, `email`, `createdAt`, `updatedAt`) VALUES
                                                                                         (1, 'Aecio da Silva Martins', '1228722', 'aecio.martins@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (2, 'Alanny Silva Luz', '2271969', 'alanny.luz@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (3, 'Ana Rayonara de Sousa Albuquerque', '1993705', 'rayonara.albuquerque@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (4, 'Anderson Oliveira da Silva', '1963721', 'anderson.silva@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (5, 'Andrea Lima Barros', '1964083', 'andrea.barros@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (6, 'Annaya Assuncao Pereira Ribeiro', '1620844', 'annaya.assuncao@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (7, 'Bruno Vicente Alves de Lima', '1226388', 'brunovicente.lima@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (8, 'Clarissa Maria Brito Lima', '2339684', 'clarissa.lima@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (9, 'Daisy Damasceno Araujo', '1951613', 'daisy.araujo@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (10, 'Daniel Barroso de Carvalho Ribeiro', '1266884', 'daniel.barroso@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (11, 'Denilson Nunes Mota', '3344988', 'denilsonmota@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (12, 'Diego Roberto Rodrigues Orsano', '1836367', 'diego.rodrigues@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (13, 'Diogo Vinicius de Sousa Silva', '1132172', 'brunnovicente@gmail.com', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (14, 'Douglas dos Santos Silva', '2345177', 'douglas.silva@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (15, 'Elcio Daniel Sousa Barros', '1860969', 'elcio.barros@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (16, 'Francicleia Vieira Ribeiro de Oliveira', '2571587', 'francicleia.ribeiro@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (17, 'Francilio Benicio Santos de Moraes Trindade', '1508992', 'fbenicio@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (18, 'Francisca Marcia Costa de Souza', '1963983', 'francisca.souza@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (19, 'Francisco Alan de Oliveira Santos', '2331838', 'bruno.batcaverna@gmail.com', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (20, 'Fredson Anderson Brito de Castro', '2408251', 'fredson.castro@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (21, 'Gielson Vitor Oliveira Veras', '1258500', 'gielson.veras@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (22, 'Glicia Lorainne Moreira Silva', '1006036', 'glicia.silva@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (23, 'Hosana Maria da Silva Sousa', '2342286', 'hosana.sousa@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (24, 'Iasmynne Elaine da Conceicao Borges Leal', '3394152', 'iasmynne.leal@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (25, 'Janaina Maria Medeiros Macedo Menezes', '3358128', 'janaina.menezes@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (26, 'Joao Paulo Marques Silva', '2282550', 'joao.marques@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (27, 'Jose Jeovane Reges Cordeiro', '2331959', 'jose.cordeiro@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (28, 'Jose Nathannyel Chagas Barbosa', '3423152', 'jbarbosa@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (29, 'Josimar Hendrio Ferraz Borges', '1145981', 'josimar.borges@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (30, 'Jussie Soares da Rocha', '1886837', 'jussie.rocha@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (31, 'Kelcius Rodrigues Ferreira', '1915383', 'kelcius.ferreira@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (32, 'Marcos Gomes da Silva Rocha', '3421880', 'marcos.gomes@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (33, 'Mardoqueu Sousa Telvina', '3077773', 'mardoqueu.telvina@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (34, 'Maria do Socorro Ribeiro da Silva', '1903931', 'socorro.ribeiro@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (35, 'Pablo Silva Imperio', '1699038', 'pablo.imperio@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (36, 'Rivania da Silva Lira', '2020069', 'rivania.lira@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (37, 'Robert Charles Moreira Caland', '1921426', 'robertcaland@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (38, 'Robert Silva Lima', '2311281', 'robert.lima@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (39, 'Susana Kelly Gomes Oliveira', '1293499', 'susana.oliveira@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (40, 'Thalita Vitoria Castelo Branco Nunes Silva', '1837473', 'thalita.silva@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
                                                                                         (41, 'Willams da Silva Lima', '1877101', 'willams.lima@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09');

-- Copiando estrutura para tabela gestaoedu.turmas
CREATE TABLE IF NOT EXISTS `turmas` (
                                        `id` int(11) NOT NULL AUTO_INCREMENT,
                                        `codigo` varchar(50) NOT NULL,
                                        `descricao` varchar(100) NOT NULL,
                                        `semestre` int(11) NOT NULL,
                                        `ano` int(11) NOT NULL,
                                        `status` int(11) NOT NULL,
                                        `createdAt` datetime NOT NULL,
                                        `updatedAt` datetime NOT NULL,
                                        `curso_id` int(11) DEFAULT NULL,
                                        PRIMARY KEY (`id`),
                                        KEY `curso_id` (`curso_id`),
                                        CONSTRAINT `turmas_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela gestaoedu.turmas: ~2 rows (aproximadamente)
INSERT INTO `turmas` (`id`, `codigo`, `descricao`, `semestre`, `ano`, `status`, `createdAt`, `updatedAt`, `curso_id`) VALUES
                                                                                                                          (1, '20242.2.ADS.CNT.1N', 'Módulo II', 2, 2024, 1, '2024-11-23 21:38:09', '2024-11-23 21:38:10', 1),
                                                                                                                          (2, '20242.3.ADS.CNT.1N', 'Módulo III', 2, 2024, 1, '2024-11-23 21:38:40', '2024-11-23 21:38:43', 1);

-- Copiando estrutura para tabela gestaoedu.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
                                          `id` int(11) NOT NULL AUTO_INCREMENT,
                                          `username` varchar(100) NOT NULL,
                                          `password` varchar(250) DEFAULT NULL,
                                          `categoria` int(11) DEFAULT NULL,
                                          `status` int(11) DEFAULT NULL,
                                          `createdAt` datetime NOT NULL,
                                          `updatedAt` datetime NOT NULL,
                                          `professor_id` int(11) DEFAULT NULL,
                                          `codigo` varchar(20) DEFAULT NULL,
                                          PRIMARY KEY (`id`),
                                          KEY `professor_id` (`professor_id`),
                                          CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela gestaoedu.usuarios: ~41 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `username`, `password`, `categoria`, `status`, `createdAt`, `updatedAt`, `professor_id`, `codigo`) VALUES
                                                                                                                                     (2, '1228722', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 1, NULL),
                                                                                                                                     (3, '2271969', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 2, NULL),
                                                                                                                                     (4, '1993705', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 3, NULL),
                                                                                                                                     (5, '1963721', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 4, NULL),
                                                                                                                                     (6, '1964083', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 5, NULL),
                                                                                                                                     (7, '1620844', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 6, NULL),
                                                                                                                                     (8, '1226388', '$2b$10$LwR.kNW.usH3qkFpYTURNuVnHBoD.37ODppBaeFgrNGztqZ4woQYq', 2, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 7, NULL),
                                                                                                                                     (9, '2339684', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 8, NULL),
                                                                                                                                     (10, '1951613', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 9, NULL),
                                                                                                                                     (11, '1266884', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 10, NULL),
                                                                                                                                     (12, '3344988', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 11, NULL),
                                                                                                                                     (13, '1836367', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 12, NULL),
                                                                                                                                     (14, '1132172', '$2b$10$LwR.kNW.usH3qkFpYTURNuVnHBoD.37ODppBaeFgrNGztqZ4woQYq', 1, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 13, NULL),
                                                                                                                                     (15, '2345177', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 14, NULL),
                                                                                                                                     (16, '1860969', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 15, NULL),
                                                                                                                                     (17, '2571587', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 16, NULL),
                                                                                                                                     (18, '1508992', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 17, NULL),
                                                                                                                                     (19, '1963983', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 18, NULL),
                                                                                                                                     (20, '2331838', '$2b$10$LwR.kNW.usH3qkFpYTURNuVnHBoD.37ODppBaeFgrNGztqZ4woQYq', 1, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 19, NULL),
                                                                                                                                     (21, '2408251', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 20, NULL),
                                                                                                                                     (22, '1258500', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 21, NULL),
                                                                                                                                     (23, '1006036', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 22, NULL),
                                                                                                                                     (24, '2342286', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 23, NULL),
                                                                                                                                     (25, '3394152', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 24, NULL),
                                                                                                                                     (26, '3358128', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 25, NULL),
                                                                                                                                     (27, '2282550', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 26, NULL),
                                                                                                                                     (28, '2331959', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 27, NULL),
                                                                                                                                     (29, '3423152', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 28, NULL),
                                                                                                                                     (30, '1145981', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 29, NULL),
                                                                                                                                     (31, '1886837', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 30, NULL),
                                                                                                                                     (32, '1915383', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 31, NULL),
                                                                                                                                     (33, '3421880', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 32, NULL),
                                                                                                                                     (34, '3077773', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 33, NULL),
                                                                                                                                     (35, '1903931', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 34, NULL),
                                                                                                                                     (36, '1699038', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 35, NULL),
                                                                                                                                     (37, '2020069', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 36, NULL),
                                                                                                                                     (38, '1921426', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 37, NULL),
                                                                                                                                     (39, '2311281', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 38, NULL),
                                                                                                                                     (40, '1293499', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 39, NULL),
                                                                                                                                     (41, '1837473', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 40, NULL),
                                                                                                                                     (42, '1877101', NULL, 0, 0, '2024-11-26 19:50:47', '2024-11-26 19:50:47', 41, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
