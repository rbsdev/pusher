var Ajax = require('./ajax.js');
var Env = require('./env.js');
var Template = require('./template.js');
var Tracker = require('./tracker.js');

var List = {
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

  get: function(url, elementList) {
    var serviceUrl = url.replace('{{team}}', Env.TEAM_SLUG),
        element = document.querySelector(elementList);

    var updateLinks = function() {
      var elements = element.getElementsByTagName('a');
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
    };

    var onSuccess = function(datas) {
      var html = Template.compile(this.html, datas);
      element.innerHTML = html;

      updateLinks();
    };

    Ajax.get({
        url: serviceUrl,
        success: onSuccess.bind(this)
    });
  }
};

module.exports = List;