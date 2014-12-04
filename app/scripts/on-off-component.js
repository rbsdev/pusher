var List = require('./list.js');
var Env = require('./env.js');

var OnOffComponent = {
	
	component: document.querySelector('#component'),
	box: component.querySelector('.component-box'),
	list: document.querySelector('#list-news-rival'),
	loaded: false,

	init: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		var pivot = component.querySelector('.component-pivot');
		var self = this;

		var handlerPivot = function(event) {
			var state = self.box.attributes['data-state'].value;

			if (state === "on") {
				self.box.className = "component-box off";
				self.box.attributes['data-state'].value = 'off';
				self.hideRivalListNews();
			} else {
				self.box.className = "component-box on";
				self.box.attributes['data-state'].value = 'on';

				self.getNews(function() {
					self.showRivalListNews();
				});

			}
		};

		pivot.addEventListener('click', handlerPivot);
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