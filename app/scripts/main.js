var OnOffComponent = require('./on-off-component.js');
var Env = require('./env.js');
var List = require('./list.js');

List.get(Env.service.NEWS, '#list-news');
OnOffComponent.init();