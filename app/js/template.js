var Template = {
  compile: function(html, datas) {
    var output = '';

    datas.forEach(function(element, index) {
      output += html.replace('{{ SRC }}', element.thumb)
                             .replace(/\{\{ URL \}\}/gi, element.link)
                             .replace('{{ TITLE }}', element.title)
                             .replace('{{ DATE }}', element.date);
    });

    return output;
  }
};

module.exports = Template;