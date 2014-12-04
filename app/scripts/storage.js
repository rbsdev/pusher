var Storage = {
  get: localStorage.getItem,
  set: localStorage.setItem,

  save: function(id) {
    var list = JSON.parse(this.get('unread-list'));
    list.push(id);
    this.set('unread-list', JSON.stringify(list) );

    return this;
  },

  find: function(id) {
    var list = JSON.parse(this.get('unread-list'));
    hasValue = list.indexOf(id) >= 0;

    return hasValue;
  }
};

module.exports = Storage;