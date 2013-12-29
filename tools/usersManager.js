var mysql = require('mysql');
var fs = require('fs-extra');
var config = JSON.parse(fs.readFileSync('./tools/mysql-config.json'));
var client = mysql.createConnection(config);

// Crypto 
var crypto = require('crypto')
var shasum = crypto.createHash('sha1');
shasum.update("utf8");

exports.userProfil = function(login, callback) {
	var stats = new Array();
	client.query('SELECT * FROM utilisateurs LEFT JOIN ecoles_filieres_utilisateurs ON utilisateurs.utilisateur_id = ecoles_filieres_utilisateurs.utilisateur_id LEFT JOIN ecoles ON ecoles_filieres_utilisateurs.ecole_id = ecoles.ecole_id LEFT JOIN filieres ON ecoles_filieres_utilisateurs.filiere_id = filieres.filiere_id WHERE utilisateurs.utilisateur_mail="'+login+'"', function(e, o) {

	if(e){
		console.log(e);
		callback(false, 'OMAGAD');
	}
	else {
		callback(true, o);
		//stats.push(o);
		/*client.query('SELECT count(amis.amis_id) AS nbamis FROM amis, utilisateurs WHERE utilisateurs.utilisateur_id = amis.utilisateur_id AND utilisateurs.utilisateur_id="'+stats[0][0].utilisateurs_id+'"', function(e, o) {

			if(e){
				callback(false, 'OMAGAD1');
			}
			else {
				stats.push(o);
				client.query('SELECT count(cours.cours_id) AS nbcours FROM cours, utilisateurs WHERE utilisateurs.utilisateur_id = cours.utilisateur_id AND utilisateurs.utilisateur_id="'+stats[0][0].utilisateurs_id+'"', function(e, o) {
					if(e){
						callback(false, 'OMAGAD2');
					}
					else {
						stats.push(o);
						callback(true, stats);
					}
				});
			}
		});*/
	}

	});
}

exports.updateProfil = function(newData, callback) {
	console.log(2);
	console.log(newData);
	console.log('------------------');
	if(newData.mdp_new != '') {
		saltAndHash(newData.mdp_new, function(hash){
			console.log('------HASH-----');
			console.log(hash);
			console.log('------------------');
			client.query('UPDATE utilisateurs SET utilisateur_nom ="'+newData.nom+'", utilisateur_prenom ="'+newData.prenom+'", utilisateur_mdp="'+hash+'" WHERE utilisateur_mail="'+newData.mail+'"', function(e, o) {
				console.log(e);
				console.log('------------------');
				console.log(o);
				console.log('------------------');
				if (e != null){
					console.log('ERROR: ' + e);
					callback(false, "Erreur lors de l update");
				} else {
					callback(true, "Vos info ont bien été mise à jour.");
				}	
			});
		});
	} else {
			client.query('UPDATE utilisateurs SET utilisateur_nom ="'+newData.nom+'", utilisateur_prenom ="'+newData.prenom+'" WHERE utilisateur_mail="'+newData.mail+'"', function(e, o) {
				console.log(e);
				console.log('------------------');
				console.log(o);
				console.log('------------------');
				if (e != null){
					console.log('ERROR: ' + e);
					callback(false, "Erreur lors de l update");
				} else {
					callback(true, "Vos info ont bien été mise à jour.");
				}	
			});
	}
	
}

exports.searchUsers = function(searchData, callback)
{


}


var generateSalt = function()
{

	//Génération d'un SALT pour le HASH.
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	// Convertion en md5 du mdp utilisateur tapé dans le form.
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	// Génération du crypto pour comparer les deux mdp.
		console.log(pass);
		console.log('------------------');
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(mdpUtil, hashedMdp, callback)
{
	// vérification des deux hashs.
	var salt = hashedMdp.substr(0, 10);
	var validHash = salt + md5(mdpUtil + salt);
	callback(null, hashedMdp === validHash);
}

var getUserById = function(id_profil, callback)
{

}

var getUserByMail = function(mail_profil, callback)
{

}