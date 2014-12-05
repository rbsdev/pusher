var List = require('./list.js');
var Env = require('./env.js');
var Tracker = require('./tracker.js');

var OnOffComponent = {
  
  component: document.querySelector('#component'),
  box: component.querySelector('.component-box'),
  list: document.querySelector('#list-news-rival'),
  loaded: false,

  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    var pivot = this.component.querySelector('.component-pivot');

    var handlerPivot = function(event) {
      var state = this.box.attributes['data-state'].value;

      if (state === "on") {
        this.box.className = "component-box off";
        this.box.attributes['data-state'].value = 'off';
        this.hideRivalListNews();
      } else {
        this.box.className = "component-box on";
        this.box.attributes['data-state'].value = 'on';

        this.getNews(function() {
          this.showRivalListNews();
        });

      }

      Tracker.trigger(Env.TEAM_SLUG_CAPITALIZED, 'Noticias do rival alternado');
    };

    pivot.addEventListener('click', handlerPivot.bind(this));
  },

  getNews: function(callback){
    var rivalTeam = '',
        url = '';
    
    if (Env.TEAM_SLUG === "gremio" ) {
      rivalTeam = "inter";
    } else {
      rivalTeam = "gremio";
    }

    url = Env.service.NEWS.replace("{{team}}", rivalTeam);

    if (!this.loaded) {
      List.getRival(url, this.list);
      this.loaded = true;
    }

    if (callback)
      callback.call(this);
  },

  showRivalListNews: function() {
    this.list.classList.add('show');
  },

  hideRivalListNews: function() {
    this.list.classList.remove('show');
  }
};

module.exports = OnOffComponent;