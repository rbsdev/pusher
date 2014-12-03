var OnOffComponent = {
	
	component: document.querySelector('#component'),
	box: component.querySelector('.component-box'),

	init: function() {
		this.bindEvents();
		console.log('component', this.component);
		console.log('component-box', this.box);
	},

	bindEvents: function() {
		var pivot = component.querySelector('.component-pivot');
		var self = this;

		var handlerPivot = function(event) {
			var state = self.box.attributes['data-state'].value;

			if (state === "on") {
				self.box.className = "component-box off";
				self.box.attributes['data-state'].value = 'off';
			} else {
				self.box.className = "component-box on";
				self.box.attributes['data-state'].value = 'on';
			}
		};

		pivot.addEventListener('click', handlerPivot);
	}
};

module.exports = OnOffComponent;