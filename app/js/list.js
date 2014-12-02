var Ajax = require('./ajax.js');
var Template = require('./template.js');


var List = {
  url: 'http://homologacaonovo.clicrbs.com.br/pusher-data-service/api/news/list/gremio?size=20&hl=1',
  element: document.getElementById('list-news'),
  html: [
    '<li>',
      '<a href="{{ URL }}"><img src="{{ SRC }}"></a>',
      '<a href="{{ URL }}">{{ TITLE }}></a>',
      '<span>{{ DATE }}</span>',
    '</li>'
  ].join(''),

  get: function() {
    var url = this.url;

    var onSuccess = function(datas) {
      var html = Template.compile(this.html, datas);
      element.innerHTML = html;
    };

    Ajax.get({
        url: url,
        success: onSuccess.bind(this)
    });
  }
};

module.exports = List;