var AM = require('../tools/accountManager.js');
var EM = require('../tools/email-dispatcher');
var express = require('express');
module.exports = function(app) {

app.get('/', function(req, res){
  res.render('index');
});

app.post('/', function(req, res) {

});

 // INSCRIPTION + VALIDATION + LOGIN(Auto et Manuel)

app.get('/inscription', function(req, res){

res.render('login/inscription');
});

app.get('/inscription_validate', function(req,res){

var newData = {nom: req.query.nom, prenom: req.query.prenom, mail: req.query.mail,mdp: req.query.mdp};

	AM.addNewAccount(newData, function(e, o){
			if (o != false){
				EM.dispatchActivateAcountLink(newData, o, function(e,o){
				// this callback takes a moment to return //
				// should add an ajax loader to give user feedback //
					if (o == null) 
					res.send(e, 200);
				});
			}	else{
				res.send(e, 400);
			}
		});
	});

app.get('/connexion', function(req, res){
	// check if the user's credentials are saved in a cookie //
		if (req.cookies.user == undefined || req.cookies.mdp == undefined){
			res.render('login/connexion');
		}	else{
	// attempt automatic login //
			AM.autoLogin(req.cookies.user, req.cookies.mdp, function(o){
				if (o != null){
				    req.session.user = o;
					res.render('users/users_index', { layout: 'main_users'});
				}	else{
					res.render('index', {layout: false});
				}
			});
		}
});

app.post('/connexion_login', function(req, res) {
	// requête de vérification des ID du USER avec callback.
	console.log(req.body);
	AM.manualLogin(req.body.login, req.body.mdp, function(e, o){
		// SI on a un code erreur on renvois 400. Sinon 200.
			if(e != null){
				res.send(e, 400);
			}	else{
						req.session.user = o;

				if (req.body.remember == 1){

					res.cookie('user', o[0].utilisateur_mail, { maxAge: 900000 });
					res.cookie('mdp', o[0].utilisateur_mdp, { maxAge: 900000 });
					res.cookie('id_user', o[0].utilisateur_id, { maxAge: 900000 });
				}

				res.send(200);
			}
	});

});


// Renouvellement Mot de passe. //

app.post('/lost-password', function(req, res){
	// look up the user's account via their email //
		AM.getAccountByEmail(req.param('email'), function(o){
			if (o){
				//res.send('ok', 200);
				EM.dispatchResetPasswordLink(o, function(e, m){
				// this callback takes a moment to return //
				// should add an ajax loader to give user feedback //
					if (!e) {
						res.send('ok', 200);
					}	else{
						res.send('email-server-error', 400);
						for (k in e) console.log('error : ', k, e[k]);
					}
				});
			}	else{
				res.send('email-not-found', 400);
			}
		});
	});

	app.get('/reset-password', function(req, res) {
		var email = req.query.e;
		var passH = req.query.p;
		AM.validateResetLink(mail, passH, function(e){
			if (e != 'ok'){
				res.redirect('/');
			} else{
	// save the user's email in a session instead of sending to the client //
				req.session.reset = { mail:mail, passHash:passH };
				res.render('reset', { title : 'Reset Password' });
			}
		})
	});
	
	app.post('/reset-password', function(req, res) {
		var nPass = req.query.mdp;
	// retrieve the user's email from the session to lookup their account and reset password //
		var mail = req.session.reset.mail;
	// destory the session immediately after retrieving the stored email //
		req.session.destroy();
		AM.updatePassword(mail, nPass, function(e, o){
			if (o){
				res.send('ok', 200);
			}	else{
				res.send('unable to update password', 400);
			}
		})
	});
};
