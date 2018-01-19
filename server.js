/*
Importer les composants serveur
*/
    //Composants
    const express = require('express');
    const ejs = require('ejs');
    const path = require('path');
    
    //Modules
    const frontRoute = require('./routes/front');
    const apiRoute = require('./routes/api');
//
/*
Initialiser le serveur
*/
    //Configurer le serveur
    const app = express();
    const port = process.env.PORT || 3000;
    
    //Configurer le dossier des vues client __dirname = point d'origine du fichier
    app.set('views', __dirname + '/www');
    app.use(express.static(path.join(__dirname, 'www')));//informer ou mettre les fichiers static css, img dans le dossier www
    
    //Routes - app utilise la route créée
    app.use('/', frontRoute);
    app.use('/api', apiRoute);

    app.engine('html', ejs.renderFile);
    app.set('view engine', 'ejs');
//
/*Lancer le serveur
*/
    app.listen(port,() => console.log(`Le serveur est lancé sur le port ${port}`));
//

