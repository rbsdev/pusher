var Template = {
  compile: function(html, datas) {
    var output = '';

    datas.forEach(function(element, index) {
      output += html.replace('{{ SRC }}', datas.src);
      output += html.replace('/{{ URL }}/gi', datas.url);
      output += html.replace('{{ TITLE }}', datas.title);
      output += html.replace('{{ DATE }}', datas.date);
    });

    return output;
  }
};

module.exports = Template;