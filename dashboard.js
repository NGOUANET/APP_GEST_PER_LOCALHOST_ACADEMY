const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

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


// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
