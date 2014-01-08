$(function() {

$( "#accordion_friend" ).accordion({
      collapsible: true,
      heightStyle: "content"
    });

var ul_friend_search = document.getElementById('grid_friends');

$('#search_input').typing({
	start: function () {$("#grid_friends").children().remove();},
    stop: function () {
    	$(this).ajaxSubmit({
                type: 'post',
                url: 'users_friend_search',
                data: {search: $('#search_input').val()},
                success : function(responseText, status, xhr, $form){
                    if (status == 'success'){
                    	console.log(responseText);
                    	if(responseText.length == 0){
                    		var li = document.createElement('li');
                            	ul_friend_search.appendChild(li);
                            	li.innerHTML = "Personne à été trouvé...";
                    	}else {
                            for (var i = 0; i<responseText.length; i++) {
                            	var li = document.createElement('li');
                            	ul_friend_search.appendChild(li);
                            	li.innerHTML = responseText[i].utilisateur_nom + ' ' + responseText[i].utilisateur_prenom;

                            }
                        }
                      }                    
                },
                error : function(e){
                    console.log('MERDE MERDE MERDE MERDE');
                }
            });
    },
    delay: 400
});
});