var mysql = require('mysql');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('./tools/mysql-config.json'));
var client = mysql.createConnection(config);



////////////////////////////////////////////////////////
//fonction de vérification du titre cours en BDD avant création
/////////////////////////////////////////////////////////////////
exports.VerifAjoutCours = function(titre, user_id, callback)
{

	var requete = 'SELECT cours_titre, cours_id FROM cours WHERE cours_titre="'+ titre +'" AND utilisateur_id = '+ user_id;
	
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




/////////////////////////////////////////////////////////////////
//fonction permettant de récupérer les inforamtions d'un cours
/////////////////////////////////////////////////////////////////
exports.InfoCours = function(titre, user_id, callback)
{

	var requete = 'SELECT cours_titre, cours_id, cours_datecreate, cours_datemaj, utilisateurs.utilisateur_nom, utilisateurs.utilisateur_prenom FROM cours, utilisateurs WHERE cours.utilisateur_id = utilisateurs.utilisateur_id AND cours.cours_titre="'+ titre +'" AND utilisateurs.utilisateur_id ='+ user_id;
	
	client.query(requete, function(err, rows, fields) {

			//si erreur on l'affiche
	    if (err){
			console.log(err);

		}else{
			//s'il y a bien un resultat on renvoie verif=0
			if(rows.length == 1){

				callback(rows);
			}else{

				callback(null);
			}

		}

	});

};


////////////////////////////////////////////////////////////////
//fonction permettant d'effectuer une recherche dnas la liste des cours
///////////////////////////////////////////////////////////////
exports.RechercheCoursIndex = function(valeur, user, callback)
{
	var requete = "SELECT DISTINCT cours.cours_titre, cours.cours_id, cours.cours_datemaj, usr1.utilisateur_nom, usr1.utilisateur_prenom FROM cours INNER JOIN utilisateurs usr1 ON cours.utilisateur_id = usr1.utilisateur_id INNER JOIN participe_cours ON participe_cours.cours_id = cours.cours_id WHERE cours.cours_titre LIKE '%"+ valeur +"%' AND participe_cours.utilisateur_id = "+ user +" ORDER BY cours.cours_id DESC";

	client.query(requete, function(err, rows, fields) {

			//si erreur on l'affiche
    if (err){
			console.log(err);

	}else{
		//s'il y a bien un resultat on renvoie verif=0
		if(rows.length >= 1){

			callback(false,rows);
		}else{

			callback(true, null);
		}

		}

	});
};



////////////////////////////////////////////////////////
//fonction l'ajout d'un cours en BDD
/////////////////////////////////////////////////////////////////
exports.AjoutCours = function(titre, user_id, callback)
{

	var requete = 'INSERT INTO cours (cours_titre, cours_datecreate, cours_datemaj, utilisateur_id) VALUES ("'+ titre +'", NOW(), NOW(), '+ user_id +')';
	
	client.query(requete, function(err, rows, fields) {

			//si erreur on l'affiche
	    if (err){
			console.log(err);

			callback(false);

		}else{

			callback(true);
		}

	});

};



////////////////////////////////////////////////////////
//fonction de listing des cours de l'utilisateur connecter
////////////////////////////////////////////////////////////
exports.ListingCours = function(user, callback)
{
	var requete = 'SELECT DISTINCT cours.cours_titre, cours.cours_id, cours.cours_datemaj, usr1.utilisateur_nom, usr1.utilisateur_prenom FROM cours INNER JOIN utilisateurs usr1 ON cours.utilisateur_id = usr1.utilisateur_id INNER JOIN participe_cours ON participe_cours.cours_id = cours.cours_id WHERE participe_cours.utilisateur_id = '+ user +' GROUP BY cours.cours_titre';
	
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
	////////////////////////////////////////////////////////
//fonction de listing des cours de l'utilisateur connecter par status
////////////////////////////////////////////////////////////
exports.ListingCoursByStatus = function(user, statuscours, callback)
{
	var requete = 'SELECT DISTINCT cours.cours_titre, cours.cours_id, cours.cours_datemaj, usr1.utilisateur_nom, usr1.utilisateur_prenom FROM cours INNER JOIN utilisateurs usr1 ON cours.utilisateur_id = usr1.utilisateur_id INNER JOIN participe_cours ON participe_cours.cours_id = cours.cours_id WHERE participe_cours.utilisateur_id = '+ user +' AND cours.cours_status='+ statuscours +' GROUP BY cours.cours_titre';
	
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

