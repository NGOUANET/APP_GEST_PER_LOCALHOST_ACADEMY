-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2024 at 08:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appli_gestion`
--

-- --------------------------------------------------------

--
-- Table structure for table `contrats`
--

CREATE TABLE `contrats` (
  `id` int(11) NOT NULL,
  `duree` varchar(255) NOT NULL,
  `montant_paie` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `id_formateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departements`
--

CREATE TABLE `departements` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `entrees`
--

CREATE TABLE `entrees` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `montant` int(11) NOT NULL,
  `motifs` varchar(255) NOT NULL,
  `id_utilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `etudiant`
--

CREATE TABLE `etudiant` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `Numero Telephone` int(11) NOT NULL,
  `Formations choisies` varchar(255) NOT NULL,
  `Frais d inscription` int(11) NOT NULL,
  `Premiere Tranche` int(11) NOT NULL,
  `Deuxieme Tranche` int(11) NOT NULL,
  `Troisieme Tranche` int(11) NOT NULL,
  `Paiement en une Tranche` int(11) NOT NULL,
  `Observations` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `formations`
--

CREATE TABLE `formations` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `Prix` int(11) NOT NULL,
  `Programme de cours` text NOT NULL,
  `Duree` int(11) NOT NULL,
  `A un stage Professionel` tinyint(1) NOT NULL,
  `Duree stage Professionnel` varchar(255) NOT NULL,
  `id_departement` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `formations_etudiant`
--

CREATE TABLE `formations_etudiant` (
  `id` int(11) DEFAULT NULL,
  `id_formations` int(11) NOT NULL,
  `id_etudiant` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `materiels`
--

CREATE TABLE `materiels` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `etat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `materiel_etudiant`
--

CREATE TABLE `materiel_etudiant` (
  `id` int(11) NOT NULL,
  `id_etudiant` int(11) NOT NULL,
  `id_materiel` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `materiel_utilisateur`
--

CREATE TABLE `materiel_utilisateur` (
  `id` int(11) NOT NULL,
  `id_materiel` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `paies`
--

CREATE TABLE `paies` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `Montant` int(11) NOT NULL,
  `mois_concerne` varchar(255) NOT NULL,
  `prime` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `planning`
--

CREATE TABLE `planning` (
  `id` int(11) NOT NULL,
  `heure_de_formation` varchar(255) NOT NULL,
  `jours_de_cours` varchar(255) NOT NULL,
  `id_formation` int(11) NOT NULL,
  `id_salle` int(11) NOT NULL,
  `id_formateur` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `salle`
--

CREATE TABLE `salle` (
  `id` int(11) NOT NULL,
  `Nom salle` varchar(255) NOT NULL,
  `Capacite salle` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sorties`
--

CREATE TABLE `sorties` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `montant` int(11) NOT NULL,
  `motifs` varchar(255) NOT NULL,
  `id_utilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `date_de_naissance` date NOT NULL,
  `statut` varchar(255) NOT NULL,
  `numero_telephone` int(11) NOT NULL,
  `addresse_email` varchar(255) NOT NULL,
  `numero_cni_ou_passeport` varchar(255) NOT NULL,
  `photo_de_profil` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contrats`
--
ALTER TABLE `contrats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_formateur` (`id_formateur`);

--
-- Indexes for table `departements`
--
ALTER TABLE `departements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `entrees`
--
ALTER TABLE `entrees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Indexes for table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formations`
--
ALTER TABLE `formations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_departement` (`id_departement`);

--
-- Indexes for table `formations_etudiant`
--
ALTER TABLE `formations_etudiant`
  ADD KEY `id_formations` (`id_formations`),
  ADD KEY `id_etudiant` (`id_etudiant`);

--
-- Indexes for table `materiels`
--
ALTER TABLE `materiels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materiel_etudiant`
--
ALTER TABLE `materiel_etudiant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_materiel` (`id_materiel`),
  ADD KEY `id_etudiant` (`id_etudiant`);

--
-- Indexes for table `materiel_utilisateur`
--
ALTER TABLE `materiel_utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_materiel` (`id_materiel`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Indexes for table `paies`
--
ALTER TABLE `paies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Indexes for table `planning`
--
ALTER TABLE `planning`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_salle` (`id_salle`),
  ADD KEY `id_formation` (`id_formation`),
  ADD KEY `id_formateur` (`id_formateur`);

--
-- Indexes for table `salle`
--
ALTER TABLE `salle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sorties`
--
ALTER TABLE `sorties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Indexes for table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contrats`
--
ALTER TABLE `contrats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departements`
--
ALTER TABLE `departements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `entrees`
--
ALTER TABLE `entrees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `formations`
--
ALTER TABLE `formations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `materiels`
--
ALTER TABLE `materiels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `materiel_etudiant`
--
ALTER TABLE `materiel_etudiant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `materiel_utilisateur`
--
ALTER TABLE `materiel_utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paies`
--
ALTER TABLE `paies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `planning`
--
ALTER TABLE `planning`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `salle`
--
ALTER TABLE `salle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sorties`
--
ALTER TABLE `sorties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contrats`
--
ALTER TABLE `contrats`
  ADD CONSTRAINT `contrats_ibfk_1` FOREIGN KEY (`id_formateur`) REFERENCES `utilisateurs` (`id`);

--
-- Constraints for table `entrees`
--
ALTER TABLE `entrees`
  ADD CONSTRAINT `entrees_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`);

--
-- Constraints for table `formations`
--
ALTER TABLE `formations`
  ADD CONSTRAINT `formations_ibfk_1` FOREIGN KEY (`id_departement`) REFERENCES `departements` (`id`);

--
-- Constraints for table `formations_etudiant`
--
ALTER TABLE `formations_etudiant`
  ADD CONSTRAINT `formations_etudiant_ibfk_1` FOREIGN KEY (`id_formations`) REFERENCES `formations` (`id`),
  ADD CONSTRAINT `formations_etudiant_ibfk_2` FOREIGN KEY (`id_etudiant`) REFERENCES `etudiant` (`id`);

--
-- Constraints for table `materiel_etudiant`
--
ALTER TABLE `materiel_etudiant`
  ADD CONSTRAINT `materiel_etudiant_ibfk_1` FOREIGN KEY (`id_materiel`) REFERENCES `materiels` (`id`),
  ADD CONSTRAINT `materiel_etudiant_ibfk_2` FOREIGN KEY (`id_etudiant`) REFERENCES `etudiant` (`id`);

--
-- Constraints for table `materiel_utilisateur`
--
ALTER TABLE `materiel_utilisateur`
  ADD CONSTRAINT `materiel_utilisateur_ibfk_1` FOREIGN KEY (`id_materiel`) REFERENCES `materiels` (`id`),
  ADD CONSTRAINT `materiel_utilisateur_ibfk_2` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`);

--
-- Constraints for table `paies`
--
ALTER TABLE `paies`
  ADD CONSTRAINT `paies_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`);

--
-- Constraints for table `planning`
--
ALTER TABLE `planning`
  ADD CONSTRAINT `planning_ibfk_1` FOREIGN KEY (`id_salle`) REFERENCES `salle` (`id`),
  ADD CONSTRAINT `planning_ibfk_2` FOREIGN KEY (`id_formation`) REFERENCES `formations` (`id`),
  ADD CONSTRAINT `planning_ibfk_3` FOREIGN KEY (`id_formateur`) REFERENCES `utilisateurs` (`id`);

--
-- Constraints for table `sorties`
--
ALTER TABLE `sorties`
  ADD CONSTRAINT `sorties_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
