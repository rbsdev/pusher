var Template = require('../app/scripts/template.js');

describe('template', function() {
  describe('instance', function() {
	  
    it('should to be a object', function() {
      var isObject = typeof(Template) === 'object';
      expect(isObject).toBeTruthy();
    });

    it('should has compile as method', function() {
      var isFunction = typeof(Template.compile) === 'function';
      expect(isFunction).toBeTruthy();
    });
   
  });
  
  describe('compile method', function() {
	  var mockedHtmlTemplate = '<div id="mock">{{ URL }} {{ TITLE }} {{ SRC }} {{ TAG }} {{ DATE }}</div>';
	  var mockedDatas = [{
                    	 "link-desktop":"http://mockurl.com",
                    	 "original-thumb":"thumb value",
                    	 "tag":"tag value",
                    	 "title":"title value",
                    	 "date":"2014-12-03:11:41:54"
   	                    }];
	  
	  it('should contains a origin-kind param', function() {
	   	expect(Template.compile(mockedHtmlTemplate,mockedDatas)).toContain('?origin-kind=');
	  });
	  
	  it('should contains field values', function() {
		  var compiledValue = Template.compile(mockedHtmlTemplate,mockedDatas); 
	   	  expect(compiledValue).toContain('thumb value');
	   	  expect(compiledValue).toContain('tag value')
	   	  expect(compiledValue).toContain('title value');
	   	  expect(compiledValue).toContain('Há');
	  });
	  
	  it('should dont contains unmarshalled key values', function() {
		  var compiledValue = Template.compile(mockedHtmlTemplate,mockedDatas); 
	   	  expect(compiledValue).not.toContain('URL');
	   	  expect(compiledValue).not.toContain('TITLE');
	   	  expect(compiledValue).not.toContain('SRC')
	   	  expect(compiledValue).not.toContain('TAG');
	   	  expect(compiledValue).not.toContain('DATE');
	  });
	  
	  it('should contains valid link url', function() {
		  var compiledValue = Template.compile(mockedHtmlTemplate,mockedDatas); 
	   	  expect(compiledValue).toContain('http://');
	   	  expect(compiledValue).toContain('.');
	  });
  });
});