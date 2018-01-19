/*
Importer les composants de la route
*/
const express = require('express');
const router = express.Router();
const mySql = require('mysql');
//

/*
Configurer la connexion BDD
*/
const connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todoes'
});

/*
Définition des routes
*/
router.get('/', (req, res) => {
    //Ouvrir la connexion a la bdd
    connection.connect();
    //Renvoyer un flux JSON dans la réponse
    res.json({content: 'Hello API'});

//Fermer la connexion au serveur
connection.end();
})
//
/*
Exporter le module de route
*/
module.exports = router;
//
