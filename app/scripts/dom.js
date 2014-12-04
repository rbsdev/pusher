var DOM = {
  hasClass: function(element, className) {
    return new RegExp(' ' + className + ' ').test(' ' + element.className + ' ');
  },

  addClass: function(element, className) {
    if (!this.hasClass(element, className)) {
      element.className += ' ' + className;
    }

    return this;
  }
};

module.exports = DOM;