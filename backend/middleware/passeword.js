module.exports = (req, res, next) =>  { 

    try {

        const str = req.body.password;

        // Demande au mot de passe d'avoir 1 chiffre, 1 majuscule, 1 minuscule et au moins 12 character.
        if (str.match( /[0-9]/g) && 
            str.match( /[A-Z]/g) && 
            str.match(/[a-z]/g) && 
            str.length >= 12) {
                next();

        } else {
            // Renvoit un message interprétable pour le frontend.
            res.status(409).json({ message: 'Pour des raison de sécurité, tout nouveau mot de passe doit contenir au minimum un chiffre, une majuscule, une minuscule et douze caractères' });
        }

      } catch (error){
        res.status(500).json({ message: 'Erreur serveur' });
      }
}