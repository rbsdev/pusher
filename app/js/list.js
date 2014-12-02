var Ajax = require('./ajax.js');
var Env = require('./env.js');
var Template = require('./template.js');

var List = {
  url: Env.service.NEWS,
  element: document.getElementById('list-news'),
  html: [
    '<li>',
      '<div class="photo">',
        '<a href="{{ URL }}" title="{{ TITLE }}">',
          '<img src="{{ SRC }}?w=100&h=100&a=c"',
        '</a>',
      '</div>',
      '<div class="content">',
        '<a href="{{ URL }}">',
            '<h3>{{ TAG }}</h3>',
            '<h2>{{ TITLE }}</h2>',
            '<time datetime="{{ DATE }}">{{ DATE }}</time>',
        '</a>',
      '</div>',
    '</li>'
  ].join(''),

  get: function() {
    var url = this.url;

    var updateLinks = function() {
      var elements = document.getElementsByTagName('a');
      var lists = [].slice.call(elements);

      lists.forEach(function(element, index) {
        element.addEventListener('click', function(e) {
          e.preventDefault();
          chrome.tabs.create( { url: element.href } );
        }, false);
      });
    };

    var onSuccess = function(datas) {
      var html = Template.compile(this.html, datas);
      this.element.innerHTML = html;

      updateLinks();
    };

    Ajax.get({
        url: url,
        success: onSuccess.bind(this)
    });
  }
};

module.exports = List;