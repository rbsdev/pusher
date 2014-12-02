var Ajax = require('../app/js/ajax.js');

describe('ajax', function() {
  describe('instance', function() {
    it('should be a object', function() {
      var isObject = typeof(Ajax) === 'object';
      expect(isObject).toBeTruthy();
    });

    it('shoud has get method', function() {
      expect(Ajax.get).toBeDefined();
    });
  });
});