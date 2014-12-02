var Template = {
  compile: function(html, datas) {
    var output = '';

    datas.forEach(function(element, index) {
      console.log(element.title);
      output += html.replace('{{ SRC }}', element['original-thumb'])
                    .replace(/\{\{ URL \}\}/gi, element['link-desktop'])
                    .replace('{{ TAG }}', element.tag)
                    .replace(/\{\{ TITLE \}\}/gi, element.title)
                    .replace(/\{\{ DATE \}\}/gi, element.date);
    });

    return output;
  }
};

module.exports = Template;