var Tracker = {
  trigger: function() {
    _gaq.push(['_trackEvent', 'Cliques Extensoes - ZH'].concat([ ].slice.call(arguments)));
  }
};

module.exports = Tracker;
