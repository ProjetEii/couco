var mysql = require('mysql');
var fs = require('fs-extra');

var config = JSON.parse(fs.readFileSync('./tools/mysql-config.json'));
var client = mysql.createConnection(config);

// Crypto 
var crypto = require('crypto')
var shasum = crypto.createHash('sha1');
shasum.update("utf8");

	// Fonction de logging Automatique
var accounts = new Array();
var queryString = 'SELECT * FROM utilisateurs';
 
client.query(queryString, function(err, rows, fields) {
    if (err) console.log(err);
 
    for (var i in rows) {
        accounts[i]=rows[i].utilisateur_mail;
        
    }
});


exports.autoLogin = function(login, mdp, callback)
{

	client.query('SELECT utilisateur_id, utilisateur_mail, utilisateur_mdp FROM utilisateurs WHERE utilisateur_mail ="'+login+'"', function(e, o) {
		if (o){
			var utilisateur_mdp = o[0].utilisateur_mdp;
			utilisateur_mdp == mdp ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}

	// Fonction de logging Manuel sans Remember-me.
exports.manualLogin = function(login, mdp, callback) {
	
	// Vérification du USER et récupération du login et mdp.

	client.query('SELECT utilisateur_id, utilisateur_mail, utilisateur_mdp, utilisateur_valide FROM utilisateurs WHERE utilisateur_mail ="'+login+'"', function(e, o) {
		if(e) 
		{
			console.log('Erreur Login : '+ login);
			console.log('ERROR: ' + e);
		}
		if(o == '') 
		{
			callback("Utilisateur non trouvé !");

		} else {

		var utilisateur_mdp = o[0].utilisateur_mdp;
		// Validation du password donné et du hash du pwd utilisateur stocké en base.
		if(o[0].utilisateur_valide == 0)
		{
			
			callback('Compte non vérifé. Veuillez vérifiez vos mail afin d activer votre compte.');

		}else{
			validatePassword(mdp, utilisateur_mdp, function(err, res) {
				if (res){
					callback(null, o);
					updateLastLogin(login);
				}	else{
					callback('Mot de passe non valide.');
				}
			});
		}
	}
	});
}

exports.addNewAccount = function(newData, callback)
{
	client.query('SELECT utilisateur_mail FROM utilisateurs WHERE utilisateur_mail ="'+newData.mail+'"', function(e, o) {
		if (o[0] != null){
			callback('Email déja existant !');
		}	else{
					// Sécirisation du mot de passe "Hash"
					saltAndHash(newData.mdp, function(hash){
						newData.mdp = hash;
					// Ajouter la date et l'heure de la création du compte. //
						// Stockage en base des données de l'utilisateur. (nom, prénom, mail, mdp, date_created.)
						client.query('INSERT INTO utilisateurs SET utilisateur_nom="'+newData.nom+'", utilisateur_prenom="'+newData.prenom+'",utilisateur_mail="'+newData.mail+'",utilisateur_mdp="'+newData.mdp+'", utilisateur_avatar="avatar_default.jpg"', function(e, o) {
							if (e != null){
								console.log('ERROR: ' + e);
								callback("Erreur lors de l ajout");

							} else {
								//Génération d'un token d'activation de compte.
								userAvatar(o.insertId, function(e, o) {
									if(e == false)
										callback(o);
									else {
										generateTokenAccount(newData.mail,function(token) {
											if(token == null ) {
												callback("Erreur de generation de token, Veuillez ré-essayer.", false);
											} else {
												callback("Votre compte à été crée, Veuillez vérifez vos email.", token);
											}
										});
									}
									

								});
							}
						});
					});
				}
			});
		}

// Classes privée


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
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var generateTokenAccount = function(login, callback) {

	// Génération d'un Token sur 50 caractère aléatoire comprenant 0-9, a-z et A-Z.
	var token = '';
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	for (var i = 0; i < 50; i++) {
		var p = Math.floor(Math.random() * set.length);
		token += set[p];
	}
	// Stockage du token utilisateur dans la BDD.
	client.query('UPDATE utilisateurs SET utilisateur_token="'+token+'" WHERE utilisateur_mail="'+login+'"');
	callback(token);
}

var validatePassword = function(mdpUtil, hashedMdp, callback)
{
	// vérification des deux hashs.
	var salt = hashedMdp.substr(0, 10);
	var validHash = salt + md5(mdpUtil + salt);
	callback(null, hashedMdp === validHash);
}

var updateLastLogin = function(login)
{
	// Mise à jours du dernier Login du user a NOW().
	client.query('UPDATE utilisateurs SET utilisateur_lastlogin = NOW() WHERE utilisateur_mail ="'+login+'"');
	return true;
}

var userAvatar = function(idUser, callback)
{
	//ajouter sur le form d'inscription la possibilité d'ajouter un avatar. et ajouter une entrée à la fonction userAvatar avec le TMP_PATH.
	//http://stackoverflow.com/questions/5149545/uploading-images-using-nodejs-express-and-mongo
	//http://howtonode.org/really-simple-file-uploads
	fs.mkdir('C:/couco/public/images/users/'+idUser, 0777, function(e, o) {
		if(!e) {
			fs.copy('C:/couco/public/images/avatar_default.jpg','C:/couco/public/images/users/'+idUser+'/avatar_default.jpg', function(e, o) {
				callback(true, o);	
			});
		}
		else
			callback(false,'erreur lors de la création du dossier.');
	});
}
exports.deleteAccount = function(email, callback)
{
	// /!\ DELETE JUSTE L'UTILISATEUR, DOIT AJOUTER LE DELETE CASCADE !! (VOIR QUOI ON DELETE)
	client.query('DELETE FROM utilisateurs WHERE utilisateur_mail ="'+mail+'"', function(e, o) {
		callback(null);
	});
}

exports.getAccountByEmail = function(mail, callback)
{
	// Fonction qui retourne le simplement les données d'un compte utilisateur en fonction de son email.
	client.query('SELECT * FROM utilisateurs WHERE utilisateur_mail ="'+mail+'"', function(e, o) 
	{ 
		callback(o); 
	});
}