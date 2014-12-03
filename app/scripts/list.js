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

  getNews: function() {
    setInterval(function() {
      Ajax.get({
        url: url,
        success: this.process.bind(this)
      });
    }, 600000); // 10 minutes
  },

  process: function(data) {
    var hasNews = this.currentData && this.currentData[0].id !== data[0].id;

    if ( !hasNews) return;

    this.currentData = data;
    var html = Template.compile(this.html, data);
    this.element.innerHTML = html;

    this.updateLinks();
    this.getNews();
  },

  get: function() {
    var url = this.url;

    Ajax.get({
      url: url,
      success: this.process.bind(this)
    });
  }
};

module.exports = List;