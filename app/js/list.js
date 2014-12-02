var Ajax = require('./ajax.js');
var Env = require('./env.js');
var Template = require('./template.js');


var List = {
  url: Env.service.NEWS,
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
      this.element.innerHTML = html;
    };

    Ajax.get({
        url: url,
        success: onSuccess.bind(this)
    });
  }
};

module.exports = List;