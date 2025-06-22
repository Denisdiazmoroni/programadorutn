-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 22-06-2025 a las 10:52:35
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `m4u4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

DROP TABLE IF EXISTS `novedades`;
CREATE TABLE IF NOT EXISTS `novedades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` text NOT NULL,
  `cuerpo` text NOT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id`, `titulo`, `subtitulo`, `cuerpo`, `img_id`) VALUES
(1, 'Abe Bueno-Jallad de The Chosen invita al público a profundizar en la Biblia y vivir una “gran transformación”', 'Abe Bueno-Jallad, quien interpreta a Santiago el Mayor (“Big James”) en la exitosa serie “The Chosen”, compartió cómo su experiencia en el set lo ha transformado espiritual y personalmente.', 'La quinta temporada, titulada “La Última Cena”, marca el inicio del final de la serie y se adentra en los días más intensos de la vida de Jesús, preparando el camino para una película sobre la crucifixión y otra sobre la resurrección en las próximas temporadas.\r\n\r\nPara Bueno-Jallad, el alcance de la serie ha sido “surrealista”, especialmente al ver cómo jóvenes de nuevas generaciones se acercan a la historia de Jesús gracias a la producción.\r\n\r\nEl actor confesó que interpretar a un personaje bíblico le ha exigido una profunda responsabilidad y autenticidad. “Estos últimos cinco años representan la mayor investigación que he hecho en la Biblia”, explicó, detallando que estudió no solo los Evangelios, sino también el Antiguo Testamento, para comprender la perspectiva original de su personaje, que no conocía el Nuevo Testamento.', NULL),
(3, '“Dios está haciendo algo nuevo”', 'Pastor en Irán tiene esperanza en la caída del régimen islámico con la guerra actual', 'Yeghnazar explicó que el ataque israelí no fue una sorpresa para quienes han estado orando y escuchando al Espíritu Santo durante años. Sin embargo, reconoció la dura realidad: “Son las personas comunes quienes soportarán los fardos más pesados”. Por ello, pidió oración urgente por Irán e Israel, clamando para que los fieles de ambos países sigan llevando esperanza y vida, y para que los que sufren encuentren consuelo y libertad.', NULL),
(15, 'noticia', 'descripción de la noticia ', 'Lorem Ipsum Generator\r\nQuickly and easily generate Lorem Ipsum placeholder text. Select the number of characters, words, sentences or paragraphs, and hit generate!', 'mycvrbswbxujf81rwxzn'),
(10, 'prueba de alerta', 'prueba', 'prueba de alertas en modificar, agregar y eliminar.', NULL),
(14, 'prueba sin imagen', 'prueba', 'prueba', ''),
(13, 'prueba de imagen', 'prueba 2', 'prueba', 'axxopxokocollfueq6ok');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'denis', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'flavia', '81dc9bdb52d04dc20036dbd8313ed055');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
