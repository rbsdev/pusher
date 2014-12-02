var HumanizeDate = require('./humanize-date.js');

var Template = {
  compile: function(html, datas) {
    var output = '';

    datas.forEach(function(element, index) {
      var timestamp = HumanizeDate.timestamp(element.date);
      var humanizedTime = HumanizeDate.update(timestamp);

      output += html.replace('{{ SRC }}', element['original-thumb'])
                    .replace(/\{\{ URL \}\}/gi, element['link-desktop'])
                    .replace('{{ TAG }}', element.tag)
                    .replace(/\{\{ TITLE \}\}/gi, element.title)
                    .replace(/\{\{ DATE \}\}/gi, humanizedTime);
    });

    return output;
  }
};

module.exports = Template;