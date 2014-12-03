var Ajax = require('./ajax.js');
var Env = require('./env.js');
var Template = require('./template.js');
var Tracker = require('./tracker.js');

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

  updateLinks: function() {
    var elements = document.getElementsByTagName('a');
      var lists = [].slice.call(elements);

      lists.forEach(function(element, index) {
        element.addEventListener('click', function(e) {
          e.preventDefault();

          if (Env.isSandboxKind) {
            window.open(element.href);
          } else {
            chrome.tabs.create( { url: element.href } );
          }

          Tracker.trigger(Env.TEAM_SLUG, element.href);
        }, false);
      });
  },

  get: function() {
    var url = this.url;

    var onSuccess = function(datas) {
      var html = Template.compile(this.html, datas);
      this.element.innerHTML = html;

      this.updateLinks();
    };

    Ajax.get({
      url: url,
      success: onSuccess.bind(this)
    });
  }
};

module.exports = List;