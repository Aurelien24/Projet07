module.exports = (req, res, next) =>  { 

    try {

        const str = req.body.password;

    
        if (str.match( /[0-9]/g) && 
            str.match( /[A-Z]/g) && 
            str.match(/[a-z]/g) && 
            str.length >= 12) {
                console.log("Mdp bon")
                next();

        } else {
            console.log("Mdp erreur")
            res.status(409).json({ message: 'Pour des raison de sécurité, tout nouveau mot de passe doit contenir au minimum un chiffre, une majuscule, une minuscule et douze caractères' });
        }

      } catch (error){
        console.log("Mdp try echec")
        res.status(500).json({ message: 'Erreur serveur' });
      }
}