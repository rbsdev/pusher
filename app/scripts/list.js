var Ajax = require('./ajax.js');
var Env = require('./env.js');
var Template = require('./template.js');
var Tracker = require('./tracker.js');
var DOM = require('./dom.js');
var Storage = require('./storage.js');

var List = {
  url: Env.service.NEWS.replace('{{team}}', Env.TEAM_SLUG),
  element: document.getElementById('list-news'),

  html: [
    '<li>',
      '<a href="{{ URL }}" data-id="{{ ID }}" title="{{ TITLE_SAFE }}">',
        '<div class="photo">',
          '<img src="{{ SRC }}?w=100&h=100&a=c" alt="">',
        '</div>',
        '<div class="content">',
          '<h3>{{ NEW }}{{ TAG }}</h3>',
          '<h2>{{ TITLE }}</h2>',
          '<time datetime="{{ DATE }}">{{ DATE }}</time>',
          '<ul>',
          '</ul>',
        '</div>',
      '</a>',
    '</li>'
  ].join(''),

  newBadge: '<span>Nova</span>',

  augment: function(news) {
    var isNew = !Storage.find(news.id);
    news.newBadge = isNew ? this.newBadge : '';

    return news;
  },

  updateLinks: function() {
    var elements = document.getElementsByTagName('a');
    var lists = [].slice.call(elements);

    lists.forEach(function(element, index) {
      element.addEventListener('click', function(e) {
        e.preventDefault();

        if (Env.isChromeKind) {
          var elementId = element.getAttribute('data-id');
          var isFromOpponent;

          try {
            // holy shit this has to be optimized
            isFromOpponent = element.parentElement.parentElement.getAttribute('id') == 'list-news-rival';
          } catch (error) {
            isFromOpponent = false;
            console.log(error);
          }

          if ( !Storage.find.call(Storage, elementId) ) {
            if (!isFromOpponent) {
              localStorage.setItem('unread', (localStorage.getItem('unread') - 1) );
            }

            chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 255] });
            chrome.browserAction.setBadgeText({ text: localStorage.getItem('unread') + ''  });

            Storage.save.call(Storage, elementId);
          }

          chrome.tabs.create( { url: element.href } );
        }

        Tracker.trigger(Env.TEAM_SLUG_CAPITALIZED, element.href);

      }, false);
    });
  },

  getNews: function() {
    var url = this.url;
    var process = this.process.bind(this);
    // var time = 600000; // 10 minutes

    setInterval(function() {
      console.log('url=', url);
      Ajax.get({
        url: url,
        success: process
      });
    }, 10000);

    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 255] });
    chrome.browserAction.setBadgeText( { text: localStorage.getItem('unread') || '20' } );
  },

  updateElements: function(element, data) {
    var obj = data.map(this.augment.bind(this));
    var html = Template.compile(this.html, obj);
    if (element) element.innerHTML = html;

    this.updateLinks();
    this.getNews();
  },

  updateTotalUnread: function(data, lastNews) {
    var unreadTotal = parseInt(localStorage.getItem('unread'), 10);

    data.forEach(function(newElement, index) {
      if (newElement.id === lastNews[index].id) return false;
      unreadTotal++;
    });

    localStorage.setItem('unread', unreadTotal);

    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 255] });
    chrome.browserAction.setBadgeText( { text: localStorage.getItem('unread') } );
  },

  process: function(data) {
    var lastNews = JSON.parse(localStorage.getItem('currentData'));
    var hasNews = lastNews && lastNews[0].id !== data[0].id;

    if (hasNews === false)  {
      this.updateElements(this.element, lastNews);
      return;
    }

    localStorage.setItem('unread', localStorage.getItem('unread') || data.length );
    
    if (lastNews) this.updateTotalUnread(data, lastNews);

    localStorage.setItem('currentData', JSON.stringify(data) );

    // if (Env.isChromeKind) {
    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 255] });
    chrome.browserAction.setBadgeText( { text: localStorage.getItem('unread') } );
    // }

    this.updateElements(this.element, data);
  },

  get: function() {
    var url = this.url;

    var onOpen = function() {
      var data = JSON.parse(localStorage.getItem('currentData'));
      this.updateElements(this.element, data);
    };

    chrome.browserAction.onClicked.addListener( onOpen.bind(this) );

    Ajax.get({
      url: url,
      success: this.process.bind(this)
    });
  },

  getRival: function(url, element) {
    var that = this;

    Ajax.get({
      url: url,
      success: function(data) { 
        that.updateElements.call(that, element, data);
      }

    });
  }
};

module.exports = List;