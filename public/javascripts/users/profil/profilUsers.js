$(function(){

var divcours = document.getElementById("coursCount");
var cptcours = document.getElementById("cptcours");
var cptcours2 = document.getElementById("cptCours2");
var statuscours = {statuscours: 2};
$.post('/users_cours_search', statuscours, function(o, e) {
  for (var i = 0; i<o.length; i++) {
                        var li = document.createElement('li');
                        var ul = document.createElement('ul');
                        divcours.appendChild(ul);
                        ul.appendChild(li);
                        li.setAttribute('id',"cours_"+o[i].cours_id);
                        li.innerHTML = o[i].cours_titre;        
                }

                cptcours.innerHTML = "(" + o.length + ")";
                cptcours2.innerHTML = o.length;
})
                
                .fail(function(e){
                    console.log(e);
                });

var divFriends = document.getElementById('friendsCount');
var cptfriend = document.getElementById('cptFriends');
var cptfriend2 = document.getElementById('cptFriends2');
$.post('/users_friend_search', function(o, e) {
  for(var i = 0; i< o.length; i++) {
      var a = document.createElement('a');
        a.setAttribute('href',"#");
      var aspan = document.createElement('a');
        aspan.setAttribute('href',"#");
      var div = document.createElement('div')
        div.setAttribute('class', 'friend');
      var img = document.createElement('img');
        img.setAttribute("width",30);
        img.setAttribute("height", 30);
        img.setAttribute("alt", o[i].utilisateur_prenom + " " + o[i].utilisateur_nom.substr(0,1) + ".");
      var span = document.createElement('span');
        span.setAttribute("class", "friendly");
      divFriends.appendChild(div);
      div.appendChild(a);
      div.appendChild(span);
      a.appendChild(img);     
      span.appendChild(aspan);
      img.setAttribute("src", "/images/users/"+o[i].utilisateur_id+"/"+o[i].utilisateur_avatar);
      aspan.innerHTML = o[i].utilisateur_prenom + " " + o[i].utilisateur_nom.substr(0,1) + ".";
  }
  cptfriend.innerHTML = "Vos amis : " + o.length;
  cptfriend2.innerHTML = o.length;
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
                  $('.modal-head30').html('Holy Shit :(');
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