var OnOffComponent = require('./on-off-component.js');
var List = require('./list.js');
var Tracker = require('./tracker.js');

document.addEventListener('DOMContentLoaded', function() {
  List.get();
  OnOffComponent.init();
  Tracker.init();
});
