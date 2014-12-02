var Template = {
  compile: function(html, datas) {
    var output = '';

    datas.forEach(function(element, index) {
      output += html.replace('{{ SRC }}', element.thumb);
      output += html.replace('/{{ URL }}/gi', element.link);
      output += html.replace('{{ TITLE }}', element.title);
      output += html.replace('{{ DATE }}', element.date);
    });

    return output;
  }
};

module.exports = Template;