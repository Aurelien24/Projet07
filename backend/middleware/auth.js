const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log("auth lancer");

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement');
    const userId = decodedToken.userId;

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