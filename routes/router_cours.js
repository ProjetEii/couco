var cours = require('../tools/cours.js');
var user = require('../tools/users.js');
var participant = require('../tools/participants.js');



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

		res.render('cours/indexcours', {cours: result});

		});
	});


	///////////////////////////////////////////////////////
	//verification de lexistence du titre cours pour création
	///////////////////////////////////////////////////////
	app.post('/verif_cours', function(req, res){

		cours.VerifAjoutCours(req.body.titre, req.body.user_id, function(e) {

			if(e == true){
				res.send(200);
			}else{
				res.send(400);
			}		

		});
		
	});



	////////////////////////////////////////////////////////
	//fonction permettant l'ajout d'un cours en BDD
	///////////////////////////////////////////////////////
	app.post('/ajout_cours', function(req, res){

		//ajout du cours en BDD
		cours.AjoutCours(req.body.titre, req.body.user_id, function(e){

			if(e == true)
			{
				//recupération de l'id du cours créer
				cours.InfoCours(req.body.titre, req.body.user_id, function(result){

					if(result != null)
					{
						//ajout de l'utilisateur en tant que participants au cours
						participant.AjoutParticipant(result[0].cours_id, req.body.user_id, function(result2){

							if(result2 == true)
							{
									//listing des cours après ajout, avec mise en valeur du dernier ajouter
									cours.ListingCours(req.body.user_id, function(err, result){

										res.render('cours/ListingCours', {layout: false, cours: result, id: result[0].cours_id });

									});

							}else{
								res.send(400);

							}
						});

					}else{

						res.send(400);
					}

				});

			}else{

				res.send(400);

			}

		});

	});


	////////////////////////////////////////////////////////
	//listing des cours de l'utilisateur
	////////////////////////////////////////////////////////
	/*
	app.post('/liste_cours', function(req, res){

		//pensé à mettre la session à la place du chiffre
		cours.ListingCours(1, function(err, result){

			if(err == true){

				res.send(400);

			}else{

				res.send(200);
			}

		});

	});*/


	//////////////////////////////////////////////////////////
	//recherche dans la liste des cours de l'utilsiateur
	//////////////////////////////////////////////////////////
	app.post('/recherche_cours_index', function(req, res){

		cours.RechercheCoursIndex(req.body.recherche, 1, function(err, result){

			res.render('cours/ListingCours', {layout: false, cours: result});

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
