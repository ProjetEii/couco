var mysql = require('mysql');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('./tools/mysql-config.json'));
var client = mysql.createConnection(config);



////////////////////////////////////////////////////////
//fonction de vérification du titre cours en BDD avant création
/////////////////////////////////////////////////////////////////
exports.VerifAjoutCours = function(titre, callback)
{

	var requete = 'SELECT cours_titre, cours_id FROM cours WHERE cours_titre="'+ titre +'"';
	
	client.query(requete, function(err, rows, fields) {

			//si erreur on l'affiche
	    if (err){
			console.log(err);

		}else{
			//s'il y a bien un resultat on renvoie verif=0
			if(rows.length == 1){

				callback(false);
			}else{

				callback(true);
			}

		}

	});

};


////////////////////////////////////////////////////////
//fonction de listing des cours de l'utilisateur connecter
////////////////////////////////////////////////////////////
exports.ListingCours = function(user, statuscours, callback)
{
	var requete = 'SELECT cours.cours_titre, cours.cours_id, cours.cours_datemaj FROM cours, participe_cours WHERE cours.utilisateur_id = participe_cours.utilisateur_id AND cours.utilisateur_id = ' + user +' AND cours.cours_status='+ statuscours +' GROUP BY cours.cours_titre';

	client.query(requete, function(err, rows, fields) {

			//si erreur on l'affiche
	    if (err){
			console.log(err);

		}else{
			//s'il y a bien un resultat on renvoie verif=0
			if(rows.length >= 1){
				callback(false, rows);
			}else{

				callback(true, null);
			}

		}

	});
};
