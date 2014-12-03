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
  });
  
  describe('update method', function() {
	  
	  it('should return exactly now timestamp value', function() {
	        expect(HumanizeDate.update(Date.now())).toEqual( "Agora"   ); 
	    });
	    
	    it('should return exactly x minute ago value', function() {
	       var scale = 24*60*60;
	       for (i=1; i < 3 ; i++) {
	    	   expect(HumanizeDate.update(Date.now()-(scale)*i)).toEqual( "Há "+(i)+" minuto"+(i==1?"":"s")); 
	       }
	    });
	    
	    it('should return exactly x hour ago value', function() {
	    	var scale = 24*60*60*60;
	        for (i=1; i < 3 ; i++) {
	        	expect(HumanizeDate.update(Date.now()-(scale)*i)).toEqual( "Há "+(i)+" hora"+(i==1?"":"s")); 
	        }
	    });
	    
	    it('should return exactly x day ago value', function() {
	    	var scale = (24*60*60*60)*24;
	        for (i=1; i < 3 ; i++) {
	        	expect(HumanizeDate.update(Date.now()-(scale)*i)).toEqual( "Há "+(i)+" dia"+(i==1?"":"s")); 
	        }
	    });
  });
  
});