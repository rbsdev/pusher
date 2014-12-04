  var Ajax = require('./ajax.js');
var Env = require('./env.js');
var Template = require('./template.js');
var Tracker = require('./tracker.js');

var List = {
  url: Env.service.NEWS,
  element: document.getElementById('list-news'),

  html: [
    '<li>',
      '<a href="{{ URL }}" title="{{ TITLE }}">',
        '<div class="photo">',
          '<img src="{{ SRC }}?w=100&h=100&a=c" alt="">',
        '</div>',
        '<div class="content">',
          '<h3>{{ NEW }}{{ TAG }}</h3>',
          '<h2>{{ TITLE }}</h2>',
          '<time datetime="{{ DATE }}">{{ DATE }}</time>',
        '</div>',
      '</a>',
    '</li>'
  ].join(''),

  newBadge: '<span>Nova</span>',

  augment: function(news) {
    news.isNew = false; // todo: check if news.id was already opened
    news.newBadge = news.isNew ? this.newBadge : '';

    return news;
  },

  updateLinks: function() {
    var elements = document.getElementsByTagName('a');
    var lists = [].slice.call(elements);

    lists.forEach(function(element, index) {
      element.addEventListener('click', function(e) {
        e.preventDefault();

        if (Env.isSandboxKind) {
          window.open(element.href);
        } else {
          // var totalNewsUread = this.totalNewsUnread--;
          localStorage.setItem('unread', (localStorage.getItem('unread') - 1) );
          chrome.browserAction.setBadgeText({ text: localStorage.getItem('unread') + ''  });
          
          chrome.tabs.create( { url: element.href } );
        }

        Tracker.trigger(Env.TEAM_SLUG, element.href);

      }.bind(this), false);
    }.bind(this));
  },

  getNews: function() {
    var url = this.url;
    var process = this.process.bind(this);
    var time = 600000; // 10 minutes

    setInterval(function() {
      Ajax.get({
        url: url,
        success: process
      });
    }, time);
  },

  process: function(data) {
    var hasNews = this.currentData && this.currentData[0].id !== data[0].id;

    if (hasNews === false) return;

    data = data.map(this.augment.bind(this));

    this.currentData = data;
    localStorage.setItem('unread', data.length);

    if (Env.isChromeKind) {
      chrome.browserAction.setBadgeText({ text: localStorage.getItem('unread') + ''  });
    }

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