$(function(){

var ul = document.getElementById("coursCount");
var statuscours = {statuscours: 2};
$.post('/users_cours_search', statuscours, function(o, e) {
  for (var i = 0; i<o.length; i++) {
                        var li = document.createElement('li');
                        ul.appendChild(li);
                        li.setAttribute('id',"cours_"+o[i].cours_id);
                        li.setAttribute('class', "ui-state-default");
                        li.innerHTML = o[i].cours_titre;        
                }
})
                
                .fail(function(e){
                    console.log(e);
                });
              
});
   
   /*//////////////////////////////////////////////
    /// Jquery Sur le profil Users en lui même.///
    //////////////////////////////////////////////

    $("#profil-form").children(':input').attr('disabled', 'disabled');
    $("#submit").attr('disabled', 'disabled');

    $("#modifier").on('click', function() {
        $("#profil-form").children(':input').removeAttr('disabled', 'disabled');
        $("#submit").removeAttr('disabled', 'disabled');
        $("#modifier").attr('disabled', 'disabled');
    });

    
      /////////////////////////////////////////
      /// Jquery Ajax sur le profil du User.///
      /////////////////////////////////////////


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
        });*/ 