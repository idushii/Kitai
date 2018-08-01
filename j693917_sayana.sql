-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Авг 01 2018 г., 01:26
-- Версия сервера: 10.1.33-MariaDB
-- Версия PHP: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `j693917_sayana`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categoris`
--

CREATE TABLE `categoris` (
  `id` int(11) NOT NULL,
  `Title` text NOT NULL,
  `Info` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categoris`
--

INSERT INTO `categoris` (`id`, `Title`, `Info`) VALUES
(1, 'Главная', 'Тексты на главной странице'),
(2, 'О нас', 'Тексты на странице о нас'),
(3, 'Тесты', 'Страницы с прохождением тестов'),
(4, 'Словарь', 'Словарь со словами 1 - 6 уровней китайского языка');

-- --------------------------------------------------------

--
-- Структура таблицы `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `Path` text NOT NULL,
  `Title` text NOT NULL,
  `Text` text NOT NULL,
  `OrderItem` int(11) NOT NULL,
  `ShowItem` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `pages`
--

INSERT INTO `pages` (`id`, `Path`, `Title`, `Text`, `OrderItem`, `ShowItem`) VALUES
(1, 'Main', 'Главная', '<div id=\"lipsum\" style=\"margin: 0px; padding: 0px; text-align: justify; font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\"><p style=\"margin: 0px 0px 15px; padding: 0px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus leo, pellentesque sed tempus quis, vehicula eget orci. Etiam tortor nulla, commodo a neque in, fermentum semper diam. Fusce efficitur, erat gravida elementum vehicula, nulla nisl ultrices dui, sed ornare nunc massa quis dui. Praesent dignissim, tortor a accumsan sagittis, lorem enim accumsan sapien, at sollicitudin velit arcu non nibh. Aliquam ultrices nulla sollicitudin, aliquam nulla quis, elementum velit. Praesent bibendum, ante viverra lobortis consequat, elit urna tempor lorem, eget ullamcorper dolor enim vitae felis. Nam at tempor mi. Nunc dignissim sit amet arcu eu vehicula. Fusce pretium varius luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum vitae urna neque. Pellentesque aliquet dolor at urna placerat, non pretium elit suscipit. Suspendisse vitae ante in est fringilla efficitur et sed purus. In placerat sollicitudin risus, vitae lobortis lorem sollicitudin at. Vestibulum eu congue libero, vel dignissim nibh.</p><p style=\"margin: 0px 0px 15px; padding: 0px;\">Pellentesque molestie ipsum eu urna tincidunt, sit amet ornare dolor blandit. Sed feugiat at odio id convallis. Integer eu risus eget tellus ullamcorper ullamcorper. Morbi at tristique nisi. Fusce a condimentum risus, nec vestibulum neque. Fusce quis orci quis nisi cursus sodales. Praesent sagittis mollis ultrices. Maecenas id egestas est.</p><p style=\"margin: 0px 0px 15px; padding: 0px;\">Sed non porttitor diam. In tellus metus, posuere non ligula in, vehicula faucibus odio. Sed mollis condimentum est id venenatis. Proin ut imperdiet elit, vitae rutrum lectus. Curabitur eget lorem nec mi rutrum tincidunt. Nunc ullamcorper orci sit amet ultrices scelerisque. Nunc rhoncus sapien sit amet nulla bibendum, sed gravida diam euismod.</p><p style=\"margin: 0px 0px 15px; padding: 0px;\">In fermentum, elit vel tempor consectetur, lectus ipsum fermentum arcu, sit amet blandit nisi lectus ac metus. Nam nisl massa, tincidunt sed malesuada dapibus, sollicitudin id sem. Donec tincidunt viverra gravida. Nulla turpis mi, convallis id blandit eu, gravida non felis. Vestibulum eget pulvinar libero. Ut rutrum elementum ipsum sit amet fringilla. Suspendisse consectetur turpis eget turpis ullamcorper, a dapibus tortor efficitur. Curabitur tempus, tellus eu luctus condimentum, purus erat accumsan tellus, et accumsan ante augue a massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis sagittis leo a purus rhoncus, quis porta nulla elementum. Maecenas dignissim eros ut odio fringilla, in ornare nibh convallis. Morbi egestas nunc dui, hendrerit mattis ligula venenatis quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec diam sapien, suscipit at mauris nec, dictum ultricies dolor.</p><p style=\"margin: 0px 0px 15px; padding: 0px;\">Cras ac lectus sit amet nisi rhoncus pulvinar et vestibulum nulla. Ut diam dolor, sagittis et enim eget, pretium ornare diam. Duis malesuada tempus purus, accumsan semper erat convallis non. Ut rutrum lorem ante, ut tincidunt leo scelerisque ac. Donec at nunc quam. Vestibulum id mauris fermentum, commodo nulla eu, commodo eros. Sed quis nisi feugiat, sagittis nulla nec, porta massa. Integer ultricies erat vitae justo molestie, in maximus ligula finibus.</p><div><br></div></div>', 0, 1),
(2, 'About', 'О нас', '<div id=\"lipsum\" style=\"margin: 0px; padding: 0px; text-align: justify; font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\"><div><div id=\"lipsum\" style=\"margin: 0px; padding: 0px;\"><p style=\"margin: 0px 0px 15px; padding: 0px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat sollicitudin neque vitae mollis. Etiam dignissim ante eget orci aliquet malesuada. Sed iaculis magna ac urna tempor congue. Fusce tincidunt rhoncus tortor. Sed porttitor scelerisque leo quis commodo. Praesent blandit, turpis et blandit bibendum, tortor elit vestibulum tellus, sed egestas lectus sapien venenatis nunc. Nullam vel augue risus. Praesent pulvinar orci id mi tincidunt commodo. Duis auctor scelerisque lorem, eu vestibulum neque consectetur sit amet.</p><p style=\"margin: 0px 0px 15px; padding: 0px;\">Nunc vulputate commodo commodo. In nunc magna, euismod non quam nec, lobortis imperdiet nisi. Nam ac enim eros. Nulla tempus egestas enim ac ultricies. Pellentesque bibendum dapibus fermentum. Integer ut orci non nisl porttitor tristique venenatis non dui. Curabitur pulvinar velit eu lectus volutpat euismod. Sed euismod ante nibh, sit amet rhoncus metus cursus in.</p><p style=\"margin: 0px 0px 15px; padding: 0px;\">Phasellus tempus, neque hendrerit congue blandit, turpis nibh tincidunt libero, eget consequat est erat sed odio. Ut ultrices tincidunt orci vitae interdum. Sed vitae lorem nec arcu mattis volutpat eu eu purus. Nullam et odio eu ex rhoncus commodo sed at est. Cras imperdiet lacus et diam euismod venenatis. Donec tempor efficitur tempus. Mauris tortor erat, tempus sit amet accumsan eu, bibendum vitae nulla. Sed viverra varius sem, sodales congue ex posuere sit amet. Aliquam euismod tincidunt nunc, sit amet convallis sem pharetra ac. Vivamus quis tincidunt dui. Mauris volutpat sapien mollis leo malesuada, non maximus nulla pharetra. Nullam hendrerit sem massa, non imperdiet purus aliquam in. Praesent et enim sit amet lacus hendrerit finibus.</p><p style=\"margin: 0px 0px 15px; padding: 0px;\">Duis sit amet est accumsan, tempor erat a, varius ex. Duis sapien justo, efficitur id fermentum et, elementum ac elit. Aenean malesuada fermentum mi sed ullamcorper. Aliquam erat volutpat. Nunc posuere consectetur massa quis lacinia. Aliquam tempus dui a ipsum finibus semper. Nullam vel sapien vitae lectus ornare dignissim tempus sit amet felis.</p><p style=\"margin: 0px 0px 15px; padding: 0px;\">Vivamus vitae hendrerit sapien, ac tempor felis. Mauris non augue et purus feugiat placerat at ac augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo accumsan elit, ut dapibus metus ultricies sit amet. Cras fermentum, metus sit amet blandit faucibus, libero metus condimentum sem, in tristique lectus ligula quis elit. Donec non feugiat libero. Fusce eleifend mollis ligula, eget ultrices felis. Vivamus mi nisl, mattis vitae odio a, cursus efficitur lectus.</p><div><br></div></div></div></div>', 1, 1),
(3, 'Words', 'Словарь', 'Translate', 2, 1),
(4, 'Testing', 'Тестирование', '<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\">Integer vitae ultrices est. Sed scelerisque nibh ac tellus rhoncus lacinia. In pellentesque a eros vel tincidunt. In lacinia in libero eget mattis. Nunc semper, metus ac pharetra tempor, arcu purus tempus arcu, vitae convallis magna elit ac ligula. Suspendisse potenti. Mauris faucibus quis libero ut hendrerit. Pellentesque sed viverra risus. Morbi imperdiet vehicula tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla vehicula non metus sed malesuada.</p>', 3, 1),
(5, 'Grammar', 'Грамматика', '<div id=\"lipsum\" style=\"margin: 0px; padding: 0px; text-align: justify; font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);\"><p style=\"margin: 0px 0px 15px; padding: 0px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus dapibus quam, eu elementum velit dapibus sed. Suspendisse potenti. In at dui risus. Donec libero leo, dapibus ac laoreet eget, malesuada nec dui. Sed urna erat, vestibulum nec arcu quis, porttitor euismod ipsum. Ut eu varius nisi. Fusce massa libero, congue non metus non, rhoncus molestie justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent dictum et lacus luctus lobortis. Donec eget ornare velit. Vivamus a pellentesque odio. Nunc egestas fringilla diam. Maecenas gravida pulvinar massa, non pharetra odio consequat vel. Integer eget dui at erat feugiat efficitur.</p><p style=\"margin: 0px 0px 15px; padding: 0px;\">Sed vehicula turpis in sem convallis elementum. Ut vehicula rhoncus pretium. Suspendisse potenti. Proin orci risus, lacinia et sollicitudin quis, varius a enim. Aliquam interdum, metus eu sagittis pharetra, dui purus condimentum sapien, vitae finibus purus augue eleifend ex. Maecenas viverra, dui at sagittis hendrerit, tortor erat porta dui, eu mollis mauris est sit amet tortor. Aenean in fermentum mi. Donec hendrerit, lacus eget rutrum posuere, nibh nisl porttitor sapien, in auctor nisl orci in tellus. Morbi enim libero, volutpat sit amet facilisis quis, fringilla at eros. Aliquam imperdiet commodo accumsan. Quisque est dui, viverra quis lobortis in, aliquam suscipit turpis. Sed dictum sed nisl eu fringilla. Fusce pretium quis felis ac cursus. Morbi eu mi vel arcu hendrerit lacinia. Fusce quis convallis lacus. Vivamus scelerisque, eros sed feugiat aliquam, ex diam lobortis massa, eget feugiat lectus augue ut enim.</p><p style=\"margin: 0px 0px 15px; padding: 0px;\">Integer vitae ultrices est. Sed scelerisque nibh ac tellus rhoncus lacinia. In pellentesque a eros vel tincidunt. In lacinia in libero eget mattis. Nunc semper, metus ac pharetra tempor, arcu purus tempus arcu, vitae convallis magna elit ac ligula. Suspendisse potenti. Mauris faucibus quis libero ut hendrerit. Pellentesque sed viverra risus. Morbi imperdiet vehicula tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla vehicula non metus sed malesuada.</p><p style=\"margin: 0px 0px 15px; padding: 0px;\">Nunc non ultricies ipsum, id elementum orci. Integer a sem sapien. Sed euismod ligula non risus faucibus ultrices. Integer varius purus erat, in lacinia nunc tristique sit amet. Mauris vitae velit ullamcorper purus imperdiet varius. Maecenas eu iaculis ante, non mattis justo. Aliquam elit purus, auctor non orci at, tristique gravida nisl. Sed et facilisis risus, a facilisis lorem. Nunc lobortis justo non augue vulputate varius.</p><p style=\"margin: 0px 0px 15px; padding: 0px;\">Etiam dignissim erat malesuada ante viverra porttitor. Aenean eu bibendum neque. Praesent in lectus sem. Sed nec pellentesque enim. Nunc placerat sed turpis a pellentesque. Praesent vitae sem sit amet nisl rhoncus ultrices. Donec at nibh sed lacus pharetra accumsan. Cras efficitur turpis vel bibendum dictum.</p><div><br></div></div>', 4, 1),
(6, 'Userfull', 'Полезное', 'Userfull', 5, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `records`
--

CREATE TABLE `records` (
  `id` int(11) NOT NULL,
  `Text` text NOT NULL,
  `idCategory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `testings`
--

CREATE TABLE `testings` (
  `id` int(11) NOT NULL,
  `idCategory` int(11) NOT NULL,
  `Title` text NOT NULL,
  `Info` text NOT NULL,
  `InfoFull` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `testings`
--

INSERT INTO `testings` (`id`, `idCategory`, `Title`, `Info`, `InfoFull`) VALUES
(1, 3, 'Тест № 1', 'Этот тест проверит базовые знания', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium dui nec felis tincidunt pulvinar. Fusce ultrices sapien pretium rhoncus pretium. Ut mauris sem, auctor ac egestas eget, malesuada at ligula. Sed eleifend vitae risus id consequat. Etiam pharetra gravida justo, a porttitor purus iaculis in. Suspendisse id porttitor mi. Pellentesque vehicula non est eu commodo. Suspendisse vitae pretium lectus. Duis ut condimentum est.  Nulla vel lorem sapien. Quisque a sapien eu nibh hendrerit tempor et a purus. Nullam eget cursus lacus. Nunc eget dolor sit amet ante finibus accumsan. Ut enim ipsum, finibus quis tincidunt non, iaculis condimentum dui. In non leo quis mi auctor viverra ut id libero. Praesent urna ipsum, mattis ac auctor non, bibendum sit amet massa. Vivamus ullamcorper pharetra sem sit amet gravida. Aliquam nibh ante, rhoncus sit amet blandit quis, consequat quis quam. Suspendisse maximus ultricies lacus luctus blandit. Curabitur nec nisl quam. Curabitur sodales faucibus ornare.  Praesent quis quam viverra, viverra ligula a, ullamcorper nisi. Etiam vehicula quam a pretium tempor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc in lobortis nisi. Nam in neque vestibulum, imperdiet felis at, vestibulum diam. Mauris non massa ut arcu congue molestie ut nec mi. Sed vel libero nec nisl ultrices gravida eget eget diam. Vestibulum tempus ante dui, ut facilisis nulla varius id. Pellentesque eleifend eget est convallis lacinia. Suspendisse et lacinia dui, vel consectetur ligula. Mauris lacinia mollis pulvinar. Donec quis convallis magna, eget laoreet orci. Morbi rhoncus elit nunc, iaculis bibendum turpis volutpat sed. Pellentesque ac massa eleifend, posuere velit ac, tincidunt lectus. Morbi nulla mauris, imperdiet vel est nec, facilisis convallis ligula.');

-- --------------------------------------------------------

--
-- Структура таблицы `testings_item`
--

CREATE TABLE `testings_item` (
  `id` int(11) NOT NULL,
  `idTest` int(11) NOT NULL,
  `OrderItem` int(11) NOT NULL DEFAULT '0',
  `Quest` text NOT NULL,
  `Info` text NOT NULL,
  `Variant_1` text NOT NULL,
  `Variant_2` text NOT NULL,
  `Variant_3` text NOT NULL,
  `Variant_4` text NOT NULL,
  `NumberTrue` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Информация для страниц теста. Содержит ссылку на тест и варианты ответов, а так же номер правильного ответа.';

--
-- Дамп данных таблицы `testings_item`
--

INSERT INTO `testings_item` (`id`, `idTest`, `OrderItem`, `Quest`, `Info`, `Variant_1`, `Variant_2`, `Variant_3`, `Variant_4`, `NumberTrue`) VALUES
(1, 1, 0, 'Вопрос', '<span style=\"text-decoration-line: underline;\">Cras mauris lorem, tempus at tristique ac, porta non diam.&nbsp;</span><div style=\"text-align: justify;\">Vivamus id ipsum non velit mollis fermentum molestie ut ante. Curabitur eu tellus rutrum est molestie vulputate sit amet a elit. Vestibulum sodales, nunc id consequat eleifend, felis eros luctus quam, vitae facilisis elit magna quis mauris. Nullam molestie augue sed neque finibus dapibus ac vel enim. Mauris sed auctor ante, ut sodales purus. In vulputate, justo non ornare feugiat, sem nisl rutrum mi, eget cursus felis diam a enim. Integer aliquam venenatis felis ac sollicitudin. Aliquam mollis nisi et risus lacinia, et bibendum velit malesuada.</div>', 'Вариант 1', 'Вариант 2', '', '', 0),
(2, 1, 0, 'Вопрос', 'Cras mauris lorem, tempus at tristique ac, porta non diam. Vivamus id ipsum non velit mollis fermentum molestie ut ante. Curabitur eu tellus rutrum est molestie vulputate sit amet a elit. Vestibulum sodales, nunc id consequat eleifend, felis eros luctus quam, vitae facilisis elit magna quis mauris. Nullam molestie augue sed neque finibus dapibus ac vel enim. Mauris sed auctor ante, ut sodales purus. In vulputate, justo non ornare feugiat, sem nisl rutrum mi, eget cursus felis diam a enim. Integer aliquam venenatis felis ac sollicitudin. Aliquam mollis nisi et risus lacinia, et bibendum velit malesuada.', 'Вариант', 'Вариант', 'Вариант', '', 2),
(3, 1, 0, 'Вопрос', 'Cras mauris lorem, tempus at tristique ac, porta non diam. Vivamus id ipsum non velit mollis fermentum molestie ut ante. Curabitur eu tellus rutrum est molestie vulputate sit amet a elit. Vestibulum sodales, nunc id consequat eleifend, felis eros luctus quam, vitae facilisis elit magna quis mauris. Nullam molestie augue sed neque finibus dapibus ac vel enim. Mauris sed auctor ante, ut sodales purus. In vulputate, justo non ornare feugiat, sem nisl rutrum mi, eget cursus felis diam a enim. Integer aliquam venenatis felis ac sollicitudin. Aliquam mollis nisi et risus lacinia, et bibendum velit malesuada.', 'Вариант', 'Вариант', 'Вариант', 'Вариант', 1),
(4, 1, 0, 'Вопрос', 'Cras mauris lorem, tempus at tristique ac, porta non diam. Vivamus id ipsum non velit mollis fermentum molestie ut ante. Curabitur eu tellus rutrum est molestie vulputate sit amet a elit. Vestibulum sodales, nunc id consequat eleifend, felis eros luctus quam, vitae facilisis elit magna quis mauris. Nullam molestie augue sed neque finibus dapibus ac vel enim. Mauris sed auctor ante, ut sodales purus. In vulputate, justo non ornare feugiat, sem nisl rutrum mi, eget cursus felis diam a enim. Integer aliquam venenatis felis ac sollicitudin. Aliquam mollis nisi et risus lacinia, et bibendum velit malesuada.', 'Вариант', 'Вариант', 'Вариант', '', 0),
(5, 1, 0, 'Вопрос', 'Cras mauris lorem, tempus at tristique ac, porta non diam. Vivamus id ipsum non velit mollis fermentum molestie ut ante. Curabitur eu tellus rutrum est molestie vulputate sit amet a elit. Vestibulum sodales, nunc id consequat eleifend, felis eros luctus quam, vitae facilisis elit magna quis mauris. Nullam molestie augue sed neque finibus dapibus ac vel enim. Mauris sed auctor ante, ut sodales purus. In vulputate, justo non ornare feugiat, sem nisl rutrum mi, eget cursus felis diam a enim. Integer aliquam venenatis felis ac sollicitudin. Aliquam mollis nisi et risus lacinia, et bibendum velit malesuada.', 'Вариант', 'Вариант', 'Вариант', 'Вариант', 3),
(6, 1, 0, 'Вопрос', 'Cras mauris lorem, tempus at tristique ac, porta non diam. Vivamus id ipsum non velit mollis fermentum molestie ut ante. Curabitur eu tellus rutrum est molestie vulputate sit amet a elit. Vestibulum sodales, nunc id consequat eleifend, felis eros luctus quam, vitae facilisis elit magna quis mauris. Nullam molestie augue sed neque finibus dapibus ac vel enim. Mauris sed auctor ante, ut sodales purus. In vulputate, justo non ornare feugiat, sem nisl rutrum mi, eget cursus felis diam a enim. Integer aliquam venenatis felis ac sollicitudin. Aliquam mollis nisi et risus lacinia, et bibendum velit malesuada.', 'Вариант', 'Вариант', 'Вариант', '', 2),
(7, 1, 0, 'Вопрос', 'Cras mauris lorem, tempus at tristique ac, porta non diam. Vivamus id ipsum non velit mollis fermentum molestie ut ante. Curabitur eu tellus rutrum est molestie vulputate sit amet a elit. Vestibulum sodales, nunc id consequat eleifend, felis eros luctus quam, vitae facilisis elit magna quis mauris. Nullam molestie augue sed neque finibus dapibus ac vel enim. Mauris sed auctor ante, ut sodales purus. In vulputate, justo non ornare feugiat, sem nisl rutrum mi, eget cursus felis diam a enim. Integer aliquam venenatis felis ac sollicitudin. Aliquam mollis nisi et risus lacinia, et bibendum velit malesuada.', 'Вариант', 'Вариант', 'Вариант', 'Вариант', 2),
(8, 1, 0, 'Вопрос', 'Cras mauris lorem, tempus at tristique ac, porta non diam. Vivamus id ipsum non velit mollis fermentum molestie ut ante. Curabitur eu tellus rutrum est molestie vulputate sit amet a elit. Vestibulum sodales, nunc id consequat eleifend, felis eros luctus quam, vitae facilisis elit magna quis mauris. Nullam molestie augue sed neque finibus dapibus ac vel enim. Mauris sed auctor ante, ut sodales purus. In vulputate, justo non ornare feugiat, sem nisl rutrum mi, eget cursus felis diam a enim. Integer aliquam venenatis felis ac sollicitudin. Aliquam mollis nisi et risus lacinia, et bibendum velit malesuada.', 'Вариант', 'Вариант', '', '', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `Login` varchar(20) NOT NULL,
  `Pass` text NOT NULL,
  `Token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `Login`, `Pass`, `Token`) VALUES
(1, 'User', '123', '');

-- --------------------------------------------------------

--
-- Структура таблицы `words`
--

CREATE TABLE `words` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `Title` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categoris`
--
ALTER TABLE `categoris`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `testings`
--
ALTER TABLE `testings`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `testings_item`
--
ALTER TABLE `testings_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idTest` (`idTest`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categoris`
--
ALTER TABLE `categoris`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `testings`
--
ALTER TABLE `testings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `testings_item`
--
ALTER TABLE `testings_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `testings_item`
--
ALTER TABLE `testings_item`
  ADD CONSTRAINT `testings_item_ibfk_1` FOREIGN KEY (`idTest`) REFERENCES `testings` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
