var Storage = {
  get: function(key) { localStorage.getItem(key); },
  set: function(key, value) { localStorage.setItem(key, value); },

  save: function(id) {
    var list = JSON.parse(this.get('unread-list'));
    list.push(id);
    this.set('unread-list', JSON.stringify(list) );

    return this;
  },

  find: function(id) {
    var list = this.get('unread-list');

    if (!list) return false;

    hasValue = JSON.parse(list).indexOf(id) >= 0;
    return hasValue;
  }
};

module.exports = Storage;