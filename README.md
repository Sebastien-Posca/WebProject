# WebProject
## Installation:

### Prérequis : 
Installer MongoDB
De préférence utiliser une machine sous Unix pour le serveur
Python 3.6 pour le serveur, afin de pouvoir utiliser l’encryption des mots de passe
Pour le serveur :
Cloner le repo github : git clone https://github.com/Sebastien-Posca/WebProject.git
Dans le répertoire Server exécuter les commandes : npm install puis npm run start
Le serveur est lancé sur le port 1337 !

#### Pour le client :
Dans le répertoire Client/pawworkshop utiliser la commande npm install puis si le serveur tourne sur la même machine que le client, exécuter npm start , si ce n’est pas le cas, se rendre dans Client/pawworkshop/src/constants.js et remplacer ‘localhost’ par l’adresse IP du serveur, puis exécuter npm start
Le client est lancé sur le port 3000  et un onglet du navigateur par défaut s’ouvre sur la page d’accueil de l’application.
Si l’onglet ne s’ouvre pas automatiquement, vous pouvez y accéder en accédant à l’url : http://localhost:3000



## Utilisation
### API Serveur :
POST /user/create : permet de créer un utilisateur en base de données

GET /user/ : permet de récupérer tous les utilisateurs présents en base de données 

POST /user/login : permet de se connecter; renvoie le token associé à l’utilisateur

POST /plugins/comment :  permet d’ajouter un commentaire à un plugin

GET /plugins/hasLike : permet de savoir si un utilisateur particulier a déjà like un plugin

POST /plugins/like : permet d’ajouter un like sur un plugin

GET /plugins/:id : permet de récupérer un plugin à partir de son ID en base de données

GET /plugins/:id/:fichier : permet de récupérer un fichier d’un plugin, pour le charger par exemple

GET /plugins/ : permet de récupérer tous les plugins


POST /submit/git : permet de soumettre un nouveau plugin via Github

GET /submit/:id : permet de télécharger les fichiers d’un plugin

POST /submit/ : permet de soumettre un nouveau plugin à l’aide d’une archive




### Client :
Au niveau de l’interface utilisateur, voila les fonctionnalitées proposées à l’utilisateur : 

À n’importe quel endroit de l’application, l’utilisateur peut décider de se connecter, avec son identifiant et mot de passe. Pour se connecter, il faut cliquer sur “Se connecter” situé sur la partie droite de la barre de navigation pour ouvrir le formulaire d’authentification. S’il n’a pas encore de compte, il peut cliquer sur l’onglet “s’inscrire”, remplir les deux champs et valider sa création de compte.


En utilisant la barre de navigation, l’utilisateur peut accéder à deux pages. L’une correspond au formulaire pour envoyer un nouveau plugin au serveur, et l’autre permet de visiter la liste des plugins que les utilisateurs ont envoyés.


Pour envoyer un nouveau plugin, il suffit de remplir ce formulaire ci-dessus. Tous les champs sont obligatoires, sauf celui de la vignette. 
L’utilisateur peut aussi décider de fournir les fichiers du plugin via un zip, ou alors spécifier une adresse github où récupérer ces fichiers.

Une fois le formulaire rempli, l’utilisateur peut cliquer sur le bouton ‘envoyer le plugin’.
Sur la page du magasin, l’utilisateur aura accès à la liste des plugins ajoutés au serveur. Un plugin est représenté par une carte avec quelques informations telles que son image, son nom, sa version, les tags associés, le nombre de commentaires et de “likes”.
Sur cette page, l’utilisateur peut appliquer des filtres pour faciliter la recherche d’un plugin en particulier. Il peut utiliser la zone de texte pour filtrer en fonction du nom du plugin.


 Il peut également filtrer en fonction des tags, soit en ajoutant textuellement un certain tag, soit en cliquant sur un tag présent sur un plugin.



Enfin en cliquant sur le bouton “Détails” d’un plugin, l’utilisateur arrive sur une page avec plus d’information sur le plugin sélectionné.

Il pourra “Liker” un plugin en cliquant sur l’image de coeur, télécharger le plugin, essayer le plugin et laisser un commentaire sur la page de ce plugin.


À noter que si l’utilisateur n’est pas connecté, certaines fonctionnalitées comme l’envoi de plugin, de commentaires et de likes sont désactivées.

Une fois sur le détail du plugin, l’utilisateur peut le tester directement depuis l’application. Si la sauvegarde et le chargement d’état ne fonctionne pas, il sera alors informé par un message d’erreur qu’il pourra comprendre.


Sur la page de test du plugin, il est possible de “lancer les tests techniques” qui font passer les tests unitaires au plugin et rendent leur rapport.
