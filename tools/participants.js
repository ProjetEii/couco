var mysql = require('mysql');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('./tools/mysql-config.json'));
var client = mysql.createConnection(config);



/////////////////////////////////////////////////////////////////
//fonction  permettant de rajouter un participant à un cours
/////////////////////////////////////////////////////////////////
exports.AjoutParticipant = function(cours_id, user_id, callback)
{
	var requete = 'INSERT INTO participe_cours (utilisateur_id, cours_id, participe_value) VALUES ('+ user_id +','+ cours_id +', NOW())';

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