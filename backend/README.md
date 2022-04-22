# Future problème potentiel

- Une seul table com existe. Si le site grandi trop, un rallentisement sera a prévoir avec des millions de post.
- Il existe une sécurité Anti Brut force au login dans controllers/user. Le vérouillage du compte dure une heur et aucun email n'est envoyé a l'utilisateur.

# Instalation

Crée un fichier .env et le remplir selon les spécification de .env.example

Les tables sont suseptible de ne pas se crée comme voulut. Vérifier la ligne 32 de index.js : db.sequelize.sync; qui gère la syncronisation.

Actuellement, le vérouillage d'un compte est régler sur 1h après 5 tentative. Le temps de vérouillage se trouve dans le fichier .env.

L'implémentation d'image n'est pas terminer. Cependant, Multer-Config et diverse ligne son bien présente. Multer-config requière de crée un dossier "images" pour être utilisé. (Note : Aucune fonctionnalité complète ne va apparaitre dans la version actuel du site. Tout au plus la possibilité d'enregistrer l'image dans le dossier images via insomnia)

### Lancer le server pour développement
```
nodemon server


