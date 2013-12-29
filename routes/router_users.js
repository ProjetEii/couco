var UM = require('../tools/usersManager.js');
var CM = require('../tools/cours.js')
var EM = require('../tools/email-dispatcher');


module.exports = function(app) {

app.get('/users', function(req, res){
	
	if (req.cookies.user == undefined || req.cookies.mdp == undefined){
			res.render('login/connexion');
	}	
	else{
		
		UM.userProfil(req.cookies.user, function(e, o)
		{
			if(e != false){
				console.log(o);
                res.render('users/users_index', {layout:'main_users',infoprofil: o});	
				}			
		});
	}
});

app.get('/profil_update', function(req, res) {
	if (req.cookies.user == undefined || req.cookies.mdp == undefined){
			res.render('index');
	}	
	else{
		UM.updateProfil(req.query, function(e, o) {
			if(e == false)
				res.send(o, 400);
			else 
				res.send(o, 200);	
		});
	}
});

app.get('/users_cours', function(req, res){
	if (req.cookies.user == undefined || req.cookies.mdp == undefined){
			res.render('index');
	}	
	else{
	CM.ListingCours(req.cookies.id_user, 0, function(e, o) {
		if(e == true){

				res.send(400);

			}else{

				res.render('users/users_cours', { layout: 'main_users', cours: o});
			}

		});	
	  }
	});

app.post('/users_cours_search', function(req, res) {

	if (req.cookies.user == undefined || req.cookies.mdp == undefined){
			res.render('index');
	}	
	else{
		CM.ListingCours(req.cookies.id_user, req.body.statuscours, function(e, o) {
		if(e == true){
				res.send(400, e);

			}else{
				res.send(200, o);
			}

		});	
	  }

	});

app.get('/users_amis', function(req, res) {
if (req.cookies.user == undefined || req.cookies.mdp == undefined){
			res.render('index');
	}	
	else{
		res.render('users/users_amis', { layout: 'main_users'});
}
});

}