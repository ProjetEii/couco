      $(function(){
      ////////////////////////////////////
      /// Jquery sur les cours du User.///
      ////////////////////////////////////


        /// Transformation des ligne cours en element jquery
        $( "#grid_cours" ).sortable();
        /// Désactivation de la séléction des éléments.
        $( "#grid_cours" ).disableSelection();

        /// Test des radios et changement de la recherche
        $("input[type='radio']").click(function() {
          var statuscours = $(this).attr('id');
          var table = document.getElementById("table_cours");
          var cours = document.getElementById("cours");
         
                       
                    $("#table_cours").children().not("#table_titre").remove();
          

          $(this).ajaxSubmit({
                type: 'post',
                url: 'users_cours_search',
                data: {statuscours: statuscours},
                success : function(responseText, status, xhr, $form){
                    if (status == 'success'){
                      
                        if(statuscours == 1) 
                        {
                            for (var i = 0; i<responseText.length; i++) {

                              var tr = document.createElement('tr')
                              var td = document.createElement('td');
                              var td1 = document.createElement('td');
                              var td2 = document.createElement('td');
                              var img = document.createElement('img');
                              img.src = "/images/lock_icon.png";
                              table.appendChild(tr);
                              tr.setAttribute('id',"cours");
                              tr.appendChild(td);
                              tr.appendChild(td1);
                              tr.appendChild(td2);
                              td.setAttribute('id',"cours_"+responseText[i].cours_id);
                              td.innerHTML = responseText[i].cours_titre;
                              td1.innerHTML = responseText[i].cours_datecreate;
                              td2.appendChild(img);
                          }
                        } else if(statuscours == 2) 
                        {
                            for (var i = 0; i<responseText.length; i++) {
                              var tr = document.createElement('tr')
                              var td = document.createElement('td');
                              var td1 = document.createElement('td');
                              var td2 = document.createElement('td');
                              var img = document.createElement('img');
                              img.src = "/images/download_icon.png";
                              table.appendChild(tr);
                              tr.setAttribute('id',"cours");
                              tr.appendChild(td);
                              tr.appendChild(td1);
                              tr.appendChild(td2);
                              td.setAttribute('id',"cours_"+responseText[i].cours_id);
                              td.innerHTML = responseText[i].cours_titre;
                              td1.innerHTML = responseText[i].cours_datecreate;
                              td2.appendChild(img);
                          }
                        } else 
                          {
                            for (var i = 0; i<responseText.length; i++) {
                              var tr = document.createElement('tr')
                              var td = document.createElement('td');
                              var td1 = document.createElement('td');
                              var td2 = document.createElement('td');
                              var img = document.createElement('img');
                              img.src = "/images/write_icon.png";
                              table.appendChild(tr);
                              tr.setAttribute('id',"cours");
                              tr.appendChild(td);
                              tr.appendChild(td1);
                              tr.appendChild(td2);
                              td.setAttribute('id',"cours_"+responseText[i].cours_id);
                              td.innerHTML = responseText[i].cours_titre;
                              td1.innerHTML = responseText[i].cours_datecreate;
                              td2.appendChild(img);
                            }
                          }
                      }                    
                },
                error : function(e){
                    alert(e);
                }
            });
        });
});