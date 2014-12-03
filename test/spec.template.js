var Template = require('../app/scripts/template.js');

describe('template', function() {
  describe('instance', function() {
    it('should be a object', function() {
      var isObject = typeof(Template) === 'object';
      expect(isObject).toBeTruthy();
    });

    it('should has compile as method', function() {
      var isFunction = typeof(Template.compile) === 'function';
      expect(isFunction).toBeTruthy();
    });
  });
});