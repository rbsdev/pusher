var HumanizeDate = require('../app/scripts/humenize-date.js');

describe('template', function() {
  describe('instance', function() {
    it('should to be a object', function() {
      var isObject = typeof(HumanizeDate) === 'object';
      expect(isObject).toBeTruthy();
    });

    it('should has timestamp method', function() {
      expect(HumanizeDate.timestamp).toDefined();
    });

    it('should has update method', function() {
      expect(HumanizeDate.update).toDefined();
    });
  });
});