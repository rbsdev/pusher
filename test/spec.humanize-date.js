var HumanizeDate = require('../app/scripts/humanize-date.js');

describe('template', function() {
  describe('instance', function() {
    it('should to be a object', function() {
      var isObject = typeof(HumanizeDate) === 'object';
      expect(isObject).toBeTruthy();
    });

    it('should has timestamp method', function() {
      var isFunction = typeof(HumanizeDate.timestamp) === 'function';
      expect(isFunction).toBeTruthy();
    });

    it('should has update method', function() {
      var isFunction = typeof(HumanizeDate.update) === 'function';
      expect(isFunction).toBeTruthy();
    });
    
    
    it('should return exactly now timestamp value', function() {
        expect(HumanizeDate.update(Date.now())).toEqual( "Agora"   ); 
     });
    
    
  });
});