                                //Recapitulatif des differents End_points et leurs descriptions


 // Route pour la gestion de compte d un utilisateur                              

'/register'    // Route d'inscription
'/login'       // Route de connexion                        
'/profile'     // Route d access au profil d un utilisateur
app.put('/profile', authenticateToken, updateUserProfile);  // Route de mise a jour du profil d un utilisateur
app.delete('/profile', authenticateToken, deleteUserProfile); // Route de suppression du profil d un utilisateur

// Routes pour les opérations CRUD sur la Table Materiel
app.post('/materiels', createMateriel);
app.get('/materiels', getMateriels);
app.put('/materiels/:id', updateMateriel);
app.delete('/materiels/:id', deleteMateriel);

// Définition des routes et association avec les fonctions sur la Table Salle (CRUD)
app.post('/salles', createSalle);
app.get('/salles', getSalles);
app.put('/salles/:id', updateSalle);
app.delete('/salles/:id', deleteSalle);



// Définition des routes et association avec les fonctions sur la Table Formation (CRUD)
app.post('/formations', createFormation);
app.get('/formations', getFormations);
app.put('/formations/:id', updateFormation);
app.delete('/formations/:id', deleteFormation);


// Définition des routes et association avec les fonctions sur la Table Departement (CRUD)
app.post('/departements', createDepartement);
app.get('/departements', getDepartements);
app.put('/departements/:id', updateDepartement);
app.delete('/departements/:id', deleteDepartement);


// Définition des routes et association avec les fonctions sur la Table Contrat (CRUD)
app.post('/contrats', createContrat);
app.get('/contrats', getContrats);
app.put('/contrats/:id', updateContrat);
app.delete('/contrats/:id', deleteContrat);


// Définition des routes et association avec les fonctions sur la Table Entree (CRUD)
app.post('/entrees', createEntree);
app.get('/entrees', getEntrees);
app.put('/entrees/:id', updateEntree);
app.delete('/entrees/:id', deleteEntree);


// Définition des routes et association avec les fonctions sur la Table Sortie (CRUD)
app.post('/sorties', createSortie);
app.get('/sorties', getSorties);
app.put('/sorties/:id', updateSortie);
app.delete('/sorties/:id', deleteSortie);


// Définition des routes et association avec les fonctions sur la Table Etudiants (CRUD)
app.post('/etudiants', createEtudiant);
app.get('/etudiants', getEtudiants);
app.put('/etudiants/:id', updateEtudiant);
app.delete('/etudiants/:id', deleteEtudiant);


// Définition des routes et association avec les fonctions sur la Table Paie (CRUD)
app.post('/paies', createPaie);
app.get('/paies', getPaies);
app.put('/paies/:id', updatePaie);
app.delete('/paies/:id', deletePaie);


// Définition des routes et association avec les fonctions sur la Table Planning (CRUD)
app.post('/planning', createPlanning);
app.get('/planning', getPlannings);
app.put('/planning/:id', updatePlanning);
app.delete('/planning/:id', deletePlanning);


// Définition des routes et association avec les fonctions sur la Table Formation_Etudiants (CRUD)
app.post('/formations_etudiant', createFormationEtudiant);
app.get('/formations_etudiant', getFormationsEtudiant);
app.put('/formations_etudiant/:id', updateFormationEtudiant);
app.delete('/formations_etudiant/:id', deleteFormationEtudiant);


// Définition des routes et association avec les fonctions sur la Table Materiels_Utilisateur (CRUD)
app.post('/materiel_utilisateur', createMaterielUtilisateur);
app.get('/materiel_utilisateur', getMaterielUtilisateurs);
app.put('/materiel_utilisateur/:id', updateMaterielUtilisateur);
app.delete('/materiel_utilisateur/:id', deleteMaterielUtilisateur);


// Définition des routes et association avec les fonctions sur la Table Materiels_Etudiant (CRUD)
app.post('/materiel_etudiant', createMaterielEtudiant);
app.get('/materiel_etudiant', getMaterielEtudiant);
app.put('/materiel_etudiant/:id', updateMaterielEtudiant);
app.delete('/materiel_etudiant/:id', deleteMaterielEtudiant);

