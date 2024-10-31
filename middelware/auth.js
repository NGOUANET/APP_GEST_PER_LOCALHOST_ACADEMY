// Middleware pour protéger les routes
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Accès refusé' });
  
    jwt.verify(token, secret, (err, user) => {
      if (err) return res.status(403).json({ error: 'Jeton invalide' });
      req.user = user;
      next();
    });
  }

  module.exports=authenticateToken;