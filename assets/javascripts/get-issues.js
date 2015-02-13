var changelog = changelog || {};

changelog.get_issues = (function() {
  'use strict';

  function init(){
    bindForm();
  }

  function bindForm(){
    $('.ls-btn').on('click', function(e){
      e.preventDefault();
      var url          = $('[name="url"]').val();
      var id_milestone = $('[name="milestone"]').val();
      getJson(url, id_milestone);
      $('#list-issues').html('<p class="loading"><img src="https://assets.locaweb.com.br/locastyle/1.2.35/images/ajax-loader.gif"> Gerando changelog, aguarde...</p>');
    })
  }

  function getJson(url, id_milestone){
    $.getJSON(url, function(data){
      $.each(data, function(index, element){
        console.log(element)
        if(element.milestone){
          if (element.milestone.number == id_milestone) {
            $('#list-issues').append('**<label class="tags_'+index+'"></label>** - *'+element.title+'. (#'+element.number+')*<br><br>')
            $.each(element.labels, function(i, labels){
              console.log(labels.name)
              if(labels.name === 'bug'){
                var name = 'fix';
              }else{
                name = labels.name;
              }
              $('.tags_'+index).append(name)
            })
          };
        }
      })
    }).success(function(){
      $('.loading').remove()
    })
  }

  return {
    init: init
  };

}());

$(window).load(function(){
  changelog.get_issues.init()
})
