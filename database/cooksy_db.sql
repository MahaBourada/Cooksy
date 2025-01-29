-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 29 jan. 2025 à 11:36
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cooksy_recettes`
--

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

CREATE TABLE `avis` (
  `id_avis` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `nom_personne` varchar(45) NOT NULL,
  `note` varchar(45) NOT NULL,
  `commentaire` text NOT NULL,
  `id_recette` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `avis`
--

INSERT INTO `avis` (`id_avis`, `date`, `nom_personne`, `note`, `commentaire`, `id_recette`) VALUES
(1, '2025-01-29 01:12:17', 'Léa Dupont', '5', 'Cette recette est absolument délicieuse ! Facile à préparer et pleine de saveurs. Je vais la refaire très bientôt !', 182),
(2, '2025-01-29 01:12:30', 'Marc Lefevre', '4', 'Très bon plat, mais j\'ai trouvé que le temps de cuisson était un peu trop long pour moi. Sinon, le goût était parfait.', 182),
(3, '2025-01-29 01:12:54', 'Claire Martin', '3', 'La recette était correcte, mais je m\'attendais à quelque chose d\'un peu plus savoureux. Je vais essayer une version différente la prochaine fois.', 189),
(4, '2025-01-28 01:13:06', 'Thomas Bernard', '2', 'Je n\'ai pas du tout aimé cette recette. Le plat était trop épicé pour moi et les ingrédients ne se mariaient pas bien ensemble.', 189),
(5, '2025-01-28 01:13:24', 'Sophie Lefèvre', '4', 'Une belle découverte ! Le goût est vraiment agréable, mais la présentation pourrait être améliorée.', 191),
(6, '2025-01-27 01:13:39', 'Antoine Robert', '5', 'Excellente recette ! Tout le monde à la maison a adoré. Je la recommande sans hésitation.', 191),
(7, '2025-01-27 01:13:55', 'Julie Bernard', '3', 'Pas mal, mais un peu trop sucré à mon goût. Peut-être qu\'une version plus salée serait meilleure.', 191),
(8, '2025-01-27 01:14:15', 'Pierre Lefevre', '1', 'Décevant, la recette ne correspondait pas du tout à ce que j\'attendais. Je n’ai pas pu finir le plat.', 188),
(9, '2025-01-26 01:14:28', 'Nicolas Petit', '4', 'Très bon plat, mais je pense que l\'ajout d\'un peu plus de légumes serait idéal. Sinon, tout était parfait.', 188),
(10, '2025-01-25 01:14:44', 'Isabelle Durand', '5', 'Un vrai régal ! Facile à préparer et vraiment délicieux. J’ai suivi la recette à la lettre et c’était parfait.', 184),
(11, '2025-01-25 01:15:13', 'Camille Lefevre', '5', 'Un plat vraiment savoureux et facile à préparer ! J\'ai ajouté un peu de fromage râpé et c\'était délicieux. Je le recommande vivement.', 192),
(12, '2025-01-23 01:15:29', 'Julien Durand', '2', 'Je n\'ai pas aimé le mélange des saveurs. La recette ne m’a pas convaincu, elle manquait un peu de saveur et d’équilibre.', 192),
(13, '2025-01-23 01:16:03', 'Émilie Dupuis', '4', 'Très bonne recette ! J\'ai juste ajouté un peu plus de sel et de poivre pour rehausser les saveurs. Le plat est délicieux.', 187),
(14, '2025-01-23 03:27:52', 'Julien Perrault', '1', 'Recette compliquée et résultat moyen. Trop de manipulations inutiles pour un résultat qui n\'en vaut pas la peine. Les saveurs manquent de profondeur, et le plat n\'est pas à la hauteur du temps et des efforts investis. À améliorer.', 184);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id_categorie` int(11) NOT NULL,
  `nom_categorie` varchar(45) NOT NULL,
  `sous_categorie` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_categorie`, `nom_categorie`, `sous_categorie`) VALUES
(2, 'Plat principal', 'Viande'),
(3, 'Dessert', 'Gâteau'),
(4, 'Entrée', 'Velouté'),
(15, 'Plat principal', 'Poisson'),
(17, 'Dessert', 'Crème');

-- --------------------------------------------------------

--
-- Structure de la table `couts`
--

CREATE TABLE `couts` (
  `id_cout` int(11) NOT NULL,
  `texte_cout` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `couts`
--

INSERT INTO `couts` (`id_cout`, `texte_cout`) VALUES
(1, 'Pas cher'),
(2, 'Bon marché'),
(3, 'Cher');

-- --------------------------------------------------------

--
-- Structure de la table `est_compose`
--

CREATE TABLE `est_compose` (
  `id_recette` int(11) NOT NULL,
  `id_ingredient` int(11) NOT NULL,
  `quantite` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `est_compose`
--

INSERT INTO `est_compose` (`id_recette`, `id_ingredient`, `quantite`) VALUES
(182, 55, '9'),
(182, 56, '500'),
(182, 57, '400'),
(182, 58, '1'),
(182, 59, '1'),
(182, 60, '1'),
(182, 61, '1'),
(182, 62, '500'),
(182, 63, '50'),
(182, 64, '50'),
(182, 65, '150'),
(182, 66, '2'),
(182, 67, '1'),
(184, 68, '500'),
(184, 69, '2'),
(184, 70, '1'),
(184, 71, '500'),
(184, 72, '100'),
(184, 73, '1'),
(184, 74, '1'),
(187, 63, '150'),
(187, 64, '125'),
(187, 75, '0.5'),
(187, 76, '2'),
(187, 77, '0.5'),
(187, 78, '100'),
(187, 79, '3'),
(187, 80, '1'),
(188, 71, '500'),
(188, 73, '2'),
(188, 81, '250'),
(188, 82, '200'),
(188, 83, '2'),
(188, 84, '1'),
(188, 85, '2'),
(188, 86, '1'),
(188, 87, '1'),
(189, 78, '1'),
(189, 82, '150'),
(189, 88, '200'),
(189, 89, '2'),
(189, 90, '2'),
(189, 91, '50'),
(189, 92, '2'),
(189, 93, '1'),
(189, 94, '1'),
(190, 73, '1'),
(190, 87, '1'),
(190, 95, '1'),
(190, 96, '200'),
(190, 97, '200'),
(190, 98, '1'),
(191, 58, '1'),
(191, 60, '2'),
(191, 83, '500'),
(191, 93, '1'),
(191, 94, '1'),
(191, 99, '200'),
(191, 100, '2'),
(191, 101, '1'),
(192, 60, '1'),
(192, 102, '200'),
(192, 103, '200'),
(192, 104, '200'),
(192, 105, '1'),
(192, 106, '1'),
(193, 78, '80'),
(193, 107, '250'),
(193, 108, '200'),
(193, 109, '200'),
(193, 110, '300'),
(193, 111, '1'),
(193, 112, '3'),
(193, 113, '1');

-- --------------------------------------------------------

--
-- Structure de la table `etapes`
--

CREATE TABLE `etapes` (
  `id_etape` int(11) NOT NULL,
  `num_etape` int(11) NOT NULL,
  `texte_etape` varchar(300) NOT NULL,
  `id_recette` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `etapes`
--

INSERT INTO `etapes` (`id_etape`, `num_etape`, `texte_etape`, `id_recette`) VALUES
(40, 1, 'Préparez la sauce bolognaise : Faites revenir l’oignon, l’ail et la carotte émincés dans l’huile d’olive. Ajoutez la viande hachée et faites-la dorer.', 182),
(41, 2, 'Ajoutez les tomates pelées, le concentré de tomate, le sel, le poivre et le basilic. Laissez mijoter 20 minutes.', 182),
(42, 3, 'Préparez la béchamel : Faites fondre le beurre dans une casserole, ajoutez la farine et mélangez. Versez le lait progressivement tout en fouettant pour éviter les grumeaux. Salez et poivrez.', 182),
(43, 4, 'Montez les lasagnes : Dans un plat, alternez une couche de bolognaise, une couche de béchamel, une feuille de lasagne. Répétez jusqu’à épuisement des ingrédients. Terminez par une couche de béchamel et parsemez de fromage râpé.', 182),
(44, 5, 'Faites cuire au four à 180 °C pendant 40 à 45 minutes.', 182),
(45, 1, 'Épluchez et coupez la courge, les carottes et l’oignon en morceaux.', 184),
(46, 3, 'Ajoutez la courge, les carottes et le bouillon. Laissez mijoter 20 minutes.', 184),
(47, 4, 'Mixez, incorporez la crème ou le lait de coco, puis\nassaisonnez.', 184),
(49, 1, 'Mélanger les œufs et le sucre.', 187),
(50, 2, 'Ajouter le beurre fondu, puis la farine et la levure.', 187),
(51, 3, 'Couper les bananes en tout petits morceaux (ou les écraser) et l\' ajouter au mélange.', 187),
(52, 4, 'Aromatiser avec le rhum et la vanille.', 187),
(53, 5, 'Verser le tout dans un moule à cake beurré et fariné.', 187),
(54, 1, 'Dans une grande poêle, faites revenir les cuisses de poulet dans l\'huile d\'olive.', 188),
(55, 2, 'Ajoutez les légumes coupés en morceaux, puis faites cuire pendant 5 minutes.', 188),
(56, 3, 'Ajoutez le riz et mélangez bien avant d’ajouter le bouillon chaud et le safran.', 188),
(57, 4, 'Laissez mijoter à feu moyen pendant 30 minutes.', 188),
(58, 5, 'Ajoutez les crevettes et laissez cuire pendant 10 minutes jusqu\'à ce que tout soit bien cuit.', 188),
(59, 1, 'Faites cuire les nouilles de riz selon les instructions du paquet.', 189),
(60, 2, 'Dans un wok, faites sauter les crevettes dans l\'huile chaude pendant 2 minutes.', 189),
(61, 3, 'Ajoutez la sauce soja, le tamarin, le sucre et faites cuire pendant encore 2 minutes.', 189),
(62, 4, 'Incorporez les nouilles cuites, puis mélangez bien.', 189),
(63, 5, 'Servez avec des cacahuètes concassées, des oignons verts et de la coriandre fraîche.', 189),
(64, 1, 'Étalez la pâte à pizza sur une plaque de cuisson.', 190),
(65, 2, 'Étalez une fine couche de sauce tomate sur la pâte.', 190),
(66, 3, 'Répartissez la mozzarella coupée en tranches sur la sauce.', 190),
(67, 4, 'Cuisez la pizza au four à 200°C pendant 12-15 minutes.', 190),
(68, 5, 'À la sortie du four, ajoutez les feuilles de basilic frais et un filet d\'huile d\'olive.', 190),
(69, 1, 'Faites revenir l\'oignon et l\'ail hachés dans de l\'huile chaude.', 191),
(70, 2, 'Ajoutez le poulet coupé en morceaux et faites cuire jusqu’à ce qu’il soit doré.', 191),
(71, 3, 'Ajoutez la pâte de curry et le gingembre râpé, mélangez bien.', 191),
(72, 4, 'Versez le lait de coco, puis laissez mijoter pendant 30 minutes.', 191),
(73, 5, 'Servez avec de la coriandre fraîche hachée.', 191),
(74, 1, 'Faites fondre les fromages râpés avec le vin blanc dans un caquelon à fondue.', 192),
(75, 2, 'Frottez l\'intérieur du caquelon avec une gousse d\'ail.', 192),
(76, 3, 'Mélangez régulièrement jusqu\'à obtenir une texture crémeuse.', 192),
(77, 4, 'Coupez le pain en morceaux et servez avec la fondue.', 192),
(78, 1, 'Séparez les blancs d\'œufs des jaunes.', 193),
(79, 2, 'Montez les blancs en neige et réservez.', 193),
(80, 3, 'Fouettez les jaunes d\'œufs avec le sucre jusqu\'à ce que le mélange devienne crémeux.', 193),
(81, 4, 'Incorporez le mascarpone et la vanille au mélange de jaunes d\'œufs.', 193),
(82, 5, 'Montez la crème liquide en chantilly, puis incorporez-la délicatement au mélange.', 193),
(83, 6, 'Ajoutez les blancs en neige et mélangez délicatement.', 193),
(84, 7, 'Trempez rapidement les biscuits à la cuillère dans le café fort et disposez-les dans un plat.', 193),
(85, 8, 'Recouvrez les biscuits de la crème au mascarpone.', 193),
(86, 9, 'Répétez l\'opération avec une autre couche de biscuits et de crème.', 193),
(87, 10, 'Réfrigérez pendant au moins 4 heures, puis saupoudrez de cacao avant de servir.', 193);

-- --------------------------------------------------------

--
-- Structure de la table `etiquettes`
--

CREATE TABLE `etiquettes` (
  `id_etiquette` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `etiquettes`
--

INSERT INTO `etiquettes` (`id_etiquette`, `nom`) VALUES
(2, 'Sans-gluten'),
(13, 'Végétarien'),
(14, 'Fruits de mer');

-- --------------------------------------------------------

--
-- Structure de la table `ingredients`
--

CREATE TABLE `ingredients` (
  `id_ingredient` int(11) NOT NULL,
  `nom_ingredient` varchar(80) NOT NULL,
  `mesure` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ingredients`
--

INSERT INTO `ingredients` (`id_ingredient`, `nom_ingredient`, `mesure`) VALUES
(55, 'Feuilles de lasagnes', 'plaques'),
(56, 'Viande hachée de bœuf', 'g'),
(57, 'Tomates pelées', 'g'),
(58, 'Oignon', ''),
(59, 'Carotte', ''),
(60, 'Ail', 'gousse'),
(61, 'Concentré de tomate', 'cuil. à soupe'),
(62, 'Lait', 'ml'),
(63, 'Farine', 'g'),
(64, 'Beurre', 'g'),
(65, 'Fromage râpé (type emmental ou parmesan)', 'g'),
(66, 'Huile d\'olive', 'cuil. à soupe'),
(67, 'Sel, poivre, basilic séché', ''),
(68, 'Courge', 'g'),
(69, 'Carottes', ''),
(70, 'Onion', ''),
(71, 'Bouillon de légumes', 'ml'),
(72, 'Crème fraîche ou lait de coco', 'ml'),
(73, 'Huile d’olive', 'cuil. à soupe'),
(74, 'Sel, poivre, muscade', ''),
(75, 'Sucre vanillé ou gousse de vanille', 'sachet'),
(76, 'Grandes bananaes', ''),
(77, 'Levure', 'sachet'),
(78, 'Sucre', 'g'),
(79, 'Oeufs', ''),
(80, 'Rhum (optionnel)', 'cuillère'),
(81, 'Riz', 'g'),
(82, 'Crevettes décortiquées', 'g'),
(83, 'Poulet', 'cuisses'),
(84, 'Poivron', ''),
(85, 'Tomates', ''),
(86, 'Safran', 'pincée'),
(87, 'Sel, poivre', 'pincée'),
(88, 'Nouilles de riz', 'g'),
(89, 'Taux de tamarin', 'cuil. à soupe'),
(90, 'Sauce soja', 'cuil. à soupe'),
(91, 'Cacahuètes', 'g'),
(92, 'Oignons verts', ''),
(93, 'Coriandre', 'poignée'),
(94, 'Huile', 'cuil. à soupe'),
(95, 'Pâte à pizza', ''),
(96, 'Sauce tomate', 'g'),
(97, 'Mozzarella', 'g'),
(98, 'Basilic frais', 'poignée'),
(99, 'Lait de coco', 'ml'),
(100, 'Pâte de curry', 'cuil. à soupe'),
(101, 'Gingembre frais', ''),
(102, 'Fromage Gruyère', 'g'),
(103, 'Fromage Comté', 'g'),
(104, 'Vin blanc sec', 'ml'),
(105, 'Pain', 'baguette'),
(106, 'Poivre, muscade', 'pincée'),
(107, 'Mascarpone', 'g'),
(108, 'Crème liquide', 'ml'),
(109, 'Café fort', 'ml'),
(110, 'Biscuits à la cuillère', 'g'),
(111, 'Cacao en poudre', 'cuil. à soupe'),
(112, 'Œufs ', ''),
(113, 'Extrait de vanille', 'cuil. à soupe'),
(114, ',kngftc', 'jbhvgc'),
(115, 'kjhvg', 'hgvfc'),
(116, 'jhgyfvcg', 'gyc'),
(117, ',ijhugy', 'ygvh'),
(118, ';lkjiuhygtrf', 'ihugyfcf'),
(119, ',kjihugyft', '5'),
(120, 'kouy_tèf-td', '5'),
(121, 'jnbhvgcf', '5'),
(122, 'kjihguyftrdf', 'uhygftc'),
(123, 'k,jhgvfc', 'ugyt'),
(125, 'hugyft', 'hiujv');

-- --------------------------------------------------------

--
-- Structure de la table `intensites`
--

CREATE TABLE `intensites` (
  `id_intensite` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  `niveau` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `intensites`
--

INSERT INTO `intensites` (`id_intensite`, `type`, `niveau`) VALUES
(1, 'Epicé', 'Faible'),
(2, 'Epicé', 'Modéré'),
(3, 'Epicé', 'Elevé'),
(4, 'Alcoolisé', 'Faible'),
(5, 'Alcoolisé', 'Modéré'),
(6, 'Alcoolisé', 'Elevé');

-- --------------------------------------------------------

--
-- Structure de la table `possede`
--

CREATE TABLE `possede` (
  `id_recette` int(11) NOT NULL,
  `id_etiquette` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `possede`
--

INSERT INTO `possede` (`id_recette`, `id_etiquette`) VALUES
(184, 13),
(187, 13),
(188, 2),
(188, 14),
(189, 2),
(189, 14),
(190, 13),
(192, 2),
(192, 13),
(193, 2),
(193, 13);

-- --------------------------------------------------------

--
-- Structure de la table `recettes`
--

CREATE TABLE `recettes` (
  `id_recette` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `temps_preparation` int(11) DEFAULT NULL,
  `temps_cuisson` int(11) DEFAULT NULL,
  `personnes` int(11) DEFAULT NULL,
  `chemin_photo` varchar(100) DEFAULT NULL,
  `niveau` varchar(45) DEFAULT NULL,
  `id_cout` int(11) DEFAULT NULL,
  `id_categorie` int(11) DEFAULT NULL,
  `id_intensite` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `recettes`
--

INSERT INTO `recettes` (`id_recette`, `nom`, `description`, `temps_preparation`, `temps_cuisson`, `personnes`, `chemin_photo`, `niveau`, `id_cout`, `id_categorie`, `id_intensite`) VALUES
(182, 'Lasagnes à la bolognaisee', 'Un grand classique italien, généreux et savoureux, avec une sauce à la viande et une béchamel onctueuse.', 25, 45, 6, 'uploads/679920eecfbf4-Lasagnesàlabolognaise.png', 'Moyen', 2, 2, NULL),
(184, 'Velouté de courge et carottes', 'Une soupe crémeuse et légèrement sucrée, idéale pour commencer un repas en douceur.', 10, 25, 4, 'uploads/6796841d5b9c5-Veloutédecourgeetcarottes.jpg', 'Facile', 2, 4, NULL),
(187, 'Gâteau à la banane', 'Un délicieux gâteau moelleux à la banane, parfait pour\naccompagner un goûter ou un petit-déjeuner gourmand. 🍌', 15, 30, 6, 'uploads/67968789a35dd-Gâteauàlabanane.png', 'Facile', 2, 3, 4),
(188, 'Paëlla', 'Un plat espagnol emblématique, riche en fruits de mer, poulet, et riz parfumé au safran.', 30, 50, 4, 'uploads/67968b06aba4f-Paëlla.png', 'Moyen', 3, 2, NULL),
(189, 'Pad Thaï', 'Un classique thaïlandais à base de nouilles sautées, légumes croquants, crevettes, et une sauce sucrée-salée.', 20, 15, 2, 'uploads/67968baf501f1-PadThaï.png', 'Facile', 2, 2, NULL),
(190, 'Pizza Margherita', 'Une pizza simple et savoureuse avec une base tomate, mozzarella, et basilic frais.', 20, 15, 4, 'uploads/67968c4801e5f-PizzaMargherita.png', 'Facile', 1, 2, NULL),
(191, 'Curry de Poulet', 'Un plat savoureux et parfumé, avec du poulet tendre mijoté dans une sauce au curry épicée.', 15, 40, 4, 'uploads/67968cf0662b1-CurrydePoulet.png', 'Moyen', 2, 2, 2),
(192, 'Fondue Savoyarde', 'Un plat convivial à base de fromages fondus, servi avec des morceaux de pain croustillants.', 10, 20, 4, 'uploads/67993c4219bf5-FondueSavoyarde.png', 'Facile', 3, 2, 5),
(193, 'Tiramisu', 'Coupez le pain en morceaux et servez avec la fondue.', 20, 0, 6, 'uploads/67968efbbedbf-Tiramisu.png', 'Facile', 2, 3, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`id_avis`),
  ADD KEY `id_recette_avis_idx` (`id_recette`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Index pour la table `couts`
--
ALTER TABLE `couts`
  ADD PRIMARY KEY (`id_cout`);

--
-- Index pour la table `est_compose`
--
ALTER TABLE `est_compose`
  ADD PRIMARY KEY (`id_recette`,`id_ingredient`),
  ADD KEY `id_ingredient_idx` (`id_ingredient`);

--
-- Index pour la table `etapes`
--
ALTER TABLE `etapes`
  ADD PRIMARY KEY (`id_etape`,`id_recette`),
  ADD KEY `id_recette_idx` (`id_recette`);

--
-- Index pour la table `etiquettes`
--
ALTER TABLE `etiquettes`
  ADD PRIMARY KEY (`id_etiquette`);

--
-- Index pour la table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id_ingredient`);

--
-- Index pour la table `intensites`
--
ALTER TABLE `intensites`
  ADD PRIMARY KEY (`id_intensite`);

--
-- Index pour la table `possede`
--
ALTER TABLE `possede`
  ADD PRIMARY KEY (`id_recette`,`id_etiquette`),
  ADD KEY `id_etiquette_possede_idx` (`id_etiquette`);

--
-- Index pour la table `recettes`
--
ALTER TABLE `recettes`
  ADD PRIMARY KEY (`id_recette`),
  ADD KEY `id_cout_idx` (`id_cout`),
  ADD KEY `id_categorie_idx` (`id_categorie`),
  ADD KEY `id_intensite_idx` (`id_intensite`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `id_avis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `couts`
--
ALTER TABLE `couts`
  MODIFY `id_cout` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `etapes`
--
ALTER TABLE `etapes`
  MODIFY `id_etape` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT pour la table `etiquettes`
--
ALTER TABLE `etiquettes`
  MODIFY `id_etiquette` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id_ingredient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT pour la table `intensites`
--
ALTER TABLE `intensites`
  MODIFY `id_intensite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `recettes`
--
ALTER TABLE `recettes`
  MODIFY `id_recette` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=206;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `id_recette_avis` FOREIGN KEY (`id_recette`) REFERENCES `recettes` (`id_recette`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `est_compose`
--
ALTER TABLE `est_compose`
  ADD CONSTRAINT `id_ingredient_compose` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredients` (`id_ingredient`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_recette_compose` FOREIGN KEY (`id_recette`) REFERENCES `recettes` (`id_recette`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `etapes`
--
ALTER TABLE `etapes`
  ADD CONSTRAINT `id_recette_etape` FOREIGN KEY (`id_recette`) REFERENCES `recettes` (`id_recette`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `possede`
--
ALTER TABLE `possede`
  ADD CONSTRAINT `id_etiquette_possede` FOREIGN KEY (`id_etiquette`) REFERENCES `etiquettes` (`id_etiquette`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_recette_possede` FOREIGN KEY (`id_recette`) REFERENCES `recettes` (`id_recette`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `recettes`
--
ALTER TABLE `recettes`
  ADD CONSTRAINT `id_categorie_recette` FOREIGN KEY (`id_categorie`) REFERENCES `categories` (`id_categorie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_cout_recette` FOREIGN KEY (`id_cout`) REFERENCES `couts` (`id_cout`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_intensite_recette` FOREIGN KEY (`id_intensite`) REFERENCES `intensites` (`id_intensite`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
