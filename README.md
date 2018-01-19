## Mettre en place le serveur
1/La première chose est d'initier un dossier ndeJS avec la commande : 
--npm init

Suivre les indications du terminal.

2/Créer un fichier pour le serveur, a la base le fichier s'appelle index.js mais nous changeons ce nom par 'server.js'.

## Installer les dépendances
3/Pour créer un serveur NodeJS en utilisant le framework ExpressJS, il faut commencer par l'installer sur le serveur avec la commande:
--npm install --save express

4/Un serveur NodeJS de base à besoin d'un dossier nommé views pour héberger les vues client (le html,css), nous allons modifier le nom de ce dossier 'www' grace a la dépendance 'path' :
--npm install --save path

5/Un serveur NodeJS doit pouvoir analyser les données d'une requete par exemple lors de la validation d'un formulaire, les données sont envoyées sur le serveur via une adresse API. Pouor ce faire, il faut installer la dépendance 'body-parser':
--npm install --save body parser

6/Les vues du clients vont etre configurer en HTML pour correspondre a l'affichage d'une application Angular, il faut donc importer la dépendance 'ejs' que nous allons utiliser en mode 'rendu':
--npm install --save ejs

## Monter le serveur NodeJS
7/Chaque dépendance doit etre importer dans le fichier 

//Class - Dans mon serveur, j'ai crée une constante qui s'appelle express et qui correspond à la classe express
const express = require('express');
const ejs = require('ejs');
const path = require('path'); //Classe spécifique sur le serveur, ou ont les fichiers //Dossier static des fichiers pour le client

8/Une fois les dépendances importées, il faut initier le serveur
/*
Initialiser le serveur
*/
    const app = express();
    const port = process.env.PORT || 3000;
//


9/Il faut aussi configurer les données pour les vues client
//Configurer le dossier des vues client __dirname = point d'origine du fichier
    app.set('views', __dirname + '/www');
    app.use(express.static(path.join(__dirname, 'www')));
    
10/Lancer le serveur
/*Lancer le serveur
*/
    app.listen(port,() => console.log('Le serveur est lancé sur l port ${port}'))
//

## Pour lance le serveur, il y a 3 méthodes possibles:
//Méthode 1
--node server.js

//Méthode 2
npm start

11///Méthode 3 : nécéssite l'installation de nodemon en global
nodemon server.js

Pour simplifier le travail, il est conseillé d'installer nodemon sur le serveur.
npm install -save nodemon

Il faut ensuite modifier le script dans le fichier package.json de la facon suivante
json
...
"scripts":{
    "start": "nodemon server.js" 
},
...
## Ecouter le serveur nodemon
12/Une fois le script modifié, la commande 'npm start' lance l'écouteur nodemon 
/*
Ecouter le serveur
*/
    const server = app.listen(3000, () => {
        console.log('Le serveur est lancé !');
    });
//

## Création de la route front
13/Un serveur NodeJS doit etre configurer sur toutes les étapes, comme pour la création des routes. Nous allons préparer la route pour les vues client. Créer un fichier nommé 'front.js' dans un dossier nommé 'routes' a la racine du serveur.

Ouvrir le fichier 'front.js' pour configurer le module de route en commencant pour importer les composants : js
/*
Importer les composants de la route
*/
    const express = require('express');
    const router = express.Router();
//


14/Dans le même fichier, configurer la route '/' (accueil) de la maniere suivante : js
/*
Définition des routes
*/
    router.get('/', (req, res)=>{
        //Renvoyer le fichier index dans la réponse
        res.render('index');
    })  
//

15/Pour finir, i lfaut exporter le module de route :
/*
Exporter le module de route
*/
    module.exports = router;
//


16/Une fois la route front créée, il faut l'importer dans le fichier server.js :
const frontRoute = require('./routes/front');

17/Une fois importée, il faut configurer le serveur pour dire d'utiliser 'frontRoute' pour l'adresse '/':
//Routes - app utilise la route créée
app.use('/', frontRoute);

18/A cette étape, aucun moteur de rendu n'est défini, il faut donc utiliser, le principe de ejs d'une manière qui permet de lier des fichiers '.html' aux routes du serveur :
/Moteur de rendu
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

19/ Pour finir, il faut créer un fichier nommé 'index.html' dans le dossier 'www'.
La page d'accueil du serveur affiche a présent le fichier 'index.html'

## Ajouter une route API
La route API est construite de la même manière que la route front, il faut donc dupliquer la route front et la mettre a jour pour qu'elle corresponde à l'API. La seule différence se trouve dans la réponse
//Renvoyer un flux JSON dans la réponse
res.json({content: 'Hello API'});

Il faut ensuite l'importer dans server.js et la configurer de la même manière que la route front.

Notre projet va utiliser une bdd MySql, il faut donc ajouter une déendance a notre serveur pour pouvoir utiliser cette bdd.
--npm install --save mysql

Il faut ensuite configurer le module dans la route API.

    
