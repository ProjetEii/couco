$(function(){

$('#entete form').hide();

        $('#link_connexion').click(function(e){
          
          //on bloque l'évenement
          e.returnValue = false;

      if (e.preventDefault) {
            e.preventDefault();
        }

      //affichage du bloc de connexion
      $('#entete div').toggle('slide');

        });

    $( "#grid_cours" ).sortable();
    $( "#grid_cours" ).disableSelection();
    $( "#grid_cours" ).disableDraggable();

    $("#profil-form").children(':input').attr('disabled', 'disabled');
    $("#submit").attr('disabled', 'disabled');

    $("#modifier").on('click', function() {
        $("#profil-form").children(':input').removeAttr('disabled', 'disabled');
        $("#submit").removeAttr('disabled', 'disabled');
        $("#modifier").attr('disabled', 'disabled');
    });

        $('#profil-form').on('submit', function(e) {
      // Récupération des variable du Login-FORM.
            $("#loader:hidden").show("fast");
            e.preventDefault();
            var nom = $('#nom').val();
            var prenom = $('#prenom').val();
            var mail = $('#mail').text();
            var mdp_new = $('#mdp_new').val();
            var mdp_new_verif = $("#mdp_new_verif").val();
            //var avatar = $("#profil-form").children(':input[type:"file"]').get(0).files[0];
           
           if((mdp_new == '') && (mdp_new_verif == '')) {
            var parameters = {nom: nom, prenom: prenom, mail: mail, mdp_new: ''};
            $.get('/profil_update', parameters, function(e, o){
              window.location.href = 'http://localhost:3000/profil';
          })
                .fail(function(e) {
                  $("#loader:hidden").hide("fast");
                  $('.modal-header').html('Holy Shit :(');
                  $('.modal-body').html(e.responseText);
                  $(".modal-alert").modal("show");
                });
           } else {
                    var parameters = {nom: nom, prenom: prenom, mail: mail, mdp_new: mdp_new};
                    $.get('/profil_update', parameters, function(e, o){
                      window.location.href = 'http://localhost:3000/profil';
                    })
                        .fail(function(e) {
                          $("#loader:hidden").hide("fast");
                          $('.modal-header').html('Holy Shit :(');
                          $('.modal-body').html(e.responseText);
                          $(".modal-alert").modal("show");
                        });
                    }
        });
});
    