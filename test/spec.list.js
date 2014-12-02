var List = require('../app/js/List.js');

describe('list', function() {
  describe('instance', function() {
    it('should be a object', function() {
      var isObject = typeof(List) === 'object';
      expect(isObject).toBeTruthy();
    });

    it('should has get method', function() {
      expect(List.get).toBeDefined();
    });
  });
});