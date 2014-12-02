var Template = require('../app/js/template.js');

describe('template', function() {
  describe('instance', function() {
    it('should be a object', function() {
      var isObject = typeof(Template) === 'object';
      expect(isObject).toBeTruthy();
    });

    it('should has compile as method', function() {
      expect(Template.compile).toDefined();
    });
  });
});