var HumanizeDate = require('./humanize-date.js');
var Env = require('./env.js');

var Template = {
  codeFromChar: function(char) {
    return '&#' + char.charCodeAt(0) + ';';
  },

  compile: function(html, data) {
    var output = '';

    data.forEach(function(element, index) {
      var timestamp = HumanizeDate.timestamp(element.date);
      var humanizedTime = HumanizeDate.update(timestamp);

      output += html.replace('{{ SRC }}', element['original-thumb'] || 'images/empty.png')
                    .replace(/\{\{ URL \}\}/g, element['link-desktop'] + "?origin-kind=" + Env.KIND_SLUG)
                    .replace('{{ TAG }}', element.tag)
                    .replace(/\{\{ TITLE \}\}/g, element.title)
                    .replace(/\{\{ TITLE_SAFE \}\}/g, this.safe.call(this, element.title))
                    .replace(/\{\{ DATE \}\}/g, humanizedTime)
                    .replace('{{ ID }}', element.id)
                    .replace(/\{\{ NEW \}\}/g, element.newBadge || '');
    }.bind(this));

    return output;
  },

  safe: function(text) {
    return text.replace(/(["&'<>])/g, this.codeFromChar.bind(this));
  }
};

module.exports = Template;
