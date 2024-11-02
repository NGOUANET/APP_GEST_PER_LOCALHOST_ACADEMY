const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const authenticateToken  = require('./middelware/auth');

const app = express();
app.use(bodyParser.json());

// Configuration de la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Remplacez par votre utilisateur MySQL
  password: '', // Remplacez par votre mot de passe MySQL
  database: 'appli_gestion'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

                                              //CRUD SUR LA TABLE UTILISATEUR

// Route d'inscription
app.post('/register', async (req, res) => {
  const { nom, prenom, date_de_naissance, statut, numero_telephone, addresse_email, numero_cni_ou_passeport, photo_de_profil, date, mot_de_passe } = req.body;

  // Vérifier si le nom d'utilisateur existe déjà
  db.query('SELECT * FROM utilisateurs WHERE nom = ?', [nom_utilisateur], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur interne du serveur' });
    if (results.length > 0) return res.status(400).json({ error: 'Nom d\'utilisateur déjà utilisé' });

    // Chiffrer le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Insérer l'utilisateur dans la base de données
    db.query(
      'INSERT INTO utilisateurs (nom, prenom, date_de_naissance, statut, numero_telephone, addresse_email, numero_cni_ou_passeport, photo_de_profil, date, mot_de_passe) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nom, prenom, date_de_naissance, statut, numero_telephone, addresse_email, numero_cni_ou_passeport, photo_de_profil, date, hashedPassword],
      (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
        res.status(201).json({ message: 'Inscription réussie' });
      }
    );
  });
});

// Route de connexion
app.post('/login', (req, res) => {
  const { nom_utilisateur, mot_de_passe } = req.body;

  // Vérifier si l'utilisateur existe
  db.query('SELECT * FROM utilisateurs WHERE nom = ?', [nom_utilisateur], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur interne du serveur' });
    if (results.length === 0) return res.status(400).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });

    const user = results[0];

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) return res.status(400).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });

    // Générer un jeton JWT
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '48h' });
    res.json({ message: 'Connexion réussie', token });
  });
});



// Exemple de route protégée
app.get('/profile', authenticateToken, (req, res) => {
  db.query('SELECT * FROM utilisateurs WHERE id = ?', [req.user.userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur interne du serveur' });
    if (results.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    
    const user = results[0];
    res.json({ 
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      date_de_naissance: user.date_de_naissance,
      statut: user.statut,
      numero_telephone: user.numero_telephone,
      addresse_email: user.addresse_email,
      numero_cni_ou_passeport: user.numero_cni_ou_passeport,
      photo_de_profil: user.photo_de_profil,
      date: user.date
    });
  });
});


// Route de mise à jour de l'utilisateur
app.put('/profile', authenticateToken, async (req, res) => {
    const { nom, prenom, date_de_naissance, statut, numero_telephone, addresse_email, numero_cni_ou_passeport, photo_de_profil, date, mot_de_passe } = req.body;
    
    // Hash du mot de passe si modifié
    const hashedPassword = mot_de_passe ? await bcrypt.hash(mot_de_passe, 10) : undefined;
  
    // Préparer les champs à mettre à jour
    const fields = [];
    const values = [];
  
    if (nom) fields.push('nom = ?'), values.push(nom);
    if (prenom) fields.push('prenom = ?'), values.push(prenom);
    if (date_de_naissance) fields.push('date_de_naissance = ?'), values.push(date_de_naissance);
    if (statut) fields.push('statut = ?'), values.push(statut);
    if (numero_telephone) fields.push('numero_telephone = ?'), values.push(numero_telephone);
    if (addresse_email) fields.push('addresse_email = ?'), values.push(addresse_email);
    if (numero_cni_ou_passeport) fields.push('numero_cni_ou_passeport = ?'), values.push(numero_cni_ou_passeport);
    if (photo_de_profil) fields.push('photo_de_profil = ?'), values.push(photo_de_profil);
    if (date) fields.push('date = ?'), values.push(date);
    if (hashedPassword) fields.push('mot_de_passe = ?'), values.push(hashedPassword);
    
    values.push(req.user.userId);
  
    db.query(
      `UPDATE utilisateurs SET ${fields.join(', ')} WHERE id = ?`,
      values,
      (err, results) => {
        if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json({ message: 'Utilisateur mis à jour avec succès' });
      }
    );
  });
  
  // Route de suppression de l'utilisateur
  app.delete('/profile', authenticateToken, (req, res) => {
    db.query('DELETE FROM utilisateurs WHERE id = ?', [req.user.userId], (err, results) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
      res.json({ message: 'Utilisateur supprimé avec succès' });
    });
  });

  app.put('/profile', authenticateToken, updateUserProfile);
app.delete('/profile', authenticateToken, deleteUserProfile);


                                          //     CRUD SUR LA TABLE MATERIEL



// Fonction pour créer un matériel
function createMateriel(req, res) {
  const { nom, description, etat } = req.body;
  
  db.query(
    'INSERT INTO materiels (nom, description, etat) VALUES (?, ?, ?)',
    [nom, description, etat],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création du matériel' });
      res.status(201).json({ message: 'Matériel créé avec succès', id: result.insertId });
    }
  );
}

// Fonction pour lire tous les matériels
function getMateriels(req, res) {
  db.query('SELECT * FROM materiels', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des matériels' });
    res.json(results);
  });
}

// Fonction pour mettre à jour un matériel par ID
function updateMateriel(req, res) {
  const { id } = req.params;
  const { nom, description, etat } = req.body;
  
  db.query(
    'UPDATE materiels SET nom = ?, description = ?, etat = ? WHERE id = ?',
    [nom, description, etat, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour du matériel' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Matériel non trouvé' });
      res.json({ message: 'Matériel mis à jour avec succès' });
    }
  );
}

// Fonction pour supprimer un matériel par ID
function deleteMateriel(req, res) {
  const { id } = req.params;
  
  db.query('DELETE FROM materiels WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression du matériel' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Matériel non trouvé' });
    res.json({ message: 'Matériel supprimé avec succès' });
  });
}

// Routes pour les opérations CRUD
app.post('/materiels', createMateriel);
app.get('/materiels', getMateriels);
app.put('/materiels/:id', updateMateriel);
app.delete('/materiels/:id', deleteMateriel);



                                                    //     CRUD SUR LA TABLE SALLE



// Fonction pour créer une salle
function createSalle(req, res) {
  const { Nom_salle, Capacite_salle, date } = req.body;
  
  db.query(
    'INSERT INTO salle (Nom_salle, Capacite_salle, date) VALUES (?, ?, ?)',
    [Nom_salle, Capacite_salle, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création de la salle' });
      res.status(201).json({ message: 'Salle créée avec succès', id: result.insertId });
    }
  );
}

// Fonction pour récupérer toutes les salles
function getSalles(req, res) {
  db.query('SELECT * FROM salle', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des salles' });
    res.json(results);
  });
}

// Fonction pour mettre à jour une salle par ID
function updateSalle(req, res) {
  const { id } = req.params;
  const { Nom_salle, Capacite_salle, date } = req.body;
  
  db.query(
    'UPDATE salle SET Nom_salle = ?, Capacite_salle = ?, date = ? WHERE id = ?',
    [Nom_salle, Capacite_salle, date, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour de la salle' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Salle non trouvée' });
      res.json({ message: 'Salle mise à jour avec succès' });
    }
  );
}

// Fonction pour supprimer une salle par ID
function deleteSalle(req, res) {
  const { id } = req.params;
  
  db.query('DELETE FROM salle WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression de la salle' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Salle non trouvée' });
    res.json({ message: 'Salle supprimée avec succès' });
  });
}

// Définition des routes et association avec les fonctions
app.post('/salles', createSalle);
app.get('/salles', getSalles);
app.put('/salles/:id', updateSalle);
app.delete('/salles/:id', deleteSalle);


                                               //     CRUD SUR LA TABLE FORMATION



// Fonction pour créer une formation
function createFormation(req, res) {
  const { nom, Prix, Programme_de_cours, Duree, A_un_stage_Professionel, Duree_stage_Professionnel, id_departement, date } = req.body;

  db.query(
    'INSERT INTO formations (nom, Prix, Programme_de_cours, Duree, A_un_stage_Professionel, Duree_stage_Professionnel, id_departement, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nom, Prix, Programme_de_cours, Duree, A_un_stage_Professionel, Duree_stage_Professionnel, id_departement, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création de la formation' });
      res.status(201).json({ message: 'Formation créée avec succès', id: result.insertId });
    }
  );
}

// Fonction pour récupérer toutes les formations
function getFormations(req, res) {
  db.query('SELECT * FROM formations', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des formations' });
    res.json(results);
  });
}

// Fonction pour mettre à jour une formation par ID
function updateFormation(req, res) {
  const { id } = req.params;
  const { nom, Prix, Programme_de_cours, Duree, A_un_stage_Professionel, Duree_stage_Professionnel, id_departement, date } = req.body;

  db.query(
    'UPDATE formations SET nom = ?, Prix = ?, Programme_de_cours = ?, Duree = ?, A_un_stage_Professionel = ?, Duree_stage_Professionnel = ?, id_departement = ?, date = ? WHERE id = ?',
    [nom, Prix, Programme_de_cours, Duree, A_un_stage_Professionel, Duree_stage_Professionnel, id_departement, date, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour de la formation' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Formation non trouvée' });
      res.json({ message: 'Formation mise à jour avec succès' });
    }
  );
}

// Fonction pour supprimer une formation par ID
function deleteFormation(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM formations WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression de la formation' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Formation non trouvée' });
    res.json({ message: 'Formation supprimée avec succès' });
  });
}

// Définition des routes et association avec les fonctions
app.post('/formations', createFormation);
app.get('/formations', getFormations);
app.put('/formations/:id', updateFormation);
app.delete('/formations/:id', deleteFormation);

                                       
                                            //     CRUD SUR LA TABLE DEPARTEMENT


// Fonction pour créer un département
function createDepartement(req, res) {
  const { nom, date } = req.body;

  db.query(
    'INSERT INTO departements (nom, date) VALUES (?, ?)',
    [nom, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création du département' });
      res.status(201).json({ message: 'Département créé avec succès', id: result.insertId });
    }
  );
}

// Fonction pour récupérer tous les départements
function getDepartements(req, res) {
  db.query('SELECT * FROM departements', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des départements' });
    res.json(results);
  });
}

// Fonction pour mettre à jour un département par ID
function updateDepartement(req, res) {
  const { id } = req.params;
  const { nom, date } = req.body;

  db.query(
    'UPDATE departements SET nom = ?, date = ? WHERE id = ?',
    [nom, date, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour du département' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Département non trouvé' });
      res.json({ message: 'Département mis à jour avec succès' });
    }
  );
}

// Fonction pour supprimer un département par ID
function deleteDepartement(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM departements WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression du département' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Département non trouvé' });
    res.json({ message: 'Département supprimé avec succès' });
  });
}

// Définition des routes et association avec les fonctions
app.post('/departements', createDepartement);
app.get('/departements', getDepartements);
app.put('/departements/:id', updateDepartement);
app.delete('/departements/:id', deleteDepartement);


                                                 //     CRUD SUR LA TABLE CONTRAT



// Fonction pour créer un contrat
function createContrat(req, res) {
  const { duree, montant_paie, date, id_formateur } = req.body;

  db.query(
    'INSERT INTO contrats (duree, montant_paie, date, id_formateur) VALUES (?, ?, ?, ?)',
    [duree, montant_paie, date, id_formateur],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création du contrat' });
      res.status(201).json({ message: 'Contrat créé avec succès', id: result.insertId });
    }
  );
}

// Fonction pour récupérer tous les contrats
function getContrats(req, res) {
  db.query('SELECT * FROM contrats', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des contrats' });
    res.json(results);
  });
}

// Fonction pour mettre à jour un contrat par ID
function updateContrat(req, res) {
  const { id } = req.params;
  const { duree, montant_paie, date, id_formateur } = req.body;

  db.query(
    'UPDATE contrats SET duree = ?, montant_paie = ?, date = ?, id_formateur = ? WHERE id = ?',
    [duree, montant_paie, date, id_formateur, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour du contrat' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Contrat non trouvé' });
      res.json({ message: 'Contrat mis à jour avec succès' });
    }
  );
}

// Fonction pour supprimer un contrat par ID
function deleteContrat(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM contrats WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression du contrat' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Contrat non trouvé' });
    res.json({ message: 'Contrat supprimé avec succès' });
  });
}

// Définition des routes et association avec les fonctions
app.post('/contrats', createContrat);
app.get('/contrats', getContrats);
app.put('/contrats/:id', updateContrat);
app.delete('/contrats/:id', deleteContrat);

                                          
                                               //     CRUD SUR LA TABLE ENTREE


// Fonction pour créer une entrée
function createEntree(req, res) {
  const { date, montant, motifs, id_utilisateur } = req.body;

  db.query(
    'INSERT INTO entrees (date, montant, motifs, id_utilisateur) VALUES (?, ?, ?, ?)',
    [date, montant, motifs, id_utilisateur],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création de l\'entrée' });
      res.status(201).json({ message: 'Entrée créée avec succès', id: result.insertId });
    }
  );
}

// Fonction pour récupérer toutes les entrées
function getEntrees(req, res) {
  db.query('SELECT * FROM entrees', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des entrées' });
    res.json(results);
  });
}

// Fonction pour mettre à jour une entrée par ID
function updateEntree(req, res) {
  const { id } = req.params;
  const { date, montant, motifs, id_utilisateur } = req.body;

  db.query(
    'UPDATE entrees SET date = ?, montant = ?, motifs = ?, id_utilisateur = ? WHERE id = ?',
    [date, montant, motifs, id_utilisateur, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'entrée' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Entrée non trouvée' });
      res.json({ message: 'Entrée mise à jour avec succès' });
    }
  );
}

// Fonction pour supprimer une entrée par ID
function deleteEntree(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM entrees WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression de l\'entrée' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Entrée non trouvée' });
    res.json({ message: 'Entrée supprimée avec succès' });
  });
}

// Définition des routes et association avec les fonctions
app.post('/entrees', createEntree);
app.get('/entrees', getEntrees);
app.put('/entrees/:id', updateEntree);
app.delete('/entrees/:id', deleteEntree);


                                                 //     CRUD SUR LA TABLE SORTIE

// Fonction pour créer une sortie
function createSortie(req, res) {
  const { date, montant, motifs, id_utilisateur } = req.body;

  db.query(
    'INSERT INTO sorties (date, montant, motifs, id_utilisateur) VALUES (?, ?, ?, ?)',
    [date, montant, motifs, id_utilisateur],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création de la sortie' });
      res.status(201).json({ message: 'Sortie créée avec succès', id: result.insertId });
    }
  );
}

// Fonction pour récupérer toutes les sorties
function getSorties(req, res) {
  db.query('SELECT * FROM sorties', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des sorties' });
    res.json(results);
  });
}

// Fonction pour mettre à jour une sortie par ID
function updateSortie(req, res) {
  const { id } = req.params;
  const { date, montant, motifs, id_utilisateur } = req.body;

  db.query(
    'UPDATE sorties SET date = ?, montant = ?, motifs = ?, id_utilisateur = ? WHERE id = ?',
    [date, montant, motifs, id_utilisateur, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour de la sortie' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Sortie non trouvée' });
      res.json({ message: 'Sortie mise à jour avec succès' });
    }
  );
}

// Fonction pour supprimer une sortie par ID
function deleteSortie(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM sorties WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression de la sortie' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Sortie non trouvée' });
    res.json({ message: 'Sortie supprimée avec succès' });
  });
}

// Définition des routes et association avec les fonctions
app.post('/sorties', createSortie);
app.get('/sorties', getSorties);
app.put('/sorties/:id', updateSortie);
app.delete('/sorties/:id', deleteSortie);


                                                  //     CRUD SUR LA TABLE ETUDIANT


// Fonction pour créer un étudiant
function createEtudiant(req, res) {
  const { nom, Numero_Telephone, Formations_choisies, Frais_d_inscription, Premiere_Tranche, Deuxieme_Tranche, Troisieme_Tranche, Paiement_en_une_Tranche, Observations, date } = req.body;

  db.query(
    'INSERT INTO etudiant (nom, Numero_Telephone, Formations_choisies, Frais_d_inscription, Premiere_Tranche, Deuxieme_Tranche, Troisieme_Tranche, Paiement_en_une_Tranche, Observations, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nom, Numero_Telephone, Formations_choisies, Frais_d_inscription, Premiere_Tranche, Deuxieme_Tranche, Troisieme_Tranche, Paiement_en_une_Tranche, Observations, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création de l\'étudiant' });
      res.status(201).json({ message: 'Étudiant créé avec succès', id: result.insertId });
    }
  );
}

// Fonction pour récupérer tous les étudiants
function getEtudiants(req, res) {
  db.query('SELECT * FROM etudiant', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des étudiants' });
    res.json(results);
  });
}

// Fonction pour mettre à jour un étudiant par ID
function updateEtudiant(req, res) {
  const { id } = req.params;
  const { nom, Numero_Telephone, Formations_choisies, Frais_d_inscription, Premiere_Tranche, Deuxieme_Tranche, Troisieme_Tranche, Paiement_en_une_Tranche, Observations, date } = req.body;

  db.query(
    'UPDATE etudiant SET nom = ?, Numero_Telephone = ?, Formations_choisies = ?, Frais_d_inscription = ?, Premiere_Tranche = ?, Deuxieme_Tranche = ?, Troisieme_Tranche = ?, Paiement_en_une_Tranche = ?, Observations = ?, date = ? WHERE id = ?',
    [nom, Numero_Telephone, Formations_choisies, Frais_d_inscription, Premiere_Tranche, Deuxieme_Tranche, Troisieme_Tranche, Paiement_en_une_Tranche, Observations, date, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'étudiant' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Étudiant non trouvé' });
      res.json({ message: 'Étudiant mis à jour avec succès' });
    }
  );
}

// Fonction pour supprimer un étudiant par ID
function deleteEtudiant(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM etudiant WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression de l\'étudiant' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Étudiant non trouvé' });
    res.json({ message: 'Étudiant supprimé avec succès' });
  });
}

// Définition des routes et association avec les fonctions
app.post('/etudiants', createEtudiant);
app.get('/etudiants', getEtudiants);
app.put('/etudiants/:id', updateEtudiant);
app.delete('/etudiants/:id', deleteEtudiant);

                                                    //     CRUD SUR LA TABLE PAIE



// Fonction pour créer une paie
function createPaie(req, res) {
  const { date, Montant, mois_concerne, prime, id_utilisateur } = req.body;

  db.query(
    'INSERT INTO paies (date, Montant, mois_concerne, prime, id_utilisateur) VALUES (?, ?, ?, ?, ?)',
    [date, Montant, mois_concerne, prime, id_utilisateur],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création de la paie' });
      res.status(201).json({ message: 'Paie créée avec succès', id: result.insertId });
    }
  );
}

// Fonction pour récupérer toutes les paies
function getPaies(req, res) {
  db.query('SELECT * FROM paies', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des paies' });
    res.json(results);
  });
}

// Fonction pour mettre à jour une paie par ID
function updatePaie(req, res) {
  const { id } = req.params;
  const { date, Montant, mois_concerne, prime, id_utilisateur } = req.body;

  db.query(
    'UPDATE paies SET date = ?, Montant = ?, mois_concerne = ?, prime = ?, id_utilisateur = ? WHERE id = ?',
    [date, Montant, mois_concerne, prime, id_utilisateur, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour de la paie' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Paie non trouvée' });
      res.json({ message: 'Paie mise à jour avec succès' });
    }
  );
}

// Fonction pour supprimer une paie par ID
function deletePaie(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM paies WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression de la paie' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Paie non trouvée' });
    res.json({ message: 'Paie supprimée avec succès' });
  });
}

// Définition des routes et association avec les fonctions
app.post('/paies', createPaie);
app.get('/paies', getPaies);
app.put('/paies/:id', updatePaie);
app.delete('/paies/:id', deletePaie);


                                                  //     CRUD SUR LA TABLE PLANNING



// Fonction pour créer un planning
function createPlanning(req, res) {
  const { heure_de_formation, jours_de_cours, id_formation, id_salle, id_formateur, date } = req.body;

  db.query(
    'INSERT INTO planning (heure_de_formation, jours_de_cours, id_formation, id_salle, id_formateur, date) VALUES (?, ?, ?, ?, ?, ?)',
    [heure_de_formation, jours_de_cours, id_formation, id_salle, id_formateur, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création du planning' });
      res.status(201).json({ message: 'Planning créé avec succès', id: result.insertId });
    }
  );
}

// Fonction pour récupérer tous les plannings
function getPlannings(req, res) {
  db.query('SELECT * FROM planning', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des plannings' });
    res.json(results);
  });
}

// Fonction pour mettre à jour un planning par ID
function updatePlanning(req, res) {
  const { id } = req.params;
  const { heure_de_formation, jours_de_cours, id_formation, id_salle, id_formateur, date } = req.body;

  db.query(
    'UPDATE planning SET heure_de_formation = ?, jours_de_cours = ?, id_formation = ?, id_salle = ?, id_formateur = ?, date = ? WHERE id = ?',
    [heure_de_formation, jours_de_cours, id_formation, id_salle, id_formateur, date, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour du planning' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Planning non trouvé' });
      res.json({ message: 'Planning mis à jour avec succès' });
    }
  );
}

// Fonction pour supprimer un planning par ID
function deletePlanning(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM planning WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression du planning' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Planning non trouvé' });
    res.json({ message: 'Planning supprimé avec succès' });
  });
}

// Définition des routes et association avec les fonctions
app.post('/planning', createPlanning);
app.get('/planning', getPlannings);
app.put('/planning/:id', updatePlanning);
app.delete('/planning/:id', deletePlanning);

                                          //     CRUD SUR LA TABLE FORMATION-ETUDIANT



// Fonction pour créer une association entre une formation et un étudiant
function createFormationEtudiant(req, res) {
  const { id_formations, id_etudiant, date } = req.body;

  db.query(
    'INSERT INTO formations_etudiant (id_formations, id_etudiant, date) VALUES (?, ?, ?)',
    [id_formations, id_etudiant, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création de l\'association' });
      res.status(201).json({ message: 'Association créée avec succès', id: result.insertId });
    }
  );
}

// Fonction pour récupérer toutes les associations formation-étudiant
function getFormationsEtudiant(req, res) {
  db.query('SELECT * FROM formations_etudiant', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des associations' });
    res.json(results);
  });
}

// Fonction pour mettre à jour une association par ID
function updateFormationEtudiant(req, res) {
  const { id } = req.params;
  const { id_formations, id_etudiant, date } = req.body;

  db.query(
    'UPDATE formations_etudiant SET id_formations = ?, id_etudiant = ?, date = ? WHERE id = ?',
    [id_formations, id_etudiant, date, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'association' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Association non trouvée' });
      res.json({ message: 'Association mise à jour avec succès' });
    }
  );
}

// Fonction pour supprimer une association par ID
function deleteFormationEtudiant(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM formations_etudiant WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression de l\'association' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Association non trouvée' });
    res.json({ message: 'Association supprimée avec succès' });
  });
}

// Définition des routes et association avec les fonctions
app.post('/formations_etudiant', createFormationEtudiant);
app.get('/formations_etudiant', getFormationsEtudiant);
app.put('/formations_etudiant/:id', updateFormationEtudiant);
app.delete('/formations_etudiant/:id', deleteFormationEtudiant);

                                       //     CRUD SUR LA TABLE MATERIEL-UTILISATEUR


// Fonction pour créer une entrée de matériel utilisateur
function createMaterielUtilisateur(req, res) {
  const { id_materiel, id_utilisateur, date } = req.body;

  db.query(
    'INSERT INTO materiel_utilisateur (id_materiel, id_utilisateur, date) VALUES (?, ?, ?)',
    [id_materiel, id_utilisateur, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création de l\'entrée de matériel utilisateur' });
      res.status(201).json({ message: 'Entrée de matériel utilisateur créée avec succès', id: result.insertId });
    }
  );
}

// Fonction pour récupérer toutes les entrées de matériel utilisateur
function getMaterielUtilisateurs(req, res) {
  db.query('SELECT * FROM materiel_utilisateur', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des matériels utilisateurs' });
    res.json(results);
  });
}

// Fonction pour mettre à jour une entrée de matériel utilisateur par ID
function updateMaterielUtilisateur(req, res) {
  const { id } = req.params;
  const { id_materiel, id_utilisateur, date } = req.body;

  db.query(
    'UPDATE materiel_utilisateur SET id_materiel = ?, id_utilisateur = ?, date = ? WHERE id = ?',
    [id_materiel, id_utilisateur, date, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'entrée de matériel utilisateur' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Entrée de matériel utilisateur non trouvée' });
      res.json({ message: 'Entrée de matériel utilisateur mise à jour avec succès' });
    }
  );
}

// Fonction pour supprimer une entrée de matériel utilisateur par ID
function deleteMaterielUtilisateur(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM materiel_utilisateur WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression de l\'entrée de matériel utilisateur' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Entrée de matériel utilisateur non trouvée' });
    res.json({ message: 'Entrée de matériel utilisateur supprimée avec succès' });
  });
}

// Définition des routes et association avec les fonctions
app.post('/materiel_utilisateur', createMaterielUtilisateur);
app.get('/materiel_utilisateur', getMaterielUtilisateurs);
app.put('/materiel_utilisateur/:id', updateMaterielUtilisateur);
app.delete('/materiel_utilisateur/:id', deleteMaterielUtilisateur);



                                            //     CRUD SUR LA TABLE MATERIELS-ETUDIANT


// Fonction pour créer une association entre un étudiant et un matériel
function createMaterielEtudiant(req, res) {
  const { id_etudiant, id_materiel, date } = req.body;

  db.query(
    'INSERT INTO materiel_etudiant (id_etudiant, id_materiel, date) VALUES (?, ?, ?)',
    [id_etudiant, id_materiel, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la création de l\'association' });
      res.status(201).json({ message: 'Association créée avec succès', id: result.insertId });
    }
  );
}

// Fonction pour récupérer toutes les associations
function getMaterielEtudiant(req, res) {
  db.query('SELECT * FROM materiel_etudiant', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des associations' });
    res.json(results);
  });
}

// Fonction pour mettre à jour une association par ID
function updateMaterielEtudiant(req, res) {
  const { id } = req.params;
  const { id_etudiant, id_materiel, date } = req.body;

  db.query(
    'UPDATE materiel_etudiant SET id_etudiant = ?, id_materiel = ?, date = ? WHERE id = ?',
    [id_etudiant, id_materiel, date, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'association' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Association non trouvée' });
      res.json({ message: 'Association mise à jour avec succès' });
    }
  );
}

// Fonction pour supprimer une association par ID
function deleteMaterielEtudiant(req, res) {
  const { id } = req.params;

  db.query('DELETE FROM materiel_etudiant WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la suppression de l\'association' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Association non trouvée' });
    res.json({ message: 'Association supprimée avec succès' });
  });
}

// Définition des routes et association avec les fonctions
app.post('/materiel_etudiant', createMaterielEtudiant);
app.get('/materiel_etudiant', getMaterielEtudiant);
app.put('/materiel_etudiant/:id', updateMaterielEtudiant);
app.delete('/materiel_etudiant/:id', deleteMaterielEtudiant);

// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});



                                    //  DECONNEXION




                                    // RECHERCHE



// Fonction pour rechercher des utilisateurs dans la base de données
function searchUsers(req, res) {
  const { nom, prenom, addresse_email, statut } = req.query;

  // Construire la requête de recherche dynamique
  let query = 'SELECT * FROM utilisateurs WHERE 1=1';
  const params = [];

  if (nom) {
    query += ' AND nom LIKE ?';
    params.push(`%${nom}%`);
  }

  if (prenom) {
    query += ' AND prenom LIKE ?';
    params.push(`%${prenom}%`);
  }

  if (addresse_email) {
    query += ' AND addresse_email LIKE ?';
    params.push(`%${addresse_email}%`);
  }

  if (statut) {
    query += ' AND statut = ?';
    params.push(statut);
  }

  // Exécuter la requête avec les paramètres
  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la recherche' });
    }
    res.json(results);
  });
}

// Route pour rechercher des utilisateurs
app.get('/recherche-utilisateurs', searchUsers);
