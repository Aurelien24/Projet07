# Future problème potentiel

- Une seul table com existe. Si le site grandi trop, un rallentisement sera a prévoir avec des millions de post.
- La sécurité des comptes est vulnérable contre le brut-force. Il n'y as aucune contabilisation des tentatives de connexion ni blocage de compte. 

# Instalation

Crée un fichier .env et le remplir selon les spécification de .env.example

Les tables sont suseptible de ne pas se crée comme voulut. Vérifier la ligne 32 de index.js : db.sequelize.sync; qui gère la syncronisation.

L'implémentation d'image n'est pas terminer. Cependant, Multer-Config est bien présent. Il requière de crée un dossier "images" pour être utilisé. (Note : Aucune fonctionnalité complète ne va apparaitre dans la version actuel du site.)

### Lancer le server pour développement
```
nodemon server


