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
DROP DATABASE IF EXISTS `gestaoedu`;
CREATE DATABASE IF NOT EXISTS `gestaoedu` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `gestaoedu`;

-- Copiando estrutura para tabela gestaoedu.cursos
DROP TABLE IF EXISTS `cursos`;
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

-- Copiando dados para a tabela gestaoedu.cursos: ~1 rows (aproximadamente)
INSERT INTO `cursos` (`id`, `descricao`, `status`, `createdAt`, `updatedAt`, `professor_id`) VALUES
	(1, 'Análise e Desenvolvimento de Sistemas', 1, '2024-11-23 21:34:09', '2024-11-23 21:34:12', 7),
	(2, 'Técnico em Desenvolvimento de Sistemas', 1, '2024-11-23 21:34:30', '2024-11-23 21:34:30', 35);

-- Copiando estrutura para tabela gestaoedu.diarios
DROP TABLE IF EXISTS `diarios`;
CREATE TABLE IF NOT EXISTS `diarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `horario` varchar(20) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `professor_id` int(11) DEFAULT NULL,
  `turma_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `professor_id` (`professor_id`),
  KEY `turma_id` (`turma_id`),
  CONSTRAINT `diarios_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `diarios_ibfk_2` FOREIGN KEY (`turma_id`) REFERENCES `turmas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela gestaoedu.diarios: ~12 rows (aproximadamente)
INSERT INTO `diarios` (`id`, `codigo`, `descricao`, `horario`, `status`, `createdAt`, `updatedAt`, `professor_id`, `turma_id`) VALUES
	(1, 112101, 'SUP.06277 - Programação Orientada a Objetos', '5N12 / 6N34', 1, '2024-11-23 22:20:21', '2024-11-23 22:20:21', 13, 2),
	(2, 112100, 'SUP.06268 - Programação Web II', '2N45 / 4N12', 1, '2024-11-23 22:20:21', '2024-11-23 22:20:21', 7, 2),
	(3, 112099, 'SUP.06267 - Probabilidade e Estatística', '2N23 / 3N12', 1, '2024-11-23 22:20:21', '2024-11-23 22:20:21', 41, 2),
	(4, 112098, 'SUP.06266 - Estrutura de Dados', '5N34 / 6N12', 1, '2024-11-23 22:20:21', '2024-11-23 22:20:21', 19, 2),
	(5, 112097, 'SUP.06269 - Banco de Dados', '3N34 / 4N34', 1, '2024-11-23 22:20:21', '2024-11-23 22:20:21', 26, 2),
	(6, 112096, 'SUP.06271 - Atividade Curricular de Extensão II', '2N1 / 3N5 / 4N5 / 6N', 1, '2024-11-23 22:20:21', '2024-11-23 22:20:21', 21, 2),
	(7, 112095, 'SUP.06263 - Sistemas Operacionais', '3N12 / 4N12', 1, '2024-11-23 22:20:21', '2024-11-23 22:20:21', 26, 1),
	(8, 112094, 'SUP.06261 - Programação Web I', '2N23 / 3N34', 1, '2024-11-23 22:20:21', '2024-11-23 22:20:21', 7, 1),
	(9, 112093, 'SUP.06259 - Programação II', '4N34 / 5N45', 1, '2024-11-23 22:20:21', '2024-11-23 22:20:21', 13, 1),
	(10, 112092, 'SUP.06264 - Interação Humano-Computador', '2N45', 1, '2024-11-23 22:20:21', '2024-11-23 22:20:21', 32, 1),
	(11, 112091, 'SUP.06265 - Atividade Curricular de Extensão I', '5N3 / 6N345', 1, '2024-11-23 22:20:21', '2024-11-23 22:20:21', 30, 1),
	(12, 112090, 'SUP.06260 - Álgebra Linear', '5N12 / 6N12', 1, '2024-11-23 22:20:21', '2024-11-23 22:20:21', 35, 1);

-- Copiando estrutura para tabela gestaoedu.permutas
DROP TABLE IF EXISTS `permutas`;
CREATE TABLE IF NOT EXISTS `permutas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` datetime NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela gestaoedu.permutas: ~2 rows (aproximadamente)
INSERT INTO `permutas` (`id`, `data`, `dia`, `horarios`, `justificativa`, `status`, `createdAt`, `updatedAt`, `diario_id`, `substituto_id`) VALUES
	(1, '2024-11-26 00:00:00', 'Terça-feira', '2N45', 'Participação em evento', 0, '2024-11-24 15:13:56', '2024-11-24 15:13:56', 2, 1),
	(2, '2024-11-25 00:00:00', 'Segunda-feira', '2N45', 'Teste de alguma coisa', 0, '2024-11-24 18:33:34', '2024-11-24 18:33:34', 2, 4);

-- Copiando estrutura para tabela gestaoedu.professores
DROP TABLE IF EXISTS `professores`;
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
	(13, 'Diogo Vinicius de Sousa Silva', '1132172', 'diogo.silva@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
	(14, 'Douglas dos Santos Silva', '2345177', 'douglas.silva@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
	(15, 'Elcio Daniel Sousa Barros', '1860969', 'elcio.barros@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
	(16, 'Francicleia Vieira Ribeiro de Oliveira', '2571587', 'francicleia.ribeiro@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
	(17, 'Francilio Benicio Santos de Moraes Trindade', '1508992', 'fbenicio@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
	(18, 'Francisca Marcia Costa de Souza', '1963983', 'francisca.souza@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
	(19, 'Francisco Alan de Oliveira Santos', '2331838', 'franciscoalan.santos@ifma.edu.br', '2024-11-23 21:32:58', '2024-11-23 21:33:09'),
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
DROP TABLE IF EXISTS `turmas`;
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
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `categoria` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `professor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `professor_id` (`professor_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela gestaoedu.usuarios: ~0 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `username`, `password`, `categoria`, `status`, `createdAt`, `updatedAt`, `professor_id`) VALUES
	(1, '1226388', '$2b$10$hIT4NsUnySANW151uZe3jeKoNAlRQ.NI7o4C/Za75/7ljn.7GDjvG', 1, 1, '2024-11-14 16:00:09', '2024-11-14 16:00:10', 7);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
