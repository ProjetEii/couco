
CREATE TABLE couleurs
( couleur_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
couleur_code VARCHAR(20)
);

CREATE TABLE matieres
(matiere_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 matiere_libelle VARCHAR(70)
);

CREATE TABLE filieres
(filiere_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 filiere_libelle VARCHAR(100),
 filiere_anneedebut DATE,
 filiere_anneefin DATE
);

CREATE TABLE filieres_matieres
( filiere_id INT UNSIGNED,
 matiere_id INT UNSIGNED,
PRIMARY KEY (filiere_id, matiere_id),
FOREIGN KEY (filiere_id) references filieres (filiere_id),
FOREIGN KEY (matiere_id) references matieres (matiere_id)
);

CREATE TABLE ecoles
( ecole_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 ecole_libelle VARCHAR(100),
 ecole_ville VARCHAR(50),
 ecole_cp VARCHAR(10),
 ecole_adresse VARCHAR(150)
);

CREATE TABLE etats
(etat_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 etat_libelle VARCHAR(50),
 etat_rank SMALLINT UNSIGNED
);

CREATE TABLE mots_cles
(motscle_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 motscle_libelle VARCHAR(200)
);

CREATE TABLE mots_hierarchie
(motscles_id INT UNSIGNED,
 mots_id INT UNSIGNED,
PRIMARY KEY (motscles_id, mots_id),
FOREIGN KEY (motscles_id) references mots_cles (motscle_id),
FOREIGN KEY (mots_id) references mots_cles (motscle_id)
);

CREATE TABLE utilisateurs
(utilisateur_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
utilisateur_nom VARCHAR(50),
utilisateur_prenom VARCHAR(50),
utilisateur_mdp VARCHAR(30),
utilisateur_mail VARCHAR(100),
utilisateur_created DATETIME,
utilisateur_lastlogin DATETIME,
utilisateur_avatar VARCHAR(200),
couleur_id INT UNSIGNED,
FOREIGN KEY (couleur_id) references couleurs (couleur_id)
);

CREATE TABLE ecoles_filieres_utilisateurs
( ecole_id INT UNSIGNED,
 filiere_id INT UNSIGNED,
 utilisateur_id INT UNSIGNED,
 PRIMARY KEY (ecole_id, filiere_id, utilisateur_id),
 FOREIGN KEY (ecole_id) references ecoles (ecole_id),
 FOREIGN KEY (filiere_id) references filieres (filiere_id),
 FOREIGN KEY (utilisateur_id) references utilisateurs (utilisateur_id)
);

CREATE TABLE amis
(utilisateur_id INT UNSIGNED,
 amis_id INT UNSIGNED,
PRIMARY KEY (utilisateur_id, amis_id),
FOREIGN KEY (utilisateur_id) references utilisateurs(utilisateur_id),
FOREIGN KEY (amis_id) references utilisateurs(utilisateur_id)
);

CREATE TABLE cours
(cours_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 cours_titre VARCHAR(50),
 cours_datecreate DATE,
 cours_datemaj DATE,
 cours_dateview DATE,
 motscles_id INT UNSIGNED,
 utilisateur_id INT UNSIGNED,
 FOREIGN KEY (utilisateur_id) references utilisateurs(utilisateur_id),
FOREIGN KEY (motscles_id) references mots_cles(motscle_id)
);

CREATE TABLE cours_motscles
( cours_id INT UNSIGNED,
 motscle_id INT UNSIGNED,
 PRIMARY KEY (cours_id, motscle_id),
 FOREIGN KEY (cours_id) references cours (cours_id),
 FOREIGN KEY (motscle_id) references mots_cles (motscle_id)
);

CREATE TABLE participe_cours
(utilisateur_id INT UNSIGNED,
 cours_id INT UNSIGNED,
participe_value DATETIME,
PRIMARY KEY (utilisateur_id, cours_id),
FOREIGN KEY (utilisateur_id) references utilisateurs(utilisateur_id),
FOREIGN KEY (cours_id) references cours(cours_id)
);

CREATE TABLE parties
(partie_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 partie_titre VARCHAR(30),
 partie_datecreate DATETIME,
 partie_rank SMALLINT UNSIGNED,
 cours_id INT UNSIGNED,
 utilisateur_id INT UNSIGNED,
 FOREIGN KEY (utilisateur_id) references utilisateurs(utilisateur_id),
FOREIGN KEY (cours_id) references cours(cours_id)
);

CREATE TABLE suppression_parties
(partie_id INT UNSIGNED,
 utilisateur_id INT UNSIGNED,
 PRIMARY KEY ( partie_id, utilisateur_id),
 FOREIGN KEY (partie_id) references parties (partie_id),
 FOREIGN KEY (utilisateur_id) references utilisateurs (utilisateur_id)
);

CREATE TABLE participations
(participation_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 participation_type VARCHAR(20),
 participation_corps TEXT,
 participation_img VARCHAR(200),
 participation_datecreate DATETIME,
 participation_rank SMALLINT UNSIGNED,
 utilisateur_id INT UNSIGNED,
 partie_id INT UNSIGNED,
 FOREIGN KEY (utilisateur_id) references utilisateurs(utilisateur_id),
FOREIGN KEY (partie_id) references parties(partie_id)
);

CREATE TABLE suppression_participations
( participation_id INT UNSIGNED,
 utilisateur_id INT UNSIGNED,
PRIMARY KEY (participation_id, utilisateur_id),
FOREIGN KEY (participation_id) references participations (participation_id),
FOREIGN KEY (utilisateur_id) references utilisateurs (utilisateur_id)
);

CREATE TABLE modifications
(modification_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 utilisateur_id INT UNSIGNED,
 participation_id INT UNSIGNED,
 index_modif SMALLINT UNSIGNED,
 modif_longueur SMALLINT UNSIGNED,
 modif_text TEXT,
 FOREIGN KEY (utilisateur_id) references utilisateurs(utilisateur_id),
FOREIGN KEY (participation_id) references participations(participation_id)
);

CREATE TABLE historiques
(historique_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 historique_titre VARCHAR(30),
 historique_libelle VARCHAR(100),
 historique_rank SMALLINT UNSIGNED,
 historique_date DATETIME,
 cours_id INT UNSIGNED,
 partie_id INT UNSIGNED,
 participation_id INT UNSIGNED,
 utilisateur_id INT UNSIGNED,
 FOREIGN KEY (cours_id) references cours(cours_id),
FOREIGN KEY (partie_id) references parties(partie_id),
FOREIGN KEY (utilisateur_id) references utilisateurs(utilisateur_id),
FOREIGN KEY (participation_id) references participations(participation_id)
);