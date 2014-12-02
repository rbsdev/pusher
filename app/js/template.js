var HumanizeDate = require('./humanize-date.js');

var Template = {
  compile: function(html, datas) {
    var output = '';

    datas.forEach(function(element, index) {
      var timestamp = HumanizeDate.timestamp(element.date);
      var humanizedTime = HumanizeDate.update(timestamp);

      output += html.replace('{{ SRC }}', element.thumb)
                             .replace(/\{\{ URL \}\}/gi, element.link)
                             .replace('{{ TITLE }}', element.title)
                             .replace('{{ DATE }}', humanizedTime);
    });

    return output;
  }
};

module.exports = Template;