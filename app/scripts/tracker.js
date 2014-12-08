var Tracker = {
  init: function() {
    var sdk = document.createElement('script');

    window._gaq = window._gaq || [];
    window._gaq.push(['_set', 'page', 'cliques-extensoes-zh']);
    window._gaq.push(['_setAccount', 'UA-3469445-1']);
    window._gaq.push(['_setAllowHash', false]);
    window._gaq.push(['_setAllowLinker', true]);

    sdk.type = 'text/javascript';
    sdk.async = true;
    sdk.src = 'https://ssl.google-analytics.com/ga.js';

    document.body.appendChild(sdk);
  },

  trigger: function() {
    window._gaq.push(['_trackEvent', 'Cliques Extensoes - ZH'].concat([ ].slice.call(arguments)));
  }
};

module.exports = Tracker;
