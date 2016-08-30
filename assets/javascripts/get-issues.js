var changelog = changelog || {};

changelog.get_issues = (function() {
  'use strict';

  function init() {
    bindForm();
    getLastMilestone();
  }

  function bindForm() {
    $('.ls-btn').on('click', function(e) {
      e.preventDefault();
      var url          = $('[name="url"]').val();
      var id_milestone = $('[name="milestone"]').val();
      getIssues(url, id_milestone);
      $('#list-issues').html('<p class="loading"><img src="https://assets.locaweb.com.br/locastyle/1.2.35/images/ajax-loader.gif"> Gerando changelog, aguarde...</p>');
    })
  }

  function getIssues(url, id_milestone) {
    $.getJSON(url, function(data) {
      $.each(data, function(index, element) {
        if (element.milestone && element.milestone.number == id_milestone) {
          $('#list-issues').append('**<label class="tags_'+index+'"></label>** - *'+element.title+'. (#'+element.number+')*<br>');
          $.each(element.labels, function(i, labels) {
            if(labels.name === 'bug') {
              var name = 'FIX';
            } else {
              name = labels.name.toUpperCase();
            }
            $('.tags_'+index).append(name)
          })
        }
      })
    }).success(function() {
      $('.loading').remove();
    })
  }

  function getLastMilestone() {
    $.getJSON('https://api.github.com/repos/locaweb/locawebstyle/milestones', function(data) {
      $('[name="milestone"]').val(data[0].number);
    });
  }

  return {
    init: init
  };
}());

$(window).load(changelog.get_issues.init);
