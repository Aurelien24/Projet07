const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {

    const token = req.headers.authorization.split(' ')[1]; //pAS D'envoit de token
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement'); 
    const userId = decodedToken.userId;

    // A un sérieu problème d'autentification, userId = undifined !
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();  
    }
  } catch (error){
    res.status(401).json({
      error: error
    });
  }
};