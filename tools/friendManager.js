var mysql = require('mysql');
var fs = require('fs-extra');
var config = JSON.parse(fs.readFileSync('./tools/mysql-config.json'));
var client = mysql.createConnection(config);

// Crypto 
var crypto = require('crypto')
var shasum = crypto.createHash('sha1');
shasum.update("utf8");

exports.getFriendsByIdUser = function(idUser, callback)
{

	client.query("SELECT * FROM utilisateurs LEFT JOIN ecoles_filieres_utilisateurs ON utilisateurs.utilisateur_id = ecoles_filieres_utilisateurs.utilisateur_id LEFT JOIN ecoles ON ecoles_filieres_utilisateurs.ecole_id = ecoles.ecole_id LEFT JOIN filieres ON ecoles_filieres_utilisateurs.filiere_id = filieres.filiere_id WHERE utilisateurs.utilisateur_id in (SElECT amis_id FROM utilisateurs, amis WHERE utilisateurs.utilisateur_id = amis.utilisateur_id AND utilisateurs.utilisateur_id ="+idUser+" AND amis.demande = 2)", function(e, o) {
		if(e){
			console.log(e);
			callback(false, 'OMAGAD');
		}
		else {
			callback(true, o);
		}

});
}

exports.searchFriend = function(search, idUser, callback)
{
 console.log(search);
 var tild = "~";
 var pourcent = "%";
 if(search != '') {
	var requete = 'SELECT * FROM utilisateurs LEFT JOIN ecoles_filieres_utilisateurs ON utilisateurs.utilisateur_id = ecoles_filieres_utilisateurs.utilisateur_id LEFT JOIN ecoles ON ecoles_filieres_utilisateurs.ecole_id = ecoles.ecole_id LEFT JOIN filieres ON ecoles_filieres_utilisateurs.filiere_id = filieres.filiere_id WHERE CONCAT_WS( \''+ tild +'\', COALESCE( utilisateurs.utilisateur_id , \'\' ),  COALESCE( utilisateurs.utilisateur_prenom , \'\' ),  COALESCE( utilisateurs.utilisateur_nom , \'\' )) LIKE \''+pourcent + search + pourcent +'\' AND utilisateurs.utilisateur_id != '+idUser;
	} else {
		var requete = 'SELECT * FROM utilisateurs LEFT JOIN ecoles_filieres_utilisateurs ON utilisateurs.utilisateur_id = ecoles_filieres_utilisateurs.utilisateur_id LEFT JOIN ecoles ON ecoles_filieres_utilisateurs.ecole_id = ecoles.ecole_id LEFT JOIN filieres ON ecoles_filieres_utilisateurs.filiere_id = filieres.filiere_id WHERE utilisateurs.utilisateur_id != '+idUser+' LIMIT 0 , 30';
	}
	client.query(requete, function(e, o) {

		if(e != null) {
			callback(false, 'Heu, personne n a été trouvé');
		}
		else {
			callback(true, o);
		}
	});
}