var cours = require('../tools/cours.js');




module.exports = function(app){


	////////////temporaire, a supprimer aprés prod
	//redirection vers la page d'index
	//////////////////////////////////////////////
		app.get('/', function(req, res){

		res.render('index');

		});


	///////////////////////////////////////
	//Page index cours
	////////////////////////////////////////
	app.get('/cours', function(req, res){

		//pensé à mettre la session à la place du chiffre
		cours.ListingCours(1, function(err, result){

		res.render('cours/indexcours', {test: result});

		});
	});


	///////////////////////////////////////////////////////
	//verification de lexistence du titre cours pour création
	///////////////////////////////////////////////////////
	app.post('/verif_cours', function(req, res){

		cours.VerifAjoutCours(req.body.titre, function(e) {

			if(e == true){
				res.send(200);
			}else{
				res.send(400);
			}		

		});
		
	});


	////////////////////////////////////////////////////////
	//listing des cours de l'utilisateur
	////////////////////////////////////////////////////////
	app.post('/liste_cours', function(req, res){

		//pensé à mettre la session à la place du chiffre
		cours.ListingCours(1, function(err, result){

			if(err == true){

				res.send(400);

			}else{

				res.send(200);
			}

		});

	});


	////////////////////////////////////////////////////////////////////
	//listing des amis d'un utilisateur qui ne parcipe pas au cours selectionner
	////////////////////////////////////////////////////////////////////
	app.post('/list_invitations', function(req, res){

		user.ListingInvitations(1, req.body.id_cours ,function(err, result){

			res.render('cours/ListingAmis', {layout: false, amis: result});

		});

	});


	////////////////////////////////////////////////////////////////////
	//listing des amis d'un utilisateur qui participe au cours selctionner
	////////////////////////////////////////////////////////////////////
	app.post('/list_participants_cours', function(req, res){

		user.ListingParticipantsCours(req.body.id_cours,function(err, result){

			res.render('cours/ListingAmis', {layout: false, amis: result});

		});

	});


};
