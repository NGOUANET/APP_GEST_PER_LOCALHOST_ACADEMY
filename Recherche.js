const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'appli_gestion'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

// Fonction de recherche simplifiée
function simpleSearch(query, params, res) {
  connection.query(query, params, (error, results) => {
    if (error) {
      res.status(500).send('Erreur lors de la recherche');
    } else {
      res.json(results);
    }
  });
}

// Routes de recherche pour chaque table

// Route pour la table "contrats"
app.get('/contrats/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM contrats WHERE id = ?' : 'SELECT * FROM contrats';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "departements"
app.get('/departements/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM departements WHERE id = ?' : 'SELECT * FROM departements';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "entrees"
app.get('/entrees/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM entrees WHERE id = ?' : 'SELECT * FROM entrees';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "etudiant"
app.get('/etudiant/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM etudiant WHERE id = ?' : 'SELECT * FROM etudiant';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "formations"
app.get('/formations/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM formations WHERE id = ?' : 'SELECT * FROM formations';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "formations_etudiant"
app.get('/formations_etudiant/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM formations_etudiant WHERE id = ?' : 'SELECT * FROM formations_etudiant';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "materiels"
app.get('/materiels/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM materiels WHERE id = ?' : 'SELECT * FROM materiels';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "materiel_etudiant"
app.get('/materiel_etudiant/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM materiel_etudiant WHERE id = ?' : 'SELECT * FROM materiel_etudiant';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "materiel_utilisateur"
app.get('/materiel_utilisateur/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM materiel_utilisateur WHERE id = ?' : 'SELECT * FROM materiel_utilisateur';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "paies"
app.get('/paies/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM paies WHERE id = ?' : 'SELECT * FROM paies';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "planning"
app.get('/planning/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM planning WHERE id = ?' : 'SELECT * FROM planning';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "salle"
app.get('/salle/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM salle WHERE id = ?' : 'SELECT * FROM salle';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "sorties"
app.get('/sorties/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM sorties WHERE id = ?' : 'SELECT * FROM sorties';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Route pour la table "utilisateurs"
app.get('/utilisateurs/:id?', (req, res) => {
  const query = req.params.id ? 'SELECT * FROM utilisateurs WHERE id = ?' : 'SELECT * FROM utilisateurs';
  const params = req.params.id ? [req.params.id] : [];
  simpleSearch(query, params, res);
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});


module.exports = connection;














