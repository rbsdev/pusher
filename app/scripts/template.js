var HumanizeDate = require('./humanize-date.js');
var Env = require('./env.js');

var Template = {
  compile: function(html, datas) {
    var output = '';

    datas.forEach(function(element, index) {
      var timestamp = HumanizeDate.timestamp(element.date);
      var humanizedTime = HumanizeDate.update(timestamp);

      output += html.replace('{{ SRC }}', element['original-thumb'])
                    .replace(/\{\{ URL \}\}/g, element['link-desktop'] + "?origin-kind=" + Env.KIND_SLUG)
                    .replace('{{ TAG }}', element.tag)
                    .replace(/\{\{ TITLE \}\}/g, element.title)
                    .replace(/\{\{ DATE \}\}/g, humanizedTime);
    });

    return output;
  }
};

module.exports = Template;