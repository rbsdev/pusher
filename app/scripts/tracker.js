var Tracker = {
  trigger: function() {
    _gaq.push(['_trackEvent', 'Cliques Extencoes - ZH'].concat([ ].slice.call(arguments)));
  }
};

module.exports = Tracker;
