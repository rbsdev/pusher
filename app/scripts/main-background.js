var List = require('./list.js');
var Tracker = require('./tracker.js');

document.addEventListener('DOMContentLoaded', function() {
  List.getNews();
  Tracker.init();
});
