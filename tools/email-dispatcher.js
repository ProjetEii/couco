
var EM = {};
module.exports = EM;

EM.server = require("emailjs/email").server.connect({

	host 	    : 'smtp.gmail.com',
	user 	    : 'noreply.couco@gmail.com',
	password    : 'couco2013!',
	sender		: 'Couco! <noreply.couco@gmail.com>',
	ssl		    : true

});

EM.dispatchResetPasswordLink = function(account, callback)
{
	EM.server.send({
		from         : 'Couco! <noreply.couco@gmail.com>',
		to           : account,
		subject      : 'Renouvellement de Mot de Passe.',
		text         : 'Holy shit... :(',
		attachment   : EM.composeEmailReset(account)
	}, callback );
}

EM.dispatchActivateAcountLink = function(account, token, callback)
{

	EM.server.send({
		from: 'Couco! <noreply.couco@gmail.com>',
		to: account,
		subject: 'Activation de votre compte Couco!',
		text: 'TEST',
		attachment: EM.composeEmailAccount(account, token)
	}, callback("Création du compte Réalisé avec succès. Veuillez vérifier vos mail", null) );
}

EM.composeEmailReset = function(o)
{
	var link = 'http://localhost:3000/reset-password?e='+o[0].mail+'&p='+o[0].mdp;
	var html = "<html><body>";
		html += "Hello "+o[0].nom+",<br><br>";
		html += "Ton login :: <b>"+o[0].mail+"</b><br><br>";
		html += "<a href='"+link+"'>Cliquez-ici pour réinitialiser votre mot de passe</a><br><br>";
		html += "Kiss,<br>";
		html += "</body></html>";
	return  [{data:html, alternative:true}];
}

EM.composeEmailAccount = function(account, token) 
{
	var link = 'http://localhost:3000/activate-account?e='+token+'&p='+account.mail;
	var html = "<html><body>";
		html += "Hello "+account.nom+",<br><br>";
		html += "Ton login :: <b>"+account.mail+"</b><br><br>";
		html += "<a href='"+link+"'>Cliquez-ici pour activer ton compte !</a><br><br>";
		html += "Kiss,<br>";
		html += "</body></html>";
	return  [{data:html, alternative:true}];
}