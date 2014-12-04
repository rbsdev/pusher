var Storage = {
  get: function(key) { localStorage.getItem(key); },
  set: function(key, value) { localStorage.setItem(key, value); },

  save: function(id) {
    var list = JSON.parse(localStorage.getItem('unread-list'));

    if ( !list) list = [];

    list.push(id);
    localStorage.setItem('unread-list', JSON.stringify(list) );

    return this;
  },

  find: function(id) {
    var list = localStorage.getItem('unread-list');

    if (!list) return false;

    hasValue = JSON.parse(list).indexOf(id) >= 0;
    return hasValue;
  }
};

module.exports = Storage;