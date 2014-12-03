var List = require('../app/scripts/List.js');

describe('list', function() {
  describe('instance', function() {
    it('should be a object', function() {
      var isObject = typeof(List) === 'object';
      expect(isObject).toBeTruthy();
    });

    it('should has get method', function() {
      expect(List.get).toBeDefined();
    });

    it('should has url attribute', function() {
      var url = List.url;

      expect(url).toBeDefined();
      expect(typeof(url)).toEqual('string');
    });

    it('should has element attribute with correct dom element', function() {
      // var element = List.element;

      // expect(element).toBeDefined();
      // expect(element.id).toEqual('list-news');
    });
  });

  describe('get', function() {
    it('', function() {

    });
  });
});