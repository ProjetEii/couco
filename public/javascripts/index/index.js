$(document).ready(function(){	

    	$('#entete form').hide();

        $('#link_connexion').click(function(e){
        	
        	//on bloque l'évenement
        	e.returnValue = false;

			if (e.preventDefault) {
		    		e.preventDefault();
				}

			//affichage du bloc de connexion
			$('#entete form').toggle('slide');

        });

      $( "#tabs" ).tabs({
      });


    $("add_matieres").click(function() {
      
      
    });

        $('#login-form').submit(function(e) {
          e.preventDefault();
            var login = $('#login').val();
            var mdp = $('#mdp').val();
            var remember = $("input:checkbox:checked").length;

            $(this).ajaxSubmit({
                type: 'post',
                url: 'connexion_login',
                data: {login: login, mdp: mdp, remember: remember},
                success : function(responseText, status, xhr, $form){
                    if (status == 'success') window.location.href = '/users';
                },
                error : function(e){
                    $('.modal-header').text("Login Failure !");
                    $('.modal-body').text(e.responseText);
                    $(".modal-alert").modal("show");
                }
            }); 
        });

        $('#inscription-form').submit(function(e) {
          e.preventDefault();

        var nom = $('#nom').val();
        var prenom = $('#prenom').val();
        var mail = $('#mail').val();
        var mail1 = $('#mail1').val();
        var mdp = $('#mdp').val();
        var mdp1= $('#mdp1').val();

       if ((mdp != mdp1) && (mail != mail1))
        {
          $('.modal-body').html("T'es manchot ou quoi ?.");
          $(".modal-alert").modal("show");
          $('#mail').focus();
        }else if(mdp != mdp1)
        {

          $('.modal-body').html("Les mots de passes ne Correspondent pas.");
          $(".modal-alert").modal("show");
          $('#mdp').focus();
        } else if (mail != mail1)
        {
          $('.modal-body').html("Les mails ne correspondent pas.");
          $(".modal-alert").modal("show");
          $('#mail').focus();

        }else{
          var parameters = {nom: nom, prenom: prenom, mail: mail, mdp: mdp};
          // AJAX d'envois des valeurs pour vérification.
          $.get('/inscription_validate', parameters, function(e, o){
              $('.modal-header').html('Success !');
              $('.modal-body').html(e);
              $(".modal-alert").modal("show");
          })
                .fail(function(e) {
                  $('.modal-header').html('Holy Shit :(');
                  $('.modal-body').html(e.responseText);
                  $(".modal-alert").modal("show");
                });
              }
      });
    });